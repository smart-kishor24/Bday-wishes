import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Car, Laugh, Camera, HeartHandshake, Sparkles, Compass } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import { GlassCard } from '../ui/GlassCard';

export const Page8Future: React.FC = () => {
  const future = PERSONALIZATION.FUTURE;
  const memories = future.MEMORIES;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Moon': return <Moon className="w-6 h-6 text-indigo-300" />;
      case 'Car': return <Car className="w-6 h-6 text-amber-300" />;
      case 'Laugh': return <Laugh className="w-6 h-6 text-pink-300" />;
      case 'Camera': return <Camera className="w-6 h-6 text-cyan-300" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-rose-300" />;
      default: return <Sparkles className="w-6 h-6 text-pink-400" />;
    }
  };

  return (
    <section
      id="page-8"
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 py-20 z-10 text-center"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="max-w-xl mx-auto space-y-3 mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-pink text-pink-200 text-xs font-semibold border border-pink-400/30">
          <Compass className="w-3.5 h-3.5 text-pink-400" />
          <span>The Next Chapters</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-magic text-gradient-pink">
          {future.HEADING}
        </h2>
        <p className="text-sm md:text-base text-pink-200/80 font-medium">
          "{future.SUBTITLE}"
        </p>
      </motion.div>

      {/* Grid of Future Memories */}
      <div className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-2">
        {memories.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassCard variant="pink" className="h-full flex flex-col justify-between text-left hover:border-pink-300/60 glow-pink">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-pink-500/15 border border-pink-400/30">
                    {getIcon(item.icon)}
                  </div>
                  <Sparkles className="w-4 h-4 text-amber-300 opacity-60 animate-pulse" />
                </div>
                <h3 className="text-lg md:text-xl font-bold font-serif-magic text-pink-100">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-pink-200/80 font-medium">
                  {item.description}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-pink-500/15 text-[11px] text-pink-300/60 uppercase tracking-widest font-semibold">
                Loading Memory… ⏳
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Footer Tag */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-base md:text-lg font-serif-magic italic text-gradient-gold"
      >
        ✨ {future.ENDING_NOTE} ✨
      </motion.div>
    </section>
  );
};
