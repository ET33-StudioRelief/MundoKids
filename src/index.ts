import './index.css';

import { initAccordionToggle } from '$utils/accordion';
import { initGsapCardsAnimation, initIntroDecorativAnimation } from '$utils/gsap';
import { svgComponent } from '$utils/svg';
import { swiperInfo, swiperTest, swiperUnivers, swiperZones } from '$utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  svgComponent();
  swiperInfo();
  initAccordionToggle();

  if (window.location.pathname === '/') {
    initIntroDecorativAnimation();
    initGsapCardsAnimation();
    swiperTest();
    swiperZones();
  }
  if (window.location.pathname === '/nos-activites') {
    initIntroDecorativAnimation();
    swiperUnivers();
  }
});
