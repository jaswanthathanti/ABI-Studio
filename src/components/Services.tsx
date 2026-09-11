import React, { useState, useRef, useEffect } from 'react';
import { servicesData } from '../data/servicesData';
import type { ServiceItem } from '../data/servicesData';
import {
  Tv,
  Camera,
  Video,
  BookOpen,
  Heart,
  PartyPopper,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
} from 'lucide-react';
import { ServiceModal } from './ServiceModal';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dragging & Hover states
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // High-precision float accumulator for smooth rolling without integer truncation
  const scrollPosRef = useRef(0);

  // State for UI status indicators
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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
      default:
        return <Camera className="w-4 h-4 text-cyan-400" />;
    }
  };

  // 3 duplicate sets of services for an infinite seamless loop in both directions
  const rollingServices = [...servicesData, ...servicesData, ...servicesData];

  // Initialize scroll position in the center set on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initializeScroll = () => {
      const singleSetWidth = container.scrollWidth / 3;
      if (singleSetWidth > 0 && container.scrollLeft === 0) {
        container.scrollLeft = singleSetWidth;
        scrollPosRef.current = singleSetWidth;
      }
    };

    initializeScroll();
    const timer = setTimeout(initializeScroll, 100);
    return () => clearTimeout(timer);
  }, []);

  // Continuous active auto-rolling loop
  // Rolls all the time EXCEPT when hovering the elements or dragging cards
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const scrollSpeed = 52; // pixels per second

    const step = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const container = containerRef.current;
      if (container) {
        // Roll actively all the time unless hovering or dragging
        if (!isHoveredRef.current && !isDraggingRef.current) {
          scrollPosRef.current += scrollSpeed * delta;

          const setWidth = container.scrollWidth / 3;
          if (setWidth > 0) {
            // Infinite seamless wrap
            if (scrollPosRef.current >= setWidth * 2) {
              scrollPosRef.current -= setWidth;
            } else if (scrollPosRef.current <= 0) {
              scrollPosRef.current += setWidth;
            }
          }

          container.scrollLeft = scrollPosRef.current;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Mouse Drag Handlers for manual rolling left and right
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    hasDraggedRef.current = false;
    startXRef.current = e.pageX;
    startScrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    const diff = e.pageX - startXRef.current;
    if (Math.abs(diff) > 5) {
      hasDraggedRef.current = true;
    }

    const newScrollLeft = startScrollLeftRef.current - diff;
    container.scrollLeft = newScrollLeft;
    scrollPosRef.current = newScrollLeft;

    // Boundary wrap while dragging
    const setWidth = container.scrollWidth / 3;
    if (setWidth > 0) {
      if (container.scrollLeft >= setWidth * 2) {
        container.scrollLeft -= setWidth;
        scrollPosRef.current -= setWidth;
        startScrollLeftRef.current -= setWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += setWidth;
        scrollPosRef.current += setWidth;
        startScrollLeftRef.current += setWidth;
      }
    }
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      const container = containerRef.current;
      if (container) {
        scrollPosRef.current = container.scrollLeft;
      }
    }
  };

  // Window listener to guarantee release even if mouse leaves the window
  useEffect(() => {
    const onWindowMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
        if (containerRef.current) {
          scrollPosRef.current = containerRef.current.scrollLeft;
        }
      }
    };
    window.addEventListener('mouseup', onWindowMouseUp);
    return () => window.removeEventListener('mouseup', onWindowMouseUp);
  }, []);

  // Touch Swipe Handlers for mobile & tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    hasDraggedRef.current = false;
    startXRef.current = e.touches[0].pageX;
    startScrollLeftRef.current = container.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    const diff = e.touches[0].pageX - startXRef.current;
    if (Math.abs(diff) > 5) {
      hasDraggedRef.current = true;
    }

    const newScrollLeft = startScrollLeftRef.current - diff;
    container.scrollLeft = newScrollLeft;
    scrollPosRef.current = newScrollLeft;

    const setWidth = container.scrollWidth / 3;
    if (setWidth > 0) {
      if (container.scrollLeft >= setWidth * 2) {
        container.scrollLeft -= setWidth;
        scrollPosRef.current -= setWidth;
        startScrollLeftRef.current -= setWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += setWidth;
        scrollPosRef.current += setWidth;
        startScrollLeftRef.current += setWidth;
      }
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    if (containerRef.current) {
      scrollPosRef.current = containerRef.current.scrollLeft;
    }
  };

  // Manual arrow step buttons
  const scrollManual = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    const cardStep = 390;
    const target = direction === 'left' ? container.scrollLeft - cardStep : container.scrollLeft + cardStep;

    container.scrollTo({ left: target, behavior: 'smooth' });
    scrollPosRef.current = target;
  };

  const handleCardClick = (service: ServiceItem) => {
    // If the user was dragging cards, don't trigger modal click
    if (hasDraggedRef.current) {
      return;
    }
    setSelectedServiceForModal(service);
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
    }
    if (containerRef.current) {
      scrollPosRef.current = containerRef.current.scrollLeft;
    }
  };

  return (
    <section id="services" className="relative pt-12 sm:pt-16 pb-24 sm:pb-28 bg-studio-950 overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-electric/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12">
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

          {/* Status Bar & Manual Controls */}
          <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-900/80 border border-white/10 text-xs text-slate-300 backdrop-blur-md shadow-sm">
              <span
                className={`w-2 h-2 rounded-full ${
                  isDragging
                    ? 'bg-amber-400 animate-pulse'
                    : isHovered
                    ? 'bg-amber-300'
                    : 'bg-cyan-400 animate-ping'
                }`}
              />
              <span className="font-medium">
                {isDragging
                  ? 'Dragging Cards'
                  : isHovered
                  ? 'Paused on Hover'
                  : 'Actively Rolling'}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 hidden sm:inline">Hover to pause • Drag to roll</span>
            </div>

            {/* Left & Right Step Arrow Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollManual('left')}
                className="w-8 h-8 rounded-full bg-studio-900/80 border border-white/10 hover:border-cyan-400/50 hover:bg-studio-800 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all shadow-sm active:scale-90"
                aria-label="Roll services left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollManual('right')}
                className="w-8 h-8 rounded-full bg-studio-900/80 border border-white/10 hover:border-cyan-400/50 hover:bg-studio-800 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all shadow-sm active:scale-90"
                aria-label="Roll services right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Rolling & Draggable Services Track */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Left & Right Gradient Shadows for smooth edge fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-studio-950 via-studio-950/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-studio-950 via-studio-950/80 to-transparent z-20 pointer-events-none" />

          {/* Continuous active auto-rolling container */}
          <div
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex items-stretch overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing select-none py-2 px-4 will-change-scroll"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {rollingServices.map((service, idx) => (
              <div
                key={`${service.number}-${idx}`}
                onClick={() => handleCardClick(service)}
                className="w-[310px] sm:w-[380px] shrink-0 mx-3.5 group relative rounded-3xl bg-studio-900/70 border border-white/10 hover:border-cyan-400/50 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-15px_rgba(0,168,255,0.25)] flex flex-col justify-between cursor-pointer overflow-hidden select-none"
              >
                {/* Subtle blue accent corner glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 group-hover:bg-cyan-500/20 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-5 border border-white/10 group-hover:border-cyan-400/30 transition-colors pointer-events-none">
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
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 font-display leading-snug">
                      {service.title}
                    </h3>

                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-studio-800/80 border border-white/15 text-slate-300 group-hover:bg-cyan-400 group-hover:text-black group-hover:border-cyan-400 group-hover:shadow-glow-sm transition-all duration-300 shrink-0">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <p className="mt-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed font-light line-clamp-2">
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
        </div>

        {/* Small Ticker Hint Badge */}
        <div className="text-center mt-3">
          <p className="text-xs text-slate-400 font-light flex items-center justify-center gap-2">
            <MoveHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Hover any card to pause • Drag left or right to roll manually</span>
          </p>
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
