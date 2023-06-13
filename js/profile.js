import { imgUrl } from "./chat.js";
import { switchLoad } from "./loading.js";
import { closeHelpModal } from "./modal.js";
export { uploadAIImg, setAIImg, selectAIImg, saveAIImg };

// 업로드된 img를 localStorage에 저장
function saveAIImg(newImgUrl) {
  //   imgUrl.push(newImgUrl);
  localStorage.clear;
  localStorage.setItem(`aiImg`, newImgUrl);
}

function setAIImg() {
  const imgFromLocalStorage = localStorage.getItem(`aiImg`);
  if (imgFromLocalStorage) {
    const aiChatList = document.querySelectorAll(".ai-chat .ai-img");
    aiChatList.forEach((imgElement) => {
      imgElement.setAttribute("src", imgFromLocalStorage);
    });
    imgUrl.push(imgFromLocalStorage);
    closeHelpModal();
  }
}

function uploadAIImg(event) {
  switchLoad();
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const image = new Image();
    image.src = e.target.result;
    // console.log(image.src);

    // const tmpImg = document.createElement("img");
    // tmpImg.classList.add("tmpImg");
    // tmpImg.setAttribute("src", imageUrl);
    // document.querySelector("body").appendChild(tmpImg);

    saveAIImg(image.src);
    setAIImg();
    switchLoad();
  };
  reader.readAsDataURL(file);
}

function selectAIImg(event) {
  switchLoad();
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const image = new Image();
    image.src = e.target.result;
    const $uploadedImg = document.querySelector(".ai-img-uploaded");
    console.log($uploadedImg);

    $uploadedImg.setAttribute("src", image.src);
    $uploadedImg.classList.add("ai-img");
    $uploadedImg.parentNode.classList.add("selected");

    // const tmpImg = document.createElement("img");
    // tmpImg.classList.add("tmpImg");
    // tmpImg.setAttribute("src", imageUrl);
    // document.querySelector("body").appendChild(tmpImg);

    saveAIImg(image.src);
    // setAIImg();
    switchLoad();
  };
  reader.readAsDataURL(file);
}
