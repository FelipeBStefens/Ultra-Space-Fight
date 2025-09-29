// Getting the Pause button;
const pauseButton = document.getElementById('pauseButton');

// Add an Event Listener on the pause button; 
pauseButton.addEventListener('click', () => {

    // Ending if gets that id;
    if (document.getElementById('pauseScreen')) {
        return;
    }

    // Creating an Element of the pause Screen;
    const pauseScreen = document.createElement('div');
    
    // Setting a new Id;
    pauseScreen.id = 'pauseScreen';

    // Creating an Container of the pause configurations;
    const pauseContent = document.createElement('div');
    
    // Setting a new Id;
    pauseContent.id = 'pauseContent';

    // Creating a Title to the Pause Container;
    const pauseTitle = document.createElement('div');
    
    // Setting a new Id;
    pauseTitle.id = 'pauseTitle';

    // Setting the Text value;
    pauseTitle.textContent = 'Pause';

    // Creating a Resume button;
    const resumeButton = document.createElement('button');
    
    // Setting a new Id;
    resumeButton.id = 'resumeButton';

    // Setting a new Class;
    resumeButton.className = 'pauseButton';

    // Setting the Text value;
    resumeButton.textContent = 'Resume';

    // Add an Event Listener on the resume button; 
    resumeButton.addEventListener('click', () => {
        
        // Remove the Pause Screen;
        pauseScreen.remove()
    });

    // Creating a new Slider Label Element;
    const soundLabel = document.createElement('label');
    
    // Setting the Text value;
    soundLabel.textContent = 'Sound-Effects';

    // Creating a new Slider Input Element;
    const soundSlider = document.createElement('input');

    // Setting the type to Range;
    soundSlider.type = 'range';

    // Setting the min, max and step value; 
    soundSlider.min = '0';
    soundSlider.max = '1';
    soundSlider.step = '0.01'

    // Setting the actual value;
    soundSlider.value = '0.5';
    
    // Setting a new Class;
    soundSlider.className = 'pauseSlider';

    // Creating a new Slider Label Element;
    const musicLabel = document.createElement('label');

    // Setting the Text value;
    musicLabel.textContent = 'Soundtrack';

    // Creating a new Slider Input Element;
    const musicSlider = document.createElement('input');

    // Setting the type to Range;
    musicSlider.type = 'range';

    // Setting the min, max and step value; 
    musicSlider.min = '0';
    musicSlider.max = '1';
    musicSlider.step = '0.01';

    // Setting the actual value;
    musicSlider.value = '0.5';

    // Setting a new Class;
    musicSlider.className = 'pauseSlider';

    // Creating an Exit button;
    const exitButton = document.createElement('button');
    
    // Setting a new Id;
    exitButton.id = 'exitButton';

    // Setting a new Class;
    exitButton.className = 'pauseButton';

    // Setting the Text value;
    exitButton.textContent = 'Sair da partida';

    // Append all objects to the Pause Container; 
    pauseContent.appendChild(pauseTitle);
    pauseContent.appendChild(resumeButton);
    pauseContent.appendChild(soundLabel);
    pauseContent.appendChild(soundSlider);
    pauseContent.appendChild(musicLabel);
    pauseContent.appendChild(musicSlider);
    pauseContent.appendChild(exitButton);

    // Append the Pause Container to the Pause Screen;
    pauseScreen.appendChild(pauseContent);

    // Append the Pause Screen to the Body; 
    document.body.appendChild(pauseScreen);
});