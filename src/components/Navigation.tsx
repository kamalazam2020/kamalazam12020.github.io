import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'WORK', href: '#work', number: '01' },
    { name: 'SERVICES', href: '#services', number: '02' },
    { name: 'ABOUT', href: '#about', number: '03' },
    { name: 'CONTACT', href: '#contact', number: '04' },
  ];

  return (
    <>
      <header
        id="global-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out ${
          isScrolled
            ? 'py-4 bg-[#08090b]/80 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-7 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            id="brand-logo"
            href="#"
            className="group flex items-center gap-3 transition-transform duration-300 active:scale-95"
            aria-label="Kamal Azam - Home"
          >
            <span className="w-2 h-2 rounded-full bg-white transition-transform duration-500 group-hover:scale-150 group-hover:bg-amber-400" />
            <span className="font-display font-bold tracking-[0.2em] text-sm sm:text-base text-white/90 group-hover:text-white transition-colors duration-300">
              KAMAL AZAM
            </span>
            <span className="hidden sm:inline-block text-[10px] tracking-[0.25em] text-white/40 uppercase pl-1 border-l border-white/20">
              Creator
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            id="desktop-nav"
            className="hidden md:flex items-center gap-8 lg:gap-10"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative py-1 text-xs font-medium tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
              >
                <span className="text-[9px] text-white/30 group-hover:text-amber-400/80 transition-colors font-mono">
                  {link.number}
                </span>
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}

            {/* Subtle Inquire CTA */}
            <a
              id="nav-cta-button"
              href="#contact"
              className="ml-2 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-white/90 border border-white/20 rounded-full hover:border-white/80 hover:bg-white/[0.04] active:scale-95 transition-all duration-300 ease-out group"
            >
              <span>INQUIRE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white focus:outline-none transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`fixed inset-0 z-40 bg-[#08090b]/98 backdrop-blur-2xl transition-all duration-500 ease-in-out md:hidden flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-6">
          <p className="text-[11px] font-mono tracking-[0.25em] text-white/40 uppercase">
            Navigation
          </p>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 border-b border-white/[0.08] text-2xl font-display font-semibold tracking-[0.15em] text-white/80 hover:text-white transition-colors"
            >
              <span>{link.name}</span>
              <span className="text-xs font-mono text-white/40">{link.number}</span>
            </a>
          ))}
        </div>

        <div className="pt-6 border-t border-white/[0.1] flex flex-col gap-4">
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-4 text-center text-xs font-semibold tracking-[0.2em] bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
          >
            START A CONVERSATION
          </a>
          <p className="text-[10px] text-center text-white/40 tracking-wider">
            KAMAL AZAM • CONTENT CREATOR
          </p>
        </div>
      </div>
    </>
  );
};
