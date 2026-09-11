import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollFade() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Give the DOM a moment to settle
    const timer = setTimeout(() => {
      // 1. Single fade elements
      const fadeElements = document.querySelectorAll<HTMLElement>('[data-scroll-fade]');
      fadeElements.forEach((el) => {
        const direction = el.dataset.scrollFade || 'up';
        const delay = parseFloat(el.dataset.scrollDelay || '0');
        const duration = parseFloat(el.dataset.scrollDuration || '1.2');

        let initialVars: gsap.TweenVars = { opacity: 0 };
        if (direction === 'up') initialVars.y = 40;
        else if (direction === 'down') initialVars.y = -40;
        else if (direction === 'left') initialVars.x = -35;
        else if (direction === 'right') initialVars.x = 35;
        else if (direction === 'scale') {
          initialVars.scale = 0.96;
          initialVars.y = 20;
        }

        gsap.fromTo(
          el,
          initialVars,
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 2. Staggered groups
      const staggerGroups = document.querySelectorAll<HTMLElement>('[data-scroll-stagger]');
      staggerGroups.forEach((group) => {
        const children = group.children;
        const staggerTime = parseFloat(group.dataset.scrollStagger || '0.14');
        const duration = parseFloat(group.dataset.scrollDuration || '1.1');

        gsap.fromTo(
          children,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration,
            stagger: staggerTime,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);
}
