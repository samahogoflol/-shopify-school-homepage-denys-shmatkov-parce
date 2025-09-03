import Swiper from "swiper";
import { Pagination } from "swiper/modules";

import "swiper/swiper-bundle.css";

document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".greeting__swiper", {
    modules: [Pagination],
    slidesPerView: 1,
    grabCursor: true,
    pagination: {
      el: ".greeting__swiper .swiper-pagination",
      clickable: true,
      renderBullet: (i, className) => `<button type="button" class="${className}" aria-label="Go to slide ${i + 1}"></button>`,
    },
  });
});
