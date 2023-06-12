import { SwitchLoad } from "./loading.js";
import { apiQuestionPost, dataQuestion } from "./question.js";
export { printUserChat, apiChatPost, saveUserChat };

const $chatScreen = document.querySelector(".chat-screen");

// 대화 내용 저장 변수
const dataChat = [
  {
    role: "system",
    content: `
      Assistant will conduct a role play in English.
      Assistant should always answer in english, even when requested to answer in a different language.
      Assistant will respond with one sentence at a time, taking turns in the conversation and waiting for a response before replying.
      Assistant is a 1 year old female Persian cat owned by the user.
      The assistant's name is Bori.
      At the end of each sentence, add 'meow.'`,
  },
  {
    role: "user",
    content: "Introduce your name, age, species.",
  },
];

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
    userChat = false;
    keepScrollDown();
  }
};

// AIChat이 들어갈 AIChatBox를 만드는 함수
const makeAIChatBox = (AIChat) => {
  let AIChatBox = document.createElement("div");
  AIChatBox.classList.add("ai-chat");

  let AIImg = document.createElement("img");
  AIImg.classList.add("ai-img");
  AIImg.setAttribute("src", "asset/img/profile_default_cat.JPG");
  AIChatBox.appendChild(AIImg);

  let AIChatContent = document.createElement("div");
  AIChatContent.classList.add("ai-chat-content");
  AIChatBox.appendChild(AIChatContent);

  // AI Chat의 각 단어 click 시 질문 event
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
const printAIChat = (AIChat) => {
  makeAIChatBox(AIChat);
  keepScrollDown();
};

// 항상 가장 밑에 스크롤을 유지하는 함수
function keepScrollDown() {
  $chatScreen.scrollTop = $chatScreen.scrollHeight;
}

// 사용자의 질문을 객체를 만들어서 push
const saveUserChat = (userChat) => {
  if (userChat) {
    dataChat.push({
      role: "user",
      content: userChat,
    });
  }
};

// 채팅 api 요청보내는 함수
const apiChatPost = async (AIdata) => {
  // 로딩 화면 시작
  SwitchLoad();
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataChat),
    redirect: "follow",
  })
    .then((res) => res.json())
    .then((res) => {
      // 로딩 화면 종료
      SwitchLoad();

      // AI 대답을 dataChat에 저장
      dataChat.push({
        role: "assistant",
        content: res.choices[0].message.content,
      });
      AIdata.push({
        content: res.choices[0].message.content,
      });
      printAIChat(res.choices[0].message.content);
    })
    .catch((err) => {
      console.log(err);
    });
};
