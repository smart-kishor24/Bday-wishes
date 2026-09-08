import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Laugh, Heart, Cake, Infinity, Clock } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import { GlassCard } from '../ui/GlassCard';

export const Page4Timeline: React.FC = () => {
  const milestones = PERSONALIZATION.TIMELINE;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-300" />;
      case 'Laugh': return <Laugh className="w-5 h-5 text-pink-300" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />;
      case 'Cake': return <Cake className="w-5 h-5 text-yellow-300" />;
      case 'Infinity': return <Infinity className="w-5 h-5 text-purple-300" />;
      default: return <Sparkles className="w-5 h-5 text-pink-400" />;
    }
  };

  return (
    <section
      id="page-4"
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 py-20 z-10 text-center"
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="max-w-xl mx-auto space-y-3 mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-pink text-pink-200 text-xs font-semibold border border-pink-400/30">
          <Clock className="w-3.5 h-3.5 text-pink-400" />
          <span>Our Friendship Chapters</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-magic text-gradient-pink">
          Bestie Timeline ⏳💕
        </h2>
        <p className="text-sm md:text-base text-pink-200/80 font-medium">
          From two strangers to inseparable partners in chaos.
        </p>
      </motion.div>

      {/* Vertical Animated Timeline Container */}
      <div className="max-w-3xl w-full mx-auto relative px-2 sm:px-6">
        
        {/* Central Vertical Glowing Line */}
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-pink-500/80 via-purple-500/80 to-amber-400/80 rounded-full shadow-[0_0_15px_rgba(244,114,182,0.8)]" />

        <div className="space-y-10 sm:space-y-12">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-center ${
                  isEven ? 'sm:flex-row-reverse' : 'sm:flex-row'
                } flex-row pl-12 sm:pl-0`}
              >
                {/* Center Node Marker */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-pink-950 border-2 border-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.8)]">
                  {getIcon(item.icon)}
                </div>

                {/* Card Container */}
                <div className="w-full sm:w-[45%] text-left">
                  <GlassCard variant={index === 3 ? 'gold' : 'pink'} className="glow-pink">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
                        {item.subtitle}
                      </span>
                      {item.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-pink-500/20 text-pink-200 border border-pink-400/30">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold font-serif-magic text-pink-100 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-pink-200/90 leading-relaxed font-medium">
                      "{item.description}"
                    </p>
                  </GlassCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
