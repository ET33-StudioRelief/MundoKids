import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

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
    end: '+=300%', // 4 steps => 3 écrans de transitions
    pin: true,
    scrub: 1,
    markers: true,
    onUpdate: (self) => {
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

  const left = step.querySelector('.xp_text-step.is-left');
  const image = step.querySelector('.xp_img-col');
  const right = step.querySelector('.xp_text-step.is-right');

  if (left) tl.fromTo(left, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0);
  if (image)
    tl.fromTo(image, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6 }, 0.15);
  if (right) tl.fromTo(right, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.3);
}

function hideStep(step: HTMLElement): void {
  const tl = gsap.timeline();
  const left = step.querySelector('.xp_text-step.is-left');
  const image = step.querySelector('.xp_img-col');
  const right = step.querySelector('.xp_text-step.is-right');

  if (left) tl.to(left, { y: -60, opacity: 0, duration: 0.3 }, 0);
  if (image) tl.to(image, { opacity: 0, scale: 0.85, duration: 0.3 }, 0.1);
  if (right) tl.to(right, { y: 60, opacity: 0, duration: 0.3 }, 0.2);

  tl.to(step, { autoAlpha: 0, duration: 0.2 }, 0.2).set(step, { pointerEvents: 'none' });
}
