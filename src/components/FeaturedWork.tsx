import React, { useState, useRef } from 'react';
import { galleryData, galleryCategories } from '../data/galleryData';
import type { GalleryItem } from '../data/galleryData';
import { GalleryLightbox } from './GalleryLightbox';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeaturedWork: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredItems = selectedCategory === 'All'
    ? galleryData
    : galleryData.filter((item) => item.category === selectedCategory);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleOpenLightbox = (item: GalleryItem) => {
    const index = galleryData.findIndex((g) => g.id === item.id);
    setActiveLightboxIndex(index !== -1 ? index : 0);
  };

  const handleNextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % galleryData.length);
    }
  };

  const handlePrevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + galleryData.length) % galleryData.length
      );
    }
  };

  return (
    <section id="gallery" className="relative py-28 bg-studio-900/60 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/30 mb-3 shadow-glow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase">
                OUR WORK
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display">
              Our Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan-400 to-electric-light">Speaks</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-300 font-light">
              From grand weddings to intimate celebrations
            </p>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll('left')}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-studio-900 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-white hover:shadow-glow-sm transition-all duration-300 active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-studio-900 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-white hover:shadow-glow-sm transition-all duration-300 active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto hide-scrollbar pb-4 mb-8">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-electric to-electric-glow text-white shadow-glow-sm border border-cyan-300/40'
                  : 'bg-studio-950/60 border border-white/10 text-slate-400 hover:text-white hover:border-white/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scrolling Gallery Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar px-4 sm:px-8 lg:px-12 pb-8 scroll-smooth snap-x snap-mandatory"
      >
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenLightbox(item)}
            className="group relative flex-shrink-0 w-[300px] sm:w-[380px] md:w-[460px] aspect-[16/11] rounded-3xl overflow-hidden bg-studio-900 border border-white/10 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-[0_20px_45px_-12px_rgba(0,168,255,0.3)] cursor-pointer snap-start"
          >
            {/* Project Image */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-studio-950/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

            {/* Top Badges */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-lg bg-studio-950/80 border border-cyan-400/30 text-cyan-300 text-xs font-semibold backdrop-blur-md">
                {item.category}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-studio-950/80 border border-white/15 text-slate-300 text-xs font-mono backdrop-blur-md">
                {item.year}
              </span>
            </div>

            {/* Hover Quick Inspect Indicator */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="px-4 py-2 rounded-full bg-studio-950/90 border border-cyan-400 text-cyan-300 text-xs font-bold flex items-center gap-2 shadow-glow-sm transform scale-90 group-hover:scale-100 transition-transform">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>View Details</span>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-4 inset-x-5 pointer-events-none">
              <p className="text-xs font-medium text-cyan-400 mb-1 tracking-wider uppercase">
                {item.client}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors font-display line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-1 mt-1 font-light">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action: View Full Gallery — links to /gallery page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 flex justify-center">
        <Link
          to="/gallery"
          className="group px-7 py-3 rounded-full text-sm font-semibold text-white bg-studio-900 border border-cyan-500/30 hover:border-cyan-400 hover:shadow-glow-sm transition-all duration-300 flex items-center gap-2.5 hover:scale-105"
        >
          <span>View Full Gallery</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <GalleryLightbox
          item={galleryData[activeLightboxIndex]}
          onClose={() => setActiveLightboxIndex(null)}
          onNext={handleNextLightbox}
          onPrev={handlePrevLightbox}
        />
      )}
    </section>
  );
};
