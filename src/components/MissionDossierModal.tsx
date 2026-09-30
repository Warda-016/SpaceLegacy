import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { AgeTrack, MissionHardware } from '../data/missions';
import { getMissionStoryChapters } from '../data/storyChapters';
import { stopLoudNarration } from '../utils/loudStoryAudio';
import { AlsepScrollStory } from './AlsepScrollStory';
import { ApolloLandingScrollStory } from './ApolloLandingScrollStory';
import { CassiniScrollStory } from './CassiniScrollStory';
import { CuriosityScrollStory } from './CuriosityScrollStory';
import { InSightScrollStory } from './InSightScrollStory';
import { LroScrollStory } from './LroScrollStory';
import { NewHorizonsScrollStory } from './NewHorizonsScrollStory';
import { OpportunityScrollStory } from './OpportunityScrollStory';
import { PerseveranceScrollStory } from './PerseveranceScrollStory';
import { PhoenixScrollStory } from './PhoenixScrollStory';
import { PioneerScrollStory } from './PioneerScrollStory';
import { SpiritScrollStory } from './SpiritScrollStory';
import { VoyagerScrollStory } from './VoyagerScrollStory';

export type DossierTabMode = 'story' | 'quiz';

interface MissionDossierModalProps {
  mission: MissionHardware | null;
  initialMode?: DossierTabMode;
  ageTrack: AgeTrack;
  onPerfectQuizScore: (missionId: string) => void;
  onAllPartsInspected?: (missionId: string) => void;
  onOpenGlossaryTerm?: (term: string) => void;
  onClose: () => void;
}

export const MissionDossierModal: React.FC<MissionDossierModalProps> = ({
  mission,
  initialMode = 'story',
  onPerfectQuizScore,
  onOpenGlossaryTerm,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<DossierTabMode>(
    initialMode === 'quiz' ? 'quiz' : 'story'
  );
  const [chapterQuizAnswers, setChapterQuizAnswers] = useState<
    Record<number, number>
  >({});

  // 5th Question state
  const [masterQuizAnswer, setMasterQuizAnswer] = useState<number | null>(null);
  const [hasAwardedPerfect, setHasAwardedPerfect] = useState<boolean>(false);

  useEffect(() => {
    stopLoudNarration();
    setActiveTab(initialMode === 'quiz' ? 'quiz' : 'story');
    setChapterQuizAnswers({});
    setMasterQuizAnswer(null);
    setHasAwardedPerfect(false);
  }, [mission?.id, initialMode]);

  useEffect(() => {
    return () => {
      stopLoudNarration();
    };
  }, []);

  if (!mission) return null;

  const chapters = getMissionStoryChapters(mission.id, mission);

  const sectorTrackLabel =
    mission.destination === 'moon'
      ? 'Moon'
      : mission.destination === 'mars'
      ? 'Mars'
      : 'Deep Space';

  // Calculate score across all 5 questions (4 chapter questions + 1 final question)
  const totalQuestions = chapters.length + 1;
  const correctChapterCount = chapters.reduce((acc, chap, idx) => {
    return (
      acc + (chapterQuizAnswers[idx] === chap.quiz.correctIndex ? 1 : 0)
    );
  }, 0);
  const isFinalQuestionCorrect =
    masterQuizAnswer === mission.quizQuestion.correctIndex;
  const totalCorrect =
    correctChapterCount + (isFinalQuestionCorrect ? 1 : 0);
  const scorePercentage = Math.round((totalCorrect / totalQuestions) * 100);
  const isPerfectScore = totalCorrect === totalQuestions;

  const checkAndAwardPerfectScore = (
    nextChapterAnswers: Record<number, number>,
    nextMasterAnswer: number | null
  ) => {
    if (hasAwardedPerfect) return;
    const allChaptersRight = chapters.every(
      (chap, idx) => nextChapterAnswers[idx] === chap.quiz.correctIndex
    );
    const finalRight = nextMasterAnswer === mission.quizQuestion.correctIndex;
    if (allChaptersRight && finalRight) {
      setHasAwardedPerfect(true);
      onPerfectQuizScore(mission.id);
    }
  };

  const handleChapterQuizSelect = (cIdx: number, optionIdx: number) => {
    const nextAnswers = {
      ...chapterQuizAnswers,
      [cIdx]: optionIdx,
    };
    setChapterQuizAnswers(nextAnswers);
    checkAndAwardPerfectScore(nextAnswers, masterQuizAnswer);
  };

  const handleMasterQuizSelect = (idx: number) => {
    setMasterQuizAnswer(idx);
    checkAndAwardPerfectScore(chapterQuizAnswers, idx);
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#060814]/90 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-modal-title"
    >
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-[#0b1026] border border-sky-400/30 shadow-[0_24px_90px_rgba(0,0,0,0.9)] p-4 sm:p-6 md:p-8 space-y-5 antialiased">
        {/* Top Hero Banner */}
        <div className="relative min-h-[12rem] sm:min-h-[14rem] w-full rounded-2xl overflow-hidden bg-[#060814] border border-white/10 flex flex-col justify-between p-3.5 sm:p-5">
          <img
            src={mission.imageUrl}
            alt={mission.imageAlt}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-75 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1026] via-[#0b1026]/70 to-[#060814]/50 pointer-events-none" />

          {/* Top Bar: Order Number Badge + Close Button */}
          <div className="relative z-10 flex items-start justify-between gap-2 w-full">
            <div className="flex flex-wrap items-center gap-1.5 min-w-0 pr-2">
              <span className="px-2.5 py-1 rounded-full bg-[#060814]/85 backdrop-blur-md border border-sky-400/40 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-sky-300 font-bold">
                #{mission.orderNumber}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#060814]/90 border border-white/20 flex items-center justify-center text-white hover:bg-sky-400 hover:text-[#060814] transition-colors cursor-pointer shrink-0"
              aria-label="Close Mission Dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Overlay Title */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 pt-6">
            <div className="min-w-0">
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] text-sky-300 break-words">
                {mission.launchText}
              </p>
              <h2
                id="dossier-modal-title"
                className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight break-words"
              >
                {mission.title}
              </h2>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-400/15 border border-sky-400/35 text-sky-200 font-mono text-xs self-start sm:self-auto shrink-0 max-w-full">
              <span>{mission.badge.emoji}</span>
              <span className="truncate">Sector Track: {sectorTrackLabel}</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: STORY                                              */}
        {/* ========================================================= */}
        {activeTab === 'story' && (
          <div className="space-y-4 sm:space-y-5 w-full">
            {mission.id === 'perseverance-rover' ? (
              <PerseveranceScrollStory
                onStartQuiz={() => setActiveTab('quiz')}
              />
            ) : mission.id === 'insight-lander' ? (
              <InSightScrollStory
                onStartQuiz={() => setActiveTab('quiz')}
              />
            ) : mission.id === 'curiosity-rover' ? (
              <CuriosityScrollStory
                onStartQuiz={() => setActiveTab('quiz')}
              />
            ) : mission.id === 'lro-orbiter' ? (
              <LroScrollStory
                onStartQuiz={() => setActiveTab('quiz')}
              />
            ) : mission.id === 'phoenix-lander' ? (
              <PhoenixScrollStory
                onStartQuiz={() => setActiveTab('quiz')}
              />
            ) : mission.id === 'new-horizons' ? (
              <NewHorizonsScrollStory
                onStartQuiz={() => setActiveTab('quiz')}
              />
            ) : mission.id === 'opportunity-rover' ? (
              <OpportunityScrollStory
                onStartQuiz={() => setActiveTab('quiz')}
              />
            ) : mission.id === 'spirit-rover' ? (
              <SpiritScrollStory
                onStartQuiz={() => setActiveTab('quiz')}
              />
            ) : mission.id === 'cassini-orbiter' ? (
              <CassiniScrollStory
                onStartQuiz={() => setActiveTab('quiz')}
              />
            ) : mission.id === 'voyager-1-2' ? (
              <VoyagerScrollStory
                onStartQuiz={() => setActiveTab('quiz')}
              />
            ) : mission.id === 'pioneer-10-11' ? (
              <PioneerScrollStory
                onStartQuiz={() => setActiveTab('quiz')}
              />
            ) : mission.id === 'alsep-stations' ? (
              <AlsepScrollStory
                onStartQuiz={() => setActiveTab('quiz')}
              />
            ) : (
              <ApolloLandingScrollStory
                onStartQuiz={() => setActiveTab('quiz')}
              />
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: COSMIC QUIZ (5 QUESTIONS TOTAL FOR 100% SCORE)     */}
        {/* ========================================================= */}
        {activeTab === 'quiz' && (
          <div className="space-y-4 sm:space-y-5 w-full">
            {/* Top Banner: Score 100% to Unlock the “Cosmic Genius” Badge! */}
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#131b3a] to-[#0b1026] border-2 border-emerald-400/40 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 w-full">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-2xl shrink-0">
                  🧠
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-emerald-300 font-bold block">
                    Quiz Challenge • +300 XP
                  </span>
                  <h3 className="font-headline text-base sm:text-xl font-bold text-white break-words">
                    Score 100% to Unlock the &ldquo;Cosmic Genius&rdquo; Badge!
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border font-mono text-xs font-bold ${
                    isPerfectScore
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                      : 'bg-white/5 border-white/15 text-sky-300'
                  }`}
                >
                  {isPerfectScore && <ShieldCheck className="w-4 h-4" />}
                  <span>
                    Score: {totalCorrect}/{totalQuestions} ({scorePercentage}%)
                  </span>
                </span>
              </div>
            </div>

            {/* Telemetry Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              {mission.telemetry.map((metric) => (
                <div
                  key={metric.label}
                  onClick={() =>
                    onOpenGlossaryTerm && onOpenGlossaryTerm(metric.value)
                  }
                  className="rounded-2xl bg-[#111733] border border-white/10 hover:border-sky-400/50 p-4 cursor-pointer transition-colors min-w-0"
                  title="Click to define in Cosmic Dictionary"
                >
                  <span className="block font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 mb-1">
                    {metric.label}
                  </span>
                  <span className="font-headline text-lg sm:text-xl font-bold text-sky-300 break-words block">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Questions 1 to 4 (Chapter Questions) */}
            <div className="space-y-3.5 w-full">
              {chapters.map((chap, cIdx) => {
                const selectedOptIdx = chapterQuizAnswers[cIdx];
                return (
                  <div
                    key={chap.number}
                    className="rounded-2xl bg-[#0a0f24] border border-sky-400/35 p-3.5 sm:p-5 space-y-3 w-full"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-sky-300 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                        <span>
                          Question {cIdx + 1} of {totalQuestions} • Chapter{' '}
                          {chap.number}
                        </span>
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base font-semibold text-white break-words">
                      {chap.quiz.question}
                    </p>
                    <div className="space-y-2">
                      {chap.quiz.options.map((opt, qIdx) => {
                        const isPicked = selectedOptIdx === qIdx;
                        const isRight = qIdx === chap.quiz.correctIndex;
                        return (
                          <button
                            key={qIdx}
                            type="button"
                            onClick={() => handleChapterQuizSelect(cIdx, qIdx)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm md:text-base font-medium transition-all cursor-pointer flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 ${
                              isPicked
                                ? isRight
                                  ? 'bg-emerald-500/20 border-emerald-400 text-white'
                                  : 'bg-amber-500/20 border-amber-400 text-white'
                                : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-sky-400/40'
                            }`}
                          >
                            <span className="break-words">{opt}</span>
                            {isPicked && (
                              <span className="font-mono text-[10px] sm:text-xs uppercase px-2 py-0.5 rounded bg-black/40 shrink-0">
                                {isRight ? '✓ Correct!' : 'Try Again!'}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {selectedOptIdx !== undefined && (
                      <div
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm md:text-base break-words ${
                          selectedOptIdx === chap.quiz.correctIndex
                            ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200'
                            : 'bg-amber-500/15 border-amber-400/40 text-amber-200'
                        }`}
                      >
                        {chap.quiz.playfulExplanations[selectedOptIdx]}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Question 5 of 5 */}
              <div className="rounded-2xl bg-[#0a0f24] border border-sky-400/35 p-3.5 sm:p-5 space-y-3 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-sky-300 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>
                      Question {totalQuestions} of {totalQuestions} • Final
                      Mission Question
                    </span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm md:text-base font-semibold text-white break-words">
                  {mission.quizQuestion.question}
                </p>

                <div className="space-y-2">
                  {mission.quizQuestion.options.map((opt, idx) => {
                    const isPicked = masterQuizAnswer === idx;
                    const isCorrect = idx === mission.quizQuestion.correctIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleMasterQuizSelect(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm md:text-base font-medium transition-all cursor-pointer flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 ${
                          isPicked
                            ? isCorrect
                              ? 'bg-emerald-500/20 border-emerald-400 text-white'
                              : 'bg-amber-500/20 border-amber-400 text-white'
                            : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-sky-400/40'
                        }`}
                      >
                        <span className="break-words">{opt}</span>
                        {isPicked && (
                          <span className="font-mono text-[10px] sm:text-xs uppercase px-2 py-0.5 rounded bg-black/40 shrink-0">
                            {isCorrect ? '✓ Correct!' : 'Try Again!'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {masterQuizAnswer !== null && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm md:text-base break-words ${
                      masterQuizAnswer === mission.quizQuestion.correctIndex
                        ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200'
                        : 'bg-amber-500/15 border-amber-400/40 text-amber-200'
                    }`}
                  >
                    {mission.quizQuestion.explanation}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
