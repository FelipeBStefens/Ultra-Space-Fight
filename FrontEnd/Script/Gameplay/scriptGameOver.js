
import SoundManager from "../Engine/scriptSoundManager.js";

import { GAME_OVER_SOUNDTRACK } from "../Utils/scriptConstants.js";

import { updateAchievementsCash } from "../Utils/scriptFetch.js";


export default function gameOver(values) {


    if (document.getElementById("pauseScreen")) return; 
    

    SoundManager.stopMusic();



    setTimeout(() => {
        SoundManager.playSound("gameOverVoice");
        SoundManager.playMusic(GAME_OVER_SOUNDTRACK);
    }, 1500);


    const gameOverScreen = document.createElement("div");
    gameOverScreen.id = "pauseScreen"; 

    const gameOverContent = document.createElement("div");
    gameOverContent.id = "pauseContent";

    const gameOverTitle = document.createElement("div");
    gameOverTitle.id = "pauseTitle";
    gameOverTitle.textContent = "Game Over";

    const continueButton = document.createElement("button");
    continueButton.id = "exitButton";
    continueButton.className = "pauseButton";
    continueButton.textContent = "Continue";


    continueButton.addEventListener("click", async () => {
        

        continueButton.disabled = true;
        continueButton.classList.add("loading");
        continueButton.textContent = "Saving...";


        if (window.parent?.pauseAudio) window.parent.pauseAudio(); 
        

        const user = JSON.parse(localStorage.getItem("user"));


        const achievementsCash = await updateAchievementsCash(user.idUser, values, user);
    
        if (achievementsCash != null) {

            user.score = achievementsCash.score;
            localStorage.setItem("user", JSON.stringify(user));


            continueButton.disabled = false;
            continueButton.classList.remove("loading");
            continueButton.textContent = "Continue";


            if (window.parent?.playAudio) window.parent.playAudio(); 

            window.location.replace("../../Pages/Hub/mainPage.html"); 
        }
    });


    gameOverContent.append(gameOverTitle, continueButton);
    gameOverScreen.appendChild(gameOverContent);
    document.body.appendChild(gameOverScreen);
}