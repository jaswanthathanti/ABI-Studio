import React, { useState } from 'react';
import { equipmentData, equipmentCategories } from '../data/equipmentData';
import { Sparkles, ArrowRight } from 'lucide-react';

interface EquipmentProps {
  onInquire: (productName: string) => void;
}

export const EquipmentShowcase: React.FC<EquipmentProps> = ({ onInquire }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredEquipment = activeCategory === 'All'
    ? equipmentData
    : equipmentData.filter((item) => item.category === activeCategory);

  return (
    <section id="equipment" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-studio-950/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-electric/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/30 mb-4 shadow-glow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase">
              STUDIO SHOWROOM &amp; HARDWARE
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display">
            Built With <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan-400 to-electric-light">Professional Tools</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light">
            State-of-the-art capture systems and ultra-fine pitch LED displays engineered for zero compromise.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto hide-scrollbar pb-4 mb-12">
          {equipmentCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-electric to-electric-glow text-white shadow-glow-sm border border-cyan-300/40'
                  : 'bg-studio-900/80 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Equipment Showroom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl bg-studio-900/60 border border-white/10 hover:border-cyan-400/50 backdrop-blur-xl p-6 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Top Status & Category */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-400/30 text-[11px] font-semibold text-cyan-300 uppercase tracking-wider">
                    {item.category}
                  </span>

                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-mono text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{item.status}</span>
                  </span>
                </div>

                {/* Showroom Product Display Pedestal */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-6 bg-gradient-to-b from-studio-950 to-studio-900 flex items-center justify-center p-4 border border-white/5 group-hover:border-cyan-400/30 transition-colors">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                  />

                  {/* Hexagonal Illuminated Pedestal Base Simulation */}
                  <div className="absolute bottom-0 inset-x-4 h-3 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent blur-sm group-hover:via-cyan-300 transition-all duration-300" />
                  <div className="absolute bottom-0 inset-x-8 h-[2px] bg-cyan-400 shadow-[0_0_15px_#00A8FF]" />

                  {/* Flagship Product Star Badge */}
                  {item.isFlagship && (
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-amber-accent to-amber-glow text-black text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                      Flagship Product
                    </div>
                  )}
                </div>

                {/* Product Name & Tagline */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
                  {item.tagline}
                </p>

                {/* Technical Specifications */}
                <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                  {item.specs.map((s, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{s.label}</span>
                      <span className="font-semibold text-slate-200">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => onInquire(item.name)}
                  className="w-full py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-studio-800/80 group-hover:bg-gradient-to-r group-hover:from-electric group-hover:to-electric-glow border border-white/10 group-hover:border-cyan-300/40 transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-glow-sm"
                >
                  <span>Book Equipment / Staging</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
