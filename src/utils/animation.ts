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
  const isMobile = isMobileDevice();
  const heading = isMobile
    ? (container.querySelector('.step') as HTMLElement | null)
    : (document.querySelector('#test-anim-heading') as HTMLElement | null);
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
    showStep(steps[current], true, isMobile);

    // Configuration différente pour mobile vs desktop
    const pinOffset = isMobile ? 60 : 80;
    const endValue = isMobile ? `+=${(steps.length - 1) * 80}%` : `+=${(steps.length - 1) * 100}%`;

    ScrollTrigger.create({
      trigger: container,
      start: `top top+=${pinOffset}`,
      end: endValue,
      pin: true,
      scrub: 1,
      anticipatePin: isMobile ? 0 : 1, // Désactive anticipatePin sur mobile
      invalidateOnRefresh: true,
      refreshPriority: -1, // Priorité plus basse pour éviter les conflits
      onUpdate: (self) => {
        const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
        if (idx !== current) {
          hideStep(steps[current], isMobile);
          showStep(steps[idx], false, isMobile);
          current = idx;
        }
      },
      onRefresh: () => {
        // Recalculer les offsets après refresh
        setStepsTopOffset();
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
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
  tl.set(step, { pointerEvents: 'auto' });
  tl.to(step, { autoAlpha: 1, duration: immediate ? 0 : 0.2 }, 0);

  const left = step.querySelector('.text-left, .xp_text-step:not(.is-right)');
  const image = step.querySelector('.image-center, .xp_img-col');
  const right = step.querySelector('.text-right, .xp_text-step.is-right');

  // Animations adaptées pour mobile
  if (left) {
    const fromProps = isMobile
      ? { x: -30, opacity: 0 } // Réduit le déplacement sur mobile
      : { y: 60, opacity: 0 };
    tl.fromTo(left, fromProps, { x: 0, y: 0, opacity: 1, duration: 0.6 }, 0);
  }

  if (image) {
    const scaleFrom = isMobile ? 0.9 : 0.85; // Scale moins agressif sur mobile
    tl.fromTo(
      image,
      { opacity: 0, scale: scaleFrom },
      { opacity: 1, scale: 1, duration: 0.6 },
      0.15
    );
  }

  if (right) {
    const fromProps = isMobile
      ? { x: 30, opacity: 0 } // Réduit le déplacement sur mobile
      : { y: -60, opacity: 0 };
    tl.fromTo(right, fromProps, { x: 0, y: 0, opacity: 1, duration: 0.6 }, 0.3);
  }
}

function hideStep(step: HTMLElement, isMobile: boolean): void {
  const tl = gsap.timeline();
  const left = step.querySelector('.text-left, .xp_text-step:not(.is-right)');
  const image = step.querySelector('.image-center, .xp_img-col');
  const right = step.querySelector('.text-right, .xp_text-step.is-right');

  if (left) {
    const toProps = isMobile
      ? { x: -30, opacity: 0, duration: 0.3 } // Cohérent avec showStep
      : { y: -60, opacity: 0, duration: 0.3 };
    tl.to(left, toProps, 0);
  }

  if (image) {
    const scaleTo = isMobile ? 0.9 : 0.85; // Cohérent avec showStep
    tl.to(image, { opacity: 0, scale: scaleTo, duration: 0.3 }, 0.1);
  }

  if (right) {
    const toProps = isMobile
      ? { x: 30, opacity: 0, duration: 0.3 } // Cohérent avec showStep
      : { y: 60, opacity: 0, duration: 0.3 };
    tl.to(right, toProps, 0.2);
  }

  tl.to(step, { autoAlpha: 0, duration: 0.2 }, 0.2).set(step, { pointerEvents: 'none' });
}
