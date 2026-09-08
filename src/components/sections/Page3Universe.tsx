import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, Images, Sparkles, Heart } from 'lucide-react';
import { PERSONALIZATION, type PhotoItem } from '../../config/personalization';
import { FloatingPolaroidsScene } from '../3d/FloatingPolaroids';
import { LightboxModal } from '../ui/LightboxModal';
import { FunniestMomentCard } from '../ui/FunniestMomentCard';

export const Page3Universe: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const photos = PERSONALIZATION.PHOTOS;

  return (
    <section
      id="page-3"
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-3 sm:px-6 py-16 z-10 text-center"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto space-y-3 mb-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-pink text-pink-200 text-xs font-semibold border border-pink-400/30 shadow-md">
          <Images className="w-3.5 h-3.5 text-pink-400" />
          <span>Interactive 3D Memory Gallery & Cinema</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-magic text-gradient-pink leading-tight">
          Moments with M Kousalya Naga Rupa ✨
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-pink-200/90 font-medium flex items-center justify-center gap-2 flex-wrap">
          <MousePointerClick className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>Touch, hover or click any 3D Polaroid to open high-res memories (Real one, 90Ml)</span>
        </p>
      </motion.div>

      {/* 3D Floating Polaroid Scene */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl mx-auto"
      >
        <FloatingPolaroidsScene
          photos={photos}
          onSelectPhoto={(photo) => setSelectedPhoto(photo)}
        />
      </motion.div>

      {/* Featured Funniest Moment Video Spotlight */}
      <FunniestMomentCard />

      {/* Photo Cards Grid for Quick Access & Thumbnails */}
      <div className="max-w-5xl w-full mx-auto mt-4">
        <div className="flex items-center justify-center gap-2 mb-3 text-xs text-pink-300/80 font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Gallery Snapshot Grid ({photos.length} Photos)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 px-2">
          {photos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="p-2.5 rounded-2xl glass-panel hover:bg-pink-500/20 transition-all border border-pink-400/25 text-left flex flex-col gap-2 group hover:scale-105 active:scale-95 shadow-md"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-pink-950/40 border border-white/20">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-1 right-1 p-1 rounded-full bg-black/40 text-white backdrop-blur-sm">
                  <Heart className="w-2.5 h-2.5 text-pink-400 fill-pink-400" />
                </span>
              </div>
              <span className="text-[11px] font-semibold text-pink-200 truncate group-hover:text-white">
                {photo.caption}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      <LightboxModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </section>
  );
};
