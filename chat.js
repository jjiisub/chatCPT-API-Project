import { SwitchLoad } from "./loading.js";
import { apiQuestionPost } from "./question.js";
export { printUserChat, apiChatPost };

const $chatScreen = document.querySelector(".chat-screen");

// openAI API
const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

const makeUserChatBox = (userChat) => {
  let userChatBox = document.createElement("div");
  userChatBox.classList.add("user-chat");
  let userChatContent = document.createElement("div");
  userChatContent.classList.add("user-chat-content");
  userChatContent.innerText = userChat;
  userChatBox.appendChild(userChatContent);
  $chatScreen.appendChild(userChatBox);
};

// 화면에 userChat 그려주는 함수
const printUserChat = async (userChat) => {
  if (userChat) {
    makeUserChatBox(userChat);
    // questionData = [];
    userChat = false;
    keepScrollDown();
  }
};

// AIChat이 들어갈 AIChatBox를 만드는 함수
const makeAIChatBox = (AIChat, AIdata, dataQuestion) => {
  let AIChatBox = document.createElement("div");
  AIChatBox.classList.add("ai-chat");

  let AIImg = document.createElement("img");
  AIImg.classList.add("ai-img");
  AIImg.setAttribute("src", "./img/cat.JPG");
  AIChatBox.appendChild(AIImg);

  let AIChatContent = document.createElement("div");
  AIChatContent.classList.add("ai-chat-content");
  AIChatBox.appendChild(AIChatContent);

  AIChat.split(" ").forEach((element) => {
    let AIChatElement = document.createElement("a");
    AIChatElement.classList.add("ai-chat-element");
    AIChatElement.addEventListener("click", function (event) {
      apiQuestionPost(AIChat, element, dataQuestion);
    });
    AIChatElement.innerText = element;
    AIChatContent.appendChild(AIChatElement);
  });
  $chatScreen.appendChild(AIChatBox);
};

// 화면에 AIChat 그려주는 함수
const printAIChat = (AIChat, AIdata, dataQuestion) => {
  makeAIChatBox(AIChat, AIdata, dataQuestion);
  keepScrollDown();
};

// 항상 가장 밑에 스크롤을 유지하는 함수
function keepScrollDown() {
  $chatScreen.scrollTop = $chatScreen.scrollHeight;
}

// 채팅 api 요청보내는 함수
const apiChatPost = async (data, AIdata, dataQuestion) => {
  SwitchLoad();
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    redirect: "follow",
  })
    .then((res) => res.json())
    .then((res) => {
      SwitchLoad();
      data.push({
        role: "assistant",
        content: res.choices[0].message.content,
      });
      AIdata.push({
        content: res.choices[0].message.content,
      });
      printAIChat(res.choices[0].message.content, AIdata, dataQuestion);
    })
    .catch((err) => {
      console.log(err);
    });
};
