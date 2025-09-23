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
