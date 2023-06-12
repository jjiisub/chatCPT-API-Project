export { switchModal };

// 문법 질문 Modal switch 함수
const Modal = document.querySelector(".modal");
function switchModal(answer, aiChat) {
  Modal.classList.toggle("hidden");

  fillModalSentence(aiChat);
  fillModalAnswer(answer);

  // 종료 버튼 event 생성
  const closeBtn = document.querySelector(".btn-close-modal");
  closeBtn.addEventListener("click", switchModal);
}

// modal에 답변 내용 저장
function fillModalAnswer(message) {
  if (message) {
    const modalContent = document.querySelector(".modal-content");
    modalContent.innerText = message;
  }
}

// modal에 질문한 문장 저장
function fillModalSentence(aiChat) {
  if (aiChat) {
    const modalQuestion = document.querySelector(".modal-question");
    modalQuestion.innerText = aiChat;
  }
}
