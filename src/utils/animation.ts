import { gsap, ScrollTrigger } from '$utils/gsapSetup';

export function initStepAnimation(): void {
  const container = document.querySelector('.animation-container') as HTMLElement | null;
  const steps = Array.from(document.querySelectorAll<HTMLElement>('.animation-container .step'));
  if (!container || steps.length === 0) return;

  steps.forEach((s) => gsap.set(s, { autoAlpha: 0, pointerEvents: 'none' }));
  let current = 0;
  showStep(steps[current], true);

  ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    end: `+=${(steps.length - 1) * 100}%`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    markers: false,
    onUpdate: (self: { progress: number }) => {
      const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
      if (idx !== current) {
        hideStep(steps[current]);
        showStep(steps[idx]);
        current = idx;
      }
    },
  });
}

function showStep(step: HTMLElement, immediate = false): void {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
  tl.set(step, { pointerEvents: 'auto' });
  tl.to(step, { autoAlpha: 1, duration: immediate ? 0 : 0.2 }, 0);

  const left = step.querySelector('.text-left, .xp_text-step:not(.is-right)');
  const image = step.querySelector('.image-center, .xp_img-col');
  const right = step.querySelector('.text-right, .xp_text-step.is-right');

  if (left) tl.fromTo(left, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0);
  if (image)
    tl.fromTo(image, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6 }, 0.15);
  if (right) tl.fromTo(right, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.3);
}

function hideStep(step: HTMLElement): void {
  const tl = gsap.timeline();
  const left = step.querySelector('.text-left, .xp_text-step:not(.is-right)');
  const image = step.querySelector('.image-center, .xp_img-col');
  const right = step.querySelector('.text-right, .xp_text-step.is-right');

  if (left) tl.to(left, { y: -60, opacity: 0, duration: 0.3 }, 0);
  if (image) tl.to(image, { opacity: 0, scale: 0.85, duration: 0.3 }, 0.1);
  if (right) tl.to(right, { y: 60, opacity: 0, duration: 0.3 }, 0.2);

  tl.to(step, { autoAlpha: 0, duration: 0.2 }, 0.2).set(step, { pointerEvents: 'none' });
}
