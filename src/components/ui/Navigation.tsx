import React, { useState } from 'react';
import { Sparkles, BookOpen, Scroll, ChevronDown } from 'lucide-react';

export interface SectionItem {
  id: string;
  label: string;
  emoji: string;
}

interface NavigationProps {
  sections: SectionItem[];
  activeSection: string;
  activePageIndex: number;
  viewMode: 'slides' | 'scroll';
  onToggleViewMode: () => void;
  onNavigate: (id: string, index: number) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  sections,
  activeSection,
  activePageIndex,
  viewMode,
  onToggleViewMode,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentSection = sections[activePageIndex] || sections[0];

  return (
    <>
      {/* Top Floating Glass Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 py-2.5 sm:px-6 sm:py-3 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 pointer-events-auto">
          
          {/* Left: Brand Badge / Home */}
          <button
            onClick={() => onNavigate(sections[0].id, 0)}
            className="glass-panel px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold text-pink-200 hover:text-white border border-pink-400/30 shadow-lg hover:border-pink-300 transition-all hover:scale-105 active:scale-95"
            title="Go to Start"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-serif-magic font-bold text-gradient-pink">Birthday Story</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30">
              {activePageIndex + 1}/9
            </span>
          </button>

          {/* Center: Desktop Page Pills (1 through 9) */}
          <nav className="hidden lg:flex items-center gap-1.5 glass-panel px-2.5 py-1.5 rounded-full border border-pink-400/20 shadow-xl">
            {sections.map((sec, idx) => {
              const isActive = (viewMode === 'slides' ? activePageIndex === idx : activeSection === sec.id);
              return (
                <button
                  key={sec.id}
                  onClick={() => onNavigate(sec.id, idx)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_12px_rgba(244,114,182,0.6)] scale-105'
                      : 'text-pink-200/70 hover:text-pink-100 hover:bg-pink-500/15'
                  }`}
                >
                  <span>{sec.emoji}</span>
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Controls (Mode Switcher + Mobile Page Dropdown) */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle Button */}
            <button
              onClick={onToggleViewMode}
              className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-pink-200 hover:text-white border border-pink-400/30 shadow-md hover:border-pink-300 transition-all"
              title={viewMode === 'slides' ? 'Switch to Continuous Scroll View' : 'Switch to Page-by-Page Story View'}
            >
              {viewMode === 'slides' ? (
                <>
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Story Mode</span>
                  <span className="text-[10px] text-pink-300/70 hidden md:inline">(Slides)</span>
                </>
              ) : (
                <>
                  <Scroll className="w-3.5 h-3.5 text-purple-300" />
                  <span className="hidden sm:inline">Scroll View</span>
                  <span className="text-[10px] text-pink-300/70 hidden md:inline">(All)</span>
                </>
              )}
            </button>

            {/* Mobile / Tablet Page Selector Dropdown */}
            <div className="relative lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-pink-200 hover:text-white border border-pink-400/30 shadow-md"
              >
                <span>{currentSection.emoji}</span>
                <span className="max-w-[75px] truncate">{currentSection.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 glass-panel rounded-2xl border border-pink-400/30 p-2 shadow-2xl space-y-1 z-50 bg-[#160d24]/90 backdrop-blur-xl">
                  <div className="px-3 py-1 text-[11px] font-bold text-pink-300/70 uppercase tracking-wider border-b border-pink-400/20 mb-1">
                    Select Page (1 - 9)
                  </div>
                  {sections.map((sec, idx) => (
                    <button
                      key={sec.id}
                      onClick={() => {
                        onNavigate(sec.id, idx);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between ${
                        activePageIndex === idx
                          ? 'bg-pink-500/30 text-white font-bold border border-pink-400/40'
                          : 'text-pink-200/80 hover:bg-pink-500/15'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{sec.emoji}</span>
                        <span>{sec.label}</span>
                      </span>
                      <span className="text-[10px] opacity-60">#{idx + 1}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Right Side Navigation Floating Dots (Desktop) */}
      <div className="hidden md:flex fixed right-3.5 md:right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-2.5 glass-panel p-2 rounded-full border border-pink-400/20 shadow-xl backdrop-blur-md">
        {sections.map((section, index) => {
          const isActive = (viewMode === 'slides' ? activePageIndex === index : activeSection === section.id);
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id, index)}
              className="group relative flex items-center justify-center p-1 focus:outline-none"
              title={`Page ${index + 1}: ${section.label}`}
            >
              {/* Tooltip Label */}
              <span className="absolute right-9 px-2.5 py-1 rounded-lg text-xs font-semibold bg-pink-950/90 text-pink-100 border border-pink-400/30 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                {section.emoji} Page {index + 1}: {section.label}
              </span>

              {/* Dot Indicator */}
              <span
                className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'w-4 h-4 bg-gradient-to-tr from-pink-400 to-amber-300 shadow-[0_0_15px_rgba(244,114,182,1)] scale-110'
                    : 'w-2.5 h-2.5 bg-pink-300/30 hover:bg-pink-300/70 hover:scale-125'
                }`}
              />
            </button>
          );
        })}
      </div>
    </>
  );
};
