// Swiper core and modules used across carousels
import Swiper from 'swiper';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

// Build a custom pagination HTML where the total bullet count is halved.
// Useful when the CMS duplicates slides to enable seamless looping.
function renderHalvedBullets(
  _: Swiper,
  current: number,
  total: number,
  bulletClass: string,
  activeClass: string
) {
  const halvedTotal = Math.max(1, Math.floor(total / 2));
  // Swiper donne current en 1-based
  const normalizedCurrent = ((current - 1) % halvedTotal) + 1;
  let html = '';
  for (let i = 1; i <= halvedTotal; i += 1) {
    const cls = i === normalizedCurrent ? `${bulletClass} ${activeClass}` : bulletClass;
    html += `<span class="${cls}"></span>`;
  }
  return html;
}

export function swiperInfo() {
  // Guard: init only when the target slider exists on the page
  const swiperElement = document.querySelector('.swiper.is-info');

  if (!swiperElement) {
    return;
  }
  // Basic horizontal slider with nav and bullets, no loop
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
    // Next/Prev arrows
    navigation: {
      prevEl: '.swiper-button-prev.is-info',
      nextEl: '.swiper-button-next.is-info',
    },
    // Default bullets pagination
    pagination: {
      el: '.swiper-pagination.is-info',
      clickable: true,
      bulletClass: 'swiper-bullet',
      bulletActiveClass: 'is-active',
      renderBullet: (_, className) => `<span class="${className}"></span>`,
    },
  });

  // Equalize dynamic card heights inside visible slides for tidy rows
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
  // Guard: init only when the target slider exists on the page
  const swiperElement = document.querySelector('.swiper.is-zones');

  if (!swiperElement) {
    return;
  }
  // Looping slider with autoplay; pagination shows full count (not halved)
  new Swiper('.swiper.is-zones', {
    modules: [Autoplay, Navigation, Pagination],
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 48,
    loop: true,
    effect: 'slide',
    speed: 800,
    // Autoplay continues after user interaction
    autoplay: { delay: 1000, disableOnInteraction: false },
    // Next/Prev arrows
    navigation: { prevEl: '.swiper-button-prev.is-zones', nextEl: '.swiper-button-next.is-zones' },
    // Default bullets pagination (CMS duplicates are not halved here by design)
    pagination: {
      el: '.swiper-pagination.is-zones',
      clickable: true,
      bulletClass: 'swiper-bullet',
      bulletActiveClass: 'is-active',
      renderBullet: (_, c) => `<span class="${c}"></span>`,
    },
    breakpoints: {
      // Tablet: group slides by 2 for faster navigation
      768: {
        slidesPerGroup: 2,
      },
      // Mobile: group by 1 (default granularity)
      0: {
        slidesPerGroup: 1,
      },
    },
  });
}

export function swiperTestimonial() {
  // Guard: init only when the target slider exists on the page
  const swiperElement = document.querySelector('.swiper.is-testimonial');
  if (!swiperElement) {
    return;
  }
  // Looping testimonials with autoplay and standard bullets
  new Swiper('.swiper.is-testimonial', {
    modules: [Autoplay, Navigation, Pagination],
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 48,
    centeredSlides: true,
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
  // Guard: init only when the target slider exists on the page
  const swiperElement = document.querySelector('.swiper.is-univers');

  if (!swiperElement) {
    return;
  }

  new Swiper('.swiper.is-univers', {
    modules: [Navigation, Pagination, EffectFade],
    loop: true,
    speed: 800,
    slidesPerView: 'auto',
    spaceBetween: 0,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      prevEl: '.swiper-button-prev.is-univers',
      nextEl: '.swiper-button-next.is-univers',
    },
    pagination: {
      el: '.swiper-pagination.is-univers',
      type: 'custom',
      renderCustom: (swiper, current, total) =>
        renderHalvedBullets(swiper, current, total, 'swiper-bullet', 'is-active'),
    },
    breakpoints: {
      // Desktop: effet fade
      992: {
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        spaceBetween: 0,
        centeredSlides: false,
      },
      // Mobile: effet slide
      0: {
        effect: 'slide',
        spaceBetween: 48,
        centeredSlides: true,
      },
    },
  });
}
