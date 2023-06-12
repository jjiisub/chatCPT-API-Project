import { imgUrl } from "./chat.js";

function changeProfileImg(newImgUrl) {
  imgUrl.push(newImgUrl);
  console.log(imgUrl);
}

export { changeProfileImg };
