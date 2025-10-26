const translations = {
  English: {
    score: "Score Master",
    match: "Perfect Match",
    enemies: "Enemies Destroyer",
    elite: "Elite Person",
    boss: "A Real Boss",
  },
  Portuguese: {
    score: "Mestre dos Pontos",
    match: "Partida Perfeita",
    enemies: "Destruidor de Inimigos",
    elite: "Pessoa de Elite",
    boss: "O Verdadeiro Chefe",
  }
};


// Function Expression, to initialize when the page start;
(async function(){

  // Active achievement variable;
  let active = 0;
  
  const FRAME_BLOCKED = "../../Assets/Images/BlockedAchievement.png";
  const FRAME_BRONZE = "../../Assets/Images/BronzeAchievement.png";
  const FRAME_SILVER = "../../Assets/Images/SilverAchievement.png";
  const FRAME_GOLD = "../../Assets/Images/GoldAchievement.png";

  const ICON_SCORE = ""; 
  const ICON_MATCH = ""; 
  const ICON_ENEMIES = "";
  const ICON_ELITE = ""; 
  const ICON_BOSS = ""; 
  const ICON_BLOCKED = "../../Assets/Icons/blocked.png";

  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user) {     
    window.location.href = "../../enter.html";
  }

  const achievementValues = JSON.parse(localStorage.getItem("achievements"));

  const root = getComputedStyle(document.documentElement);

  // Selecionando todas as Divs que são Conquistas;
  const achievements = 
    document.querySelectorAll(".achievement");

  achievements.forEach(a => {
    const frame = a.querySelector(".achievement-frame");
    frame.src = frame.dataset.defaultFrame;

    const icon = a.querySelector("img:not(.achievement-frame)");
    if (icon && !icon.src.includes(ICON_BLOCKED)) {
      icon.src = ICON_BLOCKED;
    }
  });

  const lang = user.language in translations ? user.language : "English";
  const t = translations[lang];

  document.getElementById("scoreText").textContent = t.score;
  document.getElementById("matchText").textContent = t.match;
  document.getElementById("enemiesText").textContent = t.enemies;
  document.getElementById("eliteText").textContent = t.elite;
  document.getElementById("bossText").textContent = t.boss;

  // ----------------------------------------------------
  // 3. Lógica das Conquistas (Fundo, Classe e Imagem)
  // ----------------------------------------------------

  function setAchievementStyle(achievementElement, framePath, iconPath, starsCount = 0) {
    const frame = achievementElement.querySelector(".achievement-frame");
    frame.src = framePath; 
    achievementElement.classList.add("unlocked");

    const icon = achievementElement.querySelector("img:not(.achievement-frame)");
    if (icon) {
      icon.src = iconPath; 
      icon.style.display = 'none'; 
    }
    // Adiciona as estrelas dinamicamente
    const starsContainer = achievementElement.querySelector(".stars");
    starsContainer.innerHTML = ""; 

    for (let i = 0; i < starsCount; i++) {
      const star = document.createElement("img");
      star.src = "../../Assets/Images/Star.png"; 
      star.alt = "star";
      starsContainer.appendChild(star);
    }
  }
  
  // Conquista 1: Pontuação (scoreAchievement)
  const scoreAchievement = document.getElementById("scoreAchievement");
  
  console.log(achievementValues.score);
  // Nível Ouro
  if (achievementValues.score >= 1000000) {
    setAchievementStyle(scoreAchievement, FRAME_GOLD, ICON_SCORE, 3);
  }
  // Nível Prata
  else if (achievementValues.score >= 10000) {
    setAchievementStyle(scoreAchievement, FRAME_SILVER, ICON_SCORE, 2);
  }
  // Nível Bronze (Ajustado de silver para bronze)
  else if (achievementValues.score >= 1000) {
    setAchievementStyle(scoreAchievement, FRAME_BRONZE, ICON_SCORE, 1);
  }
  else {
    const frame = scoreAchievement.querySelector(".achievement-frame");
    frame.src = FRAME_BLOCKED;
    scoreAchievement.classList.remove("unlocked"); // remove classe desbloqueada
  }
  
  // Conquista 2: Pontuação por Partida (scoreMatchAchievement)
  const scoreMatchAchievement = document.getElementById("scoreMatchAchievement");

  console.log(achievementValues.scoreMatch);
  // Nível Ouro
  if (achievementValues.scoreMatch >= 500) {
    setAchievementStyle(scoreMatchAchievement, FRAME_GOLD, ICON_MATCH, 3);
  }
  // Nível Prata
  else if (achievementValues.scoreMatch >= 100) {
    setAchievementStyle(scoreMatchAchievement, FRAME_SILVER, ICON_MATCH, 2);
  }
  // Nível Bronze (Ajustado de silver para bronze)
  else if (achievementValues.scoreMatch >= 50) {
    setAchievementStyle(scoreMatchAchievement, FRAME_BRONZE, ICON_MATCH, 1);
  }
  else {
    const frame = scoreMatchAchievement.querySelector(".achievement-frame");
    frame.src = FRAME_BLOCKED;
    scoreMatchAchievement.classList.remove("unlocked"); // remove classe desbloqueada
  }

  // Conquista 3: Inimigos Derrotados (enemiesAchievement)
  const enemiesAchievement = document.getElementById("enemiesAchievement");

  console.log(achievementValues.defeatedEnemies);
  // Nível Ouro
  if (achievementValues.defeatedEnemies >= 1000000) {
    setAchievementStyle(enemiesAchievement, FRAME_GOLD, ICON_ENEMIES, 3);
  }
  // Nível Prata
  else if (achievementValues.defeatedEnemies >= 10000) {
    setAchievementStyle(enemiesAchievement, FRAME_SILVER, ICON_ENEMIES, 2);
  }
  // Nível Bronze (Ajustado de silver para bronze)
  else if (achievementValues.defeatedEnemies >= 1000) {
    setAchievementStyle(enemiesAchievement, FRAME_BRONZE, ICON_ENEMIES, 1);
  }
  else {
    const frame = enemiesAchievement.querySelector(".achievement-frame");
    frame.src = FRAME_BLOCKED;
    enemiesAchievement.classList.remove("unlocked"); // remove classe desbloqueada
  }

  // Conquista 4: Elites Derrotados (eliteAchievement)
  const eliteAchievement = document.getElementById("eliteAchievement");

  console.log(achievementValues.defeatedElite);
  // Nível Ouro
  if (achievementValues.defeatedElite >= 200) {
    setAchievementStyle(eliteAchievement, FRAME_GOLD, ICON_ELITE, 3);
  }
  // Nível Prata
  else if (achievementValues.defeatedElite >= 100) {
    setAchievementStyle(eliteAchievement, FRAME_SILVER, ICON_ELITE, 2);
  }
  // Nível Bronze (Ajustado de silver para bronze)
  else if (achievementValues.defeatedElite >= 50) {
    setAchievementStyle(eliteAchievement, FRAME_BRONZE, ICON_ELITE, 1);
  }
  else {
    const frame = eliteAchievement.querySelector(".achievement-frame");
    frame.src = FRAME_BLOCKED;
    eliteAchievement.classList.remove("unlocked"); // remove classe desbloqueada
  }

  // Conquista 5: Chefes Derrotados (bossAchievement)
  const bossAchievement = document.getElementById("bossAchievement");

  console.log(achievementValues.defeatedBoss);
  // Nível Ouro
  if (achievementValues.defeatedBoss >= 100) {
    setAchievementStyle(bossAchievement, FRAME_GOLD, ICON_BOSS, 3);
  }
  // Nível Prata
  else if (achievementValues.defeatedBoss >= 50) {
    setAchievementStyle(bossAchievement, FRAME_SILVER, ICON_BOSS, 2);
  }
  // Nível Bronze (Ajustado de silver para bronze)
  else if (achievementValues.defeatedBoss >= 10) {
    setAchievementStyle(bossAchievement, FRAME_BRONZE, ICON_BOSS, 1);
  }
  else {
    const frame = bossAchievement.querySelector(".achievement-frame");
    frame.src = FRAME_BLOCKED;
    bossAchievement.classList.remove("unlocked"); // remove classe desbloqueada
  }

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