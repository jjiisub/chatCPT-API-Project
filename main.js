import { printUserChat, apiChatPost, saveUserChat } from "./js/chat.js";

const $form = document.querySelector("form");
const $input = document.querySelector("input");

// 사용자의 질문 1개
let userChat;

// AI의 대답 목록
const aiData = [];

// input에 입력된 질문 받아오는 함수
$input.addEventListener("input", (e) => {
  userChat = e.target.value;
});

// submit
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  $input.value = null;
  saveUserChat(userChat);
  printUserChat(userChat);
  apiChatPost(aiData);
});
