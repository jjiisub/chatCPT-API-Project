export { SwitchModal };

// Modal
let Modal = document.querySelector(".modal");
function SwitchModal(message, AIdata, index) {
  Modal.classList.toggle("hidden");

  if (message) {
    let modalContent = document.querySelector(".modal-content");
    modalContent.innerText = message;
  }

  if (index) {
    let modalQuestion = document.querySelector(".modal-question");
    modalQuestion.innerText = AIdata[index - 1].content;
  }
}

let closeBtn = document.querySelector(".btn-close-modal");
closeBtn.addEventListener("click", SwitchModal);
