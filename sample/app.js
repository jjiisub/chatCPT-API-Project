window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition();

recognition.interimResults = true;

let p = document.createElement("p");
p.classList.add("para");
let words = document.querySelector(".words");
words.appendChild(p)

recognition.addEventListener("result", e => {
    const speechToText = e.results[0][0].transcript;
    console.log(speechToText)
})

recognition.start();