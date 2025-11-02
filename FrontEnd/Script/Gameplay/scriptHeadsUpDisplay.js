import StandartShip from "../Models/Spaceships/scriptStandartShip.js";
import SpeedShip from "../Models/Spaceships/scriptSpeedShip.js";
import DestroyerShip from "../Models/Spaceships/scriptDestroyerShip.js";
import FreighterShip from "../Models/Spaceships/scriptFreighterShip.js";
import EliteShip from "../Models/Spaceships/scriptEliteShip.js";
import getTranslation from "../Utils/scriptTranslation.js";
import { HEART_IMAGE } from "../Utils/scriptConstants.js";

const scoreContainer = document.getElementById("scoreMatchContainer");
const cashContainer = document.getElementById("cashAmount");
const lifeContainer = document.getElementById("lifeContainer");

const user = JSON.parse(localStorage.getItem("user"));
const selectedSpaceship = user.selectedSpaceship;
const translation = getTranslation(user?.language);

let score = 0;
let cash = 0;
let defeatedEnemies = 0;
let defeatedElite = 0;
let defeatBoss = 0;

let life = user.spaceshipValues.life; 
let bossMaxLife = 0;
let bossLifeContainer = null;
let bossLifeFill = null;
let bossLifeText = null;

function renderLife() {

    lifeContainer.innerHTML = "";

    for (let i = 0; i < life; i++) {

        const image = document.createElement("img");
        image.src = HEART_IMAGE;
        image.alt = "Life";
        lifeContainer.appendChild(image);
    }
}

export let values = {
    score: score,
    cash: cash,
    defeatedEnemies: defeatedEnemies,
    defeatedElite: defeatedElite,
    defeatBoss: defeatBoss
};

export function updateScore(newScore) {

    values.score += newScore;
    scoreContainer.textContent = `${translation.scoreMatch} : ${values.score}`;
}

export function updateCash(newCash) {

    values.cash += newCash;
    cashContainer.textContent = values.cash;
}

export function updateDefeatedEnemies() {
    values.defeatedEnemies++;
}

export function updateDefeatedElite() {
    values.defeatedElite++;
}

export function updateDefeatedBoss() {
    values.defeatBoss++;
}

export function takeLife() {

    life--;
    renderLife();
    return life <= 0;
}

export function setLife(newLife) {

    life = newLife;
    renderLife();
}

export function getDamage() {
    return user.spaceshipValues.damage;
}

export function getSpeed() {
    return user.spaceshipValues.speed;
}

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

export function showBossLifeBar(bossName, maxLife) {

    if (!bossLifeContainer) {

        bossLifeContainer = document.createElement("div");
        bossLifeContainer.id = "bossLifeContainer";

        bossLifeFill = document.createElement("div");
        bossLifeFill.id = "bossLifeFill";

        bossLifeText = document.createElement("div");
        bossLifeText.id = "bossLifeText";

        bossLifeContainer.append(bossLifeFill, bossLifeText);
        document.body.appendChild(bossLifeContainer);
    }

    bossMaxLife = maxLife;
    bossLifeText.textContent = `${bossName.toUpperCase()}`;
    bossLifeFill.style.width = "100%";
    bossLifeContainer.style.display = "block";
}

export function updateBossLifeBar(currentLife) {

    if (!bossLifeContainer || bossMaxLife <= 0) {
        return;
    }

    const percent = Math.max(0, (currentLife / bossMaxLife) * 100);
    bossLifeFill.style.width = `${percent}%`;

    const red = Math.min(255, 255 - percent * 1.5);
    const green = Math.min(255, percent * 2.5);
    bossLifeFill.style.backgroundColor = `rgb(${red}, ${green}, 0)`;
}

export function hideBossLifeBar() {

    if (!bossLifeContainer) {
        return;
    }

    bossLifeContainer.style.display = "none";
}

updateScore(score);
updateCash(cash);
setLife(life);