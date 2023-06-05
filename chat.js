import { SwitchLoad } from "./loading.js";
import { apiQuestionPost } from "./question.js";
export { printUserChat, printAIChat, apiChatPost };

const $chatScreen = document.querySelector(".chat-screen");

// openAI API
let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 사용자의 질문
// let userChat;

// 화면에 뿌려줄 데이터, 질문들
// let questionData = [];

// let data = [
//   {
//     role: "system",
//     content:
//       "Assistant will conduct a role play in English. Assistant will respond with one sentence at a time, taking turns in the conversation and waiting for a response before replying. Assistant is a cat owned by the user. The assistant's name is Bori. At the end of each sentence, add 'meow.'",
//   },
//   {
//     role: "user",
//     content: "Hi, What is your name?",
//   },
// ];

// let AIdata = [];

// userChat이 들어갈 userChatBox를 만드는 함수
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
      apiQuestionPost(AIdata, element, dataQuestion);
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
        role: "system",
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
