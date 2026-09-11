import React from 'react';
import { ArrowRight, Sparkles, Camera, Heart, Award, Tv, Quote, CheckCircle2, Calendar } from 'lucide-react';

interface AboutStudioProps {
  onMeetStudio: () => void;
}

export const AboutStudio: React.FC<AboutStudioProps> = ({ onMeetStudio }) => {
  const experienceCards = [
    {
      icon: <Award className="w-5 h-5 text-cyan-400" />,
      highlight: '10+ Years',
      title: 'Craft & Dedication',
      desc: 'Mastering natural light, authentic candid emotions, and cinematic wedding aesthetics.',
    },
    {
      icon: <Heart className="w-5 h-5 text-cyan-400" />,
      highlight: '500+ Weddings',
      title: 'Love Stories Told',
      desc: 'Trusted by families across destinations and sacred traditions to preserve their memories.',
    },
    {
      icon: <Tv className="w-5 h-5 text-cyan-400" />,
      highlight: 'LED & Tech Setup',
      title: 'Visual Innovation',
      desc: 'Pioneering integration of flicker-free high-definition LED stage walls with live coverage.',
    },
    {
      icon: <Camera className="w-5 h-5 text-cyan-400" />,
      highlight: 'Full-Spectrum',
      title: 'End-to-End Excellence',
      desc: 'From 4K cinematic film teasers and drone shots to heirloom handcrafted luxury albums.',
    },
  ];

  const skillPills = [
    'Candid Photography',
    'Cinematic Wedding Films',
    'Pre-Wedding Shoots',
    'LED Stage Coordination',
    'Drone Aerial 4K',
    'Heirloom Albums',
  ];

  return (
    <section id="about" className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-studio-950 overflow-hidden">
      {/* Dynamic ambient background lighting shining through frosted glass */}
      <div className="absolute top-1/4 -left-36 w-96 h-96 bg-electric/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-36 w-96 h-96 bg-cyan-400/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Glassmorphic Photographer Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-2 sm:p-3 bg-white/[0.03] backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,168,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] group overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/assets/photographer.jpg"
                  alt="Abi - Lead Wedding Photographer & Founder"
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-studio-950/25 to-transparent" />
              </div>

              {/* Floating Glass Top Badge */}
              <div className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full bg-studio-950/70 backdrop-blur-xl border border-cyan-400/40 shadow-glow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono font-bold text-cyan-300">10+ Years Experience</span>
              </div>

              {/* Floating Glass Bottom Persona Card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 sm:p-5 rounded-2xl bg-studio-900/75 backdrop-blur-2xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-white font-display">Abi</h4>
                      <span className="text-cyan-400 text-xs font-medium">✓ Verified Artist</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">Lead Photographer &amp; Creative Director</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-accent text-xs font-bold">
                      <span>★</span>
                      <span>4.9 / 5.0</span>
                    </div>
                    <span className="text-[10px] text-slate-400">1,000+ Happy Clients</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cyan glowing corner accents */}
            <div className="absolute -top-2.5 -left-2.5 w-10 h-10 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-xl pointer-events-none" />
            <div className="absolute -bottom-2.5 -right-2.5 w-10 h-10 border-b-2 border-r-2 border-cyan-400/60 rounded-br-xl pointer-events-none" />
          </div>

          {/* Right Column: Shortened Bio, Glass Experience Cards & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Main Glass Card Container */}
            <div className="rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)]">
              {/* Section Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 mb-4 shadow-glow-sm self-start">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase">
                  MEET THE PHOTOGRAPHER
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display leading-tight">
                Behind the Lens:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan-400 to-electric-light">
                  Abi
                </span>
              </h2>

              {/* Concise, Shortened Bio Description */}
              <p className="mt-4 text-slate-200 text-sm sm:text-base leading-relaxed font-light">
                Hi, I'm <strong className="text-white font-semibold">Abi</strong>, founder and lead visual artist at <strong className="text-white font-semibold">LED's &amp; ABI Studio</strong>. For over a decade, we've blended candid emotional storytelling with cutting-edge LED production to turn once-in-a-lifetime celebrations into timeless cinematic art.
              </p>

              {/* Glassmorphic Quote Bar */}
              <div className="mt-4 p-3.5 rounded-2xl bg-cyan-500/[0.07] backdrop-blur-xl border border-cyan-400/25 relative flex items-center gap-3 shadow-[inset_0_1px_0_rgba(0,168,255,0.2)]">
                <Quote className="w-4 h-4 text-cyan-400 shrink-0" />
                <p className="text-xs sm:text-sm text-cyan-200/90 italic leading-snug">
                  "A photograph is a time machine to exactly how your heart felt in that fleeting second."
                </p>
              </div>

              {/* Glassmorphism Experience Cards (2x2 Grid) */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {experienceCards.map((card, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-5px_rgba(0,168,255,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-studio-800/80 border border-cyan-500/25 group-hover:border-cyan-400 group-hover:shadow-glow-sm transition-all shrink-0">
                        {card.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-cyan-400 block leading-tight">
                          {card.highlight}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                          {card.title}
                        </h4>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Frosted Glass Specialty Pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {skillPills.map((pill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-cyan-400/30 text-slate-300 text-xs font-medium transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onMeetStudio}
                  className="group px-6 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-electric to-electric-glow shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-cyan-300/40"
                >
                  <span>Check Availability &amp; Book</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <a
                  href="#gallery"
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-cyan-400/50 transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Explore Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
