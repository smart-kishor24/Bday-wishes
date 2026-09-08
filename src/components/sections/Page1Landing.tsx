import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Star, Cake } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import { audioEngine } from '../../utils/audio';

interface Page1LandingProps {
  onOpenSurprise: () => void;
}

export const Page1Landing: React.FC<Page1LandingProps> = ({ onOpenSurprise }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const hero = PERSONALIZATION.HERO;

  useEffect(() => {
    // Reveal sequence timing
    const t1 = setTimeout(() => setStep(2), 1400);
    const t2 = setTimeout(() => {
      setStep(3);
      // Trigger initial light confetti burst on reveal!
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#c084fc', '#fbbf24', '#ffffff'],
      });
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleStart = () => {
    audioEngine.playSparkleSound();
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#ec4899', '#c084fc', '#fbbf24', '#60a5fa'],
    });
    onOpenSurprise();
  };

  return (
    <section
      id="page-1"
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 py-20 text-center z-10 overflow-hidden"
    >
      {/* Decorative Floating Background Ornaments */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 left-8 md:left-24 text-pink-300/40 pointer-events-none"
      >
        <Heart className="w-10 h-10 md:w-16 md:h-16 fill-pink-400/20" />
      </motion.div>
      <motion.div
        animate={{ y: [15, -15, 15], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-24 right-8 md:right-24 text-amber-300/40 pointer-events-none"
      >
        <Star className="w-8 h-8 md:w-14 md:h-14 fill-amber-300/20" />
      </motion.div>

      {/* Main Content Box */}
      <div className="max-w-3xl w-full flex flex-col items-center justify-center space-y-8">
        
        {/* Step 1: Greeting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel-pink border border-pink-400/30 text-pink-200 text-sm md:text-base font-semibold shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>{hero.GREETING}</span>
        </motion.div>

        {/* Step 2 & 3: Suspense -> Reveal Animated Message */}
        <div
          onClick={() => step < 3 && setStep(3)}
          className={`min-h-[140px] md:min-h-[180px] flex items-center justify-center ${
            step < 3 ? 'cursor-pointer' : ''
          }`}
          title={step < 3 ? 'Click to reveal now ✨' : undefined}
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.h2
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
                className="text-2xl sm:text-3xl md:text-4xl font-serif-magic text-pink-200/80 italic tracking-wide"
              >
                Hold tight… something magical is loading 💖
              </motion.h2>
            )}

            {step === 2 && (
              <motion.h2
                key="step2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.7 }}
                className="text-3xl sm:text-4xl md:text-5xl font-serif-magic text-gradient-pink font-semibold leading-tight max-w-2xl"
              >
                {hero.SUSPENSE}
              </motion.h2>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.6, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                className="space-y-4"
              >
                <div className="inline-block p-4 rounded-full bg-pink-500/20 border border-pink-400/40 shadow-glow mb-2 animate-bounce">
                  <Cake className="w-12 h-12 md:w-16 md:h-16 text-pink-300" />
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif-magic text-gradient-gold drop-shadow-lg tracking-tight">
                  {hero.REVEAL}
                </h1>
                <p className="text-base md:text-lg text-pink-200/80 max-w-lg mx-auto font-medium">
                  {hero.SUBTITLE}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button (Reveals at step 3) */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="pt-4"
          >
            <button
              onClick={handleStart}
              className="group relative inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-white font-bold text-base md:text-lg shadow-[0_0_35px_rgba(244,114,182,0.6)] hover:shadow-[0_0_50px_rgba(244,114,182,0.9)] transform hover:scale-105 active:scale-95 transition-all duration-300 border border-white/40 overflow-hidden"
            >
              <span className="relative z-10">{hero.BUTTON_TEXT}</span>
              <Sparkles className="relative z-10 w-5 h-5 text-yellow-200 group-hover:rotate-45 transition-transform duration-300" />
              
              {/* Button shimmer line */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
