import React from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { useScrollFade } from './hooks/useScrollFade';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  // Activate universal GSAP scroll-triggered fade-in system
  useScrollFade();

  return (
    <div className="relative min-h-screen bg-[#08090b] text-[#f2f2f5] overflow-x-hidden selection:bg-white selection:text-black">
      {/* 05 — GLOBAL FIXED NAVIGATION */}
      <Navigation />

      {/* 06–12 — CINEMATIC FULL-SCREEN HERO SECTION */}
      <main>
        <HeroSection />

        {/* 16–18 — FEATURE / SERVICES SECTION WITH SEQUENTIAL SCROLL REVEALS */}
        <ServicesSection />

        {/* SCROLL STATUS & FEEDBACK SECTION */}
        <section
          id="scroll-review"
          className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-32 border-t border-white/[0.08]"
        >
          <div
            data-scroll-fade="up"
            data-scroll-duration="1.3"
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-emerald-400 uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SCROLL FADE-IN SYSTEM ACTIVE</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Refined scroll-driven reveals across every section.
              </h2>
              <p className="mt-4 text-base text-white/60 font-light leading-relaxed">
                As you scroll through the page, every typographic heading, editorial asset, and capability card now glides into view with weighted GSAP ScrollTrigger easing, progressive opacity, and staggered choreographies.
              </p>
            </div>

            <div
              data-scroll-stagger="0.1"
              className="flex flex-col gap-3 font-mono text-xs tracking-wider text-white/50"
            >
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Hero Scroll Parallax &amp; Depth Recession</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Sequential Card 01 Rise &amp; Fade Reveal</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Card 02 Horizontal Drift &amp; Elevation</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Card 03 Scale-Up from 0.97 to 1</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Reversible On Scroll Up &amp; Down</span>
              </div>
            </div>
          </div>

          <div
            data-scroll-fade="up"
            data-scroll-delay="0.2"
            className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono tracking-widest text-white/40"
          >
            <span>NEXT STAGE READY: SECTION 03 — ABOUT (EDITORIAL TEXT + IMAGE)</span>
            <div className="flex items-center gap-2 text-white/70">
              <span>Kamal Azam Content Creator</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/50" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
