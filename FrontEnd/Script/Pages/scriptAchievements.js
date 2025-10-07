// Function Expression, to initialize when the page start;
(async function(){

  // Active achievement variable;
  let active = 0;

  // ----------------------------------------------------
  // 1. Definição de Caminhos de Imagem por Nível (NOVO)
  // ----------------------------------------------------
  
  // Defina os caminhos das imagens que serão usadas para todas as conquistas
  const LOCKED_IMAGE = "../../Assets/Icons/blocked.png"; // Imagem padrão (Bloqueada)
  const BRONZE_IMAGE = "../../Assets/Icons/star.png"; // Imagem para medalha Bronze
  const SILVER_IMAGE = "../../Assets/Icons/twoStars.png"; // Imagem para medalha Prata
  const GOLD_IMAGE = "../../Assets/Icons/threeStars.png";     // Imagem para medalha Ouro

  // ----------------------------------------------------
  // 2. Verificação de Usuário e Dados de Conquistas
  // ----------------------------------------------------
  const user = JSON.parse(sessionStorage.getItem("user"));
  
  if (!user) {     
    window.location.href = "../../index.html";
  }

  const achievementValues = JSON.parse(sessionStorage.getItem("achievements"));

  const root = getComputedStyle(document.documentElement);

  // Selecionando todas as Divs que são Conquistas;
  const achievements = 
    document.querySelectorAll(".achievement");

  // ----------------------------------------------------
  // 3. Lógica das Conquistas (Fundo, Classe e Imagem)
  // ----------------------------------------------------

  // Funções auxiliares para simplificar o código repetitivo
  function setAchievementStyle(achievementElement, imageElement, colorProperty, imagePath) {
    achievementElement.style.background = root.getPropertyValue(colorProperty).trim();
    achievementElement.classList.add("unlocked");
    imageElement.src = imagePath;
  }
  
  // Conquista 1: Pontuação (scoreAchievement)
  const scoreAchievement = document.getElementById("scoreAchievement");
  const scoreImage = document.getElementById("scoreImage"); 
  
  console.log(achievementValues.score);
  // Nível Ouro
  if (achievementValues.score >= 1000000) {
    setAchievementStyle(scoreAchievement, scoreImage, "--gold-color", GOLD_IMAGE);
  }
  // Nível Prata
  else if (achievementValues.score >= 10000) {
    setAchievementStyle(scoreAchievement, scoreImage, "--silver-color", SILVER_IMAGE);
  }
  // Nível Bronze (Ajustado de silver para bronze)
  else if (achievementValues.score >= 1000) {
    setAchievementStyle(scoreAchievement, scoreImage, "--bronze-color", BRONZE_IMAGE);
  }
  else {
    // Garante que a imagem bloqueada seja definida se nenhuma condição for atendida
    scoreImage.src = LOCKED_IMAGE;
  }
  
  // Conquista 2: Pontuação por Partida (scoreMatchAchievement)
  const scoreMatchAchievement = document.getElementById("scoreMatchAchievement");
  const matchImage = document.getElementById("matchImage"); 

  console.log(achievementValues.scoreMatch);
  // Nível Ouro
  if (achievementValues.scoreMatch >= 500) {
    setAchievementStyle(scoreMatchAchievement, matchImage, "--gold-color", GOLD_IMAGE);
  }
  // Nível Prata
  else if (achievementValues.scoreMatch >= 100) {
    setAchievementStyle(scoreMatchAchievement, matchImage, "--silver-color", SILVER_IMAGE);
  }
  // Nível Bronze (Ajustado de silver para bronze)
  else if (achievementValues.scoreMatch >= 50) {
    setAchievementStyle(scoreMatchAchievement, matchImage, "--bronze-color", BRONZE_IMAGE);
  }
  else {
    matchImage.src = LOCKED_IMAGE;
  }

  // Conquista 3: Inimigos Derrotados (enemiesAchievement)
  const enemiesAchievement = document.getElementById("enemiesAchievement");
  const enemiesImage = document.getElementById("enemiesImage"); 

  console.log(achievementValues.defeatedEnemies);
  // Nível Ouro
  if (achievementValues.defeatedEnemies >= 1000000) {
    setAchievementStyle(enemiesAchievement, enemiesImage, "--gold-color", GOLD_IMAGE);
  }
  // Nível Prata
  else if (achievementValues.defeatedEnemies >= 10000) {
    setAchievementStyle(enemiesAchievement, enemiesImage, "--silver-color", SILVER_IMAGE);
  }
  // Nível Bronze (Ajustado de silver para bronze)
  else if (achievementValues.defeatedEnemies >= 1000) {
    setAchievementStyle(enemiesAchievement, enemiesImage, "--bronze-color", BRONZE_IMAGE);
  }
  else {
    enemiesImage.src = LOCKED_IMAGE;
  }

  // Conquista 4: Elites Derrotados (eliteAchievement)
  const eliteAchievement = document.getElementById("eliteAchievement");
  const eliteImage = document.getElementById("eliteImage"); 

  console.log(achievementValues.defeatedElite);
  // Nível Ouro
  if (achievementValues.defeatedElite >= 200) {
    setAchievementStyle(eliteAchievement, eliteImage, "--gold-color", GOLD_IMAGE);
  }
  // Nível Prata
  else if (achievementValues.defeatedElite >= 100) {
    setAchievementStyle(eliteAchievement, eliteImage, "--silver-color", SILVER_IMAGE);
  }
  // Nível Bronze (Ajustado de silver para bronze)
  else if (achievementValues.defeatedElite >= 50) {
    setAchievementStyle(eliteAchievement, eliteImage, "--bronze-color", BRONZE_IMAGE);
  }
  else {
    eliteImage.src = LOCKED_IMAGE;
  }

  // Conquista 5: Chefes Derrotados (bossAchievement)
  const bossAchievement = document.getElementById("bossAchievement");
  const bossImage = document.getElementById("bossImage"); 

  console.log(achievementValues.defeatedBoss);
  // Nível Ouro
  if (achievementValues.defeatedBoss >= 100) {
    setAchievementStyle(bossAchievement, bossImage, "--gold-color", GOLD_IMAGE);
  }
  // Nível Prata
  else if (achievementValues.defeatedBoss >= 50) {
    setAchievementStyle(bossAchievement, bossImage, "--silver-color", SILVER_IMAGE);
  }
  // Nível Bronze (Ajustado de silver para bronze)
  else if (achievementValues.defeatedBoss >= 10) {
    setAchievementStyle(bossAchievement, bossImage, "--bronze-color", BRONZE_IMAGE);
  }
  else {
    bossImage.src = LOCKED_IMAGE;
  }

  // ----------------------------------------------------
  // 4. Funções de Navegação do Carrossel (Inalteradas)
  // ----------------------------------------------------
  
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