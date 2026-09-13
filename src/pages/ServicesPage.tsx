import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  ShieldCheck,
  PackageCheck,
  Award,
  Zap,
  Film,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceModal } from '../components/ServiceModal';
import { useSiteContent } from '../sanity/useSiteContent';

interface ServicesPageProps {
  onOpenQuote: (serviceTitle?: string) => void;
}

const CATEGORIES = [
  'All',
  'LED Displays',
  'Photography',
  'Videography',
  'Albums',
  'Pre-Wedding',
  'Events',
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenQuote }) => {
  const { content } = useSiteContent();
  const displayServices = content.services && content.services.length > 0 ? content.services : servicesData;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredServices = selectedCategory === 'All'
    ? displayServices
    : displayServices.filter((s) => s.category === selectedCategory);

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
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
      default:
        return <Camera className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-studio-950 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-electric/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute -top-10 right-10 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/25 mb-4 shadow-glow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase">
              STUDIO CAPABILITIES &amp; EXPERTISE
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display">
            Our Specialized{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan-400 to-electric-light">
              Services
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
            From 4K multi-camera wedding cinematography and heirloom flush-mount albums to stadium-grade LED video walls. Discover our full scope of event production and creative storytelling.
          </p>

          {/* Quick Value Metrics Ribbon */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="px-4 py-3 rounded-2xl bg-studio-900/80 border border-white/10 backdrop-blur-md text-center">
              <span className="text-cyan-400 font-mono font-bold text-lg sm:text-xl">6 Disciplines</span>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">End-to-End Production</p>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-studio-900/80 border border-white/10 backdrop-blur-md text-center">
              <span className="text-cyan-400 font-mono font-bold text-lg sm:text-xl">3840Hz+</span>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Flicker-Free LED Screens</p>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-studio-900/80 border border-white/10 backdrop-blur-md text-center">
              <span className="text-cyan-400 font-mono font-bold text-lg sm:text-xl">48 Hours</span>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Teaser Photo Delivery</p>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-studio-900/80 border border-white/10 backdrop-blur-md text-center">
              <span className="text-cyan-400 font-mono font-bold text-lg sm:text-xl">100% Custom</span>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Tailored Bundled Quotes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="sticky top-[64px] z-30 bg-studio-950/90 backdrop-blur-xl border-b border-white/5 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2.5 overflow-x-auto hide-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-electric to-electric-glow text-white shadow-glow-sm border border-cyan-300/40'
                  : 'bg-studio-900/60 border border-white/10 text-slate-400 hover:text-white hover:border-white/25'
              }`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Services Listing Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-studio-950">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div layout className="space-y-10">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id || service.number}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="group relative rounded-3xl bg-studio-900/80 border border-white/10 hover:border-cyan-400/50 backdrop-blur-xl p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-[0_20px_55px_-15px_rgba(0,168,255,0.2)] overflow-hidden"
                >
                  {/* Subtle Ambient Corner Light */}
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 group-hover:bg-cyan-500/20 rounded-full blur-3xl pointer-events-none transition-all duration-500" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* Left Column: Visual Image & Badges (5 cols) */}
                    <div className="lg:col-span-5 space-y-4">
                      <div
                        onClick={() => setSelectedServiceForModal(service)}
                        className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group-hover:border-cyan-400/40 transition-colors cursor-pointer shadow-lg"
                      >
                        <img
                          src={service.image}
                          alt={service.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-studio-950/90 via-studio-950/20 to-transparent" />

                        {/* Top Left Service Number Badge */}
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-studio-950/85 border border-cyan-400/30 backdrop-blur-md">
                          <span className="text-xs font-mono font-bold text-cyan-400">
                            SERVICE {service.number}
                          </span>
                        </div>

                        {/* Hover Prompt */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-studio-950/40">
                          <div className="px-4 py-2 rounded-full bg-studio-950/90 border border-cyan-400 text-cyan-300 text-xs font-bold flex items-center gap-2 shadow-glow-sm transform scale-95 group-hover:scale-100 transition-transform">
                            <Layers className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Inspect Full Coverage</span>
                          </div>
                        </div>

                        {/* Bottom Tag */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1 rounded-xl bg-studio-900/90 border border-white/15 backdrop-blur-md">
                          {getServiceIcon(service.iconName)}
                          <span className="text-xs font-semibold text-white tracking-wide">
                            {service.category}
                          </span>
                        </div>
                      </div>

                      {/* Scope & Team Meta Badges */}
                      <div className="flex flex-wrap gap-2 text-xs">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-studio-950/80 border border-white/10 text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{service.durationOrScope}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-studio-950/80 border border-white/10 text-slate-300">
                          <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{service.teamSize}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: In-Depth Service Information (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                      <div>
                        {/* Eyebrow & Title */}
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                            {service.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                            Guaranteed Quality
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display">
                          {service.title}
                        </h2>

                        <p className="mt-1 text-sm sm:text-base text-cyan-300/90 font-medium">
                          {service.tagline}
                        </p>

                        <p className="mt-3 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                          {service.description}
                        </p>

                        {/* What's Covered Preview */}
                        <div className="mt-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">
                              What Is Covered in this Service
                            </h3>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {service.whatIsCovered.slice(0, 4).map((item, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl bg-studio-950/60 border border-white/5 flex items-start gap-2.5"
                              >
                                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs font-semibold text-white leading-snug">
                                    {item.title}
                                  </p>
                                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Deliverables Summary */}
                        {service.deliverables && service.deliverables.length > 0 && (
                          <div className="mt-5 p-4 rounded-2xl bg-cyan-950/25 border border-cyan-400/20">
                            <div className="flex items-center gap-2 mb-2">
                              <PackageCheck className="w-4 h-4 text-cyan-400" />
                              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                                Key Deliverables
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {service.deliverables.map((deliv, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-studio-950/70 border border-white/10 text-xs text-slate-300"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                  {deliv}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action CTA Buttons */}
                      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                        <button
                          onClick={() => onOpenQuote(service.title)}
                          className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-electric to-electric-glow shadow-glow-sm hover:shadow-glow-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-cyan-300/40"
                        >
                          <span>Get a Quote for this Service</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setSelectedServiceForModal(service)}
                          className="w-full sm:w-auto px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-studio-900 border border-white/10 hover:border-cyan-400/50 hover:bg-studio-800 transition-all flex items-center justify-center gap-2"
                        >
                          <Layers className="w-4 h-4 text-cyan-400" />
                          <span>View Full Scope &amp; Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredServices.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg">No services found in this category.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-4 px-5 py-2 rounded-full bg-studio-900 border border-white/10 text-cyan-400 hover:border-cyan-400 text-xs font-semibold"
              >
                Reset to All Services
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Technical Edge & Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-studio-900/50 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/25 mb-4 shadow-glow-sm">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase">
                THE STUDIO STANDARD
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              Why Couples &amp; Planners Trust{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan-400 to-electric-light">
                LED's &amp; ABI Studio
              </span>
            </h2>
            <p className="mt-3 text-slate-300 font-light text-sm sm:text-base">
              We combine cutting-edge cinema gear, stadium-grade audiovisual hardware, and artistic dedication into a seamless, stress-free experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-studio-950/80 border border-white/10 hover:border-cyan-400/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-5 shadow-glow-sm group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-2">
                3840Hz+ Anti-Flicker
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Ultra-high refresh rates guarantee zero black bars, scan lines, or moiré patterns in your photos and wedding video recordings.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-studio-950/80 border border-white/10 hover:border-cyan-400/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-5 shadow-glow-sm group-hover:scale-110 transition-transform">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-2">
                4K Cinema Prime Glass
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Shot on top-tier cinematic camera bodies with fast prime lenses for breathtaking bokeh, warm natural skin tones, and rich dynamic range.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-studio-950/80 border border-white/10 hover:border-cyan-400/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-5 shadow-glow-sm group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-2">
                Dual Redundancy Safety
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Simultaneous dual-card recording on all cameras, multi-channel backup audio, and redundant hard drive storage safeguard your once-in-a-lifetime memories.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-studio-950/80 border border-white/10 hover:border-cyan-400/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-5 shadow-glow-sm group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-2">
                Unified Team Synergy
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Photographers, filmmakers, and LED technicians work from one playbook — eliminating lighting clashes, blocked angles, and communication gaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Walkthrough */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-studio-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              How We Work With You
            </h2>
            <p className="mt-3 text-slate-300 font-light text-sm sm:text-base">
              A transparent, hassle-free 4-step journey from initial concept to timeless delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="p-6 rounded-2xl bg-studio-900/60 border border-white/10 relative">
              <span className="text-3xl font-black font-mono text-cyan-400/30 absolute top-4 right-4">
                01
              </span>
              <h3 className="text-lg font-bold text-white mb-2">1. Consultation &amp; Vision</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                We listen to your vision, ceremony timeline, venue dimensions, and specific creative preferences over coffee or video call.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-studio-900/60 border border-white/10 relative">
              <span className="text-3xl font-black font-mono text-cyan-400/30 absolute top-4 right-4">
                02
              </span>
              <h3 className="text-lg font-bold text-white mb-2">2. Custom Package &amp; Prep</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                We craft a tailored scope fitting your budget, organize shotlists, scout lighting, and test venue power requirements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-studio-900/60 border border-white/10 relative">
              <span className="text-3xl font-black font-mono text-cyan-400/30 absolute top-4 right-4">
                03
              </span>
              <h3 className="text-lg font-bold text-white mb-2">3. Flawless Execution</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Our team arrives early with dedicated leads for photography, cinema, and LED operation, capturing every moment unobtrusively.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-studio-900/60 border border-white/10 relative">
              <span className="text-3xl font-black font-mono text-cyan-400/30 absolute top-4 right-4">
                04
              </span>
              <h3 className="text-lg font-bold text-white mb-2">4. Master Delivery</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Receive teaser photos within 48 hours, followed by signature color-graded films, cloud galleries, and handcrafted flush-mount albums.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mini CTA */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-studio-950 via-studio-900/60 to-studio-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
            Have a Celebration in Mind?
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base font-light max-w-xl mx-auto">
            Contact us today for availability and a customized quotation tailored to your celebration dates and venue.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuote()}
              className="w-full sm:w-auto group px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-electric to-electric-glow shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-cyan-300/40"
            >
              <span>Request a Custom Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>

            <Link
              to="/gallery"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-studio-900 border border-white/15 hover:border-cyan-400/60 transition-all flex items-center justify-center gap-2"
            >
              <span>View Portfolio Gallery</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Service Detail Modal */}
      <ServiceModal
        service={selectedServiceForModal}
        isOpen={!!selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onBookService={(serviceTitle) => onOpenQuote(serviceTitle)}
      />
    </>
  );
};
