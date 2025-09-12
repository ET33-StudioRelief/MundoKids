import { gsap, ScrollTrigger } from '$utils/gsapSetup';

export function initStepAnimation(): void {
  const container = document.querySelector('.animation-container') as HTMLElement | null;
  const steps = Array.from(document.querySelectorAll<HTMLElement>('.animation-container .step'));
  if (!container || steps.length === 0) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      desktop: '(min-width: 768px)',
      mobile: '(max-width: 767px)',
    },
    (ctx) => {
      const isMobile = ctx.conditions?.mobile === true;

      // reset
      steps.forEach((s) => gsap.set(s, { autoAlpha: 0, pointerEvents: 'none' }));
      let current = 0;
      showStep(steps[current], true, isMobile);

      // pin + progression
      const pinOffset = 80; // offset en px sous le haut du viewport
      ScrollTrigger.create({
        trigger: container,
        start: () => `top top+=${pinOffset}`,
        end: `+=${(steps.length - 1) * 100}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
          if (idx !== current) {
            hideStep(steps[current], isMobile);
            showStep(steps[idx], false, isMobile);
            current = idx;
          }
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }
  );
}

function showStep(step: HTMLElement, immediate: boolean, isMobile: boolean): void {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
  tl.set(step, { pointerEvents: 'auto' });
  tl.to(step, { autoAlpha: 1, duration: immediate ? 0 : 0.2 }, 0);

  const left = step.querySelector('.text-left, .xp_text-step:not(.is-right)');
  const image = step.querySelector('.image-center, .xp_img-col');
  const right = step.querySelector('.text-right, .xp_text-step.is-right');

  if (left)
    tl.fromTo(
      left,
      isMobile ? { x: -60, opacity: 0 } : { y: 60, opacity: 0 },
      isMobile ? { x: 0, opacity: 1, duration: 0.6 } : { y: 0, opacity: 1, duration: 0.6 },
      0
    );

  if (image)
    tl.fromTo(image, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6 }, 0.15);

  if (right)
    tl.fromTo(
      right,
      isMobile ? { x: 60, opacity: 0 } : { y: -60, opacity: 0 },
      isMobile ? { x: 0, opacity: 1, duration: 0.6 } : { y: 0, opacity: 1, duration: 0.6 },
      0.3
    );
}

function hideStep(step: HTMLElement, isMobile: boolean): void {
  const tl = gsap.timeline();
  const left = step.querySelector('.text-left, .xp_text-step:not(.is-right)');
  const image = step.querySelector('.image-center, .xp_img-col');
  const right = step.querySelector('.text-right, .xp_text-step.is-right');

  if (left)
    tl.to(
      left,
      isMobile ? { x: -60, opacity: 0, duration: 0.3 } : { y: -60, opacity: 0, duration: 0.3 },
      0
    );
  if (image) tl.to(image, { opacity: 0, scale: 0.85, duration: 0.3 }, 0.1);
  if (right)
    tl.to(
      right,
      isMobile ? { x: 60, opacity: 0, duration: 0.3 } : { y: 60, opacity: 0, duration: 0.3 },
      0.2
    );

  tl.to(step, { autoAlpha: 0, duration: 0.2 }, 0.2).set(step, { pointerEvents: 'none' });
}
