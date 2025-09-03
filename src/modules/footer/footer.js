(function () {
  const SELECTORS = [".podval__navigation a", ".podval__title a"].join(",");

  const mql = window.matchMedia("(max-width: 767.98px)");

  function apply(disable) {
    document.querySelectorAll(SELECTORS).forEach((a) => {
      if (disable) {
        if (a.hasAttribute("href")) {
          a.dataset.href = a.getAttribute("href");
          a.removeAttribute("href");
        }
        a.setAttribute("aria-disabled", "true");
        a.style.cursor = "default";
      } else {
        if (!a.hasAttribute("href") && a.dataset.href) {
          a.setAttribute("href", a.dataset.href);
          delete a.dataset.href;
        }
        a.removeAttribute("aria-disabled");
        a.style.removeProperty("cursor");
      }
    });
  }

  apply(mql.matches);

  mql.addEventListener("change", (e) => apply(e.matches));
})();

document.addEventListener("DOMContentLoaded", () => {
  const listButtons = document.querySelectorAll(".podval__resources, .podval__help, .podval__company, .podval__menu");

  listButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const list = button.querySelector(".podval__list");

      if (list) {
        list.classList.toggle("is-active");
      }
    });
  });
});
