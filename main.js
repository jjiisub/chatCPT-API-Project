import { printUserChat, apiChatPost, saveUserChat } from "./js/chat.js";
import { uploadAIImg, setAIImg, selectAIImg, saveAIImg } from "./js/profile.js";
import { switchHelpModal } from "./js/modal.js";

const $form = document.querySelector("form");
const $input = document.querySelector(".chat-input-text");
const $imgUpload = document.querySelector(".input_ai_img");
const $characterSelect = document.querySelector(".btn-close-help-modal");

// 사용자의 질문 1개
let userChat;

// AI의 대답 목록
const aiData = [];

// set img from LocalStorage
setAIImg();

// input에 입력된 질문 받아오는 함수
$input.addEventListener("input", (e) => {
  userChat = e.target.value;
});

// profile img upload
$imgUpload.addEventListener("change", function (event) {
  // uploadAIImg(event);
  selectAIImg(event);
});

$characterSelect.addEventListener("click", function () {
  switchHelpModal();

  // find radio value
  const radioList = document.getElementsByName("character");
  let radioValue;
  radioList.forEach((radio) => {
    if (radio.parentNode.classList.contains("selected")) {
      radioValue = radio;
    }
  });
  // console.log(radioValue);

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
  console.log(character.parentNode);
  console.log(character.checked);
  console.log($imgUpload);
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

// submit
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  $input.value = null;
  saveUserChat(userChat);
  printUserChat(userChat);
  apiChatPost(aiData);
});
