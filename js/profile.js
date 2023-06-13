import { imgUrl, initializeDataChat } from "./chat.js";
import { switchLoad } from "./loading.js";
import { closeHelpModal, openHelpModal, selectedCheck } from "./modal.js";
export { setAIImg, selectAIImg, saveAIImg, changeAIImg };

// 업로드된 img를 localStorage에 저장
function saveAIImg(newImgUrl) {
  //   imgUrl.push(newImgUrl);
  // localStorage.clear();
  localStorage.setItem(`aiImg`, newImgUrl);
}

function setAIImg() {
  const imgFromLocalStorage = localStorage.getItem(`aiImg`);
  if (imgFromLocalStorage) {
    const aiChatList = document.querySelectorAll(".ai-chat .ai-img");
    aiChatList.forEach((imgElement) => {
      imgElement.setAttribute("src", imgFromLocalStorage);
      // imgElement.addEventListener("click", changeAIImg);
    });
    imgUrl.push(imgFromLocalStorage);
    closeHelpModal();
    initializeDataChat(localStorage.getItem("character"), -1);
  }
}

// function uploadAIImg(event) {
//   switchLoad();
//   const file = event.target.files[0];
//   const reader = new FileReader();

//   reader.onload = function (e) {
//     const image = new Image();
//     image.src = e.target.result;
//     // console.log(image.src);

//     // const tmpImg = document.createElement("img");
//     // tmpImg.classList.add("tmpImg");
//     // tmpImg.setAttribute("src", imageUrl);
//     // document.querySelector("body").appendChild(tmpImg);

//     saveAIImg(image.src);
//     setAIImg();
//     switchLoad();
//   };
//   reader.readAsDataURL(file);
// }

function selectAIImg(event) {
  switchLoad();
  const file = event.target.files[0];
  const reader = new FileReader();
  if (fileSizeCheck(file) === false) {
    switchLoad();
    event.target.value = null;
    return;
  }
  reader.onload = function (e) {
    const image = new Image();
    image.src = e.target.result;
    const $uploadedImg = document.querySelector(".ai-img-uploaded");

    $uploadedImg.setAttribute("src", image.src);
    $uploadedImg.classList.add("ai-img");
    $uploadedImg.parentNode.classList.add("selected");
    // const $radioCat = document.querySelector('input[type="radio"][id="cat"]');
    // $radioCat.classList.add("selected");
    // const tmpImg = document.createElement("img");
    // tmpImg.classList.add("tmpImg");
    // tmpImg.setAttribute("src", imageUrl);
    // document.querySelector("body").appendChild(tmpImg);

    saveAIImg(image.src);
    // setAIImg();
    switchLoad();
    selectedCheck();
    const $btnAIImgClose = document.querySelector(".ai-img-close");
    $btnAIImgClose.classList.remove("hidden");

    const $characterSituation = document.querySelector(".input-situation");
    $characterSituation.removeAttribute("disabled");
    $characterSituation.setAttribute("placeholder", "AI의 역할을 입력해주세요");
    $characterSituation.setAttribute("required", true);
    $characterSituation.setAttribute("autofocus", true);
    $characterSituation.value = "";
  };
  reader.readAsDataURL(file);
}

// ai-img 클릭 시 발생하는 함수 -> help modal 재실행
function changeAIImg() {
  localStorage.clear();
  // openHelpModal();
  location.reload();
}

// web LocalStorage의 용량 제한 체크
function fileSizeCheck(file) {
  const maxSize = 5 * 1024 * 1024;
  if (file.size >= maxSize) {
    alert("첨부파일 사이즈는 5MB 이내로 등록 가능합니다.");
    return false;
  }
  return true;
}
