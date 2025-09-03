const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".modal__close");
const body = document.querySelector("body");
const btnSend = document.querySelector(".modal__send");

const showModal = () => {
  modal.style.display = "block";
  body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.style.display = "none";
  body.style.overflow = "auto";
  clearTimeout(timer);
};

const closeClearModal = () => {
  closeModal();
  clearTimeout(timer);
};

btnSend.addEventListener("click", (e) => {
  e.preventDefault();
  closeClearModal();
});

btnCloseModal.addEventListener("click", () => {
  closeClearModal();
});

addEventListener("click", (e) => {
  if (e.target === modal) {
    closeClearModal();
  }
});

addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeClearModal();
  }
});

const timer = setTimeout(showModal, 1000);
