import React, { useEffect, useState } from 'react';
import { CheckCircle2, HelpCircle, Radio, Sparkles, X } from 'lucide-react';
import { DAILY_MYSTERY } from '../data/missions';
import { GlossaryText } from './CosmicGlossaryAssistant';

interface DailyMysteryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSolved: () => void;
  isAlreadySolved: boolean;
  onOpenGlossaryTerm?: (term: string) => void;
}

export const DailyMysteryModal: React.FC<DailyMysteryModalProps> = ({
  isOpen,
  onClose,
  onSolved,
  isAlreadySolved,
  onOpenGlossaryTerm,
}) => {
  const correctOptionIndex = DAILY_MYSTERY.options.findIndex(
    (opt) => opt.isCorrect
  );

  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    isAlreadySolved ? correctOptionIndex : null
  );

  useEffect(() => {
    if (isAlreadySolved && selectedIndex === null) {
      setSelectedIndex(correctOptionIndex);
    }
  }, [isAlreadySolved, correctOptionIndex, selectedIndex]);

  if (!isOpen) return null;

  const selectedOption =
    selectedIndex !== null ? DAILY_MYSTERY.options[selectedIndex] : null;
  const isCorrect = Boolean(selectedOption?.isCorrect);

  const handleChoose = (idx: number) => {
    setSelectedIndex(idx);
    const chosen = DAILY_MYSTERY.options[idx];
    if (chosen?.isCorrect && !isAlreadySolved) {
      onSolved();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-2.5 sm:p-4 bg-[#060814]/85 backdrop-blur-xl overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="daily-mystery-title"
    >
      <div className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-[#10132b] border border-sky-400/35 p-4 sm:p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.85)] space-y-4 sm:space-y-5 my-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
          aria-label="Close Daily Mystery Modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 text-amber-400 pr-10">
          <Radio className="w-5 h-5 animate-pulse shrink-0" />
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.15em]">
            Daily Mystery Signal • +150 XP
          </span>
        </div>

        <h3
          id="daily-mystery-title"
          className="font-headline text-xl sm:text-2xl font-bold text-white leading-snug break-words"
        >
          {DAILY_MYSTERY.title}
        </h3>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#070a1c] border border-sky-400/20 font-mono text-xs sm:text-sm text-sky-300 leading-relaxed break-words">
          {onOpenGlossaryTerm ? (
            <GlossaryText
              text={DAILY_MYSTERY.context}
              onSelectTerm={onOpenGlossaryTerm}
            />
          ) : (
            DAILY_MYSTERY.context
          )}
        </div>

        <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed break-words">
          {onOpenGlossaryTerm ? (
            <GlossaryText
              text={DAILY_MYSTERY.question}
              onSelectTerm={onOpenGlossaryTerm}
            />
          ) : (
            DAILY_MYSTERY.question
          )}
        </p>

        <div className="space-y-2.5">
          {DAILY_MYSTERY.options.map((option, idx) => {
            const isPicked = selectedIndex === idx;
            const isRightOption = option.isCorrect;

            let btnStyle =
              'bg-white/5 hover:bg-white/10 border-white/15 text-slate-100';
            if (isPicked) {
              btnStyle = isRightOption
                ? 'bg-emerald-500/20 border-emerald-400 text-white'
                : 'bg-rose-500/20 border-rose-400 text-white';
            }

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleChoose(idx)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 cursor-pointer ${btnStyle}`}
              >
                <div className="min-w-0 space-y-1">
                  <span className="font-headline text-xs sm:text-sm md:text-base font-medium block break-words">
                    {option.label}
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-sky-300/80 block break-words">
                    {option.telemetryRaw}
                  </span>
                </div>
                {isPicked && (
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/30 shrink-0">
                    {isRightOption ? 'Signal Decoded!' : 'Try Again'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {selectedIndex !== null && (
          <div
            className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
              isCorrect
                ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-100'
                : 'bg-amber-500/15 border-amber-400/40 text-amber-100'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <p className="font-bold uppercase font-mono tracking-wider">
                {isCorrect
                  ? 'Signal Decoded! "Signal Decoder" Badge Unlocked'
                  : 'Telemetry Hint'}
              </p>
              <p>
                {isCorrect
                  ? DAILY_MYSTERY.rewardNote
                  : 'Look closely at the raw telemetry packet: 22Wh means low battery power, and TAU_OPACITY 10.8 means the sky is getting very dark!'}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-[#060814] font-headline font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
