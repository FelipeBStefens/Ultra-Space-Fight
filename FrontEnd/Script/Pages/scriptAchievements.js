
// Function Expression, to initialize when the page start;
(async function(){

  // Active achievement variable;
  let active = 0;

  const user = JSON.parse(sessionStorage.getItem("user"));
  
  if (!user) {     
    window.location.href = "../../index.html";
  }

  const achievementValues = JSON.parse(sessionStorage.getItem("achievements"));

  const root = getComputedStyle(document.documentElement);

  // Selecting all Divs that are Achievements;
  const achievements = 
    document.querySelectorAll(".achievement");
  
  const scoreAchievement = document.getElementById("scoreAchievement");
  console.log(achievementValues.score);
  if (achievementValues.score >= 1000000) {
    scoreAchievement.style.background = root.getPropertyValue("--gold-color")
      .trim();
  }
  else if (achievementValues.score >= 10000) {
    scoreAchievement.style.background = root.getPropertyValue("--silver-color")
      .trim();
  }
  else if (achievementValues.score >= 1000) {
    scoreAchievement.style.background = root.getPropertyValue("--silver-color")
      .trim();
  }
  
  const scoreMatchAchievement = document.getElementById("scoreMatchAchievement");
  console.log(achievementValues.scoreMatch);
  if (achievementValues.scoreMatch >= 500) {
    scoreMatchAchievement.style.background = root.getPropertyValue("--gold-color")
      .trim();
  }
  else if (achievementValues.scoreMatch >= 100) {
    scoreMatchAchievement.style.background = root.getPropertyValue("--silver-color")
      .trim();
  }
  else if (achievementValues.scoreMatch >= 50) {
    scoreMatchAchievement.style.background = root.getPropertyValue("--silver-color")
      .trim();
  }

  const enemiesAchievement = document.getElementById("enemiesAchievement");
  console.log(achievementValues.defeatedEnemies);
  if (achievementValues.defeatedEnemies >= 1000000) {
    enemiesAchievement.style.background = root.getPropertyValue("--gold-color")
      .trim();
  }
  else if (achievementValues.defeatedEnemies >= 10000) {
    enemiesAchievement.style.background = root.getPropertyValue("--silver-color")
      .trim();
  }
  else if (achievementValues.defeatedEnemies >= 1000) {
    enemiesAchievement.style.background = root.getPropertyValue("--silver-color")
      .trim();
  }

  const eliteAchievement = document.getElementById("eliteAchievement");
  console.log(achievementValues.defeatedElite);
  if (achievementValues.defeatedElite >= 200) {
    eliteAchievement.style.background = root.getPropertyValue("--gold-color")
      .trim();
  }
  else if (achievementValues.defeatedElite >= 100) {
    eliteAchievement.style.background = root.getPropertyValue("--silver-color")
      .trim();
  }
  else if (achievementValues.defeatedElite >= 50) {
    eliteAchievement.style.background = root.getPropertyValue("--silver-color")
      .trim();
  }

  const bossAchievement = document.getElementById("bossAchievement");
  console.log(achievementValues.defeatedBoss);
  if (achievementValues.defeatedBoss >= 100) {
    bossAchievement.style.background = root.getPropertyValue("--gold-color")
      .trim();
  }
  else if (achievementValues.defeatedBoss >= 50) {
    bossAchievement.style.background = root.getPropertyValue("--silver-color")
      .trim();
  }
  else if (achievementValues.defeatedBoss >= 10) {
    bossAchievement.style.background = root.getPropertyValue("--silver-color")
      .trim();
  }

  // functions to update the active achievement; 
  function update() {

    // For loop in each achievement;
    achievements.forEach((achievement, i) => {

      // Removing that classes on the Div, if it has;
      achievement.classList
        .remove("active", "left", "right");
      
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

  // Add an Event Listener on the left button; 
  document.getElementById("leftButton")
    .addEventListener("click", () => {

    // If the active is greater than 0;
    if(active > 0) {

      // active value minus 1; 
      active--;
    }

    // Update the values with the function;
    update();
  });

  // Add an Event Listener on the right button;
  document.getElementById("rightButton").
    addEventListener("click", () => {

    // If the active is less than the bigger index;
    if(active < achievements.length - 1) {
      
      // active value plus 1;
      active++;
    }

    // Update the values with the function;
    update();
  });

  // Update the values with the function;
  update();
}) ();