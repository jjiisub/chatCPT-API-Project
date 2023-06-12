export { makeModalContainer };

const $body = document.querySelector("body");

// Build HTML
function makeModalContainer() {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal");
  modalContainer.classList.add("hidden");

  const modalBackground = document.createElement("div");
  modalContainer.classList.add("modal-background");

  const modalAIContent = document.createElement("div");
  modalAIContent.classList.add("modal-question");
  modalAIContent.classList.add("ai-chat-content");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalCloseBtn = document.createElement("button");
  modalCloseBtn.classList.add("btn-close-modal");
  modalCloseBtn.innerText = "닫기";

  //   modalContainer.append(`<div class="modal-background</div>`);
  //   modalContainer.append(`<div class="modal-question ai-chat-content"></div>`);
  //   modalContainer.append(`<div class="modal-content"></div>`);
  //   modalContainer.append(`<button class="btn-close-modal">close</button>`);
  modalContainer.append(modalBackground, modalAIContent, modalContent, modalCloseBtn);
  $body.prepend(modalContainer);
}

{
  /* <div class="modal hidden">
  <div class="modal-background"></div>
  <div class="modal-question ai-chat-content"></div>
  <div class="modal-content"></div>
  <button class="btn-close-modal">close</button>
  </div> */
}
