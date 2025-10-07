window.playAudio = function() {
            
    const audio = document.getElementById('background-audio');
            
    audio.play();
};
        
window.navigateToGame = function(pageUrl) {
            
    document.getElementById('content-frame').src = pageUrl;
};
    
window.setAudioVolume = function(volume) {
    const audio = document.getElementById('background-audio');

    if (volume < 0) volume = 0;
    if (volume > 1) volume = 1;

    audio.volume = volume;
    console.log(`Volume: ${volume}`);
};

window.stopAudio = function() {
    const audio = document.getElementById('background-audio');

    if (!audio.paused) {
        audio.pause();
    } 
};

document.getElementById('background-audio').load();