import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Quote,
  Sparkles,
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { testimonialsData } from '../data/testimonialsData';
import { faqData, faqCategories } from '../data/faqData';
import type { FAQItem } from '../data/faqData';
import { useSiteContent } from '../sanity/useSiteContent';

interface ReviewsAndFAQProps {
  onOpenQuote?: () => void;
}

export const ReviewsAndFAQ: React.FC<ReviewsAndFAQProps> = ({ onOpenQuote }) => {
  const { content } = useSiteContent();
  const displayTestimonials = content.testimonials && content.testimonials.length > 0 ? content.testimonials : testimonialsData;
  const displayFaqs = content.faqs && content.faqs.length > 0 ? content.faqs : faqData;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs =
    activeCategory === 'all'
      ? displayFaqs
      : displayFaqs.filter((item) => item.category === activeCategory);

  // Duplicate testimonials for continuous seamless infinite loop
  const rollingTestimonials = [...displayTestimonials, ...displayTestimonials];

  return (
    <section
      id="reviews-faq"
      className="relative py-20 sm:py-28 bg-studio-950 overflow-hidden"
    >
      {/* Anchors for navbar / footer links */}
      <div id="reviews" className="absolute -top-24 pointer-events-none" />

      {/* Ambient background lighting */}
      <div className="absolute top-1/4 -right-36 w-96 h-96 bg-electric/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-2/3 -left-36 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* ================================================================ */}
      {/* PART 1: ROLLING FEEDBACKS / TESTIMONIALS                         */}
      {/* ================================================================ */}
      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/25 mb-4 shadow-glow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase">
              CLIENT STORIES &amp; REVIEWS
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display">
            What Our Clients{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan-400 to-electric-light">
              Say
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto">
            Real stories and heartfelt reviews from families and couples who trusted us with their once-in-a-lifetime moments.
          </p>
        </div>

        {/* Rolling Marquee Ticker */}
        <div className="relative w-full overflow-hidden marquee-container py-4">
          {/* Left & Right Gradient Shadows for seamless edge fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-44 bg-gradient-to-r from-studio-950 via-studio-950/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-44 bg-gradient-to-l from-studio-950 via-studio-950/80 to-transparent z-20 pointer-events-none" />

          {/* Continuous rolling track */}
          <div className="animate-marquee flex items-stretch">
            {rollingTestimonials.map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${idx}`}
                className="w-[310px] sm:w-[380px] shrink-0 mx-3 group relative rounded-3xl bg-studio-900/70 border border-white/10 hover:border-cyan-400/50 backdrop-blur-xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(0,168,255,0.25)] flex flex-col justify-between"
              >
                {/* Floating quote badge */}
                <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center shadow-glow-sm">
                  <Quote className="w-3.5 h-3.5 text-cyan-400" />
                </div>

                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-accent fill-amber-accent"
                      />
                    ))}
                  </div>

                  {/* Quote content */}
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light italic">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{testimonial.role}</p>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/25 text-cyan-300 text-[10px] font-semibold whitespace-nowrap">
                      {testimonial.event}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Small Ticker Info Badge */}
        <div className="text-center mt-3 mb-6">
          <p className="text-xs text-slate-400 font-light flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Hover any card to pause scrolling • Consistently rated 5 stars</span>
          </p>
        </div>
      </div>

      {/* ================================================================ */}
      {/* SEAMLESS DIVIDER: Merging Reviews into FAQ                        */}
      {/* ================================================================ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 my-14 sm:my-18 relative z-10">
        <div className="relative flex items-center justify-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          <span className="absolute px-4 py-1 rounded-full bg-studio-900 border border-cyan-400/20 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase shadow-glow-sm">
            HAVE QUESTIONS? WE'VE GOT ANSWERS
          </span>
        </div>
      </div>

      {/* ================================================================ */}
      {/* PART 2: FREQUENTLY ASKED QUESTIONS                               */}
      {/* ================================================================ */}
      <div id="faq" className="scroll-mt-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* FAQ Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan-400 to-electric-light">
              Questions
            </span>
          </h3>

          <p className="mt-3 text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            Everything you need to know about our photography packages, LED screen rentals, booking timelines, and custom deliverables.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
          {faqCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? 'bg-gradient-to-r from-electric to-electric-glow text-white border-cyan-300/40 shadow-glow-sm scale-[1.03]'
                    : 'bg-studio-900/60 text-slate-400 border-white/10 hover:border-cyan-400/30 hover:text-white hover:bg-studio-800/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 sm:space-y-4">
          {filteredFaqs.map((item: FAQItem) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`rounded-2xl transition-all duration-300 border backdrop-blur-md overflow-hidden ${
                  isOpen
                    ? 'bg-studio-900/80 border-cyan-400/40 shadow-[0_4px_25px_rgba(0,168,255,0.12)]'
                    : 'bg-studio-900/40 border-white/10 hover:border-white/20 hover:bg-studio-900/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-2xl"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 pr-2">
                    <div
                      className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-colors duration-300 ${
                        isOpen
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                          : 'bg-white/5 text-slate-400 border border-white/10'
                      }`}
                    >
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-200 ${
                        isOpen ? 'text-white' : 'text-slate-200'
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-transform duration-300 border ${
                      isOpen
                        ? 'rotate-180 bg-cyan-400/20 text-cyan-300 border-cyan-400/40'
                        : 'bg-white/5 text-slate-400 border-white/10'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/5 font-light pl-16 sm:pl-20">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support & Contact Callout */}
        <div className="mt-12 sm:mt-14 rounded-3xl bg-gradient-to-r from-studio-900/90 via-studio-800/60 to-studio-900/90 border border-cyan-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0 mx-auto md:mx-0 shadow-glow-sm">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Still have questions?</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">
                Reach out anytime — our team is ready to discuss custom packages, availability, and venue setups.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            {onOpenQuote && (
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-electric to-electric-glow shadow-glow-sm hover:shadow-glow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 border border-cyan-300/30"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <a
              href="tel:+919440427791"
              className="w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-semibold text-slate-300 bg-studio-900 hover:text-white hover:bg-studio-800 border border-white/10 hover:border-cyan-400/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>+91 94404 27791</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
