import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';
import { useSiteContent } from '../sanity/useSiteContent';
import { urlForImage } from '../sanity/client';

interface HeroProps {
  onExploreClick: () => void;
  onShowreelClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onShowreelClick }) => {
  const { content } = useSiteContent();
  const hero = content.hero;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const heroBackgroundUrl = hero.backgroundImage
    ? urlForImage(hero.backgroundImage, getAssetUrl('assets/hero-studio-clean.jpg'))
    : getAssetUrl('assets/hero-studio-clean.jpg');

  return (
    <div
      id="hero"
      className="scroll-mt-24 relative w-full h-screen min-h-[700px] flex flex-col justify-between items-center select-none overflow-hidden"
    >
      {/* Background Studio Visual with Smooth Mouse Parallax */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out will-change-transform"
        style={{
          backgroundImage: `url('${heroBackgroundUrl}')`,
          transform: `scale(1.04) translate(${mousePos.x * 10}px, ${mousePos.y * 8}px)`,
        }}
      >
        {/* Subtle dynamic lighting overlay that shifts with mouse */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x * 15}% ${45 + mousePos.y * 15}%, rgba(0, 168, 255, 0.18) 0%, transparent 60%)`,
          }}
        />

        {/* Studio vignette & depth gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-transparent to-studio-950/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-studio-950/60 via-transparent to-studio-950/60 pointer-events-none" />
      </div>

      {/* Subtle pulsing electric blue ground strips & glow */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[70%] max-w-4xl h-[120px] bg-electric-glow/15 blur-3xl pointer-events-none animate-pulse-subtle -z-0" />

      {/* Top spacer to account for fixed navbar */}
      <div className="h-20 sm:h-24" />

      {/* Hero Headline Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center -mt-8 sm:-mt-12">
        {/* Small Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 backdrop-blur-md mb-3 sm:mb-4 shadow-glow-sm animate-float">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-cyan-300 uppercase">
            {hero.eyebrow || '- CAPTURING YOUR PRECIOUS MOMENTS -'}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.02] font-display drop-shadow-2xl">
          <span className="text-white">{hero.titlePrefix || "LED's & "}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-electric-glow to-cyan-300 drop-shadow-[0_0_35px_rgba(0,168,255,0.45)]">
            {hero.titleHighlight || 'ABI Studio'}
          </span>
        </h1>

        {/* Supporting Subtitle */}
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-medium text-slate-300 tracking-wider max-w-2xl drop-shadow-md">
          {hero.subtitle || 'Wedding Photography | Cinematic Films | LED Screens | Photo Albums'}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          {/* Primary Button */}
          <button
            onClick={onExploreClick}
            className="group relative px-7 py-3 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-electric to-electric-glow shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] flex items-center gap-2 border border-cyan-300/40"
          >
            <span>{hero.viewWorkLabel || 'View Our Work'}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>

          {/* Secondary Button */}
          <button
            onClick={onShowreelClick}
            className="group px-6 py-3 rounded-full text-sm sm:text-base font-semibold text-slate-200 bg-studio-950/60 hover:bg-studio-900/80 border border-cyan-500/30 hover:border-cyan-400/80 backdrop-blur-md shadow-sm hover:shadow-glow-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2.5"
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-colors duration-300">
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            </div>
            <span>{hero.showreelLabel || 'Watch Showreel'}</span>
          </button>
        </div>
      </div>

      {/* Floating Animated Scroll Mouse Indicator */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-6 flex justify-end items-end pointer-events-none">
        <a
          href="#trust-anchor"
          className="pointer-events-auto flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors duration-300 p-2 group"
          aria-label="Scroll to Trust section"
        >
          <div className="w-6 h-10 rounded-full border-2 border-slate-400 group-hover:border-cyan-400 flex items-start justify-center p-1.5 shadow-sm group-hover:shadow-glow-sm transition-all duration-300">
            <span className="w-1 h-2 bg-slate-300 group-hover:bg-cyan-400 rounded-full animate-bounce" />
          </div>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce opacity-75" />
        </a>
      </div>
    </div>
  );
};
