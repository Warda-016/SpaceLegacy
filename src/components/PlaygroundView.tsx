import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Minimize2,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import {
  PLAYGROUND_MISSIONS,
  PlaygroundComponentPart,
  PlaygroundMissionSpec,
} from '../data/playgroundMissions';
import {
  BuiltPartEntry,
  buildPlaygroundMissionModel,
  disposeBuiltPlaygroundModel,
} from '../utils/playgroundModels';

// Module-scoped reusable math helpers (zero per-frame allocations)
const _raycaster = new THREE.Raycaster();
const _pointer = new THREE.Vector2();
const _projVec = new THREE.Vector3();
const _targetPos = new THREE.Vector3();
const _desiredCamPos = new THREE.Vector3();
const _highlightColor = new THREE.Color(0x38bdf8);
const _hoverColor = new THREE.Color(0xfbbf24);

function detectSoftwareWebGL(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export const PlaygroundView: React.FC = () => {
  const [selectedMissionId, setSelectedMissionId] = useState<string>(
    PLAYGROUND_MISSIONS[0].id
  );
  const [isUnmerged, setIsUnmerged] = useState<boolean>(false);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null);
  const [webglError, setWebglError] = useState<boolean>(false);

  const selectedMission: PlaygroundMissionSpec = useMemo(
    () =>
      PLAYGROUND_MISSIONS.find((m) => m.id === selectedMissionId) ||
      PLAYGROUND_MISSIONS[0],
    [selectedMissionId]
  );

  const selectedPart: PlaygroundComponentPart | null = useMemo(
    () =>
      selectedMission.parts.find((p) => p.id === selectedPartId) || null,
    [selectedMission, selectedPartId]
  );

  const selectedPartIndex = useMemo(
    () =>
      selectedPart
        ? selectedMission.parts.findIndex((p) => p.id === selectedPart.id)
        : -1,
    [selectedMission, selectedPart]
  );

  // Refs for live Three.js loop without tearing down WebGL on React state changes
  const mountRef = useRef<HTMLDivElement | null>(null);
  const labelRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isUnmergedRef = useRef<boolean>(false);
  const selectedPartIdRef = useRef<string | null>(null);
  const hoveredPartIdRef = useRef<string | null>(null);
  const cameraTransitionActiveRef = useRef<boolean>(false);
  const targetCamDistanceRef = useRef<number>(selectedMission.cameraDistance);
  const targetCamHeightRef = useRef<number>(selectedMission.cameraHeight);
  const sceneApiRef = useRef<{
    loadMission: (spec: PlaygroundMissionSpec) => void;
    resetCamera: (spec: PlaygroundMissionSpec, unmerged: boolean) => void;
  } | null>(null);

  useEffect(() => {
    isUnmergedRef.current = isUnmerged;
    targetCamDistanceRef.current = isUnmerged
      ? selectedMission.cameraDistance * 1.38
      : selectedMission.cameraDistance;
    targetCamHeightRef.current = selectedMission.cameraHeight;
    cameraTransitionActiveRef.current = true;
  }, [isUnmerged, selectedMission]);

  useEffect(() => {
    selectedPartIdRef.current = selectedPartId;
  }, [selectedPartId]);

  useEffect(() => {
    hoveredPartIdRef.current = hoveredPartId;
  }, [hoveredPartId]);

  // Escape closes open part explanation card
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPartIdRef.current) {
        setSelectedPartId(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSelectMission = useCallback((mission: PlaygroundMissionSpec) => {
    setSelectedMissionId(mission.id);
    setIsUnmerged(false);
    setSelectedPartId(null);
    setHoveredPartId(null);
    sceneApiRef.current?.loadMission(mission);
  }, []);

  const handleToggleUnmerge = useCallback(() => {
    setIsUnmerged((prev) => {
      const next = !prev;
      if (!next) {
        setSelectedPartId(null);
      }
      return next;
    });
  }, []);

  const handleResetView = useCallback(() => {
    sceneApiRef.current?.resetCamera(selectedMission, isUnmergedRef.current);
  }, [selectedMission]);

  // Initialize Three.js WebGL stage once on mount
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch (err) {
      console.warn('WebGL unavailable for Playground 3D stage:', err);
      setWebglError(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth || 800, container.clientHeight || 540);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.outline = 'none';
    container.appendChild(renderer.domElement);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError(true);
    };
    const onContextRestored = () => {
      setWebglError(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060917);
    scene.fog = new THREE.FogExp2(0x060917, 0.032);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 540;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(
      PLAYGROUND_MISSIONS[0].cameraDistance * 0.78,
      PLAYGROUND_MISSIONS[0].cameraHeight,
      PLAYGROUND_MISSIONS[0].cameraDistance * 0.82
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.065;
    controls.minDistance = 2.6;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI * 0.82;
    controls.target.set(0, 0.15, 0);
    controls.update();

    const onControlsStart = () => {
      cameraTransitionActiveRef.current = false;
    };
    controls.addEventListener('start', onControlsStart);

    // 3-Point Studio Lighting (Warm Key, Cool Sky/Ground Fill, Crisp Rim)
    const hemiLight = new THREE.HemisphereLight(0x9ecbff, 0x161b33, 0.75);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e0, 2.2);
    keyLight.position.set(6, 9, 6);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -4.5;
    keyLight.shadow.camera.right = 4.5;
    keyLight.shadow.camera.top = 4.5;
    keyLight.shadow.camera.bottom = -4.5;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.35);
    rimLight.position.set(-6, 4, -6);
    scene.add(rimLight);

    // Subtle cosmic starfield + soft studio pedestal ring
    const starCount = 260;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 18 + Math.random() * 24;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.cos(phi);
      starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xcbe3ff,
      size: 0.11,
      transparent: true,
      opacity: 0.68,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const ringGeo = new THREE.RingGeometry(1.75, 1.8, 64);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    });
    const studioRing = new THREE.Mesh(ringGeo, ringMat);
    studioRing.position.y = -1.45;
    scene.add(studioRing);

    const modelHolder = new THREE.Group();
    scene.add(modelHolder);

    let currentRoot: THREE.Group | null = null;
    let currentParts: BuiltPartEntry[] = [];
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    const loadMissionModel = (spec: PlaygroundMissionSpec) => {
      if (currentRoot) {
        modelHolder.remove(currentRoot);
        disposeBuiltPlaygroundModel(currentRoot);
        currentRoot = null;
        currentParts = [];
      }
      const built = buildPlaygroundMissionModel(
        spec.id,
        maxAnisotropy,
        isSoftwareGl
      );
      currentRoot = built.root;
      currentParts = built.parts;
      modelHolder.add(built.root);

      targetCamDistanceRef.current = spec.cameraDistance;
      targetCamHeightRef.current = spec.cameraHeight;
      cameraTransitionActiveRef.current = true;
      controls.target.set(0, 0.15, 0);
      if (!isSoftwareGl) {
        renderer.compile(scene, camera);
      }
    };

    const resetCameraView = (spec: PlaygroundMissionSpec, unmerged: boolean) => {
      targetCamDistanceRef.current = unmerged
        ? spec.cameraDistance * 1.38
        : spec.cameraDistance;
      targetCamHeightRef.current = spec.cameraHeight;
      controls.target.set(0, 0.15, 0);
      cameraTransitionActiveRef.current = true;
    };

    sceneApiRef.current = {
      loadMission: loadMissionModel,
      resetCamera: resetCameraView,
    };

    loadMissionModel(PLAYGROUND_MISSIONS[0]);

    // Pointer picking (discriminate click vs orbit drag; throttle hover checks)
    let downX = 0;
    let downY = 0;
    let lastHoverTs = 0;

    const findPartIdFromObject = (obj: THREE.Object3D | null): string | null => {
      let cur: THREE.Object3D | null = obj;
      while (cur) {
        if (typeof cur.userData.partId === 'string') {
          return cur.userData.partId;
        }
        cur = cur.parent;
      }
      return null;
    };

    const pickPartAtEvent = (e: PointerEvent): string | null => {
      if (!currentRoot) return null;
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      _pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      _pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      _raycaster.setFromCamera(_pointer, camera);
      const hits = _raycaster.intersectObjects(currentRoot.children, true);
      if (hits.length === 0) return null;
      return findPartIdFromObject(hits[0].object);
    };

    const onPointerDown = (e: PointerEvent) => {
      downX = e.clientX;
      downY = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (dist > 7) return; // User was orbiting/dragging camera
      const hitPartId = pickPartAtEvent(e);
      if (hitPartId) {
        setSelectedPartId((prev) => (prev === hitPartId ? null : hitPartId));
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastHoverTs < 65) return;
      lastHoverTs = now;
      const hitPartId = pickPartAtEvent(e);
      renderer.domElement.style.cursor = hitPartId ? 'pointer' : 'grab';
      if (hitPartId !== hoveredPartIdRef.current) {
        hoveredPartIdRef.current = hitPartId;
        setHoveredPartId(hitPartId);
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointermove', onPointerMove);

    // ResizeObserver for crisp layout transitions
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w <= 0 || h <= 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // Animation & damping loop with software-WebGL pacing guard
    let disposed = false;
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.08);
      const elapsed = clock.getElapsedTime();
      const unmerged = isUnmergedRef.current;
      const activeId = selectedPartIdRef.current;
      const hoverId = hoveredPartIdRef.current;

      // Gentle whole-model turntable when idle and merged
      if (!unmerged) {
        modelHolder.rotation.y += delta * 0.18;
      } else {
        modelHolder.rotation.y = THREE.MathUtils.damp(
          modelHolder.rotation.y,
          Math.round(modelHolder.rotation.y / (Math.PI * 2)) * (Math.PI * 2),
          3.2,
          delta
        );
      }

      // Smooth camera transition toward target distance (stops on arrival or user drag)
      if (cameraTransitionActiveRef.current) {
        const curDist = camera.position.distanceTo(controls.target);
        const goalDist = targetCamDistanceRef.current;
        const dir = _desiredCamPos
          .subVectors(camera.position, controls.target)
          .normalize();
        const nextDist = THREE.MathUtils.damp(curDist, goalDist, 5.5, delta);
        camera.position.copy(controls.target).addScaledVector(dir, nextDist);
        camera.position.y = THREE.MathUtils.damp(
          camera.position.y,
          targetCamHeightRef.current,
          5.5,
          delta
        );
        if (
          Math.abs(nextDist - goalDist) < 0.03 &&
          Math.abs(camera.position.y - targetCamHeightRef.current) < 0.03
        ) {
          cameraTransitionActiveRef.current = false;
        }
      }

      controls.update();

      const viewW = container.clientWidth || 800;
      const viewH = container.clientHeight || 540;

      // Animate each of the 5 component groups + update projected floating HTML labels
      for (let i = 0; i < currentParts.length; i++) {
        const entry = currentParts[i];
        if (unmerged) {
          const floatY = Math.sin(elapsed * 1.45 + entry.phase) * 0.07;
          const floatX = Math.cos(elapsed * 0.9 + entry.phase) * 0.025;
          _targetPos.set(
            entry.explodeOffset.x + floatX,
            entry.explodeOffset.y + floatY,
            entry.explodeOffset.z
          );
          entry.group.position.x = THREE.MathUtils.damp(
            entry.group.position.x,
            _targetPos.x,
            5.5,
            delta
          );
          entry.group.position.y = THREE.MathUtils.damp(
            entry.group.position.y,
            _targetPos.y,
            5.5,
            delta
          );
          entry.group.position.z = THREE.MathUtils.damp(
            entry.group.position.z,
            _targetPos.z,
            5.5,
            delta
          );
        } else {
          entry.group.position.x = THREE.MathUtils.damp(
            entry.group.position.x,
            0,
            7.0,
            delta
          );
          entry.group.position.y = THREE.MathUtils.damp(
            entry.group.position.y,
            0,
            7.0,
            delta
          );
          entry.group.position.z = THREE.MathUtils.damp(
            entry.group.position.z,
            0,
            7.0,
            delta
          );
        }

        // Apply crisp emissive feedback to hovered or selected component
        const isSel = activeId === entry.partId;
        const isHov = hoverId === entry.partId;
        entry.group.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            const mat = (obj as THREE.Mesh)
              .material as THREE.MeshStandardMaterial;
            if (isSel) {
              mat.emissive.copy(_highlightColor);
              mat.emissiveIntensity = 0.45;
            } else if (isHov) {
              mat.emissive.copy(_hoverColor);
              mat.emissiveIntensity = 0.25;
            } else if (mat.userData.__baseEmissive) {
              mat.emissive.copy(mat.userData.__baseEmissive as THREE.Color);
              mat.emissiveIntensity =
                (mat.userData.__baseEmissiveIntensity as number) || 0;
            }
          }
        });

        // Update floating component name label position directly via DOM transform (zero React re-renders!)
        const labelEl = labelRefs.current[entry.partId];
        if (labelEl) {
          if (!unmerged) {
            labelEl.style.opacity = '0';
            labelEl.style.pointerEvents = 'none';
          } else {
            _projVec
              .copy(entry.localCenter)
              .add(entry.group.position)
              .add(entry.labelOffset);
            entry.group.parent?.localToWorld(_projVec);
            _projVec.project(camera);

            if (_projVec.z > 1) {
              labelEl.style.opacity = '0';
              labelEl.style.pointerEvents = 'none';
            } else {
              const rawX = (_projVec.x * 0.5 + 0.5) * viewW;
              const rawY = (-_projVec.y * 0.5 + 0.5) * viewH;
              const clampedX = Math.max(76, Math.min(viewW - 76, rawX));
              const clampedY = Math.max(36, Math.min(viewH - 86, rawY));
              labelEl.style.opacity = '1';
              labelEl.style.pointerEvents = 'auto';
              labelEl.style.transform = `translate3d(${clampedX.toFixed(1)}px, ${clampedY.toFixed(1)}px, 0) translate(-50%, -50%)`;
            }
          }
        }
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    if (isSoftwareGl) {
      tick();
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', onControlsStart);
      controls.dispose();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener(
        'webglcontextrestored',
        onContextRestored
      );
      if (currentRoot) {
        disposeBuiltPlaygroundModel(currentRoot);
      }
      starGeo.dispose();
      starMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      envTarget.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      sceneApiRef.current = null;
    };
  }, []);

  const handleCyclePart = (dir: -1 | 1) => {
    if (selectedMission.parts.length === 0) return;
    const baseIdx = selectedPartIndex >= 0 ? selectedPartIndex : 0;
    const nextIdx =
      (baseIdx + dir + selectedMission.parts.length) %
      selectedMission.parts.length;
    setSelectedPartId(selectedMission.parts[nextIdx].id);
  };

  return (
    <div className="w-full max-w-full space-y-4 pb-10">
      {/* Compact 13-Mission Selector Strip */}
      <div className="rounded-2xl bg-[#0b1026] border border-white/10 p-3 sm:p-4 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="min-w-0">
            <h1 className="font-headline text-lg sm:text-xl font-bold text-white tracking-tight">
              3D Hardware Playground
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Pick any of the 13 space explorers below, press{' '}
              <strong className="text-sky-300 font-semibold">Unmerge</strong> to
              float its parts apart, and tap any piece to learn what it does!
            </p>
          </div>
          <span className="font-mono text-xs text-slate-400 shrink-0">
            {selectedMission.orderNumber} / {PLAYGROUND_MISSIONS.length}
          </span>
        </div>

        <div
          className="flex flex-wrap items-center gap-1.5 sm:gap-2"
          role="tablist"
          aria-label="Select a space mission model"
        >
          {PLAYGROUND_MISSIONS.map((mission) => {
            const isActive = mission.id === selectedMission.id;
            return (
              <button
                key={mission.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectMission(mission)}
                className={`px-2.5 py-1.5 rounded-lg sm:rounded-xl border text-left transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-sky-400 text-[#060814] border-sky-300 font-bold shadow-[0_4px_16px_rgba(56,189,248,0.28)]'
                    : 'bg-[#121938] text-slate-200 border-white/10 hover:border-sky-400/50 hover:text-white'
                }`}
              >
                <span
                  className={`font-mono text-[10px] mr-1 ${
                    isActive ? 'text-[#060814]/75 font-bold' : 'text-sky-300'
                  }`}
                >
                  #{String(mission.orderNumber).padStart(2, '0')}
                </span>
                <span className="font-headline text-xs font-semibold">
                  {mission.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Unobstructed 3D Interactive Stage */}
      <div className="relative w-full h-[440px] sm:h-[510px] lg:h-[550px] rounded-2xl sm:rounded-3xl bg-[#060917] border border-sky-400/25 overflow-hidden shadow-2xl">
        {/* WebGL Mount Container */}
        <div
          ref={mountRef}
          className="w-full h-full touch-none select-none"
          aria-label={`Interactive 3D model of ${selectedMission.name}`}
        />

        {/* WebGL Fallback Card if WebGL is disabled */}
        {webglError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#060917]">
            <p className="font-headline text-lg font-bold text-white mb-2">
              {selectedMission.name}
            </p>
            <p className="text-sm text-slate-300 max-w-md mb-4">
              3D graphics could not start in this browser, so you can explore the{' '}
              {selectedMission.parts.length} parts directly below.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedMission.parts.map((part) => (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => setSelectedPartId(part.id)}
                  className="px-3.5 py-2 rounded-xl bg-sky-400/15 border border-sky-400/40 text-sky-200 text-xs font-semibold cursor-pointer"
                >
                  {part.emoji} {part.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Top-Left Minimal Model Title Overlay (solid/rgba surface, zero backdrop-blur) */}
        <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 pointer-events-none max-w-[calc(100%-6rem)]">
          <div className="inline-block rounded-xl bg-[#0a1026]/92 border border-white/15 px-3.5 py-2 shadow-lg">
            <div className="flex items-center gap-2 text-[11px] font-mono text-sky-300">
              <span>{selectedMission.era}</span>
              <span aria-hidden="true">·</span>
              <span>{isUnmerged ? '5 Floating Parts' : 'Merged Model'}</span>
            </div>
            <h2 className="font-headline text-base sm:text-lg font-bold text-white leading-snug">
              {selectedMission.name}
            </h2>
          </div>
        </div>

        {/* Top-Right Compact Reset Camera Button */}
        <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10">
          <button
            type="button"
            onClick={handleResetView}
            title="Reset 3D camera angle"
            aria-label="Reset 3D camera angle"
            className="px-3 py-2 rounded-xl bg-[#0a1026]/92 hover:bg-[#131d42] border border-white/15 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-sky-300" />
            <span className="hidden sm:inline">Reset View</span>
          </button>
        </div>

        {/* Floating Component Name Labels (appear smoothly when Unmerged!) */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {selectedMission.parts.map((part) => {
            const isSelected = selectedPartId === part.id;
            const isHovered = hoveredPartId === part.id;
            return (
              <button
                key={part.id}
                ref={(el) => {
                  labelRefs.current[part.id] = el;
                }}
                type="button"
                onClick={() =>
                  setSelectedPartId((prev) =>
                    prev === part.id ? null : part.id
                  )
                }
                style={{ opacity: 0, pointerEvents: 'none' }}
                className={`absolute top-0 left-0 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-headline font-bold whitespace-nowrap shadow-lg transition-colors duration-150 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-sky-400 text-[#060814] border-white shadow-[0_0_24px_rgba(56,189,248,0.65)]'
                    : isHovered
                    ? 'bg-amber-300 text-[#060814] border-amber-200'
                    : 'bg-[#0b1330]/92 text-white border-sky-400/50 hover:border-sky-300 hover:bg-[#13204d]'
                }`}
              >
                <span aria-hidden="true">{part.emoji}</span>
                <span>{part.name}</span>
              </button>
            );
          })}
        </div>

        {/* Centered Bottom Action Dock: Unmerge / Merge Button + Simple Helper */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 w-full max-w-md px-4 pointer-events-none">
          <button
            type="button"
            onClick={handleToggleUnmerge}
            className={`pointer-events-auto px-6 py-3 rounded-2xl font-headline font-bold text-sm sm:text-base tracking-wide flex items-center gap-2.5 shadow-xl transition-all cursor-pointer whitespace-nowrap ${
              isUnmerged
                ? 'bg-amber-400 hover:bg-amber-300 text-[#060814] shadow-[0_6px_26px_rgba(251,191,36,0.4)]'
                : 'bg-sky-400 hover:bg-sky-300 text-[#060814] shadow-[0_6px_26px_rgba(56,189,248,0.4)]'
            }`}
          >
            {isUnmerged ? (
              <>
                <Minimize2 className="w-4 h-4 shrink-0" />
                <span>Merge Back Together</span>
              </>
            ) : (
              <>
                <Layers className="w-4 h-4 shrink-0" />
                <span>Unmerge</span>
              </>
            )}
          </button>

          <p className="text-[11px] sm:text-xs font-medium text-slate-200 bg-[#080d22]/90 border border-white/10 px-3 py-1 rounded-lg text-center">
            {isUnmerged
              ? 'Click any floating piece or name tag to learn what it does!'
              : 'Drag to spin 360° · Scroll to zoom · Click Unmerge to separate parts'}
          </p>
        </div>
      </div>

      {/* Child-Friendly Explanation Card when a Component is Clicked */}
      {selectedPart ? (
        <div
          role="region"
          aria-live="polite"
          aria-label={`Explanation for ${selectedPart.name}`}
          className="rounded-2xl sm:rounded-3xl bg-[#0e1635] border-2 border-sky-400/50 p-5 sm:p-6 shadow-2xl space-y-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-sky-400/15 border border-sky-400/40 flex items-center justify-center text-2xl shrink-0">
                {selectedPart.emoji}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono text-sky-300">
                  <span>
                    Part {selectedPartIndex + 1} of {selectedMission.parts.length}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPart.roleTag}</span>
                </div>
                <h3 className="font-headline text-xl sm:text-2xl font-bold text-white break-words">
                  {selectedPart.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => handleCyclePart(-1)}
                aria-label="Previous part"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-200 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleCyclePart(1)}
                aria-label="Next part"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-200 cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedPartId(null)}
                aria-label="Close explanation"
                className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 text-slate-200 hover:text-rose-200 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="rounded-2xl bg-[#070b1e] border border-white/10 p-4 space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-sky-300 font-bold block">
                What is it?
              </span>
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
                {selectedPart.whatItIs}
              </p>
            </div>

            <div className="rounded-2xl bg-[#070b1e] border border-white/10 p-4 space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-300 font-bold block">
                What does it do?
              </span>
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
                {selectedPart.whatItDoes}
              </p>
            </div>

            <div className="rounded-2xl bg-[#070b1e] border border-amber-400/25 p-4 space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Kid Analogy</span>
              </span>
              <p className="text-sm sm:text-base text-amber-100 leading-relaxed">
                {selectedPart.kidAnalogy}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0b1026]/80 border border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-slate-300">
          <span>
            <strong className="text-white">{selectedMission.name}:</strong>{' '}
            {selectedMission.summary}
          </span>
          {!isUnmerged && (
            <button
              type="button"
              onClick={handleToggleUnmerge}
              className="text-sky-300 hover:text-sky-200 font-headline font-bold underline underline-offset-4 cursor-pointer shrink-0"
            >
              Unmerge into 5 parts →
            </button>
          )}
        </div>
      )}
    </div>
  );
};
