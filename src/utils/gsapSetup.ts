import { gsap as esmGsap } from 'gsap';
import { ScrollTrigger as esmScrollTrigger } from 'gsap/ScrollTrigger';

declare global {
  interface Window {
    gsap?: typeof esmGsap;
    ScrollTrigger?: typeof esmScrollTrigger;
  }
}

let gsapCore: typeof esmGsap;
let ScrollTriggerPlugin: typeof esmScrollTrigger;

// Préfère l'instance globale injectée par Webflow si disponible
const w =
  typeof window !== 'undefined'
    ? (window as unknown as {
        gsap?: typeof esmGsap;
        ScrollTrigger?: typeof esmScrollTrigger;
      })
    : undefined;
if (w && w.gsap) {
  gsapCore = w.gsap;
  ScrollTriggerPlugin = w.ScrollTrigger || esmScrollTrigger;
} else {
  gsapCore = esmGsap;
  ScrollTriggerPlugin = esmScrollTrigger;
}

if (!(gsapCore as unknown as { plugins?: Record<string, unknown> }).plugins?.ScrollTrigger) {
  (gsapCore as unknown as { registerPlugin: (p: unknown) => void }).registerPlugin(
    ScrollTriggerPlugin
  );
}

export const gsap = gsapCore as typeof esmGsap;
export const ScrollTrigger = ScrollTriggerPlugin as typeof esmScrollTrigger;
