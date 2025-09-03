import Swiper from "swiper";
import { Thumbs, FreeMode, Mousewheel, Manipulation } from "swiper/modules";
import "swiper/swiper-bundle.css";

import pink1 from "url:../../assets/imgs/products/pinkVersion/mainFoto.svg";
import pink2 from "url:../../assets/imgs/products/pinkVersion/second.svg";
import pink3 from "url:../../assets/imgs/products/pinkVersion/third.svg";
import pink4 from "url:../../assets/imgs/products/pinkVersion/fourth.svg";
import pink5 from "url:../../assets/imgs/products/pinkVersion/five.svg";

import white1 from "url:../../assets/imgs/products/whiteVersion/mainFoto.svg";
import white2 from "url:../../assets/imgs/products/whiteVersion/second.svg";
import white3 from "url:../../assets/imgs/products/whiteVersion/third.svg";
import white4 from "url:../../assets/imgs/products/whiteVersion/fourth.svg";
import white5 from "url:../../assets/imgs/products/whiteVersion/five.svg";

import black1 from "url:../../assets/imgs/products/blackVersion/main.svg";
import black2 from "url:../../assets/imgs/products/blackVersion/second.svg";
import black3 from "url:../../assets/imgs/products/blackVersion/third.svg";
import black4 from "url:../../assets/imgs/products/blackVersion/fourth.svg";
import black5 from "url:../../assets/imgs/products/blackVersion/five.svg";

const assetUrl = (m) => (typeof m === "string" ? m : m?.default ?? String(m));

console.log("pink images:", [pink1, pink2, pink3, pink4, pink5].map(assetUrl));

document.addEventListener("DOMContentLoaded", () => {
  const VARIANTS = {
    white: { images: [white1, white2, white3, white4, white5].map(assetUrl), price: 320 },
    black: { images: [black1, black2, black3, black4, black5].map(assetUrl), price: 300 },
    pink: { images: [pink1, pink2, pink3, pink4, pink5].map(assetUrl), price: 280 },
  };

  // --- ДАЛІ ТВОЯ ЛОГІКА БЕЗ ЗМІН ---
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
    const slides = images.map((src, i) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      const img = document.createElement("img");
      if (imgClass) img.className = imgClass;
      img.alt = `variant image ${i + 1}`;
      img.decoding = "async";
      img.loading = "lazy";
      img.src = src; // <-- вже чистий http-URL
      slide.appendChild(img);
      return slide;
    });
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
