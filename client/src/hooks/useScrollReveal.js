/**
 * useScrollReveal.js — Intersection Observer hook for fade/slide-in animation.
 * Adds the 'visible' class to elements with the 'reveal' class when they enter
 * the viewport. Uses native IntersectionObserver with a threshold of 0.1.
 */

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            // Remove class when leaving viewport to allow re-animation on next scroll
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
}
