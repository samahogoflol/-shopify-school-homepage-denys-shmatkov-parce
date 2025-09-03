import Swiper from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/swiper-bundle.css";

document.addEventListener("DOMContentLoaded", function () {
  const swiperFeaturedCollection = new Swiper(".products-swiper", {
    modules: [Navigation],
    spaceBetween: 24,
    slidesPerView: 4,
    watchOverflow: false,
    navigation: {
      nextEl: ".custom-swiper-next",
      prevEl: ".custom-swiper-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.1,
        spaceBetween: 10,
        loop: true,
        freeMode: true,
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 15,
        loop: true,
        freeMode: true,
      },
      1279: {
        slidesPerView: 4,
        spaceBetween: 24,
        loop: true,
        freeMode: true,
      },
    },
  });
});
