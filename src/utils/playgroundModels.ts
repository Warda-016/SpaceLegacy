import * as THREE from 'three';
import { PLAYGROUND_MISSIONS } from '../data/playgroundMissions';

export interface BuiltPartEntry {
  partId: string;
  group: THREE.Group;
  localCenter: THREE.Vector3;
  explodeOffset: THREE.Vector3;
  labelOffset: THREE.Vector3;
  phase: number;
}

export interface BuiltPlaygroundModel {
  root: THREE.Group;
  parts: BuiltPartEntry[];
}

interface MaterialBank {
  goldFoil: THREE.MeshStandardMaterial;
  copperFoil: THREE.MeshStandardMaterial;
  darkCharcoal: THREE.MeshStandardMaterial;
  matteBlack: THREE.MeshStandardMaterial;
  brushedSilver: THREE.MeshStandardMaterial;
  titanium: THREE.MeshStandardMaterial;
  whitePaint: THREE.MeshStandardMaterial;
  solarBlue: THREE.MeshStandardMaterial;
  solarDusty: THREE.MeshStandardMaterial;
  goldDish: THREE.MeshStandardMaterial;
  goldenRecord: THREE.MeshStandardMaterial;
  lensGlass: THREE.MeshPhysicalMaterial;
  amberSensor: THREE.MeshStandardMaterial;
  redAccent: THREE.MeshStandardMaterial;
  tanAwning: THREE.MeshStandardMaterial;
  allMaterials: THREE.Material[];
  allTextures: THREE.Texture[];
}

function createKaptonBumpTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 420; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const len = 8 + Math.random() * 28;
      const ang = Math.random() * Math.PI * 2;
      const v = 90 + Math.floor(Math.random() * 140);
      ctx.strokeStyle = `rgb(${v},${v},${v})`;
      ctx.lineWidth = 1 + Math.random() * 1.8;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

function createSolarTexture(dusty: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = dusty ? '#362b26' : '#0f1e3d';
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = dusty ? '#6e5242' : '#2d4c8a';
    ctx.lineWidth = 2;
    for (let i = 0; i <= 256; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 256);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(256, i);
      ctx.stroke();
    }
    ctx.strokeStyle = dusty ? '#8f694f' : '#648ce0';
    ctx.lineWidth = 1;
    for (let i = 16; i < 256; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 256);
      ctx.stroke();
    }
    if (dusty) {
      for (let i = 0; i < 360; i++) {
        ctx.fillStyle = `rgba(176, 112, 68, ${0.12 + Math.random() * 0.25})`;
        ctx.beginPath();
        ctx.arc(Math.random() * 256, Math.random() * 256, 2 + Math.random() * 9, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createGoldenRecordTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 128);
    grad.addColorStop(0, '#ffe89c');
    grad.addColorStop(0.65, '#d4a024');
    grad.addColorStop(1, '#8a5d0c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = 'rgba(72, 42, 4, 0.55)';
    ctx.lineWidth = 2;
    for (const r of [35, 60, 88, 112]) {
      ctx.beginPath();
      ctx.arc(128, 128, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Pulsar rays in bottom-left & record circle upper-left
    ctx.strokeStyle = 'rgba(65, 38, 0, 0.75)';
    ctx.beginPath();
    ctx.arc(82, 82, 26, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const len = 18 + (i % 3) * 14;
      ctx.beginPath();
      ctx.moveTo(86, 172);
      ctx.lineTo(86 + Math.cos(a) * len, 172 + Math.sin(a) * len);
      ctx.stroke();
    }
    // Stylized figures right
    ctx.beginPath();
    ctx.arc(178, 90, 9, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(178, 99);
    ctx.lineTo(178, 150);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createMaterialBank(rendererMaxAnisotropy: number, isSoftwareGl: boolean): MaterialBank {
  const kaptonBump = createKaptonBumpTexture();
  const solarBlueTex = createSolarTexture(false);
  const solarDustyTex = createSolarTexture(true);
  const recordTex = createGoldenRecordTexture();

  for (const t of [kaptonBump, solarBlueTex, solarDustyTex, recordTex]) {
    t.anisotropy = Math.min(4, rendererMaxAnisotropy || 1);
  }

  const goldFoil = new THREE.MeshStandardMaterial({
    color: 0xe6ad24,
    metalness: 0.9,
    roughness: 0.28,
    bumpMap: kaptonBump,
    bumpScale: 0.035,
  });

  const copperFoil = new THREE.MeshStandardMaterial({
    color: 0xc97b2f,
    metalness: 0.86,
    roughness: 0.32,
    bumpMap: kaptonBump,
    bumpScale: 0.03,
  });

  const darkCharcoal = new THREE.MeshStandardMaterial({
    color: 0x262b38,
    metalness: 0.65,
    roughness: 0.46,
  });

  const matteBlack = new THREE.MeshStandardMaterial({
    color: 0x151821,
    metalness: 0.35,
    roughness: 0.7,
  });

  const brushedSilver = new THREE.MeshStandardMaterial({
    color: 0xd0d7e3,
    metalness: 0.88,
    roughness: 0.22,
  });

  const titanium = new THREE.MeshStandardMaterial({
    color: 0x8994a6,
    metalness: 0.8,
    roughness: 0.35,
  });

  const whitePaint = new THREE.MeshStandardMaterial({
    color: 0xf1f5fb,
    metalness: 0.12,
    roughness: 0.42,
    side: THREE.DoubleSide,
  });

  const solarBlue = new THREE.MeshStandardMaterial({
    map: solarBlueTex,
    metalness: 0.52,
    roughness: 0.24,
    side: THREE.DoubleSide,
  });

  const solarDusty = new THREE.MeshStandardMaterial({
    map: solarDustyTex,
    metalness: 0.35,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });

  const goldDish = new THREE.MeshStandardMaterial({
    color: 0xdba028,
    metalness: 0.82,
    roughness: 0.28,
    side: THREE.DoubleSide,
  });

  const goldenRecord = new THREE.MeshStandardMaterial({
    map: recordTex,
    metalness: 0.88,
    roughness: 0.22,
  });

  const lensGlass = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    metalness: 0.1,
    roughness: 0.08,
    transmission: isSoftwareGl ? 0 : 0.65,
    transparent: true,
    opacity: isSoftwareGl ? 0.55 : 0.92,
    ior: 1.5,
  });

  const amberSensor = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.6,
    roughness: 0.25,
    emissive: 0x451a03,
    emissiveIntensity: 0.35,
  });

  const redAccent = new THREE.MeshStandardMaterial({
    color: 0xdc2626,
    metalness: 0.25,
    roughness: 0.45,
  });

  const tanAwning = new THREE.MeshStandardMaterial({
    color: 0xd8c28a,
    metalness: 0.25,
    roughness: 0.65,
    side: THREE.DoubleSide,
  });

  return {
    goldFoil,
    copperFoil,
    darkCharcoal,
    matteBlack,
    brushedSilver,
    titanium,
    whitePaint,
    solarBlue,
    solarDusty,
    goldDish,
    goldenRecord,
    lensGlass,
    amberSensor,
    redAccent,
    tanAwning,
    allMaterials: [
      goldFoil,
      copperFoil,
      darkCharcoal,
      matteBlack,
      brushedSilver,
      titanium,
      whitePaint,
      solarBlue,
      solarDusty,
      goldDish,
      goldenRecord,
      lensGlass,
      amberSensor,
      redAccent,
      tanAwning,
    ],
    allTextures: [kaptonBump, solarBlueTex, solarDustyTex, recordTex],
  };
}

// Helper: creates a curved parabolic dish via LatheGeometry
function makeDish(radius: number, depth: number, mat: THREE.Material): THREE.Group {
  const g = new THREE.Group();
  const pts: THREE.Vector2[] = [];
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const r = 0.04 + t * radius;
    const y = depth * (t * t);
    pts.push(new THREE.Vector2(r, y));
  }
  const dishGeo = new THREE.LatheGeometry(pts, 32);
  const dish = new THREE.Mesh(dishGeo, mat);
  dish.castShadow = true;
  dish.receiveShadow = true;
  g.add(dish);
  return g;
}

// Helper: strut cylinder between two 3D points
function makeStrut(
  a: THREE.Vector3,
  b: THREE.Vector3,
  radius: number,
  mat: THREE.Material
): THREE.Mesh {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, len, 8),
    mat
  );
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  mesh.castShadow = true;
  return mesh;
}

// Helper: detailed rover wheel with rim, spokes & chevron ring
function makeRoverWheel(
  radius: number,
  width: number,
  mats: MaterialBank,
  copperTint = false
): THREE.Group {
  const wg = new THREE.Group();
  const rim = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, width, 24, 1, false),
    copperTint ? mats.copperFoil : mats.darkCharcoal
  );
  rim.rotation.z = Math.PI / 2;
  rim.castShadow = true;
  wg.add(rim);

  const innerRing = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.72, radius * 0.72, width * 1.04, 18),
    mats.brushedSilver
  );
  innerRing.rotation.z = Math.PI / 2;
  wg.add(innerRing);

  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.28, radius * 0.28, width * 1.12, 12),
    mats.titanium
  );
  hub.rotation.z = Math.PI / 2;
  wg.add(hub);

  // Treads
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const tread = new THREE.Mesh(
      new THREE.BoxGeometry(width * 0.92, 0.02, 0.035),
      mats.titanium
    );
    tread.position.set(0, Math.sin(a) * radius, Math.cos(a) * radius);
    tread.rotation.x = -a;
    wg.add(tread);
  }
  return wg;
}

// Helper: round pleated UltraFlex fan solar array (InSight / Phoenix)
function makeFanSolarWing(radius: number, mats: MaterialBank, dusty = false): THREE.Group {
  const fg = new THREE.Group();
  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, 0.03, 12),
    dusty ? mats.solarDusty : mats.solarBlue
  );
  disc.castShadow = true;
  fg.add(disc);

  // Radial gold ribs
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const rib = new THREE.Mesh(
      new THREE.BoxGeometry(0.025, 0.04, radius),
      mats.copperFoil
    );
    rib.position.set(Math.sin(a) * (radius * 0.5), 0.005, Math.cos(a) * (radius * 0.5));
    rib.rotation.y = a;
    fg.add(rib);
  }
  return fg;
}

// Helper: lattice truss boom along +X from origin
function makeTrussBoom(length: number, width: number, mat: THREE.Material): THREE.Group {
  const bg = new THREE.Group();
  const r = width * 0.14;
  for (const sy of [-width * 0.5, width * 0.5]) {
    for (const sz of [-width * 0.5, width * 0.5]) {
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(r, r, length, 6), mat);
      rod.rotation.z = Math.PI / 2;
      rod.position.set(length * 0.5, sy, sz);
      bg.add(rod);
    }
  }
  const bays = Math.max(3, Math.floor(length / (width * 1.4)));
  for (let i = 0; i <= bays; i++) {
    const x = (i / bays) * length;
    const ring = new THREE.Mesh(new THREE.BoxGeometry(r * 1.6, width, width), mat);
    ring.scale.set(1, 0.15, 1);
    ring.position.set(x, width * 0.5, 0);
    bg.add(ring);
    const ringB = ring.clone();
    ringB.position.set(x, -width * 0.5, 0);
    bg.add(ringB);
  }
  return bg;
}

// Helper: finned RTG drum along Y
function makeFinnedRtg(radius: number, height: number, mat: THREE.Material, finMat: THREE.Material): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 16), mat);
  body.castShadow = true;
  g.add(body);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const fin = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, height * 0.92, radius * 1.1),
      finMat
    );
    fin.position.set(Math.sin(a) * radius * 0.95, 0, Math.cos(a) * radius * 0.95);
    fin.rotation.y = a;
    g.add(fin);
  }
  return g;
}

// =========================================================================
// INDIVIDUAL MISSION BUILDERS (ALL 13)
// =========================================================================

function buildApolloLM(mats: MaterialBank): Record<string, THREE.Group> {
  const ascent = new THREE.Group();
  const descent = new THREE.Group();
  const engine = new THREE.Group();
  const legs = new THREE.Group();
  const dishes = new THREE.Group();

  // Descent Stage (Gold octagonal hub)
  const descentOct = new THREE.Mesh(
    new THREE.CylinderGeometry(1.18, 1.18, 0.85, 8),
    mats.goldFoil
  );
  descentOct.position.y = -0.15;
  descentOct.rotation.y = Math.PI / 8;
  descentOct.castShadow = true;
  descent.add(descentOct);

  // Dark upper thermal collar on descent stage
  const collar = new THREE.Mesh(
    new THREE.CylinderGeometry(1.08, 1.12, 0.16, 8),
    mats.darkCharcoal
  );
  collar.position.y = 0.25;
  collar.rotation.y = Math.PI / 8;
  descent.add(collar);

  // Front black equipment bay + NASA badge plate
  const bay = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.5, 0.12), mats.matteBlack);
  bay.position.set(0, -0.1, 1.12);
  descent.add(bay);
  const badge = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.2, 0.04), mats.whitePaint);
  badge.position.set(-0.55, -0.18, 0.97);
  badge.rotation.y = -0.5;
  descent.add(badge);

  // Engine bell underneath
  const nozzlePts = [
    new THREE.Vector2(0.18, 0),
    new THREE.Vector2(0.28, -0.25),
    new THREE.Vector2(0.45, -0.62),
  ];
  const bell = new THREE.Mesh(new THREE.LatheGeometry(nozzlePts, 24), mats.darkCharcoal);
  bell.position.y = -0.52;
  bell.castShadow = true;
  engine.add(bell);

  // Ascent Cabin (faceted silver/charcoal + gold porch)
  const cabinCore = new THREE.Mesh(
    new THREE.CylinderGeometry(0.86, 0.94, 0.9, 6),
    mats.darkCharcoal
  );
  cabinCore.position.set(0, 0.84, 0);
  cabinCore.castShadow = true;
  ascent.add(cabinCore);

  const cabinFace = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.78, 0.65), mats.brushedSilver);
  cabinFace.position.set(0, 0.84, 0.42);
  cabinFace.castShadow = true;
  ascent.add(cabinFace);

  const frontPorch = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.72, 0.24), mats.goldFoil);
  frontPorch.position.set(0, 0.76, 0.76);
  ascent.add(frontPorch);

  // Windows
  for (const sx of [-0.28, 0.28]) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.08), mats.matteBlack);
    win.position.set(sx, 0.98, 0.74);
    win.rotation.z = sx < 0 ? 0.25 : -0.25;
    ascent.add(win);
  }

  // Rear cylindrical ascent tank/engine bulge
  const aftBulk = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.9, 16), mats.brushedSilver);
  aftBulk.rotation.z = Math.PI / 2;
  aftBulk.position.set(0, 0.92, -0.68);
  ascent.add(aftBulk);

  // 4 RCS thruster quads on corners
  for (const sx of [-0.95, 0.95]) {
    const quad = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.26, 10), mats.brushedSilver);
    quad.position.set(sx, 0.88, 0.45);
    ascent.add(quad);
  }

  // Top Radar & Comms Dishes
  const mainDish = makeDish(0.36, 0.16, mats.whitePaint);
  mainDish.position.set(0, 1.56, 0.3);
  mainDish.rotation.x = 0.55;
  dishes.add(mainDish);
  const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.35, 8), mats.brushedSilver);
  stalk.position.set(0, 1.4, 0.22);
  dishes.add(stalk);

  const sideDish = makeDish(0.22, 0.1, mats.whitePaint);
  sideDish.position.set(-0.55, 1.46, 0.05);
  sideDish.rotation.z = 0.4;
  dishes.add(sideDish);

  // 4 Spider Landing Legs + Footpads + Ladder
  for (let i = 0; i < 4; i++) {
    const ang = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const topAnchor = new THREE.Vector3(Math.cos(ang) * 1.05, 0.1, Math.sin(ang) * 1.05);
    const botAnchor = new THREE.Vector3(Math.cos(ang) * 1.02, -0.45, Math.sin(ang) * 1.02);
    const footPos = new THREE.Vector3(Math.cos(ang) * 1.85, -1.25, Math.sin(ang) * 1.85);

    legs.add(makeStrut(topAnchor, footPos, 0.048, mats.goldFoil));
    legs.add(makeStrut(botAnchor, footPos.clone().lerp(topAnchor, 0.25), 0.036, mats.brushedSilver));

    const pad = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.32, 0.08, 18),
      mats.goldFoil
    );
    pad.position.copy(footPos);
    pad.castShadow = true;
    legs.add(pad);

    // Front leg gets the famous boarding ladder (i === 0 or closest +Z)
    if (i === 0) {
      const ladderStart = topAnchor.clone();
      const ladderEnd = footPos.clone().lerp(topAnchor, 0.28);
      for (const side of [-0.09, 0.09]) {
        const railA = ladderStart.clone().add(new THREE.Vector3(side, 0, 0.08));
        const railB = ladderEnd.clone().add(new THREE.Vector3(side, 0, 0.08));
        legs.add(makeStrut(railA, railB, 0.014, mats.brushedSilver));
      }
      for (let r = 1; r <= 7; r++) {
        const t = r / 8;
        const p = ladderStart.clone().lerp(ladderEnd, t).add(new THREE.Vector3(0, 0, 0.08));
        const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.18, 6), mats.brushedSilver);
        rung.position.copy(p);
        rung.rotation.z = Math.PI / 2;
        legs.add(rung);
      }
    }
  }

  return {
    'ascent-cabin': ascent,
    'radar-dishes': dishes,
    'descent-stage': descent,
    'descent-engine': engine,
    'landing-legs': legs,
  };
}

function buildAlsep(mats: MaterialBank): Record<string, THREE.Group> {
  const central = new THREE.Group();
  const rtg = new THREE.Group();
  const pse = new THREE.Group();
  const lrrr = new THREE.Group();
  const sensors = new THREE.Group();

  // Central Station (gold box + spiral white helical antenna)
  const cBox = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.62, 0.88), mats.goldFoil);
  cBox.position.set(0, -0.42, 0);
  cBox.castShadow = true;
  central.add(cBox);

  const labelPlate = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.36, 0.04), mats.whitePaint);
  labelPlate.position.set(0, -0.4, 0.45);
  central.add(labelPlate);

  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 1.55, 10), mats.brushedSilver);
  mast.position.set(0, 0.66, 0);
  central.add(mast);

  // Corkscrew helix
  const helixPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    const ang = t * Math.PI * 12;
    helixPts.push(new THREE.Vector3(Math.cos(ang) * 0.1, 0.05 + t * 1.15, Math.sin(ang) * 0.1));
  }
  const helix = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(helixPts), 64, 0.014, 6, false),
    mats.whitePaint
  );
  central.add(helix);

  const coneCap = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.3, 18), mats.whitePaint);
  coneCap.position.set(0, 1.48, 0);
  central.add(coneCap);

  // SNAP-27 RTG (left)
  const rtgBase = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.1, 0.75), mats.brushedSilver);
  rtgBase.position.set(-1.95, -0.7, 0.25);
  rtg.add(rtgBase);
  const rtgDrum = makeFinnedRtg(0.28, 0.92, mats.darkCharcoal, mats.titanium);
  rtgDrum.position.set(-1.95, -0.18, 0.25);
  rtg.add(rtgDrum);
  // Ribbon cable to central
  const cable1 = new THREE.Mesh(
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.58, -0.65, 0.25),
        new THREE.Vector3(-1.0, -0.72, 0.35),
        new THREE.Vector3(-0.52, -0.62, 0.2),
      ]),
      18,
      0.028,
      6,
      false
    ),
    mats.whitePaint
  );
  rtg.add(cable1);

  // Moonquake PSE (back middle)
  const pseBox = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.35, 0.55), mats.brushedSilver);
  pseBox.position.set(-0.35, -0.55, -1.25);
  pse.add(pseBox);
  const pseSkirt = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.75, 0.18, 8), mats.tanAwning);
  pseSkirt.position.set(-0.35, -0.32, -1.25);
  pse.add(pseSkirt);

  // LRRR Laser Mirror (right)
  const lrrrPanel = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.45, 0.12), mats.goldFoil);
  lrrrPanel.position.set(1.9, -0.1, -0.15);
  lrrrPanel.rotation.x = -0.45;
  lrrr.add(lrrrPanel);
  const lrrrGlass = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.34, 0.04), mats.lensGlass);
  lrrrGlass.position.set(1.9, -0.09, -0.09);
  lrrrGlass.rotation.x = -0.45;
  lrrr.add(lrrrGlass);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    lrrr.add(
      makeStrut(
        new THREE.Vector3(1.9, -0.25, -0.15),
        new THREE.Vector3(1.9 + Math.cos(a) * 0.34, -0.74, -0.15 + Math.sin(a) * 0.34),
        0.022,
        mats.brushedSilver
      )
    );
  }

  // Wind & Dust Sensors (LSM tripod + LEAM dust box front-right)
  const lsmHub = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.2, 0.32), mats.brushedSilver);
  lsmHub.position.set(1.05, 0.05, -0.95);
  sensors.add(lsmHub);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    sensors.add(
      makeStrut(
        new THREE.Vector3(1.05, -0.02, -0.95),
        new THREE.Vector3(1.05 + Math.cos(a) * 0.42, -0.74, -0.95 + Math.sin(a) * 0.42),
        0.02,
        mats.brushedSilver
      )
    );
  }
  const leamBox = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.34, 0.42), mats.tanAwning);
  leamBox.position.set(1.15, -0.56, 0.85);
  sensors.add(leamBox);
  for (const sx of [-0.14, 0, 0.14]) {
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.06, 12), mats.matteBlack);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(1.15 + sx, -0.56, 1.07);
    sensors.add(lens);
  }

  return {
    'central-station': central,
    'snap27-rtg': rtg,
    'pse-seismometer': pse,
    'lrrr-mirror': lrrr,
    'lsm-leam-sensors': sensors,
  };
}

function buildPioneer(mats: MaterialBank): Record<string, THREE.Group> {
  const dishG = new THREE.Group();
  const busG = new THREE.Group();
  const plaqueG = new THREE.Group();
  const rtgsG = new THREE.Group();
  const magG = new THREE.Group();

  // Giant white dish
  const dish = makeDish(1.45, 0.36, mats.whitePaint);
  dish.position.y = 0.65;
  dishG.add(dish);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    dishG.add(
      makeStrut(
        new THREE.Vector3(Math.cos(a) * 1.15, 0.9, Math.sin(a) * 1.15),
        new THREE.Vector3(0, 1.55, 0),
        0.022,
        mats.brushedSilver
      )
    );
  }
  const feed = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.25, 12), mats.goldFoil);
  feed.position.set(0, 1.58, 0);
  dishG.add(feed);

  // Gold Hex Bus
  const hexBus = new THREE.Mesh(
    new THREE.CylinderGeometry(0.72, 0.72, 0.56, 6),
    mats.goldFoil
  );
  hexBus.position.y = 0.28;
  hexBus.castShadow = true;
  busG.add(hexBus);

  // Golden Plaque on front face
  const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.26, 0.04), mats.goldenRecord);
  plaque.position.set(0.32, 0.32, 0.68);
  plaque.rotation.y = 0.38;
  plaqueG.add(plaque);

  // Twin RTG booms to left (-X)
  const rtgBoom = makeTrussBoom(1.85, 0.14, mats.brushedSilver);
  rtgBoom.position.set(-0.65, 0.22, 0);
  rtgBoom.rotation.y = Math.PI;
  rtgBoom.rotation.z = -0.18;
  rtgsG.add(rtgBoom);

  const rtg1 = makeFinnedRtg(0.16, 0.58, mats.darkCharcoal, mats.titanium);
  rtg1.position.set(-2.35, -0.08, 0.24);
  rtg1.rotation.z = Math.PI / 2;
  rtgsG.add(rtg1);
  const rtg2 = makeFinnedRtg(0.16, 0.58, mats.darkCharcoal, mats.titanium);
  rtg2.position.set(-2.35, -0.08, -0.24);
  rtg2.rotation.z = Math.PI / 2;
  rtgsG.add(rtg2);

  // Long Magnetometer boom to right (+X)
  const magBoom = makeTrussBoom(2.35, 0.1, mats.brushedSilver);
  magBoom.position.set(0.65, 0.18, 0);
  magBoom.rotation.z = -0.22;
  magG.add(magBoom);
  const magTip = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.22, 10), mats.goldFoil);
  magTip.position.set(2.96, -0.32, 0);
  magG.add(magTip);

  return {
    'pioneer-dish': dishG,
    'pioneer-bus': busG,
    'pioneer-plaque': plaqueG,
    'pioneer-rtgs': rtgsG,
    'pioneer-mag': magG,
  };
}

function buildVoyager(mats: MaterialBank): Record<string, THREE.Group> {
  const dishG = new THREE.Group();
  const recordG = new THREE.Group();
  const busG = new THREE.Group();
  const rtgG = new THREE.Group();
  const scanG = new THREE.Group();

  // 3.7m White High-Gain Dish + side calibration dish (from Voyager sample)
  const mainDish = makeDish(1.55, 0.36, mats.whitePaint);
  mainDish.position.y = 0.72;
  dishG.add(mainDish);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    dishG.add(
      makeStrut(
        new THREE.Vector3(Math.cos(a) * 1.15, 0.95, Math.sin(a) * 1.15),
        new THREE.Vector3(0, 1.72, 0),
        0.022,
        mats.brushedSilver
      )
    );
  }
  const topHorn = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.22, 12), mats.brushedSilver);
  topHorn.position.set(0, 1.74, 0);
  dishG.add(topHorn);

  // Decagonal computer bus
  const decaBus = new THREE.Mesh(
    new THREE.CylinderGeometry(0.84, 0.84, 0.56, 10),
    mats.darkCharcoal
  );
  decaBus.position.y = 0.28;
  decaBus.castShadow = true;
  busG.add(decaBus);
  const goldCollar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.86, 0.86, 0.28, 10),
    mats.goldFoil
  );
  goldCollar.position.y = 0.35;
  busG.add(goldCollar);

  // Golden Record
  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.045, 24),
    mats.goldenRecord
  );
  disc.rotation.x = Math.PI / 2;
  disc.position.set(0.32, 0.28, 0.84);
  disc.rotation.z = -0.35;
  recordG.add(disc);

  // Triple stacked RTGs on left truss
  const rtgBoom = makeTrussBoom(1.45, 0.14, mats.brushedSilver);
  rtgBoom.position.set(-0.75, 0.2, 0.2);
  rtgBoom.rotation.y = Math.PI + 0.2;
  rtgBoom.rotation.z = 0.22;
  rtgG.add(rtgBoom);
  for (let i = 0; i < 3; i++) {
    const can = makeFinnedRtg(0.14, 0.55, mats.matteBlack, mats.titanium);
    can.position.set(-1.75 - i * 0.26, -0.05, 0.35);
    rtgG.add(can);
  }

  // Long Mag Boom (+X) + Scan Platform arm (-X/back)
  const magBoom = makeTrussBoom(2.55, 0.11, mats.brushedSilver);
  magBoom.position.set(0.75, 0.28, 0);
  magBoom.rotation.z = 0.12;
  scanG.add(magBoom);

  const scanBoom = makeTrussBoom(1.55, 0.13, mats.brushedSilver);
  scanBoom.position.set(-0.55, 0.35, -0.45);
  scanBoom.rotation.y = Math.PI - 0.5;
  scanBoom.rotation.z = -0.25;
  scanG.add(scanBoom);

  const camHead = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.26, 0.28), mats.matteBlack);
  camHead.position.set(-1.8, 0.72, -1.1);
  scanG.add(camHead);
  const camLens = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.18, 12), mats.brushedSilver);
  camLens.rotation.x = Math.PI / 2;
  camLens.position.set(-1.8, 0.72, -1.26);
  scanG.add(camLens);

  return {
    'voyager-dish': dishG,
    'golden-record': recordG,
    'voyager-bus': busG,
    'voyager-rtg': rtgG,
    'voyager-scan-boom': scanG,
  };
}

function buildCassini(mats: MaterialBank): Record<string, THREE.Group> {
  const dishG = new THREE.Group();
  const huygensG = new THREE.Group();
  const coreG = new THREE.Group();
  const enginesG = new THREE.Group();
  const boomG = new THREE.Group();

  // Golden high-gain top dish
  const dish = makeDish(1.38, 0.36, mats.goldDish);
  dish.position.y = 1.05;
  dishG.add(dish);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    dishG.add(
      makeStrut(
        new THREE.Vector3(Math.cos(a) * 1.0, 1.25, Math.sin(a) * 1.0),
        new THREE.Vector3(0, 1.88, 0),
        0.02,
        mats.brushedSilver
      )
    );
  }

  // Tall gold & silver orbiter body
  const upperBus = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.9, 12), mats.brushedSilver);
  upperBus.position.y = 0.42;
  upperBus.castShadow = true;
  coreG.add(upperBus);

  const goldSkirt = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.6, 0.72, 12), mats.goldFoil);
  goldSkirt.position.y = -0.35;
  coreG.add(goldSkirt);

  // Side instrument pallet
  const pallet = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.58, 0.45), mats.darkCharcoal);
  pallet.position.set(-0.55, 0.15, 0.15);
  coreG.add(pallet);

  // Gold Huygens Probe on side
  const huygens = new THREE.Mesh(
    new THREE.ConeGeometry(0.58, 0.32, 24),
    mats.goldFoil
  );
  huygens.rotation.x = Math.PI / 2;
  huygens.position.set(0.5, 0.25, 0.55);
  huygens.rotation.z = -0.45;
  huygens.castShadow = true;
  huygensG.add(huygens);

  const huygensBack = new THREE.Mesh(
    new THREE.CylinderGeometry(0.56, 0.35, 0.18, 24),
    mats.copperFoil
  );
  huygensBack.rotation.x = Math.PI / 2;
  huygensBack.position.set(0.44, 0.25, 0.42);
  huygensBack.rotation.z = -0.45;
  huygensG.add(huygensBack);

  // Twin Main Rocket Engines underneath
  for (const sx of [-0.24, 0.24]) {
    const bellPts = [
      new THREE.Vector2(0.1, 0),
      new THREE.Vector2(0.15, -0.22),
      new THREE.Vector2(0.24, -0.46),
    ];
    const nozzle = new THREE.Mesh(new THREE.LatheGeometry(bellPts, 20), mats.darkCharcoal);
    nozzle.position.set(sx, -0.72, 0);
    enginesG.add(nozzle);
  }
  const shroud = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.42, 0.25, 12), mats.brushedSilver);
  shroud.position.y = -0.78;
  enginesG.add(shroud);

  // Long Magnetometer boom
  const magBoom = makeTrussBoom(2.35, 0.09, mats.brushedSilver);
  magBoom.position.set(-0.5, -0.1, -0.1);
  magBoom.rotation.y = Math.PI;
  magBoom.rotation.z = -0.58;
  boomG.add(magBoom);
  const tip = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.12), mats.goldFoil);
  tip.position.set(-2.45, -1.35, -0.1);
  boomG.add(tip);

  return {
    'cassini-dish': dishG,
    'huygens-probe': huygensG,
    'cassini-core': coreG,
    'cassini-engines': enginesG,
    'cassini-boom': boomG,
  };
}

function buildMER(mats: MaterialBank, isOpportunity: boolean): Record<string, THREE.Group> {
  const mastG = new THREE.Group();
  const solarG = new THREE.Group();
  const bodyG = new THREE.Group();
  const wheelsG = new THREE.Group();
  const armG = new THREE.Group();

  const deckMat = isOpportunity ? mats.solarDusty : mats.solarBlue;
  const foilMat = isOpportunity ? mats.copperFoil : mats.goldFoil;
  const strutMat = isOpportunity ? mats.titanium : mats.brushedSilver;

  // Warm Electronics Box (WEB)
  const web = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.56, 1.35), foilMat);
  web.position.y = -0.1;
  web.castShadow = true;
  bodyG.add(web);

  const whiteTrim = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.16, 1.38), mats.whitePaint);
  whiteTrim.position.y = 0.08;
  bodyG.add(whiteTrim);

  // Triangular Solar Wings on top deck
  const centerDeck = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.05, 1.45), deckMat);
  centerDeck.position.y = 0.22;
  centerDeck.castShadow = true;
  solarG.add(centerDeck);

  for (const sx of [-1, 1]) {
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.04, 1.3), deckMat);
    wing.position.set(sx * 1.08, 0.26, -0.05);
    wing.rotation.z = sx * -0.08;
    wing.castShadow = true;
    solarG.add(wing);
  }

  // Tall Pancam Mast + Stereo Head
  const mast = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.08, 1.32, 12),
    isOpportunity ? mats.tanAwning : mats.whitePaint
  );
  mast.position.set(0.08, 0.88, 0.35);
  mast.castShadow = true;
  mastG.add(mast);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.18, 0.24), mats.whitePaint);
  head.position.set(0.08, 1.56, 0.38);
  head.castShadow = true;
  mastG.add(head);

  for (const sx of [-0.2, 0.2]) {
    const eye = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.12, 12), mats.matteBlack);
    eye.rotation.x = Math.PI / 2;
    eye.position.set(0.08 + sx, 1.56, 0.5);
    mastG.add(eye);
  }

  // Front Robotic Arm + Turret + Antennas
  const armShoulder = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.16, 10), mats.darkCharcoal);
  armShoulder.position.set(-0.35, 0.05, 0.72);
  armG.add(armShoulder);

  const p0 = new THREE.Vector3(-0.35, 0.05, 0.72);
  const p1 = new THREE.Vector3(-0.65, -0.25, 1.25);
  const p2 = new THREE.Vector3(-0.45, -0.38, 1.75);
  armG.add(makeStrut(p0, p1, 0.036, strutMat));
  armG.add(makeStrut(p1, p2, 0.032, strutMat));

  const turret = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.26, 0.28), mats.darkCharcoal);
  turret.position.copy(p2);
  armG.add(turret);

  // Rear HGA dish & stick antenna
  const hga = makeDish(0.24, 0.08, mats.whitePaint);
  hga.position.set(-0.28, 0.45, -0.35);
  hga.rotation.x = 0.4;
  armG.add(hga);
  const lga = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.65, 8), mats.brushedSilver);
  lga.position.set(0.32, 0.56, -0.42);
  armG.add(lga);

  // 6 Rocker-Bogie Wheels
  const wheelX = [-0.95, 0.95];
  const wheelZ = [-0.75, 0, 0.75];
  for (const sx of wheelX) {
    for (const sz of wheelZ) {
      const w = makeRoverWheel(0.28, 0.2, mats, isOpportunity);
      w.position.set(sx, -0.78, sz);
      wheelsG.add(w);
      wheelsG.add(
        makeStrut(
          new THREE.Vector3(sx * 0.58, -0.2, sz * 0.45),
          new THREE.Vector3(sx, -0.78, sz),
          0.03,
          strutMat
        )
      );
    }
  }

  if (isOpportunity) {
    return {
      'oppy-mast': mastG,
      'oppy-solar': solarG,
      'oppy-arm': armG,
      'oppy-body': bodyG,
      'oppy-wheels': wheelsG,
    };
  }
  return {
    'spirit-mast': mastG,
    'spirit-solar': solarG,
    'spirit-body': bodyG,
    'spirit-wheels': wheelsG,
    'spirit-arm-comms': armG,
  };
}

function buildNewHorizons(mats: MaterialBank): Record<string, THREE.Group> {
  const dishG = new THREE.Group();
  const bodyG = new THREE.Group();
  const lorriG = new THREE.Group();
  const rtgG = new THREE.Group();
  const swapG = new THREE.Group();

  // Giant white 2.1m Dish
  const dish = makeDish(1.38, 0.34, mats.whitePaint);
  dish.position.set(0, 0.52, 0);
  dishG.add(dish);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    dishG.add(
      makeStrut(
        new THREE.Vector3(Math.cos(a) * 0.95, 0.72, Math.sin(a) * 0.95),
        new THREE.Vector3(0, 1.38, 0),
        0.02,
        mats.brushedSilver
      )
    );
  }

  // Triangular Gold Grand-Piano Hull
  const hull = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 0.95, 0.58, 3), mats.goldFoil);
  hull.position.set(0, 0.08, 0);
  hull.rotation.y = Math.PI / 6;
  hull.castShadow = true;
  bodyG.add(hull);

  // LORRI Telescope sticking out front
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.75, 18), mats.matteBlack);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0.35, 0.06, 0.92);
  lorriG.add(barrel);
  const lorriGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.04, 16), mats.lensGlass);
  lorriGlass.rotation.x = Math.PI / 2;
  lorriGlass.position.set(0.35, 0.06, 1.29);
  lorriG.add(lorriGlass);

  // Black finned RTG cylinder angled back-left
  const rtg = makeFinnedRtg(0.24, 0.98, mats.matteBlack, mats.darkCharcoal);
  rtg.position.set(-1.15, 0.02, -0.35);
  rtg.rotation.z = Math.PI / 2 - 0.15;
  rtgG.add(rtg);

  // SWAP + Dust boxes on sides/belly
  const swap = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.26, 0.34), mats.darkCharcoal);
  swap.position.set(-0.35, -0.15, 0.72);
  swapG.add(swap);
  const dust = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.1, 0.42), mats.brushedSilver);
  dust.position.set(0.05, -0.28, 0.1);
  swapG.add(dust);

  return {
    'nh-dish': dishG,
    'nh-body': bodyG,
    'nh-lorri': lorriG,
    'nh-rtg': rtgG,
    'nh-swap': swapG,
  };
}

function buildPhoenix(mats: MaterialBank): Record<string, THREE.Group> {
  const solarG = new THREE.Group();
  const armG = new THREE.Group();
  const mastsG = new THREE.Group();
  const deckG = new THREE.Group();
  const legsG = new THREE.Group();

  // Octagonal Gold Foil Lander Body
  const oct = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 0.46, 8), mats.goldFoil);
  oct.position.y = -0.1;
  oct.castShadow = true;
  deckG.add(oct);
  const topLid = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 0.06, 8), mats.darkCharcoal);
  topLid.position.y = 0.15;
  deckG.add(topLid);

  // Twin Fan Solar Wings
  for (const sx of [-1.72, 1.72]) {
    const fan = makeFanSolarWing(0.84, mats, false);
    fan.position.set(sx, 0.06, 0);
    solarG.add(fan);
    solarG.add(
      makeStrut(
        new THREE.Vector3(sx > 0 ? 0.85 : -0.85, 0.06, 0),
        new THREE.Vector3(sx, 0.06, 0),
        0.03,
        mats.brushedSilver
      )
    );
  }

  // MET Weather Pole & SSI Camera Mast
  const metPole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 1.15, 10), mats.whitePaint);
  metPole.position.set(-0.48, 0.72, 0.25);
  mastsG.add(metPole);
  const metHead = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.18), mats.whitePaint);
  metHead.position.set(-0.48, 1.28, 0.25);
  mastsG.add(metHead);

  const ssiMast = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.88, 10), mats.whitePaint);
  ssiMast.position.set(0.05, 0.58, -0.2);
  mastsG.add(ssiMast);
  const ssiHead = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.2, 0.22), mats.tanAwning);
  ssiHead.position.set(0.05, 1.04, -0.2);
  mastsG.add(ssiHead);

  // Robotic Digging Arm + ISAD Scoop
  const a0 = new THREE.Vector3(0.45, 0.22, 0.35);
  const a1 = new THREE.Vector3(0.88, 0.86, 0.52);
  const a2 = new THREE.Vector3(1.38, -0.24, 0.85);
  armG.add(makeStrut(a0, a1, 0.042, mats.whitePaint));
  armG.add(makeStrut(a1, a2, 0.036, mats.whitePaint));
  const joint = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 12), mats.darkCharcoal);
  joint.position.copy(a1);
  armG.add(joint);
  const scoop = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.32), mats.brushedSilver);
  scoop.position.copy(a2);
  scoop.rotation.x = 0.4;
  armG.add(scoop);

  // 4 Landing Legs & Footpads
  for (let i = 0; i < 4; i++) {
    const ang = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const topP = new THREE.Vector3(Math.cos(ang) * 0.78, -0.22, Math.sin(ang) * 0.78);
    const footP = new THREE.Vector3(Math.cos(ang) * 1.25, -0.98, Math.sin(ang) * 1.25);
    legsG.add(makeStrut(topP, footP, 0.038, mats.brushedSilver));
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.05, 16), mats.brushedSilver);
    pad.position.copy(footP);
    legsG.add(pad);
  }

  return {
    'phoenix-solar': solarG,
    'phoenix-arm': armG,
    'phoenix-masts': mastsG,
    'phoenix-deck': deckG,
    'phoenix-legs': legsG,
  };
}

function buildLRO(mats: MaterialBank): Record<string, THREE.Group> {
  const hgaG = new THREE.Group();
  const solarG = new THREE.Group();
  const busG = new THREE.Group();
  const lrocG = new THREE.Group();
  const lolaG = new THREE.Group();

  // Gold Kapton Cube Bus + radiators
  const cube = new THREE.Mesh(new THREE.BoxGeometry(1.18, 1.15, 1.18), mats.goldFoil);
  cube.position.y = 0.15;
  cube.castShadow = true;
  busG.add(cube);

  const rad1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.72, 0.85), mats.brushedSilver);
  rad1.position.set(0.62, 0.18, 0);
  busG.add(rad1);

  // Gold HGA Dish on articulated boom left
  hgaG.add(
    makeStrut(
      new THREE.Vector3(-0.55, 0.55, 0.1),
      new THREE.Vector3(-1.35, 1.05, 0.25),
      0.036,
      mats.brushedSilver
    )
  );
  const dish = makeDish(0.68, 0.2, mats.goldDish);
  dish.position.set(-1.45, 1.15, 0.28);
  dish.rotation.z = 0.75;
  hgaG.add(dish);

  // Blue 3-Panel Solar Wing right
  const wing = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.04, 0.95), mats.solarBlue);
  wing.position.set(1.88, 0.55, 0);
  wing.rotation.z = 0.34;
  wing.rotation.x = 0.35;
  wing.castShadow = true;
  solarG.add(wing);
  solarG.add(
    makeStrut(
      new THREE.Vector3(0.58, 0.25, 0),
      new THREE.Vector3(0.85, 0.34, 0),
      0.04,
      mats.brushedSilver
    )
  );

  // Bottom LROC Zoom Cameras
  const lrocBox = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.26, 0.42), mats.matteBlack);
  lrocBox.position.set(-0.32, -0.52, 0.24);
  lrocG.add(lrocBox);
  for (const sx of [-0.1, 0.1]) {
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.075, 0.24, 14), mats.darkCharcoal);
    tube.position.set(-0.32 + sx, -0.68, 0.26);
    lrocG.add(tube);
  }

  // Bottom LOLA Laser + LEND/Diviner cluster
  const lolaBox = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.28, 0.56), mats.brushedSilver);
  lolaBox.position.set(0.28, -0.52, -0.1);
  lolaG.add(lolaBox);
  for (const sx of [-0.12, 0.12]) {
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.22, 12), mats.goldFoil);
    barrel.position.set(0.28 + sx, -0.68, -0.1);
    lolaG.add(barrel);
  }

  return {
    'lro-hga': hgaG,
    'lro-solar': solarG,
    'lro-bus': busG,
    'lro-lroc': lrocG,
    'lro-lola-ice': lolaG,
  };
}

function buildLargeMarsRover(
  mats: MaterialBank,
  includeIngenuity: boolean
): Record<string, THREE.Group> {
  const headG = new THREE.Group();
  const armG = new THREE.Group();
  const rtgOrBodyG = new THREE.Group();
  const bodyG = new THREE.Group();
  const wheelsG = new THREE.Group();

  // White SUV Rover Chassis
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.62, 1.85), mats.whitePaint);
  chassis.position.set(0, -0.02, 0);
  chassis.castShadow = true;
  bodyG.add(chassis);

  const deck = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.08, 1.9), mats.darkCharcoal);
  deck.position.set(0, 0.3, 0);
  bodyG.add(deck);

  // Rear angled MMRTG Nuclear Battery
  const rtgParent = includeIngenuity ? bodyG : rtgOrBodyG;
  const rtg = makeFinnedRtg(0.22, 0.78, mats.whitePaint, mats.titanium);
  rtg.position.set(0, 0.38, -1.06);
  rtg.rotation.x = -0.62;
  rtgParent.add(rtg);

  // Tall Mast + ChemCam/SuperCam Cyclops Head
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.085, 1.25, 12), mats.whitePaint);
  mast.position.set(0.18, 0.9, 0.55);
  mast.castShadow = true;
  headG.add(mast);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.32, 0.42), mats.whitePaint);
  head.position.set(0.18, 1.62, 0.58);
  head.castShadow = true;
  headG.add(head);

  const cyclops = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.1, 16), mats.amberSensor);
  cyclops.rotation.x = Math.PI / 2;
  cyclops.position.set(0.28, 1.64, 0.8);
  headG.add(cyclops);
  for (const sx of [-0.14, 0.02]) {
    const cam = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.08), mats.matteBlack);
    cam.position.set(0.18 + sx, 1.54, 0.8);
    headG.add(cam);
  }

  // Heavy 7-Foot Robotic Arm & Coring Turret
  const j0 = new THREE.Vector3(-0.32, 0.02, 0.95);
  const j1 = new THREE.Vector3(-0.62, 0.32, 1.48);
  const j2 = new THREE.Vector3(-0.45, -0.22, 1.98);
  armG.add(makeStrut(j0, j1, 0.045, mats.whitePaint));
  armG.add(makeStrut(j1, j2, 0.042, mats.whitePaint));
  const turret = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.28, 12), mats.darkCharcoal);
  turret.rotation.z = Math.PI / 2;
  turret.position.copy(j2);
  armG.add(turret);
  const drillBit = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.32, 10), mats.brushedSilver);
  drillBit.rotation.x = Math.PI / 2;
  drillBit.position.set(-0.45, -0.22, 2.24);
  armG.add(drillBit);

  // 6 Titanium Rocker-Bogie Wheels
  for (const sx of [-1.05, 1.05]) {
    for (const sz of [-0.95, 0, 0.95]) {
      const w = makeRoverWheel(0.32, 0.25, mats, false);
      w.position.set(sx, -0.78, sz);
      wheelsG.add(w);
      wheelsG.add(
        makeStrut(
          new THREE.Vector3(sx * 0.6, -0.1, sz * 0.5),
          new THREE.Vector3(sx, -0.78, sz),
          0.036,
          mats.titanium
        )
      );
    }
  }

  if (includeIngenuity) {
    // Build Ingenuity Mars Helicopter standing cleanly beside Percy!
    const copter = rtgOrBodyG;
    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.24, 0.28), mats.goldFoil);
    cube.position.set(1.75, -0.68, 0.72);
    cube.castShadow = true;
    copter.add(cube);

    const mastC = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.38, 8), mats.matteBlack);
    mastC.position.set(1.75, -0.4, 0.72);
    copter.add(mastC);

    const topSolar = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.02, 0.18), mats.solarBlue);
    topSolar.position.set(1.75, -0.18, 0.72);
    copter.add(topSolar);

    for (const [ry, rot] of [
      [-0.32, 0.35],
      [-0.24, -0.8],
    ]) {
      const rotor = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.015, 0.09), mats.matteBlack);
      rotor.position.set(1.75, ry, 0.72);
      rotor.rotation.y = rot;
      copter.add(rotor);
    }
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      copter.add(
        makeStrut(
          new THREE.Vector3(1.75 + Math.cos(a) * 0.1, -0.75, 0.72 + Math.sin(a) * 0.1),
          new THREE.Vector3(1.75 + Math.cos(a) * 0.42, -1.08, 0.72 + Math.sin(a) * 0.42),
          0.014,
          mats.matteBlack
        )
      );
    }

    return {
      'ingenuity-copter': copter,
      'percy-head': headG,
      'percy-arm': armG,
      'percy-body-moxie': bodyG,
      'percy-wheels': wheelsG,
    };
  }

  return {
    'curiosity-head': headG,
    'curiosity-arm': armG,
    'curiosity-rtg': rtgOrBodyG,
    'curiosity-chassis': bodyG,
    'curiosity-wheels': wheelsG,
  };
}

function buildInSight(mats: MaterialBank): Record<string, THREE.Group> {
  const solarG = new THREE.Group();
  const seisG = new THREE.Group();
  const armG = new THREE.Group();
  const bodyG = new THREE.Group();
  const moleG = new THREE.Group();

  // Copper-Gold Octagon Lander Body + 3 Tripod Legs
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.42, 8), mats.copperFoil);
  body.position.y = 0.05;
  body.castShadow = true;
  bodyG.add(body);
  const topDeck = new THREE.Mesh(new THREE.CylinderGeometry(0.96, 0.96, 0.06, 8), mats.darkCharcoal);
  topDeck.position.y = 0.27;
  bodyG.add(topDeck);

  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
    const tP = new THREE.Vector3(Math.cos(a) * 0.76, -0.05, Math.sin(a) * 0.76);
    const fP = new THREE.Vector3(Math.cos(a) * 1.28, -0.92, Math.sin(a) * 1.28);
    bodyG.add(makeStrut(tP, fP, 0.042, mats.brushedSilver));
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.05, 14), mats.brushedSilver);
    pad.position.copy(fP);
    bodyG.add(pad);
  }

  // Twin giant circular solar wings
  for (const sx of [-1.85, 1.85]) {
    const fan = makeFanSolarWing(0.94, mats, false);
    fan.position.set(sx, 0.24, 0);
    solarG.add(fan);
    solarG.add(
      makeStrut(
        new THREE.Vector3(sx > 0 ? 0.88 : -0.88, 0.24, 0),
        new THREE.Vector3(sx, 0.24, 0),
        0.03,
        mats.brushedSilver
      )
    );
  }

  // Crane Arm placing instruments
  const p0 = new THREE.Vector3(0.55, 0.32, 0.35);
  const p1 = new THREE.Vector3(1.15, 0.65, 0.72);
  const p2 = new THREE.Vector3(1.38, -0.25, 1.05);
  armG.add(makeStrut(p0, p1, 0.036, mats.whitePaint));
  armG.add(makeStrut(p1, p2, 0.032, mats.whitePaint));
  const claw = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.14, 8), mats.copperFoil);
  claw.position.copy(p2);
  armG.add(claw);

  // SEIS Dome Seismometer on ground
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.55),
    mats.brushedSilver
  );
  dome.position.set(1.25, -0.78, 1.05);
  dome.castShadow = true;
  seisG.add(dome);
  const domeBase = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.37, 0.08, 18), mats.copperFoil);
  domeBase.position.set(1.25, -0.82, 1.05);
  seisG.add(domeBase);

  // HP3 Heat Probe box + Twin Small RISE Dishes on deck
  const moleBox = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.24, 0.28), mats.copperFoil);
  moleBox.position.set(1.88, -0.78, 0.68);
  moleG.add(moleBox);
  for (const sx of [-0.42, 0.42]) {
    const rDish = makeDish(0.18, 0.08, mats.whitePaint);
    rDish.position.set(sx, 0.44, -0.25);
    rDish.rotation.x = 0.5;
    moleG.add(rDish);
  }
  const wMast = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.85, 8), mats.brushedSilver);
  wMast.position.set(-0.35, 0.72, 0.15);
  moleG.add(wMast);

  return {
    'insight-solar': solarG,
    'insight-seis': seisG,
    'insight-arm': armG,
    'insight-body': bodyG,
    'insight-mole': moleG,
  };
}

// =========================================================================
// PUBLIC BUILDER + DISPOSAL
// =========================================================================

export function buildPlaygroundMissionModel(
  missionId: string,
  maxAnisotropy: number,
  isSoftwareGl: boolean
): BuiltPlaygroundModel {
  const spec =
    PLAYGROUND_MISSIONS.find((m) => m.id === missionId) || PLAYGROUND_MISSIONS[0];
  const mats = createMaterialBank(maxAnisotropy, isSoftwareGl);

  let groupMap: Record<string, THREE.Group>;
  switch (spec.id) {
    case 'apollo-landing-hardware':
      groupMap = buildApolloLM(mats);
      break;
    case 'alsep-stations':
      groupMap = buildAlsep(mats);
      break;
    case 'pioneer-10-11':
      groupMap = buildPioneer(mats);
      break;
    case 'voyager-1':
      groupMap = buildVoyager(mats);
      break;
    case 'cassini-orbiter':
      groupMap = buildCassini(mats);
      break;
    case 'spirit-rover':
      groupMap = buildMER(mats, false);
      break;
    case 'opportunity-rover':
      groupMap = buildMER(mats, true);
      break;
    case 'new-horizons':
      groupMap = buildNewHorizons(mats);
      break;
    case 'phoenix-lander':
      groupMap = buildPhoenix(mats);
      break;
    case 'lro-orbiter':
      groupMap = buildLRO(mats);
      break;
    case 'curiosity-rover':
      groupMap = buildLargeMarsRover(mats, false);
      break;
    case 'insight-lander':
      groupMap = buildInSight(mats);
      break;
    case 'perseverance-rover':
    default:
      groupMap = buildLargeMarsRover(mats, true);
      break;
  }

  const root = new THREE.Group();
  root.userData.__materials = mats.allMaterials;
  root.userData.__textures = mats.allTextures;

  const box = new THREE.Box3();
  const parts: BuiltPartEntry[] = spec.parts.map((partSpec, idx) => {
    const group = groupMap[partSpec.id] || new THREE.Group();
    group.name = partSpec.id;
    group.userData.partId = partSpec.id;

    // Clone materials per-part group so highlight emissive changes on one component never bleed onto others
    group.traverse((obj) => {
      obj.userData.partId = partSpec.id;
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const origMat = mesh.material as THREE.MeshStandardMaterial;
        const cloned = origMat.clone();
        cloned.userData.__baseEmissive = cloned.emissive.clone();
        cloned.userData.__baseEmissiveIntensity = cloned.emissiveIntensity;
        mesh.material = cloned;
        mats.allMaterials.push(cloned);
      }
    });

    box.setFromObject(group);
    const localCenter = box.isEmpty()
      ? new THREE.Vector3()
      : box.getCenter(new THREE.Vector3());

    root.add(group);

    return {
      partId: partSpec.id,
      group,
      localCenter,
      explodeOffset: new THREE.Vector3(...partSpec.explodeOffset),
      labelOffset: new THREE.Vector3(...partSpec.labelOffset),
      phase: idx * 1.25,
    };
  });

  return { root, parts };
}

export function disposeBuiltPlaygroundModel(root: THREE.Group | null): void {
  if (!root) return;
  root.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      (obj as THREE.Mesh).geometry.dispose();
    }
  });
  const materials = root.userData.__materials as THREE.Material[] | undefined;
  if (materials) {
    materials.forEach((m) => m.dispose());
  }
  const textures = root.userData.__textures as THREE.Texture[] | undefined;
  if (textures) {
    textures.forEach((t) => t.dispose());
  }
}
