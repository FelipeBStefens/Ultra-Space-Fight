// Imports the function for fetching translated strings;
import getTranslation from "../Utils/scriptTranslation.js";
// Imports constant arrays containing paths for different achievement frames and icons;
import { FRAME_ARRAY, ICON_ARRAY } from "../Utils/scriptConstants.js";

// Function to visually style an achievement element based on its status;
function setAchievementStyle(achievementElement, framePath, iconPath, starsCount = 0) {
    
    // Finds the frame image element within the achievement;
    const frame = achievementElement.querySelector(".achievementFrame");
    // Sets the source path for the frame;
    frame.src = framePath; 
    // Adds the 'unlocked' class for general styling;
    achievementElement.classList.add("unlocked");

    // Finds the achievement icon image (that is not the frame);
    const icon = achievementElement.querySelector("img:not(.achievementFrame)");
    // Checks if the icon element exists;
    if (icon) {
        
        // Sets the source path for the specific achievement icon;
        icon.src = iconPath; 
        // Ensures the icon is visible;
        icon.style.display = "block";
        // Sets a fixed width for the icon;
        icon.style.width = "350px";
        // Sets the height to adjust automatically;
        icon.style.height = "auto"; 
    }

    // Finds the container element for the stars;
    const starsContainer = achievementElement.querySelector(".stars");
    // Clears any existing stars in the container;
    starsContainer.innerHTML = ""; 

    // Loops based on the number of stars awarded (level of achievement);
    for (let i = 0; i < starsCount; i++) {

        // Creates a new image element for a star;
        const star = document.createElement("img");
        // Sets the source for the star image;
        star.src = "../../Assets/Icons/Star.png"; 
        // Sets the alternative text for accessibility;
        star.alt = "star";
        // Appends the star image to the stars container;
        starsContainer.appendChild(star);
    }
}

// Function to update the visual position of achievements in a carousel (left, active, right);
function update(achievements, active) {

    // Iterates through each achievement element and its index;
    achievements.forEach((achievement, i) => {

        // Removes all position-related classes (active, left, right) to reset the state;
        achievement.classList.remove("active", "left", "right");
        
        // Conditional expressions to determine the new position class;
        if (i === active) {

            // Adds the 'active' class to the current achievement being viewed; 
            achievement.classList.add("active");
        }
        else if (i < active) {

            // Adds the 'left' class for achievements to the left of the active one;
            achievement.classList.add("left");
        }
        else if (i > active) {

            // Adds the 'right' class for achievements to the right of the active one;
            achievement.classList.add("right");
        } 
    });
}

// Immediately Invoked Asynchronous Function Expression (IIAFE) for page initialization and setup;
(async function(){

    // Variable tracking the index of the currently visible (active) achievement, starts at the first (0);
    let active = 0;

    // Retrieves and parses the user object from Local Storage;
    const user = JSON.parse(localStorage.getItem("user"));
    // Checks for user login and redirects if none is found;
    if (!user) {     
        window.location.href = "../../index.index.html";
    }

    // Selects all elements with the class "achievement" (the achievement items);
    const achievements = document.querySelectorAll(".achievement");
    // Initial setup loop for all achievement elements;
    achievements.forEach(achievement => {

        // Gets the frame element;
        const frame = achievement.querySelector(".achievementFrame");
        // Sets the default frame from a data attribute;
        frame.src = frame.dataset.defaultFrame;

        // Gets the icon element (not the frame);
        const icon = achievement.querySelector("img:not(.achievementFrame)");
        // Checks if the icon element exists AND if its current source is NOT already the blocked icon;
        if (icon && !icon.src.includes(ICON_ARRAY.ICON_BLOCKED)) {

            // Sets the icon to the blocked icon image path;
            icon.src = ICON_ARRAY.ICON_BLOCKED;
        }
    });

    // Fetches translations and updates static text labels on the page;
    const translation = getTranslation(user?.language);
    document.getElementById("scoreText").textContent = translation.scoreAchievement;
    document.getElementById("matchText").textContent = translation.matchAchievement;
    document.getElementById("enemiesText").textContent = translation.enemiesAchievement;
    document.getElementById("eliteText").textContent = translation.eliteAchievement;
    document.getElementById("bossText").textContent = translation.bossAchievement;
    
    // Loads the achievement progress values (user data on progress) from Local Storage;
    const achievementValues = JSON.parse(localStorage.getItem("achievements"));

    // --- Score Achievement Logic ---
    const scoreAchievement = document.getElementById("scoreAchievement");
    // Checks for Gold Tier (highest);
    if (achievementValues.score >= 1000000) {

        // Applies Gold frame, score icon, and 3 stars;
        setAchievementStyle(scoreAchievement, FRAME_ARRAY.FRAME_GOLD, ICON_ARRAY.ICON_SCORE, 3);
    }
    // Checks for Silver Tier;
    else if (achievementValues.score >= 10000) {

        // Applies Silver frame, score icon, and 2 stars;
        setAchievementStyle(scoreAchievement, FRAME_ARRAY.FRAME_SILVER, ICON_ARRAY.ICON_SCORE, 2);
    }
    // Checks for Bronze Tier (lowest unlocked);
    else if (achievementValues.score >= 1000) {

        // Applies Bronze frame, score icon, and 1 star;
        setAchievementStyle(scoreAchievement, FRAME_ARRAY.FRAME_BRONZE, ICON_ARRAY.ICON_SCORE, 1);
    }
    // If none of the tiers are met;
    else {

        // Explicitly sets the frame to blocked and removes the 'unlocked' class;
        const frame = scoreAchievement.querySelector(".achievementFrame");
        frame.src = FRAME_ARRAY.FRAME_BLOCKED;
        scoreAchievement.classList.remove("unlocked"); 
    }
    

    // --- Score Match Achievement Logic (Same tiered logic applied) ---
    const scoreMatchAchievement = document.getElementById("scoreMatchAchievement");
    if (achievementValues.scoreMatch >= 500) {

        setAchievementStyle(scoreMatchAchievement, FRAME_ARRAY.FRAME_GOLD, ICON_ARRAY.ICON_MATCH, 3);
    }
    else if (achievementValues.scoreMatch >= 100) {

        setAchievementStyle(scoreMatchAchievement, FRAME_ARRAY.FRAME_SILVER, ICON_ARRAY.ICON_MATCH, 2);
    }
    else if (achievementValues.scoreMatch >= 50) {

        setAchievementStyle(scoreMatchAchievement, FRAME_ARRAY.FRAME_BRONZE, ICON_ARRAY.ICON_MATCH, 1);
    }
    else {

        const frame = scoreMatchAchievement.querySelector(".achievementFrame");
        frame.src = FRAME_ARRAY.FRAME_BLOCKED;
        scoreMatchAchievement.classList.remove("unlocked"); 
    }


    // --- Defeated Enemies Achievement Logic (Same tiered logic applied) ---
    const enemiesAchievement = document.getElementById("enemiesAchievement");
    if (achievementValues.defeatedEnemies >= 1000000) {

        setAchievementStyle(enemiesAchievement, FRAME_ARRAY.FRAME_GOLD, ICON_ARRAY.ICON_ENEMIES, 3);
    }
    else if (achievementValues.defeatedEnemies >= 10000) {

        setAchievementStyle(enemiesAchievement, FRAME_ARRAY.FRAME_SILVER, ICON_ARRAY.ICON_ENEMIES, 2);
    }
    else if (achievementValues.defeatedEnemies >= 1000) {

        setAchievementStyle(enemiesAchievement, FRAME_ARRAY.FRAME_BRONZE, ICON_ARRAY.ICON_ENEMIES, 1);
    }
    else {

        const frame = enemiesAchievement.querySelector(".achievementFrame");
        frame.src = FRAME_ARRAY.FRAME_BLOCKED;
        enemiesAchievement.classList.remove("unlocked"); 
    }


    // --- Defeated Elite Achievement Logic (Same tiered logic applied) ---
    const eliteAchievement = document.getElementById("eliteAchievement");
    if (achievementValues.defeatedElite >= 200) {

        setAchievementStyle(eliteAchievement, FRAME_ARRAY.FRAME_GOLD, ICON_ARRAY.ICON_ELITE, 3);
    }
    else if (achievementValues.defeatedElite >= 100) {

        setAchievementStyle(eliteAchievement, FRAME_ARRAY.FRAME_SILVER, ICON_ARRAY.ICON_ELITE, 2);
    }
    else if (achievementValues.defeatedElite >= 50) {

        setAchievementStyle(eliteAchievement, FRAME_ARRAY.FRAME_BRONZE, ICON_ARRAY.ICON_ELITE, 1);
    }
    else {

        const frame = eliteAchievement.querySelector(".achievementFrame");
        frame.src = FRAME_ARRAY.FRAME_BLOCKED;
        eliteAchievement.classList.remove("unlocked"); 
    }


    // --- Defeated Boss Achievement Logic (Same tiered logic applied) ---
    const bossAchievement = document.getElementById("bossAchievement");
    if (achievementValues.defeatedBoss >= 100) {

        setAchievementStyle(bossAchievement, FRAME_ARRAY.FRAME_GOLD, ICON_ARRAY.ICON_BOSS, 3);
    }
    else if (achievementValues.defeatedBoss >= 50) {

        setAchievementStyle(bossAchievement, FRAME_ARRAY.FRAME_SILVER, ICON_ARRAY.ICON_BOSS, 2);
    }
    else if (achievementValues.defeatedBoss >= 10) {

        setAchievementStyle(bossAchievement, FRAME_ARRAY.FRAME_BRONZE, ICON_ARRAY.ICON_BOSS, 1);
    }
    else {

        const frame = bossAchievement.querySelector(".achievementFrame");
        frame.src = FRAME_ARRAY.FRAME_BLOCKED;
        bossAchievement.classList.remove("unlocked"); 
    }


    // Attaches a click event listener to the Left Navigation Button; 
    document.getElementById("leftButton").addEventListener("click", () => {

        // Checks if the active index is greater than the first achievement (0);
        if(active > 0) {

            // Decrements the active index to move left; 
            active--;
        }

        // Updates the visual positions of all achievements based on the new active index;
        update(achievements, active);
    });

    // Attaches a click event listener to the Right Navigation Button;
    document.getElementById("rightButton").addEventListener("click", () => {

        // Checks if the active index is less than the last achievement's index;
        if(active < achievements.length - 1) {
            
            // Increments the active index to move right;
            active++;
        }

        // Updates the visual positions of all achievements based on the new active index;
        update(achievements, active);
    });

    // Initial call to the update function to set the correct visual state when the page first loads;
    update(achievements, active);
}) ();