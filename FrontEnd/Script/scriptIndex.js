// Loads the audio resource specified by the <audio> element with the ID "backgroundAudio";
document.getElementById("backgroundAudio").load();

// Defines a global function named 'playAudio' to start playing the background music;
window.playAudio = function() {
            
    // Gets a reference to the <audio> element using its ID;
    const audio = document.getElementById("backgroundAudio");
            
    // Calls the play() method on the audio element to begin playback;
    audio.play();
};
    
// Defines a global function named 'stopAudio' to pause the background music;
window.stopAudio = function() {
    // Gets a reference to the <audio> element;
    const audio = document.getElementById("backgroundAudio");

    // Checks if the audio is currently playing (not paused);
    if (!audio.paused) {
        // Pauses the audio playback;
        audio.pause();
    } 
};

// Defines a global function named 'setAudioVolume' to control the music volume;
window.setAudioVolume = function(volume) {
    // Gets a reference to the <audio> element;
    const audio = document.getElementById("backgroundAudio");

    // Checks if the provided volume is less than the minimum (0);
    if (volume < 0) {
        // Sets the volume to 0 if it is below the minimum;
        volume = 0;
    }
    // Checks if the provided volume is greater than the maximum (1);
    else if (volume > 1) {
        // Sets the volume to 1 if it is above the maximum;
        volume = 1;
    }

    // Sets the volume property of the audio element to the sanitized volume value;
    audio.volume = volume;
};

// Defines a global function named 'navigateToGame' to change the content displayed in a frame;
window.navigateToGame = function(pageUrl) {
            
    // Sets the 'src' attribute of the <iframe> element with the ID "contentFrame" to the provided URL, effectively loading a new page/game;
    document.getElementById("contentFrame").src = pageUrl;
};