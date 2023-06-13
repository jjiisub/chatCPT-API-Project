export { switchAnswerModal, switchHelpModal };

const $answerModal = document.querySelector(".answer-modal");
const $helpModal = document.querySelector(".help-modal");
const $answerModalCloseBtn = document.querySelector(".btn-close-answer-modal");
const $helpModalCloseBtn = document.querySelector(".btn-close-help-modal");

// 문법 질문 Modal switch 함수
function switchAnswerModal(answer, aiChat) {
  $answerModal.classList.toggle("hidden");

  fillModalSentence(aiChat);
  fillModalAnswer(answer);
}
// 종료 버튼 event 생성
$answerModalCloseBtn.addEventListener("click", switchAnswerModal);

// answer-modal에 답변 내용 저장
function fillModalAnswer(message) {
  if (message) {
    const modalContent = document.querySelector(".modal-content");
    modalContent.innerText = message;
  }
}

// answer-modal에 질문한 문장 저장
function fillModalSentence(aiChat) {
  if (aiChat) {
    const modalQuestion = document.querySelector(".modal-question");
    modalQuestion.innerText = aiChat;
  }
}

// help modal
function switchHelpModal() {
  $helpModal.classList.toggle("hidden");
}
// 종료 버튼 event 생성
// $helpModalCloseBtn.addEventListener("click", switchHelpModal);
