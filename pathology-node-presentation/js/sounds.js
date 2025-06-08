// Sound effects for the workflow augmentation example
// These load MP3 files from the assets/sounds directory

// Whoosh sound for successful processing
const successSound = new Audio("assets/sounds/whoosh.mp3");

// Doop sound for error
const errorSound = new Audio("assets/sounds/doop.mp3");

// Function to play the success sound
function playSuccessSound() {
    successSound.currentTime = 0; // Reset to start in case it's already playing
    successSound.play();
}

// Function to play the error sound
function playErrorSound() {
    errorSound.currentTime = 0; // Reset to start in case it's already playing
    errorSound.play();
}

// Preload sounds to avoid delay on first play
window.addEventListener('DOMContentLoaded', function() {
    // Preload sounds
    successSound.load();
    errorSound.load();

    console.log("Sound effects loaded");
});
