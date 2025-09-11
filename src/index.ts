import './index.css';

import { initAccordionToggle } from '$utils/accordion';
import { initStepAnimation } from '$utils/animation';
import { initGsapCardsAnimation, initIntroDecorativAnimation } from '$utils/gsap';
import { svgComponent } from '$utils/svg';
import { swiperInfo, swiperTestimonial, swiperUnivers, swiperZones } from '$utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  svgComponent();
  swiperInfo();
  initAccordionToggle();
  initStepAnimation();

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
