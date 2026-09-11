import React from 'react';
import { motion } from 'framer-motion';
import { Stats } from './Stats';
import { Sparkles } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section
      id="trust-anchor"
      className="relative w-full text-white pt-12 sm:pt-16 pb-12 sm:pb-14 flex flex-col items-center bg-studio-950 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="w-full flex flex-col items-center"
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25 mb-4 shadow-glow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-cyan-300 uppercase">
            WHY CHOOSE US
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-center max-w-4xl px-4 leading-[1.1] font-display">
          Trusted by{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-electric-glow to-cyan-300">
            Happy Couples &amp; Clients
          </span>
        </h2>

        {/* Supporting Text */}
        <p className="mt-4 text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl text-center px-4 leading-relaxed font-light">
          From weddings to events, our passion for capturing beautiful moments has earned the trust of hundreds of families.
        </p>

        {/* Statistics 4-column layout */}
        <div className="w-full mt-10">
          <Stats />
        </div>
      </motion.div>
    </section>
  );
};
