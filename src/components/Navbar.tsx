import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  const navLinks = isHomePage
    ? [
        { label: 'Home', href: '#hero', type: 'anchor' as const },
        { label: 'Services', href: '#services', type: 'anchor' as const },
        { label: 'Gallery', href: '/gallery', type: 'route' as const },
        { label: 'About', href: '#about', type: 'anchor' as const },
        { label: 'FAQ', href: '#faq', type: 'anchor' as const },
        { label: 'Contact', href: '#cta', type: 'anchor' as const },
      ]
    : [
        { label: 'Home', href: '/', type: 'route' as const },
        { label: 'Services', href: '/#services', type: 'route' as const },
        { label: 'Gallery', href: '/gallery', type: 'route' as const },
        { label: 'About', href: '/#about', type: 'route' as const },
        { label: 'FAQ', href: '/#faq', type: 'route' as const },
        { label: 'Contact', href: '/#cta', type: 'route' as const },
      ];

  const activeLink = location.pathname === '/gallery' ? 'Gallery' : 'Home';

  const renderNavLink = (link: { label: string; href: string; type: 'anchor' | 'route' }, onClick?: () => void) => {
    const isActive = activeLink === link.label;
    const className = `relative px-4 py-1.5 text-sm font-medium transition-all duration-200 rounded-full ${
      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
    }`;

    const content = (
      <>
        {isActive && (
          <span className="absolute inset-0 bg-cyan-500/15 border border-cyan-400/30 rounded-full -z-10 shadow-glow-sm" />
        )}
        {link.label}
      </>
    );

    if (link.type === 'route') {
      return (
        <Link
          key={link.label}
          to={link.href}
          onClick={onClick}
          className={className}
        >
          {content}
        </Link>
      );
    }

    return (
      <a
        key={link.label}
        href={link.href}
        onClick={onClick}
        className={className}
      >
        {content}
      </a>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-studio-950/85 backdrop-blur-xl border-b border-cyan-500/15 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
            aria-label="LED's and ABI Studio Home"
          >
            <div className="relative w-8 h-8 flex items-center justify-center rounded border border-cyan-400/50 bg-studio-900/80 text-cyan-400 transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-glow-sm">
              <span className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-cyan-300" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 border-t border-r border-cyan-300" />
              <span className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 border-b border-l border-cyan-300" />
              <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-cyan-300" />
              <span className="w-2 h-2 rounded-sm bg-gradient-to-tr from-cyan-400 to-electric animate-pulse" />
            </div>
            <span className="text-lg tracking-tight font-extrabold text-white group-hover:text-slate-100 transition-colors">
              LED's &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-glow via-cyan-300 to-electric-light">
                ABI Studio
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-studio-900/60 border border-white/10 px-4 py-1.5 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => renderNavLink(link))}
          </nav>

          {/* Right Action: Get a Quote */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="relative group px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-electric to-electric-glow shadow-glow-sm hover:shadow-glow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2 border border-cyan-300/30"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-electric shadow-glow-sm"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-studio-900/80 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 sm:hidden bg-studio-950/95 backdrop-blur-2xl pt-24 px-6 flex flex-col justify-between pb-10 border-b border-cyan-500/20 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            <div className="text-xs uppercase tracking-widest text-cyan-400/80 font-bold mb-2">
              Navigation
            </div>
            {navLinks.map((link) => {
              const isActive = activeLink === link.label;
              const className = `text-xl font-semibold transition-colors py-2 border-b border-white/5 flex items-center justify-between ${
                isActive ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
              }`;

              const content = (
                <>
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-glow-sm" />
                  )}
                </>
              );

              if (link.type === 'route') {
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={className}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={className}
                >
                  {content}
                </a>
              );
            })}
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 rounded-xl text-center font-bold text-white bg-gradient-to-r from-electric to-electric-glow shadow-glow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-accent" />
              <span>Get a Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
