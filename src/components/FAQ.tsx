import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { faqData, faqCategories } from '../data/faqData';
import type { FAQItem } from '../data/faqData';

interface FAQProps {
  onOpenQuote?: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenQuote }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']); // First item open by default

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs =
    activeCategory === 'all'
      ? faqData
      : faqData.filter((item) => item.category === activeCategory);

  return (
    <section id="faq" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-studio-950 overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-electric/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/25 mb-4 shadow-glow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase">
              GOT QUESTIONS?
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan-400 to-electric-light">
              Questions
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto">
            Everything you need to know about our photography packages, LED screen rentals, booking timelines, and custom deliverables.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
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
        <div className="space-y-4">
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
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-studio-900/90 via-studio-800/60 to-studio-900/90 border border-cyan-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-xl">
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
