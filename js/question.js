import { switchLoad } from "./loading.js";
import { switchAnswerModal } from "./modal.js";

export { apiQuestionPost, dataQuestion };

// 문법 질문 저장 변수
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

const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 문법 질문 api 요청 함수
const apiQuestionPost = async (aiChat, word, dataQuestion) => {
  // 로딩 화면 시작
  switchLoad();

  // 문법 질문 저장
  dataQuestion.push({
    role: "user",
    content: `${aiChat}에서 ${word}의 의미를 자세히 설명해줘`,
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
      // 로딩 화면 종료
      switchLoad();

      // 문법 설명 modal 실행
      switchAnswerModal(res.choices[0].message.content, aiChat);
      dataQuestion.push({
        role: "assistant",
        content: res.choices[0].message.content,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
