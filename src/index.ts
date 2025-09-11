import './index.css';

import { initAccordionToggle } from '$utils/accordion';
import { initStepAnimation } from '$utils/animation';
import { initGsapCardsAnimation, initIntroDecorativAnimation } from '$utils/gsap';
import { ScrollTrigger } from '$utils/gsapSetup';
import { svgComponent } from '$utils/svg';
import { swiperInfo, swiperTestimonial, swiperUnivers, swiperZones } from '$utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  svgComponent();
  swiperInfo();
  initAccordionToggle();
  const hasAnim = document.querySelector('.animation-container');
  if (hasAnim) {
    initStepAnimation();
    setTimeout(() => ScrollTrigger.refresh(), 0);
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  }

  if (window.location.pathname === '/') {
    initIntroDecorativAnimation();
    initGsapCardsAnimation();
    swiperTestimonial();
    swiperZones();
  }

  if (window.location.pathname === '/nos-activites') {
    initIntroDecorativAnimation();
    swiperUnivers();
  }
});
