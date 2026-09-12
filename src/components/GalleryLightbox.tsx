import React, { useState, useEffect } from 'react';
import type { GalleryItem } from '../data/galleryData';
import { X, ChevronLeft, ChevronRight, Check, Maximize2, Play, Pause, Film, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onOpenQuote?: () => void;
}

export const GalleryLightbox: React.FC<LightboxProps> = ({
  item,
  onClose,
  onNext,
  onPrev,
  onOpenQuote,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(25);
  const totalDuration = 210; // 3:30

  const isFilm = item ? item.category === 'Films' || item.type === 'film' : false;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === ' ' && isFilm) {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, isFilm]);

  // Reset playback timer when item changes
  useEffect(() => {
    setIsPlaying(true);
    setCurrentTime(15);
  }, [item?.id]);

  // Simulated film playback timer
  useEffect(() => {
    if (!item || !isFilm || !isPlaying || item.videoUrl) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev >= totalDuration ? 0 : prev + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [item, isFilm, isPlaying, totalDuration]);

  if (!item) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / totalDuration) * 100;

  // Convert video URLs
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    try {
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('watch?v=')) {
          videoId = url.split('watch?v=')[1].split('&')[0];
        } else if (url.includes('embed/')) {
          return url;
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
      }
      if (url.includes('vimeo.com')) {
        const parts = url.split('/');
        const videoId = parts[parts.length - 1].split('?')[0];
        return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
      }
      return url;
    } catch {
      return null;
    }
  };

  const embedUrl = getEmbedUrl(item.videoUrl);
  const isDirectVideo = item.videoUrl && (item.videoUrl.endsWith('.mp4') || item.videoUrl.endsWith('.webm'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-studio-950/95 backdrop-blur-2xl animate-fadeIn select-none">
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
        <div className="relative lg:w-3/5 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto bg-black flex items-center justify-center overflow-hidden group">
          {/* If Film: Video Player / Showcase Mode */}
          {isFilm ? (
            embedUrl && !isDirectVideo ? (
              <iframe
                src={embedUrl}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : isDirectVideo ? (
              <video
                src={item.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <>
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-all duration-1000 ${
                    isPlaying ? 'scale-105 filter brightness-75 contrast-105' : 'scale-100 filter brightness-60'
                  }`}
                />

                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none" />

                {/* PROMINENT SHOWCASE BANNER: "A film will be played here" */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-sm pointer-events-none">
                  <div className="px-3.5 py-2.5 rounded-2xl bg-studio-950/90 border border-cyan-400/50 backdrop-blur-md shadow-glow-sm flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-300">
                      <Film className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                        <p className="text-[9px] font-mono font-bold tracking-wider text-cyan-300 uppercase">
                          CINEMATIC PREVIEW
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-white truncate font-display">
                        A film will be played here
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-400/30">
                      4K
                    </span>
                  </div>
                </div>

                {/* Center Play/Pause Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-studio-950/80 border-2 border-cyan-400 text-cyan-300 flex items-center justify-center shadow-[0_0_35px_rgba(0,168,255,0.4)] hover:scale-110 active:scale-95 transition-all"
                  aria-label={isPlaying ? 'Pause Film' : 'Play Film'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-cyan-300" />
                  ) : (
                    <Play className="w-6 h-6 text-cyan-300 fill-cyan-300 ml-0.5" />
                  )}
                </button>

                {/* Bottom Controls Bar for Film */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2 z-20">
                  {/* Scrubber bar */}
                  <div className="w-full h-1.5 rounded-full bg-white/20 cursor-pointer overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-electric to-cyan-300 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-300">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-1 text-white hover:text-cyan-400 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      </button>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-1 text-white hover:text-cyan-400 transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      <span className="font-mono text-cyan-300">
                        {formatTime(currentTime)} / {formatTime(totalDuration)}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-400/30">
                      4K CINEMATIC FILM
                    </span>
                  </div>
                </div>
              </>
            )
          ) : (
            /* Photography / Photo Mode */
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover select-none"
            />
          )}

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-studio-950/70 border border-white/20 text-white hover:bg-cyan-500 hover:text-black transition-all"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-studio-950/70 border border-white/20 text-white hover:bg-cyan-500 hover:text-black transition-all"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Resolution Badge */}
          {!isFilm && (
            <div className="absolute bottom-4 left-4 px-3 py-1 rounded-md bg-studio-950/80 border border-cyan-400/40 backdrop-blur-md text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{item.resolution}</span>
            </div>
          )}
        </div>

        {/* Project Metadata & Details (Right / Bottom) */}
        <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] lg:max-h-[90vh]">
          <div>
            {/* Category Pill */}
            <div className="flex items-center gap-2 mb-3">
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                {item.category}
              </div>
              {isFilm && (
                <span className="px-2.5 py-0.5 rounded-full bg-studio-950 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 font-semibold">
                  VIDEO
                </span>
              )}
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

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between gap-3 text-xs text-slate-400">
            <span>Verified Production</span>
            {onOpenQuote && (
              <button
                onClick={() => {
                  onClose();
                  onOpenQuote();
                }}
                className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-electric to-electric-glow shadow-glow-sm hover:shadow-glow-md transition-all border border-cyan-300/30"
              >
                Inquire Project
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
