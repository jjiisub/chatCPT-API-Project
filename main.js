import { printUserChat, apiChatPost, saveUserChat } from "./js/chat.js";
import { changeProfileImg } from "./js/profile.js";

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

document.querySelector(".ai_img_upload").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const image = new Image();
    image.src = e.target.result;
    console.log(image.src);

    // 이미지를 캐시로 저장하기 위해 이미지 URL을 설정합니다.
    const imageUrl = image.src;
    const imageName = file.name;

    const tmpImg = document.createElement("img");
    tmpImg.classList.add("tmpImg");
    tmpImg.setAttribute("src", imageUrl);
    document.querySelector("body").appendChild(tmpImg);

    changeProfileImg(imageUrl);

    // 캐시 저장을 위해 이미지를 로드합니다.
    const cacheImage = new Image();
    cacheImage.src = imageUrl;
    cacheImage.onload = function () {
      console.log(imageName + " 이미지가 캐시에 저장되었습니다.");
    };
  };
  reader.readAsDataURL(file);
});
