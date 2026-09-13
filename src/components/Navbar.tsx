import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSiteContent } from '../sanity/useSiteContent';

interface NavbarProps {
  onOpenQuote: () => void;
}

interface NavItem {
  label: string;
  targetId?: string;
  href?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', targetId: 'hero' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', targetId: 'about' },
  { label: 'FAQ', targetId: 'faq' },
  { label: 'Contact', targetId: 'cta' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const { content } = useSiteContent();
  const settings = content.siteSettings;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('Home');
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic ScrollSpy tracking active section on Home Page, Services, or Gallery
  useEffect(() => {
    if (location.pathname === '/services') {
      setActiveSection('Services');
      return;
    }

    if (location.pathname === '/gallery') {
      setActiveSection('Gallery');
      return;
    }

    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    const sectionIds: { id: string; label: string }[] = [
      { id: 'hero', label: 'Home' },
      { id: 'services', label: 'Services' },
      { id: 'gallery', label: 'Gallery' },
      { id: 'about', label: 'About' },
      { id: 'reviews-faq', label: 'FAQ' },
      { id: 'cta', label: 'Contact' },
    ];

    const handleScrollSpy = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Top of page threshold -> Home
      if (scrollY < 120) {
        setActiveSection('Home');
        return;
      }

      // Bottom threshold reached -> Contact
      if (scrollY + windowHeight >= documentHeight - 70) {
        setActiveSection('Contact');
        return;
      }

      // Scan line positioned 140px below the viewport top (below fixed navbar)
      const scanLineY = 140;

      // Check sections from bottom to top using absolute document coordinates:
      // (rect.top + scrollY) computes the true absolute top in the document,
      // completely immune to offsetParent or nested relative containers!
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const { id, label } = sectionIds[i];
        const elem = document.getElementById(id) || (id === 'reviews-faq' ? document.getElementById('faq') : null);
        if (elem) {
          const rect = elem.getBoundingClientRect();
          const trueTop = rect.top + scrollY;
          if (scrollY + scanLineY >= trueTop) {
            setActiveSection(label);
            return;
          }
        }
      }

      setActiveSection('Home');
    };

    handleScrollSpy();
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [location.pathname, isHomePage]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (item.href) {
      if (location.pathname === item.href) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(item.href);
      }
      return;
    }

    if (item.targetId) {
      if (isHomePage) {
        setActiveSection(item.label);
        if (item.targetId === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (window.location.hash) {
            window.history.pushState(null, '', '/');
          }
        } else {
          const elem = document.getElementById(item.targetId);
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', `#${item.targetId}`);
          }
        }
      } else {
        navigate(item.targetId === 'hero' ? '/' : `/#${item.targetId}`);
      }
    }
  };

  const renderNavLink = (item: NavItem, isMobile = false) => {
    const isActive = activeSection === item.label;
    const resolvedHref = item.href || (isHomePage ? `#${item.targetId}` : `/#${item.targetId}`);

    if (isMobile) {
      return (
        <a
          key={item.label}
          href={resolvedHref}
          onClick={(e) => handleNavClick(e, item)}
          className={`text-xl font-semibold transition-colors py-2.5 border-b border-white/5 flex items-center justify-between ${
            isActive ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
          }`}
        >
          <span>{item.label}</span>
          {isActive && (
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-glow-sm" />
          )}
        </a>
      );
    }

    return (
      <a
        key={item.label}
        href={resolvedHref}
        onClick={(e) => handleNavClick(e, item)}
        className={`relative px-4 py-1.5 text-sm font-medium transition-all duration-200 rounded-full cursor-pointer select-none ${
          isActive ? 'text-white' : 'text-slate-400 hover:text-white'
        }`}
      >
        {isActive && (
          <span className="absolute inset-0 bg-cyan-500/15 border border-cyan-400/30 rounded-full -z-10 shadow-glow-sm" />
        )}
        {item.label}
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
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                setActiveSection('Home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (window.location.hash) {
                  window.history.pushState(null, '', '/');
                }
              }
            }}
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
              {settings.studioName || (
                <>
                  LED's &amp;{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-glow via-cyan-300 to-electric-light">
                    ABI Studio
                  </span>
                </>
              )}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-studio-900/60 border border-white/10 px-4 py-1.5 backdrop-blur-md shadow-inner">
            {NAV_ITEMS.map((item) => renderNavLink(item))}
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
          <div className="flex flex-col space-y-3">
            <div className="text-xs uppercase tracking-widest text-cyan-400/80 font-bold mb-2">
              Navigation
            </div>
            {NAV_ITEMS.map((item) => renderNavLink(item, true))}
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
