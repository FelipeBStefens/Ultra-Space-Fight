// Imports the SoundManager to control music and sound effects;
import SoundManager from "../Engine/scriptSoundManager.js";
// Imports the constant path/key for the Game Over music track;
import { GAME_OVER_SOUNDTRACK } from "../Utils/scriptConstants.js";
// Imports the utility function responsible for updating the player's score and achievements on the backend;
import { updateAchievementsCash } from "../Utils/scriptFetch.js";

// Exported function that initiates the Game Over state and displays the final screen;
export default function gameOver(values) {

    // Prevents stacking multiple Game Over screens if called repeatedly;
    if (document.getElementById("pauseScreen")) return; 
    
    // Stop the current gameplay music immediately;
    SoundManager.stopMusic();

    // Delayed audio feedback: Plays a voice sound and the Game Over music after a short delay (1.5s)
    // to allow for dramatic pause/on-screen action;
    setTimeout(() => {
        SoundManager.playSound("gameOverVoice");
        SoundManager.playMusic(GAME_OVER_SOUNDTRACK);
    }, 1500);

    // Create the Game Over Overlay;
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

    // Handle Saving and Navigation;
    continueButton.addEventListener("click", async () => {
        
        // Disable the button and show loading state to prevent double-clicks;
        continueButton.disabled = true;
        continueButton.classList.add("loading");
        continueButton.textContent = "Saving...";

        // If running inside an iframe/parent structure, pause the parent's audio;
        if (window.parent?.pauseAudio) window.parent.pauseAudio(); 
        
        // Retrieve the current user data from local storage;
        const user = JSON.parse(localStorage.getItem("user"));

        // Call the backend API to save the game results and get the updated data;
        const achievementsCash = await updateAchievementsCash(user.idUser, values, user);
    
        if (achievementsCash != null) {
            // Update the user's score locally with the value returned from the server;
            user.score = achievementsCash.score;
            localStorage.setItem("user", JSON.stringify(user));

            // Enable the button;
            continueButton.disabled = false;
            continueButton.classList.remove("loading");
            continueButton.textContent = "Continue";

            // If necessary, resume parent's audio;
            if (window.parent?.playAudio) window.parent.playAudio(); 
            // Redirect the user to the main menu/hub page, effectively ending the game session;
            window.location.replace("../../Pages/Hub/mainPage.html"); 
        }
    });

    // DOM Insertion;
    gameOverContent.append(gameOverTitle, continueButton);
    gameOverScreen.appendChild(gameOverContent);
    document.body.appendChild(gameOverScreen);
}