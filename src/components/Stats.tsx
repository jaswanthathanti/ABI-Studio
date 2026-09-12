import React from 'react';
import { Heart, Users, Clock, Star } from 'lucide-react';
import { statsData } from '../data/statsData';
import { useSiteContent } from '../sanity/useSiteContent';

export const Stats: React.FC = () => {
  const { content } = useSiteContent();
  const displayStats = content.stats && content.stats.length > 0 ? content.stats : statsData;

  const getIcon = (name: string) => {
    switch (name) {
      case 'Heart':
        return <Heart className="w-5 h-5 text-electric-glow fill-electric-glow/20" />;
      case 'Users':
        return <Users className="w-5 h-5 text-electric-glow" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-electric-glow" />;
      case 'Star':
        return <Star className="w-5 h-5 text-electric-glow fill-electric-glow/20" />;
      default:
        return <Heart className="w-5 h-5 text-electric-glow" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10 rounded-2xl bg-studio-900/40 border border-white/5 backdrop-blur-md p-4 sm:p-6 shadow-2xl">
        {displayStats.map((stat, idx) => (
          <div
            key={stat.id}
            className={`flex flex-col items-center text-center p-3 sm:p-4 group transition-transform duration-300 hover:-translate-y-1 ${
              idx === 0 ? 'pt-2' : ''
            }`}
          >
            {/* Minimal Line Icon */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-studio-800/80 border border-cyan-500/20 mb-3 group-hover:border-cyan-400 group-hover:shadow-glow-sm transition-all duration-300">
              {getIcon(stat.iconName)}
            </div>

            {/* Large Blue Number */}
            <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-electric-glow via-cyan-400 to-electric-light drop-shadow-sm font-display">
              {stat.value}
            </div>

            {/* Small Descriptive Label */}
            <div className="mt-1.5 text-xs sm:text-sm font-semibold text-slate-300 tracking-wide">
              {stat.label}
            </div>

            {stat.description && (
              <p className="mt-1 text-[11px] text-slate-400 hidden lg:block max-w-[180px] leading-tight font-normal">
                {stat.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
