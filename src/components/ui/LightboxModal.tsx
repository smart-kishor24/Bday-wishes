import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Calendar, Tag } from 'lucide-react';
import type { PhotoItem } from '../../config/personalization';
import { getPlaceholderImage } from '../../utils/placeholders';

interface LightboxModalProps {
  photo: PhotoItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ photo, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (photo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, onClose]);

  if (!photo) return null;

  const displayUrl = photo.url || getPlaceholderImage(photo.id);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-xl w-full glass-panel-pink p-5 md:p-7 rounded-3xl border border-pink-300/40 shadow-2xl cursor-default text-left overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-pink-950/60 text-pink-200 hover:text-white hover:bg-pink-900/80 transition-colors border border-pink-400/30"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Photo Preview Frame */}
          <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden mb-5 bg-pink-950/40 border border-white/20 shadow-inner flex items-center justify-center">
            <img
              src={displayUrl}
              alt={photo.caption}
              className="w-full h-full object-cover rounded-2xl"
              onError={(e) => {
                // Fallback to SVG generator if image file path fails to load
                (e.target as HTMLImageElement).src = getPlaceholderImage(photo.id);
              }}
            />
          </div>

          {/* Caption & Metadata */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-300 border border-pink-400/30">
                <Tag className="w-3 h-3 text-pink-400" />
                {photo.tag || 'Bestie Memory'}
              </span>
              {photo.date && (
                <span className="inline-flex items-center gap-1.5 text-xs text-pink-300/70">
                  <Calendar className="w-3.5 h-3.5 text-pink-400" />
                  {photo.date}
                </span>
              )}
            </div>

            <h3 className="text-xl md:text-2xl font-bold font-serif-magic text-gradient-pink leading-snug">
              {photo.caption}
            </h3>

            <div className="flex items-center justify-between pt-2 border-t border-pink-500/20 text-xs text-pink-300/80">
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" />
                A core memory sealed forever
              </span>
              <span className="italic text-pink-300/60">Tap outside to close</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
