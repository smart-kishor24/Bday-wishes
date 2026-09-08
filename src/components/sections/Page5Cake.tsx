import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flame, Wind, Heart, PartyPopper } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import { BirthdayCake3D } from '../3d/BirthdayCake3D';
import { audioEngine } from '../../utils/audio';

export const Page5Cake: React.FC = () => {
  const [isBlown, setIsBlown] = useState(false);
  const cake = PERSONALIZATION.CAKE;

  const handleBlowCandles = () => {
    if (isBlown) return;
    setIsBlown(true);
    audioEngine.playBlowCandleSound();

    // Multistage Confetti Explosion!
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#f472b6', '#fbbf24', '#c084fc', '#60a5fa', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section
      id="page-5"
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 py-20 z-10 text-center overflow-hidden"
    >
      {/* Floating Animated Balloons on Blow */}
      {isBlown && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: '100vh', x: `${(i * 8) + 4}vw`, opacity: 0 }}
              animate={{ y: '-20vh', opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 6 + Math.random() * 3,
                delay: i * 0.2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="absolute text-3xl md:text-5xl"
            >
              {['🎈', '🌸', '💖', '✨', '🎂'][i % 5]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Header Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="max-w-xl mx-auto space-y-3 mb-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-gold text-yellow-200 text-xs font-semibold border border-yellow-400/30">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Interactive 3D Wish Ceremony</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-magic text-gradient-gold">
          {cake.HEADING}
        </h2>
        <p className="text-sm md:text-base text-pink-200/80 font-medium">
          {cake.SUBTITLE}
        </p>
      </motion.div>

      {/* 3D Cake Canvas */}
      <div className="w-full max-w-xl mx-auto my-2">
        <BirthdayCake3D isBlown={isBlown} />
      </div>

      {/* Action Button & Wish Message */}
      <div className="max-w-md mx-auto space-y-6 pt-2">
        {!isBlown ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBlowCandles}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white font-bold text-base md:text-lg shadow-[0_0_30px_rgba(245,158,11,0.5)] border border-yellow-200/40 hover:shadow-[0_0_45px_rgba(245,158,11,0.8)] transition-all"
          >
            <Wind className="w-5 h-5 text-yellow-200 group-hover:rotate-45 transition-transform" />
            <span>{cake.BUTTON_BLOW}</span>
          </motion.button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 250 }}
              className="glass-panel-gold p-6 md:p-8 rounded-3xl border border-yellow-400/50 glow-gold space-y-3"
            >
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300">
                <PartyPopper className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-serif-magic text-gradient-gold">
                {cake.WISH_MESSAGE}
              </h3>
              <p className="text-sm text-pink-200/90 font-medium">
                {cake.SUB_WISH_MESSAGE}
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-300/80 pt-2 font-semibold">
                <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                Wish Sent to the Universe
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
