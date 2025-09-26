const pauseButton = document.getElementById('pauseButton');

pauseButton.addEventListener('click', () => {
    if (document.getElementById('pauseScreen')) return;

    // Tela de pause
    const pauseScreen = document.createElement('div');
    pauseScreen.id = 'pauseScreen';

    // Container central
    const pauseContent = document.createElement('div');
    pauseContent.id = 'pauseContent';

    // Título
    const pauseTitle = document.createElement('div');
    pauseTitle.id = 'pauseTitle';
    pauseTitle.textContent = 'Pause';

    // Botão Retomar
    const resumeButton = document.createElement('button');
    resumeButton.id = 'resumeButton';
    resumeButton.className = 'pauseButton';
    resumeButton.textContent = 'Retomar';
    resumeButton.addEventListener('click', () => pauseScreen.remove());

    // Slider Trilha sonora
    const soundLabel = document.createElement('label');
    soundLabel.textContent = 'Trilha sonora';
    const soundSlider = document.createElement('input');
    soundSlider.type = 'range';
    soundSlider.min = '0';
    soundSlider.max = '1';
    soundSlider.value = '0.5';
    soundSlider.step = '0.01'
    soundSlider.className = 'pauseSlider';

    // Slider Música de fundo
    const musicLabel = document.createElement('label');
    musicLabel.textContent = 'Música de fundo';
    const musicSlider = document.createElement('input');
    musicSlider.type = 'range';
    musicSlider.min = '0';
    musicSlider.max = '1';
    musicSlider.value = '0.5';
    musicSlider.step = '0.01'
    musicSlider.className = 'pauseSlider';

    // Botão Sair da partida
    const exitButton = document.createElement('button');
    exitButton.id = 'exitButton';
    exitButton.className = 'pauseButton';
    exitButton.textContent = 'Sair da partida';
    exitButton.addEventListener('click', () => alert('Saindo da partida...'));

    // Adiciona tudo ao container
    pauseContent.appendChild(pauseTitle);
    pauseContent.appendChild(resumeButton);
    pauseContent.appendChild(soundLabel);
    pauseContent.appendChild(soundSlider);
    pauseContent.appendChild(musicLabel);
    pauseContent.appendChild(musicSlider);
    pauseContent.appendChild(exitButton);

    // Adiciona container à tela
    pauseScreen.appendChild(pauseContent);
    document.body.appendChild(pauseScreen);
});
