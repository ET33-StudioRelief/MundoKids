import { gsap, ScrollTrigger } from '$utils/gsapSetup';

export function initStepAnimation(): void {
  const container = document.querySelector('.animation-container') as HTMLElement | null;
  const steps = Array.from(document.querySelectorAll<HTMLElement>('.animation-container .step'));
  if (!container || steps.length === 0) return;

  // Calcule et applique l'offset haut (pour ne pas chevaucher le heading)
  const heading = document.querySelector('#test-anim-heading') as HTMLElement | null;
  let lastOffsetValue = '';

  // Fonction pour détecter si on est sur mobile
  const isMobileDevice = (): boolean => {
    return (
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  };

  const setStepsTopOffset = (): void => {
    if (heading) {
      const isMobile = isMobileDevice();

      if (isMobile) {
        // Sur mobile : pas d'offset (les steps prennent tout l'espace)
        container.style.setProperty('--steps-top-base', '0px');
      } else {
        // Sur desktop : calculer l'offset selon la hauteur du heading
        const h = heading.getBoundingClientRect().height;
        const offsetValue = `${Math.round(h)}px`;
        // Éviter les appels multiples si la valeur n'a pas changé
        if (offsetValue !== lastOffsetValue) {
          container.style.setProperty('--steps-top-base', offsetValue);
          lastOffsetValue = offsetValue;
        }
      }
    }
  };

  const initDesktopAnimation = (): void => {
    setStepsTopOffset();

    // Reset complet
    steps.forEach((s) => gsap.set(s, { autoAlpha: 0, pointerEvents: 'none' }));
    let current = 0;

    showStep(steps[current], true);

    ScrollTrigger.create({
      trigger: container,
      start: 'top top+=80',
      end: `+=${(steps.length - 1) * 100}%`,
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      refreshPriority: -1,
      onUpdate: (self) => {
        const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
        if (idx !== current) {
          hideStep(steps[current]);
          showStep(steps[idx], false);
          current = idx;
        }
      },
      onRefresh: () => {
        setStepsTopOffset();
      },
    });
  };

  // Attendre que tout soit chargé avant d'initialiser
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDesktopAnimation);
  } else {
    setTimeout(initDesktopAnimation, 100);
  }

  // ResizeObserver avec debounce pour éviter trop de recalculs
  let resizeTimeout: number;
  if (typeof ResizeObserver !== 'undefined' && heading) {
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setStepsTopOffset();
        ScrollTrigger.refresh();
      }, 300);
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
      }, 300);
    },
    { passive: true }
  );
}

function showStep(step: HTMLElement, immediate: boolean): void {
  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    immediateRender: false,
  });

  tl.set(step, { pointerEvents: 'auto' });
  tl.to(step, { autoAlpha: 1, duration: immediate ? 0 : 0.2 }, 0);

  const left = step.querySelector('.text-left, .xp_text-step:not(.is-right)');
  const image = step.querySelector('.image-center, .xp_img-col');
  const right = step.querySelector('.text-right, .xp_text-step.is-right');

  if (left) {
    tl.fromTo(left, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0);
  }

  if (image) {
    tl.fromTo(
      image,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.6 },
      immediate ? 0 : 0.15
    );
  }

  if (right) {
    tl.fromTo(
      right,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      immediate ? 0 : 0.3
    );
  }
}

function hideStep(step: HTMLElement): void {
  const tl = gsap.timeline({
    defaults: { ease: 'power2.in' },
    immediateRender: false,
  });

  const left = step.querySelector('.text-left, .xp_text-step:not(.is-right)');
  const image = step.querySelector('.image-center, .xp_img-col');
  const right = step.querySelector('.text-right, .xp_text-step.is-right');

  if (left) {
    tl.to(left, { y: -60, opacity: 0, duration: 0.3 }, 0);
  }

  if (image) {
    tl.to(image, { opacity: 0, scale: 0.85, duration: 0.3 }, 0.1);
  }

  if (right) {
    tl.to(right, { y: 60, opacity: 0, duration: 0.3 }, 0.2);
  }

  tl.to(step, { autoAlpha: 0, duration: 0.2 }, 0.2).set(step, {
    pointerEvents: 'none',
  });
}
