document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq__question");
  const faqAnswers = document.querySelectorAll(".is-active-text");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const parentItem = question.closest(".faq__item");
      parentItem.classList.toggle("is-active");
      
    });
  });
});
