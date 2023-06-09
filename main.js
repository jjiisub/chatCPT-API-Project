import { printUserChat, apiChatPost } from "./chat.js";
// import { makeModalContainer } from "./build.js";

const $form = document.querySelector("form");
const $input = document.querySelector("input");

// // build HTML
// document.addEventListener("DOMContentLoaded", function () {
//   makeModalContainer();
// });

// 사용자의 질문
let userChat;

// 질문과 답변 저장
const data = [
  {
    role: "system",
    content: `
      Assistant will conduct a role play in English.
      Assistant should always answer in english.
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

const AIdata = [];

const dataQuestion = [
  {
    role: "system",
    content: `
       Assistant is a friendly English teacher.
       Assistant always replys in korean.
       The question format will be 'Please explain the meaning of 'word' in the given paragraph.'
       The answer should include the following:
       1. Explanation of the meaning of the given word
       2. Grammar explanation of how the given word is used in the given paragraph
       3. Translation of the given sentence into Korean.
       4. Two example sentences using the given word, along with their translations into Korean.`,
  },
  {
    role: "user",
    content: "As your cat, I can provide you with emotional support and companionship. Meow.에서 As의 의미를 자세히 알려줘",
  },
  {
    role: "assistant",
    content:
      "'As'에 대해 설명해드릴게요.\n\n1. 단어 설명\n'As' 역할이나 용도의 의미를 가집니다.\n\n2. 문맥 설명\n문장에서 'As your cat'은 '당신의 고양이로서, 고양이이므로'의 뜻으로 사용되었습니다. 이 문장은 고양이가 당신에게 위로와 동반자를 제공할 수 있다는 것을 나타냅니다.\n\n3. 문장 해석\n'당신의 고양이로서, 나는 감정적 지원과 동반자를 제공할 수 있어요. 야옹.'\n\n4. 예시:\n - As a doctor, I have to follow strict hygiene guidelines. (의사로서, 저는 엄격한 위생 지침을 따라야 합니다.)\n - As a vegetarian, I don't eat meat. (채식주의자로서, 저는 고기를 먹지 않습니다.)",
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

// submit
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  $input.value = null;
  sendUserChat(userChat);
  apiChatPost(data, AIdata, dataQuestion);
  printUserChat(userChat);
});
