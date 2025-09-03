const btn = document.querySelector(".need-help__submit");
const input = document.querySelectorAll("input");
const textAria = document.querySelector("textarea");

btn.addEventListener("click", (e) => {
  alert("Thank you");
  e.preventDefault();
  input.forEach((item) => {
    item.value = "";
  });
  textAria.value = "";
});
