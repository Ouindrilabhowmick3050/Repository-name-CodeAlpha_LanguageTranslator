const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");

const translateBtn = document.getElementById("translateBtn");
const swapBtn = document.getElementById("swapBtn");

const copyBtn = document.getElementById("copyBtn");
const speakBtn = document.getElementById("speakBtn");
const clearBtn = document.getElementById("clearBtn");

const loading = document.getElementById("loading");
const charCount = document.getElementById("charCount");


// Character Counter

inputText.addEventListener("input", () => {
    charCount.innerText = inputText.value.length;
});


// Translate

translateBtn.addEventListener("click", translateText);

async function translateText() {

    let text = inputText.value.trim();

    if(text === ""){

        alert("Please enter some text.");

        return;
    }

    loading.style.display = "block";

    outputText.value = "";

    try{

        let url =
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang.value}|${targetLang.value}`;

        let response = await fetch(url);

        let data = await response.json();

        outputText.value =
        data.responseData.translatedText;

    }

    catch(error){

        outputText.value =
        "Translation failed.";

        console.log(error);

    }

    loading.style.display = "none";

}



// Swap Languages

swapBtn.addEventListener("click", () => {

    let temp = sourceLang.value;

    sourceLang.value = targetLang.value;

    targetLang.value = temp;

    let tempText = inputText.value;

    inputText.value = outputText.value;

    outputText.value = tempText;

});



// Copy

copyBtn.addEventListener("click", () => {

    if(outputText.value === ""){

        alert("Nothing to copy.");

        return;

    }

    navigator.clipboard.writeText(outputText.value);

    alert("Copied Successfully!");

});



// Speak

speakBtn.addEventListener("click", () => {

    if(outputText.value === ""){

        alert("Nothing to speak.");

        return;

    }

    let speech = new SpeechSynthesisUtterance();

    speech.text = outputText.value;

    speech.lang = targetLang.value;

    speech.rate = 1;

    speech.pitch = 1;

    speechSynthesis.speak(speech);

});



// Clear

clearBtn.addEventListener("click", () => {

    inputText.value = "";

    outputText.value = "";

    charCount.innerText = 0;

});



// Keyboard Shortcut

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key==="Enter"){

        translateText();

    }

});