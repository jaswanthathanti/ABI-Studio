import React from 'react';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-studio-950 border-t border-white/10 pt-20 pb-12 overflow-hidden text-slate-300">
      {/* Background radial blue glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 flex items-center justify-center rounded border border-cyan-400/50 bg-studio-900/80 text-cyan-400">
                <span className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-cyan-300" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 border-t border-r border-cyan-300" />
                <span className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 border-b border-l border-cyan-300" />
                <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-cyan-300" />
                <span className="w-2 h-2 rounded-sm bg-cyan-400 animate-pulse" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                LED's &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan-400 to-electric-light">
                  ABI Studio
                </span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-light">
              Your trusted partner for wedding photography, cinematic films, LED screen rentals, photo albums, and event coverage. Capturing your precious moments with love and artistry.
            </p>

            {/* Social Icons (SVG) */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-studio-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-glow-sm transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-studio-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-glow-sm transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-studio-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-glow-sm transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-studio-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-glow-sm transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><a href="/#services" className="hover:text-cyan-400 transition-colors">Services</a></li>
              <li><Link to="/gallery" className="hover:text-cyan-400 transition-colors">Gallery</Link></li>
              <li><a href="/#about" className="hover:text-cyan-400 transition-colors">About</a></li>
              <li><a href="/#faq" className="hover:text-cyan-400 transition-colors">FAQ</a></li>
              <li><a href="/#cta" className="hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/#services" className="hover:text-cyan-400 transition-colors">Wedding Photography</a></li>
              <li><a href="/#services" className="hover:text-cyan-400 transition-colors">Wedding Films</a></li>
              <li><a href="/#services" className="hover:text-cyan-400 transition-colors">LED Screen Rentals</a></li>
              <li><a href="/#services" className="hover:text-cyan-400 transition-colors">Photo Albums</a></li>
              <li><a href="/#services" className="hover:text-cyan-400 transition-colors">Pre-Wedding Shoots</a></li>
              <li><a href="/#services" className="hover:text-cyan-400 transition-colors">Event Coverage</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Studio
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>ABI Studio, Creative District</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-300">contact@abistudio.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:+919440427791" className="text-slate-300 hover:text-cyan-400 transition-colors">+91 94404 27791</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} LED's &amp; ABI Studio. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">Privacy Policy</span>
            <span className="text-slate-400">Terms of Service</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-cyan-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
