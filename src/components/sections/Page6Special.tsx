import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Zap, Heart, Star, Crown, Sparkles } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import { GlassCard } from '../ui/GlassCard';

export const Page6Special: React.FC = () => {
  const reasons = PERSONALIZATION.REASONS;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smile': return <Smile className="w-6 h-6 text-pink-300" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-300" />;
      case 'Heart': return <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />;
      case 'Star': return <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />;
      case 'Crown': return <Crown className="w-6 h-6 text-purple-300 fill-purple-300" />;
      default: return <Sparkles className="w-6 h-6 text-pink-400" />;
    }
  };

  return (
    <section
      id="page-6"
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
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>5 Reasons Why You're Irreplaceable</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-magic text-gradient-pink">
          Why You're So Special 💗
        </h2>
        <p className="text-sm md:text-base text-pink-200/80 font-medium">
          Just a few reminders of how much magic you bring into the world.
        </p>
      </motion.div>

      {/* Grid of Reasons */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
        {reasons.map((item, index) => {
          const isLastItem = index === reasons.length - 1;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={isLastItem ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <GlassCard
                variant={isLastItem ? 'gold' : 'pink'}
                className="h-full flex flex-col justify-between text-left hover:border-pink-300/60 glow-pink group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold font-serif-magic text-gradient-pink opacity-80">
                      {item.id}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-pink-500/15 border border-pink-400/30 group-hover:scale-110 transition-transform">
                      {getIcon(item.icon)}
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold font-serif-magic text-pink-100">
                    {item.title}
                  </h3>

                  <p className="text-sm md:text-base text-pink-200/90 leading-relaxed font-medium">
                    "{item.description}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-pink-500/15 flex items-center gap-1.5 text-xs text-pink-300/70 font-semibold">
                  <Heart className="w-3.5 h-3.5 text-pink-400" />
                  <span>Fact #{item.id}</span>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
