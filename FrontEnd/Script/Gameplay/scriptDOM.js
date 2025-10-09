const scoreContainer = document.getElementById("scoreMatchContainer");
const cashContainer = document.getElementById("cashAmount");
const lifeContainer = document.getElementById("lifeContainer");

const user = JSON.parse(localStorage.getItem("user"));
let score = 0;
let cash = 0;
let life = user.spaceshipValues.life; 

const heartImage = "../../Assets/Icons/heart.png"; 

function updateScore(newScore) {
    score = newScore;
    scoreContainer.textContent = `Score Match : ${score}`;
}

function updateCash(newCash) {
    cash = newCash;
    cashContainer.textContent = cash;
}

function updateLife(newLife) {
    life = newLife;
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

function gameOver() {
    
    const values = {
        score: score,
        cash: cash
    };

    fetchUpdateScoreCash(user.idUser, values);

    if (document.getElementById("gameOverScreen")) return;

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

    continueButton.addEventListener("click", () => {
        if (window.parent?.playAudio) window.parent.playAudio();
        window.location.replace("../../Pages/Hub/mainPage.html");
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

updateScore(score);
updateLife(life);
updateCash(cash);