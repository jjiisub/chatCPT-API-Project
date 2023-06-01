window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition();

recognition.interimResults = true;

let p = document.createElement("p");
p.classList.add("para");
let words = document.querySelector(".words");
words.appendChild(p)

// recognition.addEventListener("result", e => {
//     const speechToText = e.results[0][0].transcript;
//     console.log(speechToText)
// })

// recognition.start();

let speechToText = "";
recognition.addEventListener("result", e => {
  let interimTranscript = '';
  for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
    let transcript = e.results[i][0].transcript;
    console.log(transcript)
    if (e.results[i].isFinal) {
      speechToText += transcript;
    } else {
      interimTranscript += transcript;
    }
  }
  document.querySelector(".para").innerHTML = speechToText + interimTranscript
});
recognition.addEventListener('end', recognition.start);

recognition.start();