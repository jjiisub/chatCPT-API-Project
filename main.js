import { printUserChat, apiChatPost, saveUserChat } from "./js/chat.js";
import { uploadAIImg, setAIImg } from "./js/profile.js";

const $form = document.querySelector("form");
const $input = document.querySelector(".chat-input-text");
const $imgUpload = document.querySelector(".ai_img_upload");

// 사용자의 질문 1개
let userChat;

// AI의 대답 목록
const aiData = [];

// input에 입력된 질문 받아오는 함수
$input.addEventListener("input", (e) => {
  userChat = e.target.value;
});

// set img from LocalStorage
setAIImg();

// submit
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  $input.value = null;
  saveUserChat(userChat);
  printUserChat(userChat);
  console.log(userChat);
  apiChatPost(aiData);
});

// profile img upload
$imgUpload.addEventListener("change", function (event) {
  uploadAIImg(event);
});
