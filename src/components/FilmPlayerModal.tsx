import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Film, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { useSiteContent } from '../sanity/useSiteContent';

interface FilmPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category?: string;
  image: string;
  videoUrl?: string;
  description?: string;
  onOpenQuote?: () => void;
}

export const FilmPlayerModal: React.FC<FilmPlayerModalProps> = ({
  isOpen,
  onClose,
  title,
  category = 'Films',
  image,
  videoUrl,
  description,
  onOpenQuote,
}) => {
  const { content } = useSiteContent();
  const settings = content.siteSettings;
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(42); // in seconds
  const totalDuration = 225; // 3:45 in seconds
  const progress = (currentTime / totalDuration) * 100;
  const playerRef = useRef<HTMLDivElement>(null);

  // Prevent background body scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC and Spacebar keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Simulated cinematic playback timer when no external video is loaded
  useEffect(() => {
    if (!isOpen || !isPlaying || videoUrl) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= totalDuration) {
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, videoUrl, totalDuration]);

  if (!isOpen) return null;

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Convert regular video URLs (YouTube, Vimeo) to embed URLs
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    try {
      // YouTube
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
      // Vimeo
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

  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;
  const isDirectVideoFile = videoUrl && (videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') || videoUrl.endsWith('.mov'));

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setCurrentTime(Math.floor((newProgress / 100) * totalDuration));
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const whatsappPhone = (settings.whatsapp || settings.phone || '+91 94404 27791').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    `Hi ABI Studio! I am interested in your cinematic film coverage for "${title}". Could you please share full details and packages?`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-studio-950/95 backdrop-blur-2xl animate-fadeIn select-none">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div
        ref={playerRef}
        className="relative z-10 w-full max-w-5xl rounded-3xl bg-studio-900 border border-cyan-500/30 shadow-[0_0_80px_-10px_rgba(0,168,255,0.4)] overflow-hidden flex flex-col max-h-[95vh]"
      >
        {/* Header Bar */}
        <div className="px-5 py-3.5 sm:py-4 border-b border-white/10 flex items-center justify-between bg-studio-950/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  CINEMATIC FILM PLAYER
                </span>
                <span className="text-white/20 hidden sm:inline">•</span>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                  {category}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md font-display">
                {title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-studio-800 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-studio-700 transition-all duration-200"
            aria-label="Close Film Player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cinematic Theater Canvas */}
        <div className="relative aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center group">
          {/* Case 1: Active Embed Video (YouTube / Vimeo) */}
          {embedUrl && !isDirectVideoFile ? (
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : isDirectVideoFile ? (
            /* Case 2: Direct MP4 / Video File */
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            /* Case 3: Cinematic Film Player Showcase Mode ("A film will be played here") */
            <>
              {/* Cover visual with smooth Ken Burns drift */}
              <img
                src={image}
                alt={title}
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  isPlaying ? 'scale-105 filter brightness-75 contrast-105' : 'scale-100 filter brightness-60'
                }`}
              />

              {/* Cinematic Vignette & Ambient Light */}
              <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-transparent to-black/60 pointer-events-none" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none" />

              {/* PROMINENT SHOWCASE BANNER: "A film will be played here" */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-lg pointer-events-none">
                <div className="px-4 py-2.5 sm:py-3 rounded-2xl bg-studio-950/85 border border-cyan-400/50 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,168,255,0.25)] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-300 shadow-glow-sm">
                    <Film className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <p className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
                        FILM SHOWCASE PREVIEW
                      </p>
                    </div>
                    <p className="text-sm sm:text-base font-black text-white tracking-tight font-display truncate">
                      A film will be played here
                    </p>
                  </div>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-400/30">
                    4K MASTER
                  </span>
                </div>
              </div>

              {/* Center Play/Pause Pulsing Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-studio-950/80 border-2 border-cyan-400 text-cyan-300 flex items-center justify-center shadow-[0_0_40px_rgba(0,168,255,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 group-hover:border-cyan-300"
                aria-label={isPlaying ? 'Pause Film' : 'Play Film'}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-300" />
                ) : (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-300 fill-cyan-300 ml-1" />
                )}
              </button>

              {/* Simulated Audio Waveform Bar (Active while playing) */}
              {isPlaying && (
                <div className="absolute bottom-20 left-6 hidden sm:flex items-end gap-1 h-6 pointer-events-none">
                  {[40, 75, 55, 90, 60, 80, 45, 95, 70, 85].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-gradient-to-t from-electric to-cyan-300 rounded-full animate-pulse"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 120}ms`,
                        animationDuration: '600ms',
                      }}
                    />
                  ))}
                  <span className="text-[10px] font-mono text-cyan-300 ml-2 tracking-widest uppercase">
                    AUDIO PLAYING
                  </span>
                </div>
              )}

              {/* Bottom Cinema Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-studio-950 via-studio-950/90 to-transparent flex flex-col gap-2.5 z-20">
                {/* Progress Scrubber Bar */}
                <div
                  onClick={handleSeek}
                  className="relative w-full h-2 rounded-full bg-white/20 hover:h-2.5 transition-all cursor-pointer group/scrubber"
                >
                  <div
                    className="h-full bg-gradient-to-r from-electric via-cyan-400 to-electric-light rounded-full relative"
                    style={{ width: `${progress}%` }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-glow-md border border-cyan-400 scale-0 group-hover/scrubber:scale-100 transition-transform" />
                  </div>
                </div>

                {/* Controls & Timecode */}
                <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded-lg text-white hover:text-cyan-400 transition-colors"
                      aria-label="Toggle Play"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 rounded-lg text-white hover:text-cyan-400 transition-colors"
                      aria-label="Toggle Audio Mute"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    {/* Timecode */}
                    <div className="font-mono text-xs font-medium text-slate-300">
                      <span className="text-cyan-400">{formatTime(currentTime)}</span>
                      <span className="mx-1 text-white/30">/</span>
                      <span>{formatTime(totalDuration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300">
                      4K CINEMA • 60 FPS
                    </span>

                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 rounded-lg text-white hover:text-cyan-400 transition-colors"
                      aria-label="Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Film Information & Direct Action Bar */}
        <div className="p-4 sm:p-6 bg-studio-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                {title}
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-slate-400">
                Cinematic Wedding Film &amp; Teaser
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {description || 'Captured in breathtaking 4K cinematic resolution with licensed emotional scores, custom cinematic color grading, and drone aerial master shots.'}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            {/* WhatsApp inquiry button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-white/15 bg-studio-900 text-slate-200 hover:text-white hover:border-emerald-400/50 hover:bg-emerald-950/30 transition-all duration-300 flex items-center justify-center gap-2 text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Full Film on WhatsApp</span>
            </a>

            {/* Book Film Coverage */}
            {onOpenQuote && (
              <button
                onClick={() => {
                  onClose();
                  onOpenQuote();
                }}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-electric to-electric-glow shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex items-center justify-center gap-2 border border-cyan-300/30"
              >
                <span>Book Film Coverage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
