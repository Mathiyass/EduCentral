/**
 * Intro Sequence and System Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('intro-overlay');
    const initBtn = document.getElementById('init-btn');

    if (initBtn) {
        initBtn.addEventListener('click', () => {
            // Fade out overlay
            overlay.style.opacity = '0';

            // Remove from DOM after fade completes
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 1000);

            // Speech Synthesis
            initializeSpeech();
        });
    }
});

function initializeSpeech() {
    if (!window.speechSynthesis) return;

    const text = "System Online. Access granted. Welcome to the digital workspace of Mathiya.";
    const utterance = new SpeechSynthesisUtterance(text);

    // Voice settings
    utterance.pitch = 0.1;
    utterance.rate = 0.75;

    // Attempt to get voices immediately
    let voices = window.speechSynthesis.getVoices();

    // If voices aren't loaded yet, we might need to wait or rely on the default.
    // However, since this happens after a user click event which is usually after some time,
    // voices are likely loaded.

    const selectVoiceAndSpeak = (availableVoices) => {
        // Handle browser voice selection to prefer a male voice
        const maleKeywords = ['male', 'david', 'google us english', 'daniel'];
        const maleVoice = availableVoices.find(voice =>
            maleKeywords.some(keyword => voice.name.toLowerCase().includes(keyword))
        );

        if (maleVoice) {
            utterance.voice = maleVoice;
        }

        window.speechSynthesis.speak(utterance);
    };

    if (voices.length > 0) {
        selectVoiceAndSpeak(voices);
    } else {
        // Fallback for when voices might be loaded asynchronously (e.g. Chrome)
        window.speechSynthesis.onvoiceschanged = () => {
            voices = window.speechSynthesis.getVoices();
            selectVoiceAndSpeak(voices);
            // Remove listener to prevent multiple triggers
            window.speechSynthesis.onvoiceschanged = null;
        };
        // Just in case onvoiceschanged doesn't fire or takes too long,
        // we could try to speak with default after a short delay, but
        // sticking to the event is cleaner.
    }
}
