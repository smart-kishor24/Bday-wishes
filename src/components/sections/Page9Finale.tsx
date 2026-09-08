import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw, Crown, Cake } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import { GlassCard } from '../ui/GlassCard';
import { audioEngine } from '../../utils/audio';

interface Page9FinaleProps {
  onReplay: () => void;
}

export const Page9Finale: React.FC<Page9FinaleProps> = ({ onReplay }) => {
  const finale = PERSONALIZATION.FINALE;

  const handleReplayClick = () => {
    audioEngine.playSparkleSound();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#c084fc', '#fbbf24'],
    });
    onReplay();
  };

  return (
    <section
      id="page-9"
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 py-24 z-10 text-center"
    >
      {/* Glow Halo Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto space-y-10 relative z-10">
        
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel-gold text-yellow-200 text-xs sm:text-sm font-bold border border-yellow-400/40 shadow-glow"
        >
          <Crown className="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
          <span>The Main Event ✨</span>
        </motion.div>

        {/* Grand Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="inline-block p-4 rounded-full bg-pink-500/20 border border-pink-400/40 shadow-lg mb-2">
            <Cake className="w-14 h-14 text-pink-300" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif-magic text-gradient-gold drop-shadow-xl tracking-tight leading-tight">
            {finale.HEADING}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-pink-200/90 font-medium max-w-xl mx-auto italic">
            "{finale.SUBTITLE}"
          </p>
        </motion.div>

        {/* Final Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlassCard variant="pink" className="border-pink-300/50 glow-pink text-left space-y-6">
            <div className="flex items-center justify-between border-b border-pink-400/20 pb-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-pink-300">
                  Forever Besties
                </span>
              </div>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>

            <div className="text-pink-100/95 text-base sm:text-lg leading-relaxed whitespace-pre-line font-medium font-sans tracking-wide">
              {finale.FINAL_LETTER}
            </div>

            <div className="pt-4 border-t border-pink-400/20 flex items-center justify-between text-xs sm:text-sm text-pink-300">
              <span className="font-handwriting text-2xl text-pink-200">
                To {PERSONALIZATION.BESTIE_NAME} 🌷
              </span>
              <span className="font-bold">From {PERSONALIZATION.YOUR_NAME} 💖</span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Replay Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-4"
        >
          <button
            onClick={handleReplayClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold text-base md:text-lg shadow-[0_0_35px_rgba(244,114,182,0.6)] hover:shadow-[0_0_50px_rgba(244,114,182,0.9)] transform hover:scale-105 active:scale-95 transition-all duration-300 border border-pink-300/40"
          >
            <RotateCcw className="w-5 h-5 text-yellow-200 group-hover:rotate-180 transition-transform duration-700" />
            <span>{finale.REPLAY_BUTTON}</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};
