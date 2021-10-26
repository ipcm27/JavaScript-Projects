const modal = document.querySelector(".modal");
// console.log(modal);
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
// const btnsOpenModal = document.querySelector('.show-modal');
const btnsOpenModal = document.querySelectorAll(".show-modal");
console.log(btnsOpenModal);

// btnsOpenModal[0].addEventListener('click', function () {
//     console.log('Botão clicado!');

//     console.log(modal.classList);

//     modal.classList.remove('hidden');
//     overlay.classList.remove('hidden');
// })

// btnsOpenModal[1].addEventListener('click', function () {
//     console.log('Botão clicado!');

//     console.log(modal.classList);

//     modal.classList.remove('hidden');
//     overlay.classList.remove('hidden');
// })

// btnsOpenModal[2].addEventListener('click', function () {
//     console.log('Botão clicado!');

//     console.log(modal.classList);

//     modal.classList.remove('hidden');
//     overlay.classList.remove('hidden');
// })

btnsOpenModal.forEach((btn) => console.log(btn.textContent));

btnsOpenModal.forEach((btn) =>
  btn.addEventListener("click", function () {
    console.log("Botão clicado!");

    console.log(modal.classList);

    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    // modal.style.display = 'block';
  })
);

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  // console.log('Pressionei uma tecla');

  // console.log(e.key);

  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
