window.playAudio = function() {
    console.log("PASSOU AQUI: Função playAudio foi chamada pelo filho."); 
            
    const audio = document.getElementById('background-audio');
            
    audio.play().then(() => {
        console.log("Música iniciada com sucesso!");
    }).catch(error => {
        console.warn("Falha ao iniciar o áudio. Erro:", error); 
    });
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

document.getElementById('background-audio').load();