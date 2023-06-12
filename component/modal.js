export { SwitchModal };

// 문법 질문 Modal 함수
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

// 종료 버튼
let closeBtn = document.querySelector(".btn-close-modal");
closeBtn.addEventListener("click", SwitchModal);
