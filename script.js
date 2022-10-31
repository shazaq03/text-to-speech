const startbtn = document.getElementById("start");
const resumebtn = document.getElementById("resume");
const pausebtn = document.getElementById("pause");
const stopbtn = document.getElementById("stop");
const textarea = document.getElementById("text-area");
const speed = document.getElementById("speed");
const utterthis = new SpeechSynthesisUtterance();
let currentChar;
const synth = window.speechSynthesis;

speed.addEventListener("input", () => {
    synth.resume();
    synth.cancel();
    utterthis.rate = speed.value;
    utterthis.text = utterthis.text.substring(currentChar);
    synth.speak(utterthis);
});

utterthis.addEventListener("boundary", (e) => {
    currentChar = e.charIndex;
});

startbtn.addEventListener("click", () =>{
    if(synth.speaking == true) {
        return;
    }
    
    utterthis.text = textarea.value;
    utterthis.rate = speed.value;
    const voices = synth.getVoices();    
    utterthis.voice = voices[4];
    textarea.disabled = true;
    synth.speak(utterthis);
    utterthis.addEventListener("end", () => {
        textarea.disabled = false;
    });

});



pausebtn.addEventListener("click", () => {
    synth.pause();
});

resumebtn.addEventListener("click", () => {
    synth.resume();
});

stopbtn.addEventListener("click", () => {
    synth.resume();
    synth.cancel();
});

window.addEventListener("beforeunload" , () => {
    synth.resume();
    synth.cancel();
});
