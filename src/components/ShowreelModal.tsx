import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);

  const segments = [
    { title: 'Arena LED Video Walls', time: '0:00 - 0:45', image: '/assets/gallery/gallery-arena.jpg' },
    { title: 'Aura Hypercar Anamorphic Commercial', time: '0:45 - 1:30', image: '/assets/gallery/gallery-auto.jpg' },
    { title: 'Keynote 8K Curved Staging', time: '1:30 - 2:10', image: '/assets/gallery/gallery-summit.jpg' },
    { title: 'Valkyrie Medium Format Editorial', time: '2:10 - 2:50', image: '/assets/gallery/gallery-fashion.jpg' },
  ];

  useEffect(() => {
    let interval: any;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setActiveSegmentIndex((prev) => (prev + 1) % segments.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, segments.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-studio-950/95 backdrop-blur-2xl animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl rounded-3xl bg-studio-900 border border-cyan-500/30 shadow-[0_0_80px_-10px_rgba(0,168,255,0.4)] overflow-hidden flex flex-col">
        {/* Top bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-studio-950/80">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-white tracking-wider">
              LED's &amp; ABI STUDIO • 2026 4K CINEMATIC REEL
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-studio-800 text-slate-300 hover:text-white hover:bg-studio-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Simulation Canvas */}
        <div className="relative aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center">
          <img
            src={segments[activeSegmentIndex].image}
            alt={segments[activeSegmentIndex].title}
            className="w-full h-full object-cover transition-all duration-1000 transform scale-105"
          />

          {/* Cinematic overlay vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Active Segment Badge */}
          <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-studio-950/85 border border-cyan-400/40 backdrop-blur-md">
            <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
              Now Playing • {segments[activeSegmentIndex].time}
            </p>
            <h4 className="text-base sm:text-lg font-bold text-white font-display">
              {segments[activeSegmentIndex].title}
            </h4>
          </div>

          {/* Center Play/Pause toggle overlay */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-studio-950/70 border border-cyan-400/60 text-cyan-300 flex items-center justify-center shadow-glow-sm hover:scale-110 transition-transform"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          {/* Bottom Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-studio-950 to-transparent flex flex-col gap-3">
            {/* Scrubber Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden flex cursor-pointer">
              {segments.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveSegmentIndex(idx)}
                  className={`h-full flex-1 transition-all ${
                    idx === activeSegmentIndex
                      ? 'bg-cyan-400 shadow-glow-sm'
                      : idx < activeSegmentIndex
                      ? 'bg-cyan-600'
                      : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isMuted ? 'Muted' : 'Audio On'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <span className="font-mono text-cyan-400">4K DCI • 60 FPS • MASTER HDR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
