import { gsap, ScrollTrigger } from '$utils/gsapSetup';

export function initCardsContentAnimation() {
  const cardsContent = document.querySelector('.cards_content');
  if (!cardsContent) return;

  const cardsWrapper = cardsContent.querySelector('.cards_wrapper');
  if (!cardsWrapper) return;

  const cards = Array.from(cardsWrapper.querySelectorAll('.cards_card'));
  if (cards.length === 0) return;

  // Initial state
  gsap.set(cards, {
    opacity: 0,
    y: 50,
    scale: 0.9,
  });

  ScrollTrigger.create({
    trigger: cardsContent,
    start: 'top 75%',
    onEnter: () => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        overwrite: 'auto',
      });
    },
    onEnterBack: () => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        overwrite: 'auto',
      });
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
