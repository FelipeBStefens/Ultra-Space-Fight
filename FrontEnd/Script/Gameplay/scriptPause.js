// Imports the SoundManager to apply updated volume settings;
import SoundManager from "../Engine/scriptSoundManager.js";
// Imports a translation utility to display UI text in the user's selected language;
import getTranslation from "../Utils/scriptTranslation.js";
// Imports the utility function for saving sound settings to the backend;
import { updateSound } from "../Utils/scriptFetch.js";
// Imports the GameManager to control the global 'isPaused' state;
import GameManager from "../Engine/scriptGameManager.js";

// Get the main pause trigger button from the HTML;
const pauseButton = document.getElementById("pauseButton");

// Check if user data exists in localStorage; if not, redirect to the entry page;
const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "../../enter.html";

// Fetches the appropriate translation object based on the user's language setting;
const translation = getTranslation(user?.language);

// Disables all input fields and buttons on the pause screen.
function setDisabledAll(state = true, activeButton = null, allInputs, allButtons) {
    
    allInputs.forEach(input => (input.disabled = state));
    
    allButtons.forEach(button => {
        if (button === activeButton && state) {
            
            // Keeps the active button enabled but shows a loading state;
            button.classList.add("loading");
            button.disabled = false;
        } 
        else {
            button.disabled = state;
            if (state) {
                // Visually disables other buttons;
                button.classList.add("disabledOthers");
            }
            else {
                button.classList.remove("disabledOthers");
            } 
            button.classList.remove("loading");
        }
    });
}

// Re-enables all input fields and removes loading/disabled states from buttons.
function removeLoading(allInputs, allButtons) {
    
    allInputs.forEach(input => (input.disabled = false));

    allButtons.forEach(button => {
        button.classList.remove("loading", "disabledOthers");
        button.disabled = false;
    });
}

// Main Pause Button Event Listener;
pauseButton.addEventListener("click", () => {
    
    // Pause the game logic immediately;
    GameManager.isPaused = true;
    
    // Prevents opening multiple pause screens;
    if (document.getElementById("pauseScreen")) {
        return;
    }

    // Visually indicates the pause button is active;
    pauseButton.classList.add("clicked");

    // Create Pause Screen DOM Elements;
    const pauseScreen = document.createElement("div");
    pauseScreen.id = "pauseScreen";

    const pauseContent = document.createElement("div");
    pauseContent.id = "pauseContent";

    const pauseTitle = document.createElement("div");
    pauseTitle.id = "pauseTitle";
    pauseTitle.textContent = translation.pause;

    // Resume Button;
    const resumeButton = document.createElement("button");
    resumeButton.id = "resumeButton";
    resumeButton.className = "pauseButton";
    resumeButton.textContent = translation.resume;

    // Sound Effects Slider (Input);
    const soundSlider = document.createElement("input");
    soundSlider.type = "range";
    soundSlider.min = "0";
    soundSlider.max = "1";
    soundSlider.step = "0.01";
    soundSlider.value = user.soundEffects;
    soundSlider.className = "pauseSlider";

    const soundLabel = document.createElement("label");
    soundLabel.textContent = translation.soundEffectsPause;
    soundLabel.className = "pauseLabel";

    const soundContainer = document.createElement("div");
    soundContainer.className = "sliderContainer";
    soundContainer.append(soundLabel, soundSlider);

    // Music Slider (Input);
    const musicSlider = document.createElement("input");
    musicSlider.type = "range";
    musicSlider.min = "0";
    musicSlider.max = "1";
    musicSlider.step = "0.01";
    musicSlider.value = user.soundtrack;
    musicSlider.className = "pauseSlider";

    const musicLabel = document.createElement("label");
    musicLabel.textContent = translation.soundtrackPause;
    musicLabel.className = "pauseLabel";

    const musicContainer = document.createElement("div");
    musicContainer.className = "sliderContainer";
    musicContainer.append(musicLabel, musicSlider);

    // Save Sounds Button;
    const saveSoundsButton = document.createElement("button");
    saveSoundsButton.id = "saveSoundsButton";
    saveSoundsButton.className = "pauseButton";
    saveSoundsButton.textContent = translation.saveSoundsPause;

    // Exit Match Button;
    const exitButton = document.createElement("button");
    exitButton.id = "exitButton";
    exitButton.className = "pauseButton";
    exitButton.textContent = translation.leaveMatch;

    // Define collections for easy UI state management;
    const allButtons = [resumeButton, saveSoundsButton, exitButton];
    const allInputs = [soundSlider, musicSlider];

    // Assemble the pause screen content;
    pauseContent.append(
        pauseTitle,
        resumeButton,
        soundContainer,
        musicContainer,
        saveSoundsButton,
        exitButton
    );
    pauseScreen.appendChild(pauseContent);
    document.body.appendChild(pauseScreen);
 
    // Resume Button Logic;
    resumeButton.addEventListener("click", () => {
        
        // Temporarily disable all controls during the short resume period;
        setDisabledAll(true, resumeButton, allInputs, allButtons);
        
        // Short delay to allow visual feedback/fade-out;
        setTimeout(() => {
            pauseScreen.remove(); // Remove the UI overlay;
            pauseButton.classList.remove("clicked");
            GameManager.isPaused = false; // Unpause the game logic;
        }, 150);
    });

    // Save Sounds Button Logic;
    saveSoundsButton.addEventListener("click", async () => {
        
        setDisabledAll(true, saveSoundsButton, allInputs, allButtons);

        // Save the new volume values to the backend;
        const sounds = await updateSound(user.idUser, musicSlider.valueAsNumber, soundSlider.valueAsNumber);
        
        if (sounds != null) {
            // Update the local storage with the confirmed new values;
            user.soundtrack = sounds.soundtrack;
            user.soundEffects = sounds.soundEffects;
            localStorage.setItem("user", JSON.stringify(user));

            // Apply the new volumes immediately via SoundManager;
            SoundManager.updateMusicVolume();
            // Note: Sound effects volume is typically handled inside the SoundManager's playSound method;
        }

        // Enable all controls after the save operation is complete;
        removeLoading(allInputs, allButtons);
    });

    // Exit Button Logic;
    exitButton.addEventListener("click", () => {
        
        setDisabledAll(true, exitButton, allInputs, allButtons);
        
        // Short delay before redirecting;
        setTimeout(() => {
            // If running inside an iframe, attempt to resume parent audio before leaving;
            if (window.parent?.playAudio) window.parent.playAudio();
            // Redirect the user back to the main Hub page;
            window.location.replace("../../Pages/Hub/mainPage.html"), 150;
        });
    });
});