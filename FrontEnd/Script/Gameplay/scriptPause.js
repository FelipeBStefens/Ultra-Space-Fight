import SoundManager from "../Engine/scriptSoundManager.js";
import getTranslation from "../Utils/scriptTranslation.js";
import { updateSound } from "../Utils/scriptFetch.js";
import { gameState } from "./scriptGameplay.js";

const pauseButton = document.getElementById("pauseButton");

const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "../../enter.html";

const translation = getTranslation(user?.language);

function setDisabledAll(state = true, activeButton = null, allInputs, allButtons) {
    
    allInputs.forEach(input => (input.disabled = state));
    
    allButtons.forEach(button => {
        if (button === activeButton && state) {
            
            button.classList.add("loading");
            button.disabled = false;
        } 
        else {
            button.disabled = state;
            if (state) {
                button.classList.add("disabledOthers");
            }
            else {
                button.classList.remove("disabledOthers");
            } 
            button.classList.remove("loading");
        }
    });
}

function removeLoading(allInputs, allButtons) {
    
    allInputs.forEach(input => (input.disabled = false));

    allButtons.forEach(button => {
        button.classList.remove("loading", "disabledOthers");
        button.disabled = false;
    });
}

pauseButton.addEventListener("click", () => {
    
    gameState.isPaused = true;
    
    if (document.getElementById("pauseScreen")) {
        return;
    }

    pauseButton.classList.add("clicked");

    const pauseScreen = document.createElement("div");
    pauseScreen.id = "pauseScreen";

    const pauseContent = document.createElement("div");
    pauseContent.id = "pauseContent";

    const pauseTitle = document.createElement("div");
    pauseTitle.id = "pauseTitle";
    pauseTitle.textContent = translation.pause;

    const resumeButton = document.createElement("button");
    resumeButton.id = "resumeButton";
    resumeButton.className = "pauseButton";
    resumeButton.textContent = translation.resume;

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

    const saveSoundsButton = document.createElement("button");
    saveSoundsButton.id = "saveSoundsButton";
    saveSoundsButton.className = "pauseButton";
    saveSoundsButton.textContent = translation.saveSoundsPause;

    const exitButton = document.createElement("button");
    exitButton.id = "exitButton";
    exitButton.className = "pauseButton";
    exitButton.textContent = translation.leaveMatch;

    const allButtons = [resumeButton, saveSoundsButton, exitButton];
    const allInputs = [soundSlider, musicSlider];

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
  
    resumeButton.addEventListener("click", () => {
        
        setDisabledAll(true, resumeButton, allInputs, allButtons);
        
        setTimeout(() => {
            pauseScreen.remove();
            pauseButton.classList.remove("clicked");
            gameState.isPaused = false;
        }, 150);
    });

    saveSoundsButton.addEventListener("click", async () => {
        
        setDisabledAll(true, saveSoundsButton, allInputs, allButtons);

        const sounds = await updateSound(user.idUser, musicSlider.valueAsNumber, soundSlider.valueAsNumber);
        
        if (sounds != null) {

            user.soundtrack = sounds.soundtrack;
            user.soundEffects = sounds.soundEffects;
            localStorage.setItem("user", JSON.stringify(user));

            SoundManager.updateMusicVolume();
        }

        removeLoading(allInputs, allButtons);
    });

    exitButton.addEventListener("click", () => {
        
        setDisabledAll(true, exitButton, allInputs, allButtons);
        
        setTimeout(() => {
            if (window.parent?.playAudio) window.parent.playAudio();
            window.location.replace("../../Pages/Hub/mainPage.html"), 150;
        });
    });
});
