import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RefreshCw, Quote } from 'lucide-react';
import { PERSONALIZATION } from '../../config/personalization';
import { GlassCard } from '../ui/GlassCard';

interface Page2MessageProps {
  onNext?: () => void;
}

export const Page2Message: React.FC<Page2MessageProps> = ({ onNext }) => {
  const messageData = PERSONALIZATION.HEARTFELT_MESSAGE;
  const fullText = messageData.LETTER;

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 28); // Smooth typing cadence

    return () => clearInterval(interval);
  }, [fullText]);

  const handleRestartTyping = () => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 28);
  };

  return (
    <section
      id="page-2"
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 py-20 z-10"
    >
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <GlassCard variant="pink" className="relative text-left border-pink-300/40 glow-pink">
            
            {/* Header Tag */}
            <div className="flex items-center justify-between border-b border-pink-400/20 pb-4 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-200 text-xs font-semibold border border-pink-400/30">
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                <span>Letter to {PERSONALIZATION.BESTIE_NAME}</span>
              </div>
              <button
                onClick={handleRestartTyping}
                className="p-2 rounded-full text-pink-300/70 hover:text-white hover:bg-pink-500/20 transition-colors"
                title="Replay Typewriter Animation"
              >
                <RefreshCw className={`w-4 h-4 ${isTyping ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Title */}
            <div className="flex items-start gap-3 mb-6">
              <Quote className="w-8 h-8 text-pink-400/60 shrink-0 transform -scale-x-100" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-magic text-gradient-pink">
                {messageData.HEADING}
              </h2>
            </div>

            {/* Typewriter Body */}
            <div className="text-pink-100/90 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line font-medium min-h-[220px] font-sans tracking-wide">
              {displayedText}
              {isTyping && <span className="inline-block w-2 h-5 ml-1 bg-pink-400 animate-pulse" />}
            </div>

            {/* Footer Signature */}
            <div className="mt-8 pt-4 border-t border-pink-400/20 flex items-center justify-between text-xs sm:text-sm text-pink-300/80">
              <div className="flex items-center gap-1.5 font-handwriting text-xl md:text-2xl text-pink-200">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{messageData.SIGN_OFF}</span>
              </div>
              <span className="font-semibold text-pink-300">From {PERSONALIZATION.YOUR_NAME} 💖</span>
            </div>
          </GlassCard>

          {/* Action Button to Advance to 3D Gallery */}
          {onNext && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <button
                onClick={onNext}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(244,114,182,0.6)] hover:shadow-[0_0_40px_rgba(244,114,182,0.9)] hover:scale-105 active:scale-95 transition-all border border-pink-300/40"
              >
                <span>Continue to 3D Gallery 📸</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
