import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowDown, Sparkles, Compass } from 'lucide-react';
import { HeroAutomotive3D } from './HeroAutomotive3D';
import { ShowreelModal } from './ShowreelModal';
import heroBgImage from '../assets/images/hero_cinematic_automotive_1789133676136.jpg';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const disciplinesRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const object3DWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // GSAP Context ensures clean disposal on re-render / unmount
    const ctx = gsap.context(() => {
      // 1. INITIAL CHOREOGRAPHED ENTRANCE (Slow, heavy, luxury automotive reveal)
      if (!prefersReducedMotion) {
        const tl = gsap.timeline({
          defaults: {
            ease: 'power3.out',
            duration: 1.4,
          },
        });

        // 01 — Eyebrow
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, delay: 0.2 }
        );

        // 02 — KAMAL AZAM (Split reveal for monumental feel)
        tl.fromTo(
          title1Ref.current,
          { opacity: 0, y: 55, rotateX: 10 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.6 },
          '-=0.9'
        );

        tl.fromTo(
          title2Ref.current,
          { opacity: 0, y: 60, rotateX: 10 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.6 },
          '-=1.4'
        );

        // 03 — CONTENT CREATOR
        tl.fromTo(
          roleRef.current,
          { opacity: 0, y: 25, letterSpacing: '0.45em' },
          { opacity: 1, y: 0, letterSpacing: '0.3em', duration: 1.3 },
          '-=1.1'
        );

        // 04 — Supporting statement & Core disciplines
        tl.fromTo(
          statementRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1.2 },
          '-=0.9'
        );

        tl.fromTo(
          disciplinesRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.1 },
          '-=1.0'
        );

        // 05 — CTA / interaction buttons
        tl.fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0 },
          '-=0.8'
        );

        // Scroll indicator entrance
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.2 },
          '-=0.5'
        );

        // 3D Object subtle fade in
        tl.fromTo(
          object3DWrapperRef.current,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 2.0, ease: 'power2.out' },
          0.4
        );
      } else {
        // Reduced motion: instant elegant visibility
        gsap.set(
          [
            eyebrowRef.current,
            title1Ref.current,
            title2Ref.current,
            roleRef.current,
            statementRef.current,
            disciplinesRef.current,
            ctaGroupRef.current,
            scrollIndicatorRef.current,
            object3DWrapperRef.current,
          ],
          { opacity: 1, y: 0 }
        );
      }

      // 2. SCROLL-DRIVEN PARALLAX & PROGRESSIVE REVEAL SYSTEM
      if (!prefersReducedMotion && heroRef.current) {
        // Parallax timeline bound to scroll
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1, // Smooth, weighted momentum
            invalidateOnRefresh: true,
          },
        });

        // Background moves slowly downwards to create deep background recession
        if (bgImageRef.current) {
          scrollTl.to(
            bgImageRef.current,
            {
              yPercent: 18,
              scale: 1.06,
              ease: 'none',
            },
            0
          );
        }

        // Overlay deepens to transition cleanly into subsequent sections
        if (bgOverlayRef.current) {
          scrollTl.to(
            bgOverlayRef.current,
            {
              backgroundColor: 'rgba(8, 9, 11, 0.85)',
              ease: 'none',
            },
            0
          );
        }

        // Foreground typography rises at a higher rate and gently disperses
        if (titleContainerRef.current) {
          scrollTl.to(
            titleContainerRef.current,
            {
              y: -110,
              opacity: 0.15,
              ease: 'none',
            },
            0
          );
        }

        // 3D object recedes and drifts smoothly
        if (object3DWrapperRef.current) {
          scrollTl.to(
            object3DWrapperRef.current,
            {
              y: 70,
              x: 40,
              opacity: 0.25,
              ease: 'none',
            },
            0
          );
        }

        // UI & CTAs rise faster, establishing distinct optical plane
        if (ctaGroupRef.current) {
          scrollTl.to(
            ctaGroupRef.current,
            {
              y: -140,
              opacity: 0,
              ease: 'none',
            },
            0
          );
        }

        if (scrollIndicatorRef.current) {
          scrollTl.to(
            scrollIndicatorRef.current,
            {
              y: -50,
              opacity: 0,
              ease: 'none',
            },
            0
          );
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const disciplines = [
    { label: 'VIDEO PRODUCTION', code: '01' },
    { label: 'PHOTOGRAPHY', code: '02' },
    { label: 'SOCIAL MANAGEMENT', code: '03' },
    { label: 'MEDIA BUYING', code: '04' },
    { label: 'STRATEGY', code: '05' },
  ];

  return (
    <>
      <section
        ref={heroRef}
        id="hero"
        className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-12 px-6 sm:px-10 lg:px-16"
        aria-label="Kamal Azam - Content Creator Hero"
      >
        {/* BACKGROUND PHOTOGRAPHY (High-end cinematic automotive campaign image) */}
        <div className="absolute inset-0 -z-30 overflow-hidden pointer-events-none select-none">
          <img
            ref={bgImageRef}
            src={heroBgImage}
            alt="Cinematic luxury automotive production photograph by Kamal Azam"
            referrerPolicy="no-referrer"
            className="w-full h-[120%] -top-[10%] object-cover object-center brightness-[0.72] contrast-[1.08] filter"
          />
        </div>

        {/* FILM GRAIN & EDITORIAL GRADIENT OVERLAYS */}
        <div
          ref={bgOverlayRef}
          className="absolute inset-0 -z-20 bg-gradient-to-t from-[#08090b] via-[#08090b]/40 to-[#08090b]/75 transition-colors duration-500"
        />
        <div className="absolute inset-0 -z-10 film-grain pointer-events-none" />

        {/* 3D AUTOMOTIVE OBJECT INTEGRATION LAYER */}
        <div
          ref={object3DWrapperRef}
          className="absolute right-0 bottom-6 sm:bottom-12 w-full sm:w-[65%] lg:w-[58%] xl:w-[52%] h-[45vh] sm:h-[55vh] lg:h-[65vh] -z-10 pointer-events-auto"
        >
          <HeroAutomotive3D />
          {/* Subtle status caption */}
          <div className="absolute bottom-2 right-6 hidden lg:flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-white/30 uppercase pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
            <span>Interactive 3D Asset // Three.js Shaders</span>
          </div>
        </div>

        {/* HERO TOP BAR / EYEBROW */}
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between z-10">
          <div
            ref={eyebrowRef}
            className="flex items-center gap-3 text-[11px] font-mono tracking-[0.28em] text-white/60 uppercase"
          >
            <span className="px-2 py-0.5 rounded border border-white/20 text-white/80 bg-white/[0.03]">
              01
            </span>
            <span>CREATIVE DIRECTION &amp; MEDIA PRODUCTION</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
            <span>PORTFOLIO [2026]</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>AVAILABLE GLOBALLY</span>
          </div>
        </div>

        {/* HERO CENTER / PRIMARY TYPOGRAPHY */}
        <div
          ref={titleContainerRef}
          className="max-w-7xl w-full mx-auto my-auto py-8 sm:py-12 z-10 flex flex-col justify-center"
        >
          {/* Monumental Name */}
          <h1
            id="hero-name"
            className="font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.88] text-[clamp(2.75rem,8.5vw,9.5rem)] text-white text-balance"
          >
            <span
              ref={title1Ref}
              className="block will-change-transform drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            >
              KAMAL
            </span>
            <span
              ref={title2Ref}
              className="block will-change-transform text-white/95 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            >
              AZAM
            </span>
          </h1>

          {/* Secondary Title: CONTENT CREATOR */}
          <div
            ref={roleRef}
            className="mt-4 sm:mt-6 flex items-center gap-4 text-xs sm:text-sm lg:text-base font-medium tracking-[0.3em] uppercase text-white/70"
          >
            <span className="w-8 sm:w-12 h-[1px] bg-white/40 inline-block" />
            <h2 className="font-display font-semibold text-white/90">CONTENT CREATOR</h2>
            <span className="text-[10px] font-mono tracking-[0.2em] text-amber-400/90 hidden sm:inline-block">
              // COMMERCIAL &amp; EDITORIAL
            </span>
          </div>

          {/* Core Philosophy Statement */}
          <div ref={statementRef} className="mt-8 max-w-xl">
            <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
              <span className="text-white font-medium">Create. Shape. Distribute. Perform.</span>
              <span className="block mt-1 text-sm sm:text-base text-white/60 font-light">
                Directing the full spectrum of modern visual media—from raw cinematic capture to targeted distribution and measurable digital performance.
              </span>
            </p>
          </div>

          {/* Core Disciplines Badges / Minimal Tags */}
          <div
            ref={disciplinesRef}
            className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3"
            aria-label="Core Disciplines"
          >
            {disciplines.map((d) => (
              <div
                key={d.label}
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.12] bg-black/40 backdrop-blur-md text-[10px] sm:text-[11px] font-mono tracking-[0.16em] text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
              >
                <span className="text-[9px] text-white/40 font-mono group-hover:text-amber-400/90 transition-colors">
                  {d.code}
                </span>
                <span>{d.label}</span>
              </div>
            ))}
          </div>

          {/* Primary Call to Actions & Interactions */}
          <div
            ref={ctaGroupRef}
            className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6"
          >
            {/* Watch Showreel Button */}
            <button
              id="watch-showreel-btn"
              onClick={() => setShowreelOpen(true)}
              className="group relative inline-flex items-center gap-3.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 ease-out hover:bg-neutral-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] active:scale-[0.97]"
              aria-label="Watch Showreel 2026"
            >
              <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Play className="w-3 h-3 text-white fill-white translate-x-0.5" />
              </span>
              <span>WATCH SHOWREEL</span>
              <span className="text-[10px] font-mono text-black/50 ml-1">02:30</span>
            </button>

            {/* Inquire / Direct Contact Action */}
            <a
              id="explore-works-btn"
              href="#work"
              className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-white font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 ease-out hover:border-white/70 hover:bg-white/[0.05] active:scale-[0.97]"
            >
              <Compass className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
              <span>EXPLORE WORKS</span>
            </a>
          </div>
        </div>

        {/* HERO BOTTOM BAR / FOOTER OF SECTION */}
        <div
          ref={scrollIndicatorRef}
          className="max-w-7xl w-full mx-auto flex items-end justify-between z-10 pt-6 border-t border-white/[0.08]"
        >
          {/* Strategic Overview Brief */}
          <div className="max-w-xs hidden sm:block">
            <p className="text-[11px] font-mono tracking-[0.18em] text-white/40 uppercase">
              End-to-End Media Execution
            </p>
            <p className="text-xs text-white/60 mt-1 leading-relaxed">
              Synthesizing cinematic craft with performance metrics across high-stakes campaigns.
            </p>
          </div>

          {/* Interactive Scroll Cue */}
          <a
            href="#scroll-preview"
            className="group flex items-center gap-3 text-[11px] font-mono tracking-[0.25em] text-white/50 hover:text-white transition-colors duration-300"
            aria-label="Scroll to discover"
          >
            <span className="uppercase">SCROLL TO DISCOVER</span>
            <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 group-hover:bg-white/[0.05] transition-all duration-300">
              <ArrowDown className="w-3.5 h-3.5 text-white/60 group-hover:text-white group-hover:translate-y-0.5 transition-transform duration-300" />
            </span>
          </a>

          {/* Production Coordinates */}
          <div className="hidden lg:flex items-center gap-4 text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">
            <span>LAT 25.2048° N</span>
            <span>LON 55.2708° E</span>
            <span>UTC+4</span>
          </div>
        </div>
      </section>

      {/* Cinematic Showreel Modal */}
      <ShowreelModal isOpen={showreelOpen} onClose={() => setShowreelOpen(false)} />
    </>
  );
};
