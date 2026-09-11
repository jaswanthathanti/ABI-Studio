import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { testimonialsData } from '../data/testimonialsData';

export const Testimonials: React.FC = () => {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-studio-900/40 overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-electric/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-72 h-72 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/25 mb-4 shadow-glow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase">
              CLIENT REVIEWS
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display">
            What Our Clients{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan-400 to-electric-light">
              Say
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light">
            Hear from the couples and families we've had the joy of working with
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative rounded-3xl bg-studio-900/70 border border-white/10 hover:border-cyan-400/40 backdrop-blur-xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(0,168,255,0.2)] flex flex-col justify-between"
            >
              {/* Quote icon */}
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                <Quote className="w-4 h-4 text-cyan-400" />
              </div>

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-accent fill-amber-accent" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{testimonial.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{testimonial.role}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/20 text-cyan-300 text-[10px] font-semibold">
                    {testimonial.event}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
