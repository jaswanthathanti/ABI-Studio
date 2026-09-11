import React, { useState, useEffect } from 'react';
import { galleryPageData, galleryPageCategories } from '../data/galleryPageData';
import { Play, ArrowRight, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryPageProps {
  onOpenQuote: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredItems = selectedCategory === 'All'
    ? galleryPageData
    : galleryPageData.filter((item) => item.category === selectedCategory);

  return (
    <>
      {/* Compact Hero Banner */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-studio-950 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-electric/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/25 mb-4 shadow-glow-sm">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase">
              OUR PORTFOLIO
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan-400 to-electric-light">
              Gallery
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto">
            Browse through our collection of weddings, pre-wedding shoots, events, LED setups, albums, and films
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="sticky top-[64px] z-30 bg-studio-950/90 backdrop-blur-xl border-b border-white/5 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2.5 overflow-x-auto hide-scrollbar">
          {galleryPageCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-electric to-electric-glow text-white shadow-glow-sm border border-cyan-300/40'
                  : 'bg-studio-900/60 border border-white/10 text-slate-400 hover:text-white hover:border-white/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Gallery Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-studio-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-studio-900 border border-white/10 hover:border-cyan-400/50 cursor-pointer transition-all duration-500 hover:shadow-[0_15px_40px_-10px_rgba(0,168,255,0.25)]"
                  onClick={() => setSelectedImage(item.image)}
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-studio-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Film play icon overlay */}
                    {item.type === 'film' && (
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-studio-950/80 border border-cyan-400/40 flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                      </div>
                    )}

                    {/* Hover overlay content */}
                    <div className="absolute bottom-0 inset-x-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-sm font-bold text-white font-display">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg">No items in this category yet.</p>
              <p className="text-sm mt-2">Check back soon for updates!</p>
            </div>
          )}
        </div>
      </section>

      {/* Mini CTA */}
      <section className="py-16 px-4 sm:px-6 bg-studio-900/40 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Like What You See?
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base font-light">
            Let us capture your special moments with the same love and artistry
          </p>
          <button
            onClick={onOpenQuote}
            className="mt-6 group px-7 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-electric to-electric-glow shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto border border-cyan-300/40"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-studio-950/95 backdrop-blur-2xl p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl border border-cyan-500/30 shadow-[0_0_60px_-10px_rgba(0,168,255,0.3)]"
          />
        </div>
      )}
    </>
  );
};
