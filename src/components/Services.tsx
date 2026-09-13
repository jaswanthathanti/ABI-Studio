import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import type { ServiceItem } from '../data/servicesData';
import {
  Tv,
  Camera,
  Video,
  BookOpen,
  Heart,
  PartyPopper,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';
import { ServiceModal } from './ServiceModal';
import { useSiteContent } from '../sanity/useSiteContent';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { content } = useSiteContent();
  const displayServices = content.services && content.services.length > 0 ? content.services : servicesData;
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Tv':
        return <Tv className="w-4 h-4 text-cyan-400" />;
      case 'Camera':
        return <Camera className="w-4 h-4 text-cyan-400" />;
      case 'Video':
        return <Video className="w-4 h-4 text-cyan-400" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-cyan-400" />;
      case 'Heart':
        return <Heart className="w-4 h-4 text-cyan-400" />;
      case 'PartyPopper':
        return <PartyPopper className="w-4 h-4 text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
      default:
        return <Camera className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="scroll-mt-24 relative pt-12 sm:pt-16 pb-24 sm:pb-28 bg-studio-950 overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-electric/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/25 mb-4 shadow-glow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase">
              OUR SERVICES
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display">
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan-400 to-electric-light">Offer</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto">
            Everything you need for your special day • Click any service card to view complete coverage &amp; details
          </p>
        </div>

        {/* Responsive Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayServices.map((service, idx) => (
            <div
              key={service.id ? `${service.id}-${idx}` : `${service.title}-${service.number}-${idx}`}
              onClick={() => setSelectedServiceForModal(service)}
              className="group relative rounded-3xl bg-studio-900/80 border border-white/10 hover:border-cyan-400/50 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-15px_rgba(0,168,255,0.25)] flex flex-col justify-between cursor-pointer overflow-hidden select-none"
            >
              {/* Subtle blue accent corner glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 group-hover:bg-cyan-500/20 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

              <div>
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-5 border border-white/10 group-hover:border-cyan-400/30 transition-colors pointer-events-none">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-studio-950/90 via-studio-950/30 to-transparent" />

                  {/* Corner Number Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-lg bg-studio-950/80 border border-cyan-400/30 backdrop-blur-md">
                    <span className="text-[11px] font-mono font-bold text-cyan-400">
                      {service.number}
                    </span>
                  </div>

                  {/* Service Icon floating badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-studio-900/90 border border-white/10 backdrop-blur-md">
                    {getIcon(service.iconName)}
                    <span className="text-[11px] font-semibold text-white tracking-wide">
                      {service.category}
                    </span>
                  </div>

                  {/* Hover "Click for Details" pill */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-studio-950/40">
                    <div className="px-3.5 py-1.5 rounded-full bg-studio-950/90 border border-cyan-400 text-cyan-300 text-[11px] font-bold flex items-center gap-1.5 shadow-glow-sm transform scale-95 group-hover:scale-100 transition-transform">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>View Details</span>
                    </div>
                  </div>
                </div>

                {/* Card Title & Action Button */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 font-display leading-snug">
                    {service.title}
                  </h3>

                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-studio-800/80 border border-white/15 text-slate-300 group-hover:bg-cyan-400 group-hover:text-black group-hover:border-cyan-400 group-hover:shadow-glow-sm transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <p className="mt-2.5 text-slate-300 text-sm leading-relaxed font-light line-clamp-2">
                  {service.description}
                </p>

                {/* Feature Pills */}
                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
                  {service.features.slice(0, 4).map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 text-[11px] text-slate-300 truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA prompt */}
              <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-cyan-400 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  View full coverage &amp; scope
                </span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action: Explore All Services — links to /services page (identical to project/gallery section) */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <Link
            to="/services"
            className="group px-7 py-3 rounded-full text-sm font-semibold text-white bg-studio-900 border border-cyan-500/30 hover:border-cyan-400 hover:shadow-glow-sm transition-all duration-300 flex items-center gap-2.5 hover:scale-105"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>

      {/* Interactive Service Detail Modal */}
      <ServiceModal
        service={selectedServiceForModal}
        isOpen={!!selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onBookService={(serviceTitle) => onSelectService(serviceTitle)}
      />
    </section>
  );
};
