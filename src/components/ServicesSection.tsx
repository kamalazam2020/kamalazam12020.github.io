import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Film, Camera, BarChart3, Layers } from 'lucide-react';
import videoServiceImg from '../assets/images/service_cinematic_video_1789133980920.jpg';
import photoServiceImg from '../assets/images/service_editorial_photo_1789133996251.jpg';
import mediaServiceImg from '../assets/images/service_digital_media_1789134008680.jpg';

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const footerNoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header scroll-triggered fade in and subtle elevation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Individual Card Scroll Reveals as specified in Rule 17
      // Card 01: Slight rise + fade
      if (card1Ref.current) {
        gsap.fromTo(
          card1Ref.current,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card1Ref.current,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Card 02: Slight rise + subtle horizontal drift
      if (card2Ref.current) {
        gsap.fromTo(
          card2Ref.current,
          {
            opacity: 0,
            y: 75,
            x: -24,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1.4,
            delay: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card2Ref.current,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Card 03: Slight rise + subtle scale up from 0.97 to 1
      if (card3Ref.current) {
        gsap.fromTo(
          card3Ref.current,
          {
            opacity: 0,
            y: 85,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            delay: 0.22,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card3Ref.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Bottom capability note fade in
      if (footerNoteRef.current) {
        gsap.fromTo(
          footerNoteRef.current,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerNoteRef.current,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      ref: card1Ref,
      number: '01',
      title: 'VIDEO',
      subtitle: 'Cinematic Production & Post-Production',
      tagline: 'Precision frame craft from principal cinematography to final master.',
      image: videoServiceImg,
      icon: Film,
      disciplines: [
        'Commercial Direction',
        'Anamorphic Cinematography',
        'DaVinci Resolve Color Grading',
        'Sound Design & Master Mixing',
        'VFX & Title Sequences',
      ],
      aspectRatio: 'aspect-[4/5]',
    },
    {
      ref: card2Ref,
      number: '02',
      title: 'PHOTO',
      subtitle: 'Editorial & Luxury Commercial',
      tagline: 'High-contrast chiaroscuro, automotive stills, and architectural compositions.',
      image: photoServiceImg,
      icon: Camera,
      disciplines: [
        'Automotive Campaign Stills',
        'Luxury Product Photography',
        'Medium-Format Studio Lighting',
        'High-End Frequency Separation',
        'Key Visual Development',
      ],
      aspectRatio: 'aspect-[4/5] lg:translate-y-8', // Asymmetrical offset for editorial rhythm
    },
    {
      ref: card3Ref,
      number: '03',
      title: 'MEDIA',
      subtitle: 'Social Direction & Media Buying',
      tagline: 'Closing the loop between creative assets and calculated digital performance.',
      image: mediaServiceImg,
      icon: BarChart3,
      disciplines: [
        'Omnichannel Distribution',
        'Performance Paid Media',
        'Creative Strategy & A/B Matrix',
        'Audience Funnel Optimization',
        'Conversion & Attribution Analytics',
      ],
      aspectRatio: 'aspect-[4/5]',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-32 sm:py-44 px-6 sm:px-10 lg:px-16 border-t border-white/[0.08] overflow-hidden"
      aria-label="Capabilities & Core Disciplines"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/[0.015] blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER WITH SCROLL FADE-IN */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 lg:mb-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.28em] text-white/50 uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              <span>02 — CAPABILITIES &amp; EXECUTION</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
              Create. Shape. <br />
              <span className="text-white/60">Distribute. Perform.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-white/65 font-light leading-relaxed">
            Content creation without strategic delivery is incomplete. Every production is engineered to hold attention, command authority, and achieve measurable commercial impact.
          </p>
        </div>

        {/* THREE-COLUMN ASYMMETRICAL CARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={service.ref}
                className={`group relative flex flex-col bg-[#0d0f14] rounded-2xl border border-white/[0.09] overflow-hidden transition-all duration-500 ease-out hover:border-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] ${service.aspectRatio}`}
              >
                {/* Image Showcase Container */}
                <div className="relative w-full h-64 sm:h-72 overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} - ${service.subtitle}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.06] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-95"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-[#0d0f14]/40 to-transparent" />

                  {/* Corner index badge */}
                  <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-white/80 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-amber-400" />
                    <span>{service.number}</span>
                  </div>

                  <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/40 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content body */}
                <div className="p-7 sm:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-display font-bold text-2xl tracking-tight text-white group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono tracking-wider text-amber-400/90 mt-1 uppercase">
                      {service.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-white/60 font-light mt-4 leading-relaxed">
                      {service.tagline}
                    </p>

                    {/* Disciplines list */}
                    <div className="mt-6 pt-6 border-t border-white/[0.08] space-y-2.5">
                      {service.disciplines.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-xs font-mono tracking-wide text-white/60 group-hover:text-white/80 transition-colors"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-amber-400 transition-colors" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link microinteraction */}
                  <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-[0.2em] text-white/40 group-hover:text-white transition-colors uppercase">
                      Inquire Capability
                    </span>
                    <a
                      href="#contact"
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300 active:scale-95"
                      aria-label={`Inquire about ${service.title}`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* PHILOSOPHY SUMMARY STRIP WITH SCROLL FADE-IN */}
        <div
          ref={footerNoteRef}
          className="mt-24 p-8 sm:p-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-base text-white">
                Holistic Production Pipeline
              </h4>
              <p className="text-xs sm:text-sm text-white/50 font-light mt-0.5">
                From pre-production strategy to post-campaign attribution analysis.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-[0.18em] uppercase hover:bg-neutral-200 active:scale-95 transition-all duration-300"
          >
            <span>DISCUSS A PRODUCTION</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
