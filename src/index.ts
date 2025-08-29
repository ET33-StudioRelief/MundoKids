import './index.css';

import { svgComponent } from '$utils/svg';
import { swiperHpInfo, swiperHpTestimonial, swiperHpZones } from '$utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  swiperHpZones();
  svgComponent();
  swiperHpInfo();
  swiperHpTestimonial();
});
