import React, { useEffect } from 'react';
import type { GalleryItem } from '../data/galleryData';
import { X, ChevronLeft, ChevronRight, Check, Maximize2 } from 'lucide-react';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const GalleryLightbox: React.FC<LightboxProps> = ({
  item,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-studio-950/95 backdrop-blur-2xl animate-fadeIn">
      {/* Click outside to close backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Lightbox Card Container */}
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] rounded-3xl bg-studio-900 border border-cyan-500/30 shadow-[0_0_60px_-10px_rgba(0,168,255,0.3)] overflow-hidden flex flex-col lg:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-studio-950/80 border border-white/20 text-white hover:text-cyan-400 hover:border-cyan-400 hover:shadow-glow-sm transition-all duration-300"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview (Left / Top) */}
        <div className="relative lg:w-3/5 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto bg-black flex items-center justify-center overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover select-none"
          />

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-studio-950/70 border border-white/20 text-white hover:bg-cyan-500 hover:text-black transition-all"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-studio-950/70 border border-white/20 text-white hover:bg-cyan-500 hover:text-black transition-all"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Resolution Badge */}
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-md bg-studio-950/80 border border-cyan-400/40 backdrop-blur-md text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{item.resolution}</span>
          </div>
        </div>

        {/* Project Metadata & Details (Right / Bottom) */}
        <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] lg:max-h-[90vh]">
          <div>
            {/* Category Pill */}
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
              {item.category}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
              {item.title}
            </h3>
            <p className="text-sm font-medium text-cyan-300/90 mt-1">
              {item.subtitle}
            </p>

            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Client</span>
                <span className="font-semibold text-white">{item.client}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Production Year</span>
                <span className="font-semibold text-white">{item.year}</span>
              </div>
            </div>

            <p className="mt-4 text-slate-300 text-sm leading-relaxed font-light">
              {item.description}
            </p>

            {/* Technical Specs List */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Technical Highlights
              </h4>
              <div className="space-y-1.5">
                {item.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>LED's &amp; ABI Studio Showcase</span>
            <span className="text-cyan-400 font-semibold">Verified Production</span>
          </div>
        </div>
      </div>
    </div>
  );
};
