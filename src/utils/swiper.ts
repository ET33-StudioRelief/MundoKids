import 'swiper/css';
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
    slidesPerView: 'auto',
    spaceBetween: 50,
    loop: true,
    loopAdditionalSlides: 2,
    navigation: {
      prevEl: '.swiper-button-prev.is-info',
      nextEl: '.swiper-button-next.is-info',
    },
    pagination: {
      el: '.swiper-pagination.is-info',
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

export function swiperZones() {
  const swiperElement = document.querySelector('.swiper.is-zones');

  if (!swiperElement) {
    return;
  }

  // Vérifier que l'élément a bien la structure Swiper
  const wrapper = swiperElement.querySelector('.swiper-wrapper');
  const slides = swiperElement.querySelectorAll('.swiper-slide');

  if (!wrapper || slides.length === 0) {
    return;
  }

  // Vérifier si Swiper est déjà initialisé
  if (swiperElement.classList.contains('swiper-initialized')) {
    return;
  }

  new Swiper('.swiper.is-zones', {
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
      prevEl: '.swiper-button-prev.is-zones',
      nextEl: '.swiper-button-next.is-zones',
    },
    pagination: {
      el: '.swiper-pagination.is-zones',
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
export function swiperUnivers() {
  const swiperElement = document.querySelector('.swiper.is-univers');

  if (!swiperElement) {
    return;
  }
  new Swiper('.swiper.is-univers', {
    modules: [Navigation, Pagination, EffectFade],
    loop: true,
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
      bulletClass: 'hp-bullet',
      bulletActiveClass: 'is-active',
      renderBullet: (_, className) => `<span class="${className}"></span>`,
    },
    speed: 1000,
  });
}
