import { gsap, ScrollTrigger } from '$utils/gsapSetup';

export function initStepAnimation(): void {
  const container = document.querySelector('.animation-container') as HTMLElement | null;
  const steps = Array.from(document.querySelectorAll<HTMLElement>('.animation-container .step'));
  if (!container || steps.length === 0) return;

  // Fonction pour détecter si on est vraiment sur mobile
  const isMobileDevice = (): boolean => {
    return (
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  };

  // Calcule et applique l'offset haut (pour ne pas chevaucher le heading)
  const heading = container.querySelector('.container-large') as HTMLElement | null;
  const setStepsTopOffset = (): void => {
    if (heading) {
      const h = heading.getBoundingClientRect().height;
      container.style.setProperty('--steps-top-base', `${Math.round(h)}px`);
    }
  };

  // Initialisation différée pour éviter les problèmes de timing
  const initAnimation = (): void => {
    setStepsTopOffset();
    const isMobile = isMobileDevice();

    // Reset complet
    steps.forEach((s) => gsap.set(s, { autoAlpha: 0, pointerEvents: 'none' }));
    let current = 0;

    // Variables pour optimiser les performances
    let lastUpdateTime = 0;
    let isTransitioning = false;
    const UPDATE_THROTTLE = isMobile ? 32 : 16; // Moins fréquent sur mobile (30fps vs 60fps)

    // Pré-calculer les seuils pour éviter Math.floor à chaque frame
    const thresholds = steps.map((_, index) => index / steps.length);

    // Fonction optimisée pour trouver l'index
    const getCurrentStepIndex = (progress: number): number => {
      for (let i = 0; i < thresholds.length; i++) {
        if (progress <= thresholds[i]) {
          return Math.max(0, i - 1);
        }
      }
      return steps.length - 1;
    };

    showStep(steps[current], true, isMobile);

    // Configuration différente pour mobile vs desktop
    const pinOffset = isMobile ? 60 : 80;
    const endValue = isMobile ? `+=${(steps.length - 1) * 80}%` : `+=${(steps.length - 1) * 100}%`;

    ScrollTrigger.create({
      trigger: container,
      start: `top top+=${pinOffset}`,
      end: endValue,
      pin: true,
      scrub: isMobile ? 0.3 : 0.5, // Plus fluide sur mobile
      anticipatePin: isMobile ? 0 : 1,
      invalidateOnRefresh: true,
      refreshPriority: -1,
      fastScrollEnd: true, // Optimise les scrolls rapides
      onUpdate: (self) => {
        const now = performance.now();

        // Throttling pour éviter trop d'appels sur mobile
        if (now - lastUpdateTime < UPDATE_THROTTLE) {
          return;
        }

        // Éviter les transitions multiples simultanées
        if (isTransitioning) {
          return;
        }

        const idx = getCurrentStepIndex(self.progress);
        if (idx !== current) {
          isTransitioning = true;

          // Annuler les animations en cours pour éviter les conflits
          gsap.killTweensOf([steps[current], steps[idx]]);

          hideStep(steps[current], isMobile);
          showStep(steps[idx], false, isMobile);
          current = idx;
          lastUpdateTime = now;

          // Débloquer après un délai plus court sur mobile
          setTimeout(
            () => {
              isTransitioning = false;
            },
            isMobile ? 150 : 200
          );
        }
      },
      onRefresh: () => {
        setStepsTopOffset();
        // Reset des variables d'état
        isTransitioning = false;
        lastUpdateTime = 0;
      },
    });
  };

  // Attendre que tout soit chargé avant d'initialiser
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimation);
  } else {
    // Petit délai pour s'assurer que les éléments sont bien rendus
    setTimeout(initAnimation, 100);
  }

  // ResizeObserver avec debounce pour éviter trop de recalculs
  let resizeTimeout: number;
  if (typeof ResizeObserver !== 'undefined' && heading) {
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setStepsTopOffset();
        ScrollTrigger.refresh();
      }, 150);
    });
    ro.observe(heading);
  }

  // Gestion du resize avec debounce
  window.addEventListener(
    'resize',
    () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setStepsTopOffset();
        ScrollTrigger.refresh();
      }, 150);
    },
    { passive: true }
  );
}

function showStep(step: HTMLElement, immediate: boolean, isMobile: boolean): void {
  // Configuration différente selon le device
  const ease = isMobile ? 'power1.out' : 'power2.out'; // Plus simple sur mobile
  const duration = immediate ? 0 : isMobile ? 0.15 : 0.2; // Plus rapide sur mobile

  const tl = gsap.timeline({
    defaults: { ease },
    immediateRender: false, // Évite le rendu immédiat pour les performances
  });

  tl.set(step, { pointerEvents: 'auto' });
  tl.to(step, { autoAlpha: 1, duration }, 0);

  const left = step.querySelector('.text-left, .xp_text-step:not(.is-right)');
  const image = step.querySelector('.image-center, .xp_img-col');
  const right = step.querySelector('.text-right, .xp_text-step.is-right');

  // Animations adaptées pour mobile - plus courtes et moins complexes
  if (left) {
    const fromProps = isMobile
      ? { x: -20, opacity: 0 } // Encore plus réduit sur mobile
      : { y: 60, opacity: 0 };
    const duration_anim = isMobile ? 0.4 : 0.6;
    tl.fromTo(left, fromProps, { x: 0, y: 0, opacity: 1, duration: duration_anim }, 0);
  }

  if (image) {
    const scaleFrom = isMobile ? 0.95 : 0.85; // Encore moins agressif
    const duration_anim = isMobile ? 0.4 : 0.6;
    tl.fromTo(
      image,
      { opacity: 0, scale: scaleFrom },
      { opacity: 1, scale: 1, duration: duration_anim },
      immediate ? 0 : isMobile ? 0.1 : 0.15
    );
  }

  if (right) {
    const fromProps = isMobile
      ? { x: 20, opacity: 0 } // Encore plus réduit
      : { y: -60, opacity: 0 };
    const duration_anim = isMobile ? 0.4 : 0.6;
    tl.fromTo(
      right,
      fromProps,
      { x: 0, y: 0, opacity: 1, duration: duration_anim },
      immediate ? 0 : isMobile ? 0.2 : 0.3
    );
  }
}

function hideStep(step: HTMLElement, isMobile: boolean): void {
  // Configuration plus rapide pour la sortie, surtout sur mobile
  const ease = isMobile ? 'power1.in' : 'power2.in'; // Plus rapide sur mobile
  const duration = isMobile ? 0.2 : 0.3; // Plus court sur mobile

  const tl = gsap.timeline({
    defaults: { ease },
    immediateRender: false,
  });

  const left = step.querySelector('.text-left, .xp_text-step:not(.is-right)');
  const image = step.querySelector('.image-center, .xp_img-col');
  const right = step.querySelector('.text-right, .xp_text-step.is-right');

  if (left) {
    const toProps = isMobile
      ? { x: -20, opacity: 0, duration } // Cohérent avec showStep
      : { y: -60, opacity: 0, duration };
    tl.to(left, toProps, 0);
  }

  if (image) {
    const scaleTo = isMobile ? 0.95 : 0.85; // Cohérent avec showStep
    tl.to(image, { opacity: 0, scale: scaleTo, duration }, isMobile ? 0.05 : 0.1);
  }

  if (right) {
    const toProps = isMobile
      ? { x: 20, opacity: 0, duration } // Cohérent avec showStep
      : { y: 60, opacity: 0, duration };
    tl.to(right, toProps, isMobile ? 0.1 : 0.2);
  }

  // Sortie plus rapide sur mobile
  const hideDuration = isMobile ? 0.1 : 0.2;
  tl.to(step, { autoAlpha: 0, duration: hideDuration }, isMobile ? 0.1 : 0.2).set(step, {
    pointerEvents: 'none',
  });
}
