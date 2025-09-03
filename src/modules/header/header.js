const burgerButton = document.querySelector(".header__burger-menu");
const mobileNav = document.querySelector(".header__mobile-nav");

burgerButton.addEventListener("click", () => {
  mobileNav.classList.toggle("is-active");
  burgerButton.classList.toggle("is-open");
});
