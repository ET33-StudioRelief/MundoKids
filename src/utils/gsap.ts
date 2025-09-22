import { gsap, ScrollTrigger } from '$utils/gsapSetup';

export function initGsapCardsAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.matchMedia({
    '(min-width: 769px)': () => {
      const wrappers = document.querySelectorAll<HTMLElement>('.cards_wrapper');
      wrappers.forEach((wrapper) => {
        const cards = Array.from(wrapper.querySelectorAll<HTMLElement>('.cards_card'));
        if (cards.length === 0) return;

        // initial state
        gsap.set(cards, { opacity: 0, y: 24 });

        const play = () => {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.3,
              overwrite: 'auto',
            }
          );
        };

        // manual ScrollTrigger for restart animation
        ScrollTrigger.create({
          trigger: wrapper,
          start: 'top 80%',
          onEnter: () => {
            play();
          },
          onEnterBack: () => {
            play();
          },
          onLeave: () => {
            gsap.set(cards, { opacity: 0, y: 24 });
          },
          onLeaveBack: () => {
            gsap.set(cards, { opacity: 0, y: 24 });
          },
        });
      });

      return () => {
        // cleanup if necessary
      };
    },
  });
}

export function initIntroDecorativAnimation() {
  ScrollTrigger.matchMedia({
    '(min-width: 992px)': () => {
      const el = document.querySelector<HTMLElement>('.decorativ_btm-grid');
      const trigger = document.querySelector<HTMLElement>('.section_intro');
      if (!el || !trigger) return;

      gsap.set(el, { y: 0 });

      gsap.to(el, {
        y: '-5rem',
        ease: 'power2.out',
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      });

      return () => {
        // cleanup auto via matchMedia
      };
    },
  });
}

export function initStepAnimation(): void {
  const container = document.querySelector('.animation-container') as HTMLElement | null;
  const steps = Array.from(document.querySelectorAll<HTMLElement>('.animation-container .step'));
  if (!container || steps.length === 0) return;

  // État initial: tout caché
  steps.forEach((s) => gsap.set(s, { autoAlpha: 0, pointerEvents: 'none' }));

  // Affiche la première
  let current = 0;
  showStep(steps[current], true);

  // ScrollTrigger unique qui “pin” la scène
  ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    end: () => `+=${Math.max(0, steps.length - 1) * window.innerHeight}`,
    pin: true,
    pinSpacing: true,
    pinType: ScrollTrigger.isTouch ? 'transform' : 'fixed',
    anticipatePin: 1,
    scrub: 0.6,
    markers: false,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const maxIndex = Math.max(0, steps.length - 1);
      const idx = Math.min(maxIndex, Math.round(self.progress * maxIndex));
      if (idx !== current) {
        hideStep(steps[current]);
        showStep(steps[idx]);
        current = idx;
      }
    },
    onRefresh: (self) => {
      const maxIndex = Math.max(0, steps.length - 1);
      const idx = Math.min(maxIndex, Math.round(self.progress * maxIndex));
      hideStep(steps[current]);
      showStep(steps[idx], true);
      current = idx;
    },
    onLeave: () => {
      // Assure la dernière step visible quand on sort par le bas
      const last = steps.length - 1;
      hideStep(steps[current]);
      showStep(steps[last], true);
      current = last;
    },
    onLeaveBack: () => {
      // Assure la première step visible quand on sort par le haut
      hideStep(steps[current]);
      showStep(steps[0], true);
      current = 0;
    },
  });

  // Refresh sur resize/orientation pour recalculer la durée et fiabiliser iOS
  const refreshHandler = () => ScrollTrigger.refresh();
  window.addEventListener('resize', refreshHandler, { passive: true });
  window.addEventListener('orientationchange', refreshHandler, { passive: true });
}

function showStep(step: HTMLElement, immediate = false): void {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
  tl.set(step, { pointerEvents: 'auto' });
  const left = step.querySelector('.xp_text-step.is-left');
  const image = step.querySelector('.xp_img-col');
  const right = step.querySelector('.xp_text-step.is-right');

  // Évite les chevauchements d'animations
  gsap.killTweensOf([step, left, image, right].filter(Boolean) as gsap.TweenTarget[]);

  tl.to(step, { autoAlpha: 1, duration: immediate ? 0 : 0.2, overwrite: 'auto' }, 0);
  if (left)
    tl.fromTo(
      left,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, overwrite: 'auto' },
      0
    );
  if (image)
    tl.fromTo(
      image,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.6, overwrite: 'auto' },
      0.15
    );
  if (right)
    tl.fromTo(
      right,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, overwrite: 'auto' },
      0.3
    );
}

function hideStep(step: HTMLElement): void {
  const tl = gsap.timeline();
  const left = step.querySelector('.xp_text-step.is-left');
  const image = step.querySelector('.xp_img-col');
  const right = step.querySelector('.xp_text-step.is-right');

  // Évite les chevauchements d'animations
  gsap.killTweensOf([step, left, image, right].filter(Boolean) as gsap.TweenTarget[]);

  if (left) tl.to(left, { y: -60, opacity: 0, duration: 0.3, overwrite: 'auto' }, 0);
  if (image) tl.to(image, { opacity: 0, scale: 0.85, duration: 0.3, overwrite: 'auto' }, 0.1);
  if (right) tl.to(right, { y: 60, opacity: 0, duration: 0.3, overwrite: 'auto' }, 0.2);

  tl.to(step, { autoAlpha: 0, duration: 0.2, overwrite: 'auto' }, 0.2).set(step, {
    pointerEvents: 'none',
  });
}
