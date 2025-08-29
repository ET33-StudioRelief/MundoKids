import 'swiper/css';

import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export function swiperHpZones() {
  const swiperElement = document.querySelector('.swiper.is-hp-zones');

  if (!swiperElement) {
    return;
  }
  new Swiper('.swiper.is-hp-zones', {
    modules: [Autoplay, Navigation, Pagination],
    slidesPerView: 'auto',
    spaceBetween: 48,
    centeredSlides: true,
    centeredSlidesBounds: true, // utile avec slidesPerView: 'auto'
    loop: true,
    loopAdditionalSlides: 6,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: '.swiper-button-prev.is-hp-zones',
      nextEl: '.swiper-button-next.is-hp-zones',
    },
    pagination: {
      el: '.swiper-pagination.is-hp-zones',
      clickable: true,
      bulletClass: 'hp-bullet',
      bulletActiveClass: 'is-active',
      renderBullet: (_, className) => `<span class="${className}"></span>`,
    },
    allowTouchMove: true,
    grabCursor: true,
    width: 300,
    effect: 'slide',
    speed: 1000,
  });
}
export function swiperHpInfo() {
  const swiperElement = document.querySelector('.swiper.is-hp-info');

  if (!swiperElement) {
    return;
  }
  new Swiper('.swiper.is-hp-info', {
    modules: [Navigation, Pagination],
    slidesPerView: 'auto',
    spaceBetween: 50,
    loop: true,
    loopAdditionalSlides: 3,
    navigation: {
      prevEl: '.swiper-button-prev.is-hp-info',
      nextEl: '.swiper-button-next.is-hp-info',
    },
    pagination: {
      el: '.swiper-pagination.is-hp-info',
      clickable: true,
      bulletClass: 'hp-bullet',
      bulletActiveClass: 'is-active',
      renderBullet: (_, className) => `<span class="${className}"></span>`,
    },
    allowTouchMove: true,
    grabCursor: true,
    width: 100,
    effect: 'slide',
    speed: 1000,
  });
}
export function swiperHpTestimonial() {
  const swiperElement = document.querySelector('.swiper.is-hp-testimonial');

  if (!swiperElement) {
    return;
  }
  new Swiper('.swiper.is-hp-testimonial', {
    modules: [Autoplay, Navigation, Pagination],
    slidesPerView: 'auto',
    spaceBetween: 48,
    centeredSlides: true,
    centeredSlidesBounds: true, // utile avec slidesPerView: 'auto'
    loop: true,
    loopAdditionalSlides: 6,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: '.swiper-button-prev.is-hp-testimonial',
      nextEl: '.swiper-button-next.is-hp-testimonial',
    },
    pagination: {
      el: '.swiper-pagination.is-hp-testimonial',
      clickable: true,
      bulletClass: 'hp-bullet',
      bulletActiveClass: 'is-active',
      renderBullet: (_, className) => `<span class="${className}"></span>`,
    },
    allowTouchMove: true,
    grabCursor: true,
    width: 300,
    effect: 'slide',
    speed: 1000,
  });
}
