import StandartShip from "../Models/Spaceships/scriptStandartShip.js";
import SpeedShip from "../Models/Spaceships/scriptSpeedShip.js";
import DestroyerShip from "../Models/Spaceships/scriptDestroyerShip.js";
import FreighterShip from "../Models/Spaceships/scriptFreighterShip.js";
import EliteShip from "../Models/Spaceships/scriptEliteShip.js";

const scoreContainer = document.getElementById("scoreMatchContainer");
const cashContainer = document.getElementById("cashAmount");
const lifeContainer = document.getElementById("lifeContainer");

const user = JSON.parse(localStorage.getItem("user"));
const selectedSpaceship = user.selectedSpaceship;
let score = 0;
let cash = 0;
let life = user.spaceshipValues.life; 

const heartImage = "../../Assets/Icons/heart.png"; 

export function updateScore(newScore) {
    score += newScore;
    scoreContainer.textContent = `Score Match : ${score}`;
}

export function updateCash(newCash) {
    cash += newCash;
    cashContainer.textContent = cash;
}

export function updateLife() {
    life--;
    lifeContainer.innerHTML = ""; 
    for (let i = 0; i < life; i++) {
        const img = document.createElement("img");
        img.src = heartImage;
        img.alt = "Life";
        lifeContainer.appendChild(img);
    }
    if (life === 0) {
        gameOver();
    }
}

export function getDamage() {
    return user.spaceshipValues.damage;
}

function gameOver() {
    const values = {
        score: score,
        cash: cash
    };

    if (document.getElementById("pauseScreen")) return;

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
        // desativa o botão visualmente
        continueButton.disabled = true;
        continueButton.classList.add("loading");
        continueButton.textContent = "Saving...";

        // pausa o som se quiser evitar ruídos
        if (window.parent?.pauseAudio) window.parent.pauseAudio();

        try {
            await fetchUpdateScoreCash(user.idUser, values);
            console.log("Pontuação salva, voltando ao menu...");
            if (window.parent?.playAudio) window.parent.playAudio();
            window.location.replace("../../Pages/Hub/mainPage.html");
        } catch (error) {
            console.error("Erro ao salvar score:", error);
            alert("Erro ao salvar dados. Tente novamente.");
        } finally {
            continueButton.disabled = false;
            continueButton.classList.remove("loading");
            continueButton.textContent = "Continue";
        }
    });

    gameOverContent.append(gameOverTitle, continueButton);
    gameOverScreen.appendChild(gameOverContent);
    document.body.appendChild(gameOverScreen);
}


async function fetchUpdateScoreCash(id, scoreCash) {
    try {
        const response = await fetch(`http://localhost:8080/data/achievement/update/score/cash/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(scoreCash) // Certifique-se de enviar como JSON
        });

        if (!response.ok) {
            switch(response.status) {
                case 400:
                    alert("Erro 400: Dados inválidos enviados ao servidor.");
                    break;
                case 404:
                    alert("Erro 404: Usuário ou nave não encontrados.");
                    break;
                case 409:
                    alert("Erro 409: Conflito ao selecionar a nave.");
                    break;
                default:
                    alert(`Erro inesperado: ${response.status}`);
            }
            return null;
        }

        const values = await response.json();
        user.score = values.score;
        user.scoreMatch = values.scoreMatch;
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Funcionou");

    } 
    catch (error) {
        console.error("Falha na conexão com o servidor:", error);
        alert("Falha na conexão com o servidor.");
        return null;
    }
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

updateScore(score);
updateLife(life);
updateCash(cash);