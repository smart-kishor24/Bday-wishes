import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../../utils/audio';

export const MusicPlayer: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleSound = () => {
    const nextMutedState = audioEngine.toggleMute();
    setIsMuted(nextMutedState);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  useEffect(() => {
    // Attempt auto-start synth on first user scroll or click
    const handleFirstUserTouch = () => {
      if (!hasInteracted) {
        audioEngine.startMelody();
        setIsMuted(audioEngine.getMutedState());
        setHasInteracted(true);
      }
      window.removeEventListener('click', handleFirstUserTouch);
      window.removeEventListener('keydown', handleFirstUserTouch);
    };

    window.addEventListener('click', handleFirstUserTouch);
    window.addEventListener('keydown', handleFirstUserTouch);

    return () => {
      window.removeEventListener('click', handleFirstUserTouch);
      window.removeEventListener('keydown', handleFirstUserTouch);
    };
  }, [hasInteracted]);

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3">
      <button
        onClick={toggleSound}
        className="glass-panel-pink px-4 py-2.5 rounded-full flex items-center gap-2.5 text-xs md:text-sm font-medium text-pink-200 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg border border-pink-300/30"
        title={isMuted ? "Unmute Background Music Box" : "Mute Music Box"}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4 text-pink-400" />
            <span className="hidden sm:inline">Play Music 🎵</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-pink-300 animate-pulse" />
            <span className="hidden sm:inline">Playing Dreams 💖</span>
            {/* Equalizer bar animation */}
            <span className="flex items-end gap-0.5 h-3 ml-1">
              <span className="w-0.5 h-full bg-pink-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 h-2/3 bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-4/5 bg-pink-300 animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </>
        )}
      </button>
    </div>
  );
};
