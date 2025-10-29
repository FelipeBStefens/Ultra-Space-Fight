import getTranslation from "../Utils/scriptTranslation.js";
import { FRAME_ARRAY, ICON_ARRAY } from "../Utils/scriptConstants.js";

function setAchievementStyle(achievementElement, framePath, iconPath, starsCount = 0) {
  
  const frame = achievementElement.querySelector(".achievementFrame");
  frame.src = framePath; 
  achievementElement.classList.add("unlocked");

  const icon = achievementElement.querySelector("img:not(.achievementFrame)");
  if (icon) {
    
    icon.src = iconPath; 
    icon.style.display = 'none'; 
  }

  const starsContainer = achievementElement.querySelector(".stars");
  starsContainer.innerHTML = ""; 

  for (let i = 0; i < starsCount; i++) {

    const star = document.createElement("img");
    star.src = "../../Assets/Icons/Star.png"; 
    star.alt = "star";
    starsContainer.appendChild(star);
  }
}

function update(achievements, active) {

  // For loop in each achievement;
  achievements.forEach((achievement, i) => {

    // Removing that classes on the Div, if it has;
    achievement.classList.remove("active", "left", "right");
      
    // Conditional expressions;
    if (i === active) {

      // Adding a new class on that Div; 
      achievement.classList.add("active");
    }
    else if (i < active) {

      // Adding a new class on that Div;
      achievement.classList.add("left");
    }
    else if (i > active) {

      // Adding a new class on that Div;
      achievement.classList.add("right");
    } 
  });
}

// Function Expression, to initialize when the page start;
(async function(){

  // Active achievement variable;
  let active = 0;

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {     
    window.location.href = "../../index.html";
  }

  // Selecionando todas as Divs que são Conquistas;
  const achievements = document.querySelectorAll(".achievement");
  achievements.forEach(achievement => {

    const frame = achievement.querySelector(".achievementFrame");
    frame.src = frame.dataset.defaultFrame;

    const icon = achievement.querySelector("img:not(.achievementFrame)");
    if (icon && !icon.src.includes(ICON_ARRAY.ICON_BLOCKED)) {

      icon.src = ICON_ARRAY.ICON_BLOCKED;
    }
  });

  const translation = getTranslation(user?.language);
  document.getElementById("scoreText").textContent = translation.scoreAchievement;
  document.getElementById("matchText").textContent = translation.matchAchievement;
  document.getElementById("enemiesText").textContent = translation.enemiesAchievement;
  document.getElementById("eliteText").textContent = translation.eliteAchievement;
  document.getElementById("bossText").textContent = translation.bossAchievement;
  

  const achievementValues = JSON.parse(localStorage.getItem("achievements"));

  const scoreAchievement = document.getElementById("scoreAchievement");
  if (achievementValues.score >= 1000000) {

    setAchievementStyle(scoreAchievement, FRAME_ARRAY.FRAME_GOLD, ICON_ARRAY.ICON_SCORE, 3);
  }
  else if (achievementValues.score >= 10000) {

    setAchievementStyle(scoreAchievement, FRAME_ARRAY.FRAME_SILVER, ICON_ARRAY.ICON_SCORE, 2);
  }
  else if (achievementValues.score >= 1000) {

    setAchievementStyle(scoreAchievement, FRAME_ARRAY.FRAME_BRONZE, ICON_ARRAY.ICON_SCORE, 1);
  }
  else {

    const frame = scoreAchievement.querySelector(".achievementFrame");
    frame.src = FRAME_ARRAY.FRAME_BLOCKED;
    scoreAchievement.classList.remove("unlocked"); 
  }
  

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


  // Add an Event Listener on the left button; 
  document.getElementById("leftButton").addEventListener("click", () => {

    // If the active is greater than 0;
    if(active > 0) {

      // active value minus 1; 
      active--;
    }

    // Update the values with the function;
    update(achievements, active);
  });

  // Add an Event Listener on the right button;
  document.getElementById("rightButton").addEventListener("click", () => {

    // If the active is less than the bigger index;
    if(active < achievements.length - 1) {
      
      // active value plus 1;
      active++;
    }

    // Update the values with the function;
    update(achievements, active);
  });

  // Update the values with the function;
  update(achievements, active);
}) ();