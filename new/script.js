// Initialize SpeechSynthesis and SpeechSynthesisUtterance
let speech = new SpeechSynthesisUtterance();
let voices = [];
const languageSelect = document.getElementById("languageSelect");
const voiceSelect = document.getElementById("voiceSelect");
const charCountDisplay = document.getElementById("charCount");
const statusDisplay = document.getElementById("status");

// Map of allowed languages with their codes
const languages = {
    English: "en",
    Hindi: "hi",
    Marathi: "mr",
    Tamil: "ta",
    Telugu: "te",
    Kannada: "kn",
    Gujarati: "gu",
    Urdu: "ur",
    Japanese: "ja",
    Chinese: "zh",
    French: "fr",
    German: "de",
    Italian: "it",
    Rajasthani: "pa", // Closest match for Punjabi/Rajasthani
};

// Populate language dropdown
function populateLanguages() {
    languageSelect.innerHTML = Object.keys(languages)
        .map((lang) => `<option value="${languages[lang]}">${lang}</option>`)
        .join("");
}
populateLanguages();

// Load voices and filter by selected language
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    filterVoicesByLanguage(languageSelect.value); // Load voices for the default selected language
}
window.speechSynthesis.onvoiceschanged = loadVoices;

// Filter voices by selected language
function filterVoicesByLanguage(languageCode) {
    const filteredVoices = voices.filter((voice) => voice.lang.startsWith(languageCode));
    voiceSelect.innerHTML = filteredVoices
        .map((voice, i) => `<option value="${i}">${voice.name} (${voice.lang})</option>`)
        .join("");

    // Set the default voice
    speech.voice = filteredVoices[0];
}

// Update voices when language is changed
languageSelect.addEventListener("change", () => {
    filterVoicesByLanguage(languageSelect.value);
});

// Handle voice selection
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Character Count
const textInput = document.getElementById("textInput");
textInput.addEventListener("input", () => {
    const charCount = textInput.value.length;
    charCountDisplay.innerText = charCount;
});

// Speak Button
document.getElementById("speakButton").addEventListener("click", () => {
    speech.text = textInput.value || "Please enter some text.";
    speech.volume = document.getElementById("volume").value;
    speech.pitch = document.getElementById("pitch").value;
    speech.rate = document.getElementById("rate").value;
    window.speechSynthesis.speak(speech);
    statusDisplay.innerText = "Status: Speaking...";
});

// Stop Button
document.getElementById("stopButton").addEventListener("click", () => {
    window.speechSynthesis.cancel();
    statusDisplay.innerText = "Status: Stopped.";
});

// Dark Mode Toggle
document.getElementById("toggleTheme").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Events for Start and End of Speech
speech.addEventListener("start", () => {
    statusDisplay.innerText = "Status: Speaking...";
});
speech.addEventListener("end", () => {
    statusDisplay.innerText = "Status: Completed!";
});
