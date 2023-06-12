export { SwitchModal };

// Modal
let Modal = document.querySelector(".modal");
function SwitchModal(message, AIChat) {
  Modal.classList.toggle("hidden");

  if (message) {
    let modalContent = document.querySelector(".modal-content");
    modalContent.innerText = message;
  }

  if (AIChat) {
    let modalQuestion = document.querySelector(".modal-question");
    modalQuestion.innerText = AIChat;
  }
}

let closeBtn = document.querySelector(".btn-close-modal");
closeBtn.addEventListener("click", SwitchModal);
