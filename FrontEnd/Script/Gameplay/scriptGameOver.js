import SoundManager from "./scriptSoundManager.js";

export default function gameOver(user, values) {

    if (document.getElementById("pauseScreen")) return;

    console.log(values);
    
    SoundManager.stopMusic();

    setTimeout(() => {
        SoundManager.playSound("gameOverVoice");
        SoundManager.playMusic("../../Assets/Audios/GameOver.mp3");
    }, 1500);

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
        continueButton.disabled = true;
        continueButton.classList.add("loading");
        continueButton.textContent = "Saving...";

        if (window.parent?.pauseAudio) window.parent.pauseAudio();

        try {
            if (!user || !user.idUser) {
                console.warn('No user available to save score, redirecting to menu');
            } else {
                await fetchUpdateScoreCash(user.idUser, values, user);
            }
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

async function fetchUpdateScoreCash(id, scoreCash, user) {
    try {
        const response = await fetch(`http://localhost:8080/data/achievement/update/achievements/cash/${id}`, {
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

    const res = await response.json();
    // Update the passed-in user object and persist (if provided)
    if (user) {
        user.score = res.score;
        user.scoreMatch = res.scoreMatch;
        localStorage.setItem("user", JSON.stringify(user));
    }
    console.log("Funcionou");
    return res;

    } 
    catch (error) {
        console.error("Falha na conexão com o servidor:", error);
        alert("Falha na conexão com o servidor.");
        return null;
    }
}