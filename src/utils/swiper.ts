import 'swiper/css/effect-fade';

import Swiper from 'swiper';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

export function swiperInfo() {
  const swiperElement = document.querySelector('.swiper.is-info');

  if (!swiperElement) {
    return;
  }
  new Swiper('.swiper.is-info', {
    modules: [Navigation, Pagination],
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 48,
    rewind: true,
    effect: 'slide',
    speed: 800,
    allowTouchMove: true,
    grabCursor: true,
    navigation: {
      prevEl: '.swiper-button-prev.is-info',
      nextEl: '.swiper-button-next.is-info',
    },
    pagination: {
      el: '.swiper-pagination.is-info',
      clickable: true,
      bulletClass: 'swiper-bullet',
      bulletActiveClass: 'is-active',
      renderBullet: (_, className) => `<span class="${className}"></span>`,
    },
  });

  const equalizeInfoCardHeights = () => {
    const cards = document.querySelectorAll<HTMLElement>(
      '.swiper.is-info .swiper-slide.is-info .cc--info-card'
    );
    if (!cards.length) return;
    cards.forEach((c) => {
      c.style.height = 'auto';
    });
    const max = Math.max(...Array.from(cards).map((c) => c.offsetHeight));
    cards.forEach((c) => {
      c.style.height = `${max}px`;
    });
  };

  equalizeInfoCardHeights();
  window.addEventListener('resize', equalizeInfoCardHeights);
}

export function swiperZones() {
  const swiperElement = document.querySelector('.swiper.is-zones');

  if (!swiperElement) {
    return;
  }
  new Swiper('.swiper.is-zones', {
    modules: [Autoplay, Navigation, Pagination],
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 48,
    loop: true,
    effect: 'slide',
    speed: 800,
    autoplay: { delay: 1000, disableOnInteraction: false },
    navigation: { prevEl: '.swiper-button-prev.is-zones', nextEl: '.swiper-button-next.is-zones' },
    pagination: {
      el: '.swiper-pagination.is-zones',
      clickable: true,
      bulletClass: 'swiper-bullet',
      bulletActiveClass: 'is-active',
      renderBullet: (_, c) => `<span class="${c}"></span>`,
    },
    breakpoints: {
      // Paramètres pour les tablettes
      768: {
        slidesPerGroup: 2,
      },
      // Paramètres pour les téléphones
      0: {
        slidesPerGroup: 1,
      },
    },
  });
}

export function swiperTestimonial() {
  const swiperElement = document.querySelector('.swiper.is-testimonial');
  if (!swiperElement) {
    return;
  }
  new Swiper('.swiper.is-testimonial', {
    modules: [Autoplay, Navigation, Pagination],
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 48,
    speed: 800,
    effect: 'slide',
    loop: true,
    autoplay: { delay: 1000, disableOnInteraction: false },
    navigation: {
      prevEl: '.swiper-button-prev.is-testimonial',
      nextEl: '.swiper-button-next.is-testimonial',
    },
    pagination: {
      el: '.swiper-pagination.is-testimonial',
      clickable: true,
      bulletClass: 'swiper-bullet',
      bulletActiveClass: 'is-active',
      renderBullet: (_, className) => `<span class="${className}"></span>`,
    },
  });
}
export function swiperUnivers() {
  const swiperElement = document.querySelector('.swiper.is-univers');

  if (!swiperElement) {
    return;
  }
  new Swiper('.swiper.is-univers', {
    modules: [Navigation, Pagination, EffectFade],
    loop: true,
    speed: 800,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      prevEl: '.swiper-button-prev.is-univers',
      nextEl: '.swiper-button-next.is-univers',
    },
    pagination: {
      el: '.swiper-pagination.is-univers',
      clickable: true,
      bulletClass: 'swiper-bullet',
      bulletActiveClass: 'is-active',
      renderBullet: (_, className) => `<span class="${className}"></span>`,
    },
  });
}
