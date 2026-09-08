import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, CheckCircle2, XCircle, Award, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONALIZATION } from '../../config/personalization';
import { GlassCard } from '../ui/GlassCard';
import { audioEngine } from '../../utils/audio';

export const Page7Quiz: React.FC = () => {
  const quiz = PERSONALIZATION.QUIZ;
  const questions = quiz.QUESTIONS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
      audioEngine.playSparkleSound();
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#c084fc', '#fbbf24'],
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setIsCompleted(false);
  };

  return (
    <section
      id="page-7"
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 py-20 z-10 text-center"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="max-w-xl mx-auto space-y-3 mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-pink text-pink-200 text-xs font-semibold border border-pink-400/30">
          <Gamepad2 className="w-3.5 h-3.5 text-pink-400" />
          <span>Interactive Mini-Game</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-magic text-gradient-pink">
          {quiz.TITLE}
        </h2>
        <p className="text-sm md:text-base text-pink-200/80 font-medium">
          {quiz.SUBTITLE}
        </p>
      </motion.div>

      {/* Quiz Card */}
      <div className="max-w-xl w-full mx-auto">
        <GlassCard variant="pink" className="border-pink-300/40 glow-pink relative">
          {!isCompleted ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 text-left"
              >
                {/* Progress Bar */}
                <div className="flex items-center justify-between text-xs font-semibold text-pink-300">
                  <span>Question {currentIndex + 1} of {questions.length}</span>
                  <span>Score: {score}</span>
                </div>
                <div className="w-full h-1.5 bg-pink-950/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-amber-400 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>

                {/* Question Text */}
                <h3 className="text-xl sm:text-2xl font-bold font-serif-magic text-pink-100 leading-snug">
                  {currentQ.question}
                </h3>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQ.correctIndex;

                    let optionBtnStyle = 'glass-panel border-pink-400/20 text-pink-100 hover:border-pink-300/60';
                    if (isAnswered) {
                      if (isCorrect) {
                        optionBtnStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-100 font-semibold';
                      } else if (isSelected) {
                        optionBtnStyle = 'bg-rose-500/20 border-rose-400 text-rose-100';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswered}
                        className={`w-full p-4 rounded-2xl border text-left text-sm md:text-base transition-all flex items-center justify-between gap-3 ${optionBtnStyle}`}
                      >
                        <span className="font-medium">{opt}</span>
                        {isAnswered && (
                          <span>
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            ) : isSelected ? (
                              <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                            ) : null}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation & Next Button */}
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-3 border-t border-pink-400/20 space-y-4"
                  >
                    <p className="text-xs sm:text-sm text-pink-200/90 italic bg-pink-500/10 p-3 rounded-xl border border-pink-400/20">
                      💡 {currentQ.explanation}
                    </p>
                    <button
                      onClick={handleNextQuestion}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-lg hover:shadow-pink-500/40 transition-all flex items-center justify-center gap-2"
                    >
                      <span>{currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results 🎉'}</span>
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            /* Quiz Completed View */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-4"
            >
              <div className="inline-flex p-4 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300">
                <Award className="w-12 h-12 text-yellow-300 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold font-serif-magic text-gradient-gold">
                  {quiz.SUCCESS_TITLE}
                </h3>
                <p className="text-lg md:text-xl font-medium text-pink-100">
                  You scored {score} / {questions.length}!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-400/30 text-sm md:text-base text-pink-200 leading-relaxed font-medium">
                "{quiz.SUCCESS_MESSAGE}"
              </div>

              <button
                onClick={handleRestartQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 font-semibold text-sm border border-pink-400/30 transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-pink-400" />
                <span>Play Quiz Again</span>
              </button>
            </motion.div>
          )}
        </GlassCard>
      </div>
    </section>
  );
};
