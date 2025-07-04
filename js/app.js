document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const inputText = document.getElementById('inputText');
    const voiceSelect = document.getElementById('voiceSelect');
    let voices = [];

    function populateVoiceList() {
        voices = window.speechSynthesis.getVoices();
        voiceSelect.innerHTML = '';
        voices.forEach((voice, index) => {
            if (voice.lang.startsWith('en') || voice.lang.startsWith('hi')) {
                const option = document.createElement('option');
                option.textContent = `${voice.name} (${voice.lang})`;
                option.value = index;
                voiceSelect.appendChild(option);
            }
        });
    }

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    startButton.addEventListener('click', function () {
        const text = inputText.value;
        if (text) {
            const utterance = new SpeechSynthesisUtterance(text);
            const selectedVoice = voices[voiceSelect.value];
            utterance.voice = selectedVoice;
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Please enter some text to convert to speech.');
        }
    });
});