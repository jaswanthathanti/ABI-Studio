import React, { useEffect } from 'react';
import type { ServiceItem } from '../data/servicesData';
import {
  X,
  CheckCircle2,
  Sparkles,
  Clock,
  Users,
  ArrowRight,
  Tv,
  Camera,
  Video,
  BookOpen,
  Heart,
  PartyPopper,
  PackageCheck,
  ShieldCheck
} from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBookService: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  isOpen,
  onClose,
  onBookService,
}) => {
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

  if (!isOpen || !service) return null;

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Tv':
        return <Tv className="w-5 h-5 text-cyan-400" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-cyan-400" />;
      case 'Video':
        return <Video className="w-5 h-5 text-cyan-400" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-cyan-400" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-cyan-400" />;
      case 'PartyPopper':
        return <PartyPopper className="w-5 h-5 text-cyan-400" />;
      default:
        return <Camera className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handleBook = () => {
    onBookService(service.title);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-studio-950/90 backdrop-blur-2xl animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] rounded-3xl bg-studio-900 border border-cyan-500/30 shadow-[0_0_70px_-15px_rgba(0,168,255,0.35)] overflow-hidden flex flex-col">
        {/* Header Bar */}
        <div className="p-6 sm:p-8 border-b border-white/10 flex items-start justify-between bg-studio-950/70 relative">
          <div className="flex items-start gap-4 pr-10">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-studio-800 border border-cyan-400/40 text-cyan-400 shrink-0 shadow-glow-sm">
              {getServiceIcon(service.iconName)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                  Service {service.number} • {service.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium hidden sm:flex">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Full Service Guarantee
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                {service.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-cyan-200/90 font-light leading-snug">
                {service.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-studio-800/80 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400 hover:bg-studio-700 transition-all shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[65vh] space-y-8">
          {/* Visual Showcase Banner with Metadata Badges */}
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg group">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-studio-950/95 via-studio-950/40 to-transparent" />

            {/* Quick Meta Chips */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-studio-950/80 border border-white/15 backdrop-blur-md text-slate-200">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{service.durationOrScope}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-studio-950/80 border border-white/15 backdrop-blur-md text-slate-200 hidden sm:flex">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{service.teamSize}</span>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-semibold backdrop-blur-md">
                100% Customized to Your Event
              </div>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              Service Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {service.description}
            </p>
          </div>

          {/* What is Covered Breakdown Grid */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h4 className="text-base sm:text-lg font-bold text-white font-display">
                What Covers in this Service
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.whatIsCovered.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-studio-950/70 border border-white/5 hover:border-cyan-500/30 transition-all duration-200 flex items-start gap-3.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white leading-snug">
                      {item.title}
                    </h5>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Package Deliverables Section */}
          <div className="p-5 sm:p-6 rounded-2xl bg-cyan-950/30 border border-cyan-400/25">
            <div className="flex items-center gap-2.5 mb-3">
              <PackageCheck className="w-5 h-5 text-cyan-400" />
              <h4 className="text-sm sm:text-base font-bold text-white font-display">
                Key Deliverables &amp; Output
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.deliverables.map((deliv, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-cyan-200/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="p-5 sm:p-6 border-t border-white/10 bg-studio-950/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            Have specific requirements or combining multiple services? We provide bundled rates.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-studio-900 border border-white/10 hover:border-white/20 transition-all flex-1 sm:flex-none text-center"
            >
              Close
            </button>
            <button
              onClick={handleBook}
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-electric to-electric-glow shadow-glow-sm hover:shadow-glow-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-cyan-300/40 flex-1 sm:flex-none"
            >
              <span>Get a Quote for this Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
