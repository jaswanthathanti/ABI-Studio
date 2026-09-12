import React from 'react';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { useSiteContent } from '../sanity/useSiteContent';

interface FinalCTAProps {
  onOpenQuote: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenQuote }) => {
  const { content } = useSiteContent();
  const finalCta = content.finalCta;
  const bulletPoints = finalCta.bulletPoints && finalCta.bulletPoints.length > 0
    ? finalCta.bulletPoints
    : ['Flexible Packages', 'Same-Day Teasers', 'LED Screen Rentals'];

  return (
    <section id="cta" className="scroll-mt-24 relative py-32 px-4 sm:px-6 lg:px-8 bg-studio-950 overflow-hidden">
      {/* Abstract LED glow & volumetric lighting simulator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-electric/25 via-cyan-400/20 to-electric-light/20 blur-[130px] rounded-full pointer-events-none -z-0" />
      
      {/* Diagonal subtle LED beam accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute -top-40 left-1/4 w-1 h-96 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent transform -rotate-45 pointer-events-none" />
      <div className="absolute -top-40 right-1/4 w-1 h-96 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent transform rotate-45 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/30 mb-6 shadow-glow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase">
            {finalCta.eyebrow || "LET'S CREATE TOGETHER"}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white font-display leading-[1.08]">
          {finalCta.headline || 'Ready to Capture Your '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan-300 to-electric-light drop-shadow-sm">
            {finalCta.headlineHighlight || 'Special Day?'}
          </span>
        </h2>

        {/* Supporting Text */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
          {finalCta.description || "Let's create beautiful memories together. From wedding photography to LED setups, we'll make your celebration truly unforgettable."}
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenQuote}
            className="group px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-electric to-electric-glow shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 border border-cyan-300/40"
          >
            <span>{finalCta.primaryButtonLabel || 'Get a Quote'}</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>

          <a
            href={`tel:${finalCta.phone || '+919440427791'}`}
            className="group px-7 py-4 rounded-full text-base font-semibold text-slate-200 bg-studio-900/80 hover:bg-studio-800 border border-white/15 hover:border-cyan-400/60 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5"
          >
            <Phone className="w-4 h-4 text-cyan-400" />
            <span>{finalCta.phone || '+91 94404 27791'}</span>
          </a>
        </div>

        {/* Rapid turnaround badge */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 font-medium">
          {bulletPoints.map((point, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-slate-600 hidden sm:inline">•</span>}
              <span className="flex items-center gap-1.5">
                {idx === 0 && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                {point}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
