import { SwitchLoad } from "./loading.js";
import { SwitchModal } from "./modal.js";
export { apiQuestionPost };

const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 문법 질문 api 요청 함수
const apiQuestionPost = async (AIChat, word, dataQuestion) => {
  //   const index = AIdata.length;
  //   console.log(AIdata, index);
  // loadingMask function 실행
  SwitchLoad();

  dataQuestion.push({
    role: "user",
    content: `${AIChat}에서 ${word}의 의미를 자세히 설명해줘`,
  });

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
      // loadingMask 종료 함수 실행
      SwitchLoad();
      SwitchModal(res.choices[0].message.content, AIChat);
      dataQuestion.push({
        role: "assistant",
        content: res.choices[0].message.content,
      });

      console.log("dataQ", dataQuestion);
    })
    .catch((err) => {
      console.log(err);
    });
};
