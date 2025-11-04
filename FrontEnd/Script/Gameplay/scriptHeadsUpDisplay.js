// Import Spaceship Classes and Utilities;
import StandartShip from "../Models/Spaceships/scriptStandartShip.js";
import SpeedShip from "../Models/Spaceships/scriptSpeedShip.js";
import DestroyerShip from "../Models/Spaceships/scriptDestroyerShip.js";
import FreighterShip from "../Models/Spaceships/scriptFreighterShip.js";
import EliteShip from "../Models/Spaceships/scriptEliteShip.js";
import getTranslation from "../Utils/scriptTranslation.js";
import { HEART_IMAGE } from "../Utils/scriptConstants.js";

// DOM Elements for HUD (Heads-Up Display);
const scoreContainer = document.getElementById("scoreMatchContainer");
const cashContainer = document.getElementById("cashAmount");
const lifeContainer = document.getElementById("lifeContainer");

// Retrieve user session data from Local Storage;
const user = JSON.parse(localStorage.getItem("user"));
const selectedSpaceship = user.selectedSpaceship;
const translation = getTranslation(user?.language);

// Initialize main game metrics and counters;
let score = 0;
let cash = 0;
let defeatedEnemies = 0;
let defeatedElite = 0;
let defeatBoss = 0;

// Player and Boss life tracking variables;
let life = user.spaceshipValues.life;
let bossMaxLife = 0;
let bossLifeContainer = null;
let bossLifeFill = null;
let bossLifeText = null;

// Render Life Bar: Displays player's current health as heart icons;
function renderLife() {

    // Clears the current life bar content;
    lifeContainer.innerHTML = "";

    // Adds one heart image per remaining life point;
    for (let i = 0; i < life; i++) {
        const image = document.createElement("img");
        image.src = HEART_IMAGE;
        image.alt = "Life";
        lifeContainer.appendChild(image);
    }
}

// Global Game Statistics Object: Keeps track of all player performance data;
export let values = {
    score: score,
    cash: cash,
    defeatedEnemies: defeatedEnemies,
    defeatedElite: defeatedElite,
    defeatBoss: defeatBoss
};

// Updates the current score and reflects it on the HUD;
export function updateScore(newScore) {
    values.score += newScore;
    scoreContainer.textContent = `${translation.scoreMatch} : ${values.score}`;
}

// Updates the player's total cash and refreshes the display;
export function updateCash(newCash) {
    values.cash += newCash;
    cashContainer.textContent = values.cash;
}

// Enemy Defeat Counters: Increment corresponding defeat statistics;
export function updateDefeatedEnemies() {
    values.defeatedEnemies++;
}

export function updateDefeatedElite() {
    values.defeatedElite++;
}

export function updateDefeatedBoss() {
    values.defeatBoss++;
}

// Handles life reduction when the player takes damage;
// Returns true if the player has no remaining life;
export function takeLife() {
    life--;
    renderLife();
    return life <= 0;
}

// Sets the player's life value and re-renders the life bar;
export function setLife(newLife) {
    life = newLife;
    renderLife();
}

// Retrieves player’s damage and speed stats from the user data;
export function getDamage() {
    return user.spaceshipValues.damage;
}

export function getSpeed() {
    return user.spaceshipValues.speed;
}

// Factory Function: Creates and returns the selected spaceship instance;
export function getSelectedSpaceship(canvas) {

    if (selectedSpaceship === "standart_ship") {
        return new StandartShip(canvas);
    }
    else if (selectedSpaceship === "speed_ship") {
        return new SpeedShip(canvas);
    }
    else if (selectedSpaceship === "destroyer_ship") {
        return new DestroyerShip(canvas);
    }
    else if (selectedSpaceship === "freighter_ship") {
        return new FreighterShip(canvas);
    }
    else if (selectedSpaceship === "elite_ship") {
        return new EliteShip(canvas);
    }
}

// Displays the Boss Life Bar at the top of the screen during boss fights;
export function showBossLifeBar(bossName, maxLife) {

    // Creates the visual container only once per game session;
    if (!bossLifeContainer) {

        bossLifeContainer = document.createElement("div");
        bossLifeContainer.id = "bossLifeContainer";

        bossLifeFill = document.createElement("div");
        bossLifeFill.id = "bossLifeFill";

        bossLifeText = document.createElement("div");
        bossLifeText.id = "bossLifeText";

        // Assembles and injects the bar into the DOM;
        bossLifeContainer.append(bossLifeFill, bossLifeText);
        document.body.appendChild(bossLifeContainer);
    }

    // Initializes the bar with full life and visible state;
    bossMaxLife = maxLife;
    bossLifeText.textContent = `${bossName.toUpperCase()}`;
    bossLifeFill.style.width = "100%";
    bossLifeContainer.style.display = "block";
}

// Updates the Boss Life Bar dynamically based on current HP percentage;
export function updateBossLifeBar(currentLife) {

    // Prevents updates when no boss bar exists or data is invalid;
    if (!bossLifeContainer || bossMaxLife <= 0) {
        return;
    }

    // Calculates percentage and applies a smooth color gradient from green to red;
    const percent = Math.max(0, (currentLife / bossMaxLife) * 100);
    bossLifeFill.style.width = `${percent}%`;

    const red = Math.min(255, 255 - percent * 1.5);
    const green = Math.min(255, percent * 2.5);
    bossLifeFill.style.backgroundColor = `rgb(${red}, ${green}, 0)`;
}

// Hides the Boss Life Bar when the boss is defeated or the fight ends;
export function hideBossLifeBar() {

    if (!bossLifeContainer) {
        return;
    }

    bossLifeContainer.style.display = "none";
}

// Initializes HUD elements upon game start;
updateScore(score);
updateCash(cash);
setLife(life);