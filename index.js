const $form = document.querySelector("form");
const $input = document.querySelector("input");
const $chatList = document.querySelector("ul");
const $chatScreen = document.querySelector(".chat-screen");

// openAI API
let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 사용자의 질문
let userChat;

// 질문과 답변 저장
let data = [
  {
    role: "system",
    content:
      "assistant는 영화관 데이트 role play를 영어로 진행한다. assistant는 한 문장 씩 번갈아 가면서 대화하며, 답장을 받기 전까지 기다린다. assistant는 바로 role play의 첫문장으로 대답한다.",
  },
];

let AIdata = [];

let dataQuestion = [
  {
    role: "system",
    content: "assistant는 영어 선생님이다. 주어진 단락에서 단어의 문법적 의미를 설명하고, 해당 단어가 사용된 예문을 2개 대답한다.",
  },
];

// 화면에 뿌려줄 데이터, 질문들
let questionData = [];

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
    questionData.push({
      role: "user",
      content: userChat,
    });
  }
};

// userChat이 들어갈 userChatBox를 만드는 함수
const makeUserChatBox = (userChat) => {
  let userChatBox = document.createElement("div");
  userChatBox.classList.add("user-chat");
  let userChatContent = document.createElement("div");
  userChatContent.classList.add("user-content");
  userChatContent.innerText = userChat;
  userChatBox.appendChild(userChatContent);
  $chatScreen.appendChild(userChatBox);
};

// 화면에 userChat 그려주는 함수
const printUserChat = async () => {
  if (userChat) {
    makeUserChatBox(userChat);
    questionData = [];
    userChat = false;
    keepScrollDown();
  }
};

// AIChat이 들어갈 AIChatBox를 만드는 함수
const makeAIChatBox = (AIChat) => {
  let AIChatBox = document.createElement("div");
  AIChatBox.classList.add("ai-chat");
  //   let AIChatContent = document.createElement("div");
  //   AIChatContent.classList.add("ai-content");
  //   AIChatContent.innerText = AIChat;
  //   AIChatBox.appendChild(AIChatContent);
  AIChat.split(" ").forEach((element) => {
    let AIChatElement = document.createElement("a");
    AIChatElement.classList.add("ai-chat-element");
    // AIChatElement.setAttribute("onclick", `tmp(${AIdata.length},"${element}");`);
    AIChatElement.addEventListener("click", function (event) {
      apiQuestionPost(AIdata.length, element);
    });
    // AIChatElement.setAttribute("id", `${AIdata.length})`);
    AIChatElement.innerText = element;
    AIChatBox.appendChild(AIChatElement);
  });
  $chatScreen.appendChild(AIChatBox);
};

// 화면에 AIChat 그려주는 함수
const printAIChat = (AIChat) => {
  makeAIChatBox(AIChat);

  keepScrollDown();
};

// 채팅 api 요청보내는 함수
const apiChatPost = async () => {
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
      data.push({
        role: "system",
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

// 문법 질문 api 요청 함수
const apiQuestionPost = async (index, word) => {
  dataQuestion.push({
    role: "user",
    content: `${AIdata[index - 1].content}에서 ${word}의 의미를 자세히 설명해줘`,
  });
  //   let dataQuestion = [
  //     {role:}

  //   ];
  console.log(dataQuestion);
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataQuestion),
    redirect: "follow",
  })
    .then((res) => res.json())
    .then((res) => {
      alert(res.choices[0].message.content);
    })
    .catch((err) => {
      console.log(err);
    });
};

// function tmp(a, b) {
//   console.log(AIdata[a - 1].content, b);
// }

// 항상 가장 밑에 스크롤을 유지하는 함수
function keepScrollDown() {
  $chatScreen.scrollTop = $chatScreen.scrollHeight;
}

// submit
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  $input.value = null;
  sendUserChat(userChat);
  apiChatPost();
  printUserChat();
});
