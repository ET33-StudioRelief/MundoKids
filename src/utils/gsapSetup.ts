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

// Config mobile: ne pas recalculer sur chaque resize iOS (barre d'adresse)
try {
  const ST: any = ScrollTrigger as unknown as { config?: Function; normalizeScroll?: Function };
  ST.config?.({ ignoreMobileResize: true });
  // Lisse le comportement de scroll sur iOS/Android (barres, rebonds)
  ST.normalizeScroll?.(true);
} catch {
  // no-op
}

// Refresh robuste sur événements clés
const debounce = (fn: () => void, delay = 120) => {
  let t: number | undefined;
  return () => {
    if (t) window.clearTimeout(t);
    t = window.setTimeout(fn, delay);
  };
};

if (typeof window !== 'undefined') {
  const safeRefresh = debounce(() => {
    try {
      ScrollTrigger.refresh();
    } catch {
      /* noop */
    }
  }, 150);

  window.addEventListener('orientationchange', safeRefresh, { passive: true });
  window.addEventListener('focus', safeRefresh, { passive: true });
  window.addEventListener('pageshow', safeRefresh, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') safeRefresh();
  });

  // Ajuste au viewport visuel quand dispo (iOS moderne)
  // sans spammer; on délègue au debounce ci-dessus
  const vv = (window as Window & { visualViewport?: VisualViewport }).visualViewport;
  vv?.addEventListener('resize', safeRefresh, { passive: true });
}
