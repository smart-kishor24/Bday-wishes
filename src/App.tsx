import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, ArrowDown } from 'lucide-react';
import { BackgroundScene } from './components/3d/BackgroundScene';
import { MusicPlayer } from './components/ui/MusicPlayer';
import { Navigation, type SectionItem } from './components/ui/Navigation';

import { Page1Landing } from './components/sections/Page1Landing';
import { Page2Message } from './components/sections/Page2Message';
import { Page3Universe } from './components/sections/Page3Universe';
import { Page4Timeline } from './components/sections/Page4Timeline';
import { Page5Cake } from './components/sections/Page5Cake';
import { Page6Special } from './components/sections/Page6Special';
import { Page7Quiz } from './components/sections/Page7Quiz';
import { Page8Future } from './components/sections/Page8Future';
import { Page9Finale } from './components/sections/Page9Finale';
import { audioEngine } from './utils/audio';

const SECTIONS: (SectionItem & { subtitle: string })[] = [
  { id: 'page-1', label: 'Surprise', emoji: '🎁', subtitle: 'The Magical Opening' },
  { id: 'page-2', label: 'Letter', emoji: '💌', subtitle: 'A Letter from My Heart' },
  { id: 'page-3', label: '3D Gallery', emoji: '📸', subtitle: 'Our Little Universe' },
  { id: 'page-4', label: 'Timeline', emoji: '⏳', subtitle: 'Our Friendship Chapters' },
  { id: 'page-5', label: '3D Cake', emoji: '🎂', subtitle: 'Blow the Candles' },
  { id: 'page-6', label: 'Why Special', emoji: '🌟', subtitle: '5 Reasons You Shine' },
  { id: 'page-7', label: 'Bestie Quiz', emoji: '🎮', subtitle: 'How Well Do You Know Us?' },
  { id: 'page-8', label: 'Future', emoji: '🚀', subtitle: 'Next Adventures' },
  { id: 'page-9', label: 'Finale', emoji: '💖', subtitle: 'Birthday Wish & Love' },
];

export function App() {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'slides' | 'scroll'>('slides');
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const activeSectionId = SECTIONS[activePageIndex]?.id || 'page-1';
  const isScrollingRef = useRef(false);

  // Navigate to specific page
  const goToPage = (targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= SECTIONS.length) return;
    const dir = targetIndex > activePageIndex ? 1 : -1;
    setSlideDirection(dir);
    setActivePageIndex(targetIndex);

    if (dir === 1) {
      audioEngine.playSparkleSound();
    }

    if (viewMode === 'scroll') {
      isScrollingRef.current = true;
      const el = document.getElementById(SECTIONS[targetIndex].id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextPage = () => {
    if (activePageIndex < SECTIONS.length - 1) {
      goToPage(activePageIndex + 1);
    } else {
      goToPage(0); // Loop back
    }
  };

  const prevPage = () => {
    if (activePageIndex > 0) {
      goToPage(activePageIndex - 1);
    }
  };

  const toggleViewMode = () => {
    setViewMode((prev) => {
      const nextMode = prev === 'slides' ? 'scroll' : 'slides';
      if (nextMode === 'scroll') {
        setTimeout(() => {
          const el = document.getElementById(SECTIONS[activePageIndex].id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return nextMode;
    });
  };

  // Keyboard navigation (Left / Right Arrow)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePageIndex]);

  // Scroll spy in continuous scroll view
  useEffect(() => {
    if (viewMode !== 'scroll') return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActivePageIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  // Mobile swipe gestures in slide mode
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || viewMode !== 'slides') return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      // Swipe left -> Next page
      nextPage();
    } else if (diff < -50) {
      // Swipe right -> Previous page
      prevPage();
    }
    setTouchStart(null);
  };

  const renderSectionComponent = (index: number) => {
    switch (index) {
      case 0:
        return <Page1Landing onOpenSurprise={() => goToPage(1)} />;
      case 1:
        return <Page2Message onNext={() => goToPage(2)} />;
      case 2:
        return <Page3Universe />;
      case 3:
        return <Page4Timeline />;
      case 4:
        return <Page5Cake />;
      case 5:
        return <Page6Special />;
      case 6:
        return <Page7Quiz />;
      case 7:
        return <Page8Future />;
      case 8:
        return <Page9Finale onReplay={() => goToPage(0)} />;
      default:
        return null;
    }
  };

  const currentSection = SECTIONS[activePageIndex];

  return (
    <div
      className="relative min-h-screen bg-[#0b0813] text-pink-50 selection:bg-pink-400/30 selection:text-pink-200 overflow-x-hidden font-sans pt-16 pb-28 md:pb-24"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Interactive Background Scene */}
      <BackgroundScene />

      {/* Floating Audio Player */}
      <MusicPlayer />

      {/* Global Multi-Page Navigation Header & Side Dots */}
      <Navigation
        sections={SECTIONS}
        activeSection={activeSectionId}
        activePageIndex={activePageIndex}
        viewMode={viewMode}
        onToggleViewMode={toggleViewMode}
        onNavigate={(_id, index) => goToPage(index)}
      />

      {/* MAIN CONTENT AREA */}
      {viewMode === 'slides' ? (
        /* PAGE-BY-PAGE STORY MODE (SLIDES) */
        <main className="relative z-10 w-full min-h-[calc(100vh-10rem)] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePageIndex}
              initial={{ opacity: 0, x: slideDirection > 0 ? 50 : -50, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: slideDirection > 0 ? -50 : 50, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {renderSectionComponent(activePageIndex)}
            </motion.div>
          </AnimatePresence>
        </main>
      ) : (
        /* CONTINUOUS SCROLL MODE (ALL SECTIONS) */
        <main className="relative z-10 space-y-16 md:space-y-24">
          {SECTIONS.map((sec, idx) => (
            <div key={sec.id} className="relative">
              {renderSectionComponent(idx)}

              {/* In-between Section Guide Arrow */}
              {idx < SECTIONS.length - 1 && (
                <div className="flex justify-center -mt-8 relative z-20">
                  <button
                    onClick={() => goToPage(idx + 1)}
                    className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-pink-200/80 hover:text-white border border-pink-400/20 hover:border-pink-300 transition-all hover:scale-105"
                  >
                    <span>Next: {SECTIONS[idx + 1].label}</span>
                    <ArrowDown className="w-3.5 h-3.5 text-pink-400 animate-bounce" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </main>
      )}

      {/* FLOATING BOTTOM CONTROLS (SLIDES MODE) */}
      {viewMode === 'slides' && (
        <div className="fixed bottom-4 left-0 right-0 z-40 px-3 pointer-events-none">
          <div className="max-w-xl mx-auto glass-panel p-2.5 sm:p-3 rounded-full border border-pink-400/30 shadow-2xl flex items-center justify-between gap-2 pointer-events-auto bg-[#140b22]/90 backdrop-blur-xl">
            
            {/* Previous Page Button */}
            <button
              onClick={prevPage}
              disabled={activePageIndex === 0}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-all ${
                activePageIndex === 0
                  ? 'opacity-30 cursor-not-allowed text-pink-300/40'
                  : 'text-pink-200 hover:text-white hover:bg-pink-500/20 active:scale-95'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>

            {/* Page Indicators & Title */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 mb-1">
                {SECTIONS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activePageIndex === i
                        ? 'w-5 sm:w-6 bg-gradient-to-r from-pink-400 to-amber-300'
                        : 'w-1.5 bg-pink-300/30 hover:bg-pink-300/60'
                    }`}
                    title={`Jump to Page ${i + 1}`}
                  />
                ))}
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-pink-200/90 tracking-wide flex items-center gap-1.5">
                <span>{currentSection.emoji}</span>
                <span>Page {activePageIndex + 1} of 9</span>
                <span className="opacity-50">•</span>
                <span className="text-pink-300 max-w-[120px] sm:max-w-[160px] truncate">{currentSection.label}</span>
              </span>
            </div>

            {/* Next Page / Replay Button */}
            {activePageIndex < SECTIONS.length - 1 ? (
              <button
                onClick={nextPage}
                className="px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center gap-1.5 text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(244,114,182,0.6)] hover:shadow-[0_0_25px_rgba(244,114,182,0.9)] hover:scale-105 active:scale-95 transition-all border border-pink-300/40"
              >
                <span className="hidden sm:inline">Next: {SECTIONS[activePageIndex + 1].label}</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => goToPage(0)}
                className="px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white flex items-center gap-1.5 text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all border border-yellow-200/40"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay</span>
              </button>
            )}

          </div>
        </div>
      )}

      {/* Footer Love Note */}
      <footer className="relative z-10 py-6 text-center text-xs text-pink-300/60 border-t border-pink-500/10 mt-12">
        <p>
          Made with 💗 & 3D magic for my best friend | Page {activePageIndex + 1} of {SECTIONS.length}
        </p>
      </footer>
    </div>
  );
}

export default App;
