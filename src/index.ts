import './index.css';

import { initGsapCardsAnimation } from '$utils/gsap';
import { svgComponent } from '$utils/svg';
import { swiperHpTestimonial, swiperInfo, swiperUnivers, swiperZones } from '$utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  svgComponent();
  swiperInfo();
  swiperHpTestimonial();
  swiperZones();
  swiperUnivers();

  initGsapCardsAnimation();
});
