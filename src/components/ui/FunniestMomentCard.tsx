import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Sparkles, Film, Laugh } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONALIZATION } from '../../config/personalization';
import { GlassCard } from './GlassCard';
import { audioEngine } from '../../utils/audio';

export const FunniestMomentCard: React.FC = () => {
  const videoData = PERSONALIZATION.FUNNY_MOMENT_VIDEO;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      // Pause ambient background music so video audio is clear
      audioEngine.stopMelody();

      videoRef.current.play().then(() => {
        setIsPlaying(true);
        if (!hasPlayedOnce) {
          setHasPlayedOnce(true);
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#f472b6', '#fbbf24', '#c084fc'],
          });
        }
      }).catch(() => {
        // Autoplay policy or abort
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    // Restart ambient music if it was previously playing
    audioEngine.startMelody();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="max-w-3xl w-full mx-auto my-8 px-2"
    >
      <GlassCard variant="gold" className="border-yellow-400/40 glow-gold relative overflow-hidden">
        
        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b border-yellow-400/20 pb-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-yellow-200 text-xs font-bold border border-yellow-400/30">
            <Film className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>{videoData.badge}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-amber-300/80 font-semibold">
            <Laugh className="w-3.5 h-3.5" />
            <span>90Ml Chaos Mode</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="text-left mb-4 space-y-1">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif-magic text-gradient-gold flex items-center gap-2">
            <span>{videoData.title}</span>
          </h3>
          <p className="text-xs sm:text-sm text-pink-200/90 font-medium">
            {videoData.subtitle}
          </p>
        </div>

        {/* Video Player Container */}
        <div
          onClick={togglePlay}
          className="relative w-full aspect-video sm:aspect-[16/10] max-h-[420px] rounded-2xl overflow-hidden bg-black/60 border border-yellow-400/30 shadow-2xl cursor-pointer group flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src={videoData.url}
            playsInline
            onEnded={handleEnded}
            className="w-full h-full object-contain rounded-2xl"
          />

          {/* Glowing Play/Pause Overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isPlaying
                ? 'opacity-0 group-hover:opacity-100 bg-black/30'
                : 'opacity-100 bg-black/40'
            }`}
          >
            <div className="p-4 sm:p-5 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 text-white shadow-[0_0_30px_rgba(251,191,36,0.8)] transform group-hover:scale-110 active:scale-95 transition-transform border border-white/40">
              {isPlaying ? (
                <Pause className="w-7 h-7 sm:w-9 sm:h-9" />
              ) : (
                <Play className="w-7 h-7 sm:w-9 sm:h-9 translate-x-0.5" />
              )}
            </div>
          </div>

          {/* Sound Mute/Unmute Toggle on Video */}
          <button
            onClick={toggleMute}
            className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-pink-200 hover:text-white border border-pink-400/30 transition-all z-20 backdrop-blur-sm"
            title={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Floating Watch Tag */}
          {!isPlaying && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[11px] font-semibold text-yellow-200 flex items-center gap-1.5 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Tap to watch funny moment</span>
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="mt-4 pt-3 border-t border-yellow-400/20 text-left flex items-center justify-between text-xs text-pink-200/80">
          <p className="italic font-medium">"{videoData.caption}"</p>
          <span className="shrink-0 text-amber-300 font-semibold hidden sm:inline">100% Unhinged 😂</span>
        </div>

      </GlassCard>
    </motion.div>
  );
};
