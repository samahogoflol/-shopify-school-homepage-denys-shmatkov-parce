import Swiper from "swiper";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/swiper-bundle.css";

document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".greeting__swiper", {
    modules: [Pagination, Autoplay],
    slidesPerView: 1,
    grabCursor: true,
    rewind: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    pagination: {
      el: ".greeting__swiper .swiper-pagination",
      clickable: true,
      renderBullet: (i, className) => `<button type="button" class="${className}" aria-label="Go to slide ${i + 1}"></button>`,
    },
  });
});
