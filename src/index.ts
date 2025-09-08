import './index.css';

import { initGsapCardsAnimation } from '$utils/gsap';
import { svgComponent } from '$utils/svg';
import { swiperInfo, swiperTest, swiperUnivers, swiperZones } from '$utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  svgComponent();
  swiperInfo();
  swiperTest();
  swiperZones();
  swiperUnivers();

  initGsapCardsAnimation();
});
