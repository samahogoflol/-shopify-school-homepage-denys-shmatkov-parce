import Swiper from "swiper";
import { Thumbs, FreeMode, Mousewheel, Manipulation } from "swiper/modules";
import "swiper/swiper-bundle.css";

import whiteFoto1 from "../../assets/imgs/products/whiteVersion/mainFoto.svg";
import whiteFoto2 from "../../assets/imgs/products/whiteVersion/second.svg";
import whiteFoto3 from "../../assets/imgs/products/whiteVersion/third.svg";
import whiteFoto4 from "../../assets/imgs/products/whiteVersion/fourth.svg";
import whiteFoto5 from "../../assets/imgs/products/whiteVersion/five.svg";

import blackFoto1 from "../../assets/imgs/products/blackVersion/main.svg";
import blackFoto2 from "../../assets/imgs/products/blackVersion/second.svg";
import blackFoto3 from "../../assets/imgs/products/blackVersion/third.svg";
import blackFoto4 from "../../assets/imgs/products/blackVersion/fourth.svg";
import blackFoto5 from "../../assets/imgs/products/blackVersion/five.svg";

import pinkFoto1 from "../../assets/imgs/products/pinkVersion/mainFoto.svg";
import pinkFoto2 from "../../assets/imgs/products/pinkVersion/second.svg";
import pinkFoto3 from "../../assets/imgs/products/pinkVersion/third.svg";
import pinkFoto4 from "../../assets/imgs/products/pinkVersion/fourth.svg";
import pinkFoto5 from "../../assets/imgs/products/pinkVersion/five.svg";

document.addEventListener("DOMContentLoaded", () => {
  const VARIANTS = {
    white: {
      images: [whiteFoto1, whiteFoto2, whiteFoto3, whiteFoto4, whiteFoto5],
      price: 320,
    },
    black: {
      images: [blackFoto1, blackFoto2, blackFoto3, blackFoto4, blackFoto5],
      price: 300,
    },
    pink: {
      images: [pinkFoto1, pinkFoto2, pinkFoto3, pinkFoto4, pinkFoto5],
      price: 280,
    },
  };

  const priceEl = document.getElementById("product-price");
  const sizesRoot = document.querySelector(".selected-product__sizes");
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  sizesRoot?.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    sizesRoot.querySelectorAll("button").forEach((b) => b.classList.remove("is-selected"));
    btn.classList.add("is-selected");
  });

  const thumbs = new Swiper(".selected-product__thumbs-swiper", {
    modules: [FreeMode, Mousewheel, Manipulation],
    loop: false,
    watchSlidesProgress: true,
    direction: "vertical",
    slidesPerView: 5,
    spaceBetween: 24,
    freeMode: { enabled: true },
    mousewheel: { forceToAxis: true, releaseOnEdges: true },
    breakpoints: {
      0: { direction: "horizontal", slidesPerView: 3.5, spaceBetween: 16 },
      767: { direction: "horizontal", slidesPerView: 5, spaceBetween: 20 },
      1279: { direction: "vertical", slidesPerView: 5, spaceBetween: 24 },
    },
  });

  const main = new Swiper(".selected-product__main", {
    modules: [Thumbs, Manipulation],
    loop: false,
    rewind: true,
    slidesPerView: 1,
    thumbs: { swiper: thumbs },
    observer: true,
    observeParents: true,
  });

  const colors = new Swiper(".selected-product__choice-color-swiper", {
    slidesPerView: "auto",
    spaceBetween: 12,
    slideToClickedSlide: true,
  });

  const buildSlides = (swiper, images, imgClass = "") => {
    const slides = images.map(
      (src, i) =>
        `<div class="swiper-slide">
           <img class="${imgClass}" src="${src}" alt="variant image ${i + 1}">
         </div>`
    );
    swiper.removeAllSlides();
    swiper.appendSlide(slides);
    swiper.update();
  };

  function renderVariant(variant) {
    const { images, price } = VARIANTS[variant];
    buildSlides(main, images, "selected-product__main-img");
    buildSlides(thumbs, images);
    main.thumbs.swiper = thumbs;
    main.thumbs.update();
    main.slideTo(0, 0);
    thumbs.slideTo(0, 0);
    priceEl.textContent = money.format(price);
  }

  const setActiveColor = (el) => {
    colors.slides.forEach((s) => s.classList.remove("is-selected"));
    el.classList.add("is-selected");
  };

  colors.on("click", () => {
    const el = colors.clickedSlide;
    if (!el) return;
    const variant = el.dataset.variant;
    if (!variant) return;
    setActiveColor(el);
    renderVariant(variant);
  });

  const initial = [...colors.slides].find((s) => s.dataset.variant === "pink") || colors.slides[0];
  if (initial) {
    setActiveColor(initial);
    renderVariant(initial.dataset.variant);
  }
});
