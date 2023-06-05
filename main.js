import { printAIChat, printUserChat, apiChatPost } from "./chat.js";

const $body = document.querySelector("body");
const $form = document.querySelector("form");
const $input = document.querySelector("input");

// openAI API
let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 사용자의 질문
let userChat;

// 질문과 답변 저장
let data = [
  {
    role: "system",
    content:
      "Assistant will conduct a role play in English. Assistant will respond with one sentence at a time, taking turns in the conversation and waiting for a response before replying. Assistant is a cat owned by the user. The assistant's name is Bori. At the end of each sentence, add 'meow.'",
  },
  {
    role: "user",
    content: "Hi, What is your name?",
  },
];

let AIdata = [];

let dataQuestion = [
  {
    role: "system",
    content:
      "Assistant is a friendly English teacher. Assistant always replys in korean. The question format will be 'Please explain the meaning of 'word' in the given paragraph.' The answer should include the following: 1. Explanation of the meaning of the given word, 2. Grammar explanation of how the given word is used in the given paragraph, 3. Translation of the given sentence into Korean, 4. Two example sentences using the given word, along with their translations into Korean.",
  },
  {
    role: "user",
    content: "As your cat, I can provide you with emotional support and companionship. Meow.에서 As의 의미를 자세히 알려줘",
  },
  {
    role: "assistant",
    content:
      "'As'에 대해 설명해드릴게요.\n\n1. 단어 의미\n'As' 역할이나 용도의 의미를 가집니다.\n\n2. 문법 설명\n문장에서 'As your cat'은 '당신의 고양이로서, 고양이이므로'의 뜻으로 사용되었습니다. 이 문장은 고양이가 당신에게 위로와 동반자를 제공할 수 있다는 것을 나타냅니다.\n\n3. 문장 해석\n'당신의 고양이로서, 나는 감정적 지원과 동반자를 제공할 수 있어요. 야옹.'\n\n4. 예시:\n - As a doctor, I have to follow strict hygiene guidelines. (의사로서, 저는 엄격한 위생 지침을 따라야 합니다.)\n - As a vegetarian, I don't eat meat. (채식주의자로서, 저는 고기를 먹지 않습니다.)",
  },
];

// 화면에 뿌려줄 데이터, 질문들
// let questionData = [];

// input에 입력된 질문 받아오는 함수
$input.addEventListener("input", (e) => {
  userChat = e.target.value;
});

// 사용자의 질문을 객체를 만들어서 push
const sendUserChat = (userChat) => {
  if (userChat) {
    data.push({
      role: "user",
      content: userChat,
    });
    // questionData.push({
    //   role: "user",
    //   content: userChat,
    // });
  }
};

// // userChat이 들어갈 userChatBox를 만드는 함수
// const makeUserChatBox = (userChat) => {
//   let userChatBox = document.createElement("div");
//   userChatBox.classList.add("user-chat");
//   let userChatContent = document.createElement("div");
//   userChatContent.classList.add("user-chat-content");
//   userChatContent.innerText = userChat;
//   userChatBox.appendChild(userChatContent);
//   $chatScreen.appendChild(userChatBox);
// };

// // 화면에 userChat 그려주는 함수
// const printUserChat = async () => {
//   if (userChat) {
//     makeUserChatBox(userChat);
//     questionData = [];
//     userChat = false;
//     keepScrollDown();
//   }
// };

// // AIChat이 들어갈 AIChatBox를 만드는 함수
// const makeAIChatBox = (AIChat) => {
//   let AIChatBox = document.createElement("div");
//   AIChatBox.classList.add("ai-chat");

//   let AIImg = document.createElement("img");
//   AIImg.classList.add("ai-img");
//   AIImg.setAttribute("src", "./img/cat.JPG");
//   AIChatBox.appendChild(AIImg);

//   let AIChatContent = document.createElement("div");
//   AIChatContent.classList.add("ai-chat-content");
//   AIChatBox.appendChild(AIChatContent);

//   AIChat.split(" ").forEach((element) => {
//     let AIChatElement = document.createElement("a");
//     AIChatElement.classList.add("ai-chat-element");
//     // AIChatElement.setAttribute("onclick", `tmp(${AIdata.length},"${element}");`);
//     AIChatElement.addEventListener("click", function (event) {
//       apiQuestionPost(AIdata.length, element);
//     });
//     // AIChatElement.setAttribute("id", `${AIdata.length})`);
//     AIChatElement.innerText = element;
//     AIChatContent.appendChild(AIChatElement);
//   });
//   $chatScreen.appendChild(AIChatBox);
// };

// // 화면에 AIChat 그려주는 함수
// const printAIChat = (AIChat) => {
//   makeAIChatBox(AIChat);
//   keepScrollDown();
// };

// // 채팅 api 요청보내는 함수
// const apiChatPost = async () => {
//   SwitchLoad();
//   const result = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//     redirect: "follow",
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       SwitchLoad();
//       data.push({
//         role: "system",
//         content: res.choices[0].message.content,
//       });
//       AIdata.push({
//         content: res.choices[0].message.content,
//       });
//       printAIChat(res.choices[0].message.content);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// // 문법 질문 api 요청 함수
// const apiQuestionPost = async (index, word) => {
//   // loadingMask function 실행
//   SwitchLoad();

//   dataQuestion.push({
//     role: "user",
//     content: `${AIdata[index - 1].content}에서 ${word}의 의미를 자세히 설명해줘`,
//   });
//   console.log(dataQuestion);

//   const result = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(dataQuestion),
//     redirect: "follow",
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       // loadingMask 종료 함수 실행
//       SwitchLoad();
//       SwitchModal(res.choices[0].message.content, index);
//       dataQuestion.splice(1, 1);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// // 항상 가장 밑에 스크롤을 유지하는 함수
// function keepScrollDown() {
//   $chatScreen.scrollTop = $chatScreen.scrollHeight;
// }

// submit
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  $input.value = null;
  sendUserChat(userChat);
  apiChatPost(data, AIdata, dataQuestion);
  printUserChat(userChat);
});

// // Modal
// let Modal = document.querySelector(".modal");
// function SwitchModal(message, index) {
//   Modal.classList.toggle("hidden");

//   if (message) {
//     let modalContent = document.querySelector(".modal-content");
//     modalContent.innerText = message;
//   }

//   if (index) {
//     let modalQuestion = document.querySelector(".modal-question");
//     modalQuestion.innerText = AIdata[index - 1].content;
//   }
// }

// let closeBtn = document.querySelector(".btn-close-modal");
// closeBtn.addEventListener("click", SwitchModal);
