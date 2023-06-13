export { switchAnswerModal, openHelpModal, closeHelpModal };
import { setAIImg, selectAIImg, saveAIImg } from "./profile.js";

const $answerModal = document.querySelector(".answer-modal");
const $helpModal = document.querySelector(".help-modal");
const $answerModalCloseBtn = document.querySelector(".btn-close-answer-modal");
// const $helpModalCloseBtn = document.querySelector(".btn-close-help-modal");
const $imgUpload = document.querySelector(".input_ai_img");

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
// function switchHelpModal() {
//   $helpModal.classList.toggle("hidden");
// }
// 종료 버튼 event 생성
// $helpModalCloseBtn.addEventListener("click", switchHelpModal);

function openHelpModal() {
  $helpModal.classList.remove("hidden");
}

function closeHelpModal() {
  $helpModal.classList.add("hidden");
}

// profile img upload
$imgUpload.addEventListener("change", function (event) {
  // uploadAIImg(event);
  selectAIImg(event);
});

const $characterSelect = document.querySelector(".btn-close-help-modal");
$characterSelect.addEventListener("click", function () {
  closeHelpModal();

  // find radio value
  const radioList = document.getElementsByName("character");
  let radioValue;
  radioList.forEach((radio) => {
    if (radio.parentNode.classList.contains("selected")) {
      radioValue = radio;
    }
  });

  // img src 저장
  switch (radioValue.id) {
    case "cat":
      saveAIImg("./asset/img/ai_img_cat.jpg");
      break;
    case "man":
      saveAIImg("./asset/img/ai_img_man.png");
      break;
    case "woman":
      saveAIImg("./asset/img/ai_img_woman.png");
      break;
    case "else":
      // saveAIImg("./asset/img/ai_img_woman.png");
      break;
  }
  setAIImg();
});

// help modal character select 시 배경 변화 event
const $characterList = document.querySelectorAll('input[type="radio"][name="character"]');
$characterList.forEach((character) => {
  document.body.addEventListener("change", function () {
    if ($imgUpload.files.length > 0) {
      character.parentNode.classList.remove("selected");
    } else if (character.checked) {
      character.parentNode.classList.add("selected");
    } else if (!character.checked) {
      character.parentNode.classList.remove("selected");
    }
  });
});
