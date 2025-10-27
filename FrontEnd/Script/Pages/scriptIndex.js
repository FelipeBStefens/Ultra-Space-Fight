document.getElementById("backgroundAudio").load();

window.playAudio = function() {
            
    const audio = document.getElementById("backgroundAudio");
            
    audio.play();
};
  
window.stopAudio = function() {
    const audio = document.getElementById("backgroundAudio");

    if (!audio.paused) {
        audio.pause();
    } 
};

window.setAudioVolume = function(volume) {
    const audio = document.getElementById("backgroundAudio");

    if (volume < 0) {
        volume = 0;
    }
    else if (volume > 1) {
        volume = 1;
    }

    audio.volume = volume;
};

window.navigateToGame = function(pageUrl) {
            
    document.getElementById("contentFrame").src = pageUrl;
};