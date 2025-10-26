import { gameState } from "./scriptGameplay.js";
import SoundManager from "./scriptSoundManager.js";

const pauseButton = document.getElementById("pauseButton");

const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "../../enter.html";

// -------------------------------
// 🌐 Sistema de Traduções
// -------------------------------
const translations = {
    English: {
        pause: "Pause",
        resume: "Resume",
        soundEffects: "Sound Effects",
        soundtrack: "Soundtrack",
        saveSounds: "Save Sounds",
        leaveMatch: "Leave Match",
    },
    Portuguese: {
        pause: "Pausa",
        resume: "Retomar",
        soundEffects: "Efeitos Sonoros",
        soundtrack: "Trilha Sonora",
        saveSounds: "Salvar Sons",
        leaveMatch: "Sair da Partida",
    }
};

// Define o idioma atual (fallback: English)
const lang = user.language in translations ? user.language : "English";
const t = translations[lang];

// -------------------------------
// Botão principal de Pause
// -------------------------------
if (!pauseButton) {
    console.warn("pauseButton element not found");
} else {
    pauseButton.addEventListener("click", () => {
        gameState.isPaused = true;
        if (document.getElementById("pauseScreen")) return;

        pauseButton.classList.add("clicked");

        const pauseScreen = document.createElement("div");
        pauseScreen.id = "pauseScreen";

        const pauseContent = document.createElement("div");
        pauseContent.id = "pauseContent";

        const pauseTitle = document.createElement("div");
        pauseTitle.id = "pauseTitle";
        pauseTitle.textContent = t.pause;

        // --- Resume ---
        const resumeButton = document.createElement("button");
        resumeButton.id = "resumeButton";
        resumeButton.className = "pauseButton";
        resumeButton.textContent = t.resume;

        // --- Sound Effects ---
        const soundSlider = document.createElement("input");
        soundSlider.type = "range";
        soundSlider.min = "0";
        soundSlider.max = "1";
        soundSlider.step = "0.01";
        soundSlider.value = user.soundEffects;
        soundSlider.className = "pauseSlider";

        const soundLabel = document.createElement("label");
        soundLabel.textContent = t.soundEffects;
        soundLabel.className = "pauseLabel";

        const soundContainer = document.createElement("div");
        soundContainer.className = "sliderContainer";
        soundContainer.append(soundLabel, soundSlider);

        // --- Music (Soundtrack) ---
        const musicSlider = document.createElement("input");
        musicSlider.type = "range";
        musicSlider.min = "0";
        musicSlider.max = "1";
        musicSlider.step = "0.01";
        musicSlider.value = user.soundtrack;
        musicSlider.className = "pauseSlider";

        const musicLabel = document.createElement("label");
        musicLabel.textContent = t.soundtrack;
        musicLabel.className = "pauseLabel";

        const musicContainer = document.createElement("div");
        musicContainer.className = "sliderContainer";
        musicContainer.append(musicLabel, musicSlider);

        // --- Save Sounds ---
        const saveSoundsButton = document.createElement("button");
        saveSoundsButton.id = "saveSoundsButton";
        saveSoundsButton.className = "pauseButton";
        saveSoundsButton.textContent = t.saveSounds;

        // --- Exit ---
        const exitButton = document.createElement("button");
        exitButton.id = "exitButton";
        exitButton.className = "pauseButton";
        exitButton.textContent = t.leaveMatch;

        const allButtons = [resumeButton, saveSoundsButton, exitButton];
        const allInputs = [soundSlider, musicSlider];

        // -------------------------------
        // Controle de estado visual
        // -------------------------------
        function setDisabledAll(state = true, activeButton = null) {
            allInputs.forEach(input => (input.disabled = state));
            allButtons.forEach(btn => {
                if (btn === activeButton && state) {
                    btn.classList.add("loading");
                    btn.disabled = false;
                } else {
                    btn.disabled = state;
                    if (state) btn.classList.add("disabled-others");
                    else btn.classList.remove("disabled-others");
                    btn.classList.remove("loading");
                }
            });
        }

        function removeLoading(button) {
            allButtons.forEach(btn => {
                btn.classList.remove("loading", "disabled-others");
                btn.disabled = false;
            });
            allInputs.forEach(input => (input.disabled = false));
        }

        // -------------------------------
        // EVENTOS
        // -------------------------------
        resumeButton.addEventListener("click", () => {
            setDisabledAll(true, resumeButton);
            setTimeout(() => {
                pauseScreen.remove();
                pauseButton.classList.remove("clicked");
                gameState.isPaused = false;
            }, 150);
        });

        saveSoundsButton.addEventListener("click", async () => {
            setDisabledAll(true, saveSoundsButton);

            const body = {
                soundtrack: musicSlider.valueAsNumber,
                soundEffects: soundSlider.valueAsNumber,
            };

            try {
                const response = await fetch(
                    `http://localhost:8080/configuration/update/sound/${user.idUser}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                    }
                );

                if (!response.ok) throw new Error(response.status);

                const result = await response.json();
                user.soundtrack = result.soundtrack;
                user.soundEffects = result.soundEffects;
                localStorage.setItem("user", JSON.stringify(user));

                if (window.parent?.setAudioVolume)
                    window.parent.setAudioVolume(user.soundtrack);
                SoundManager.updateMusicVolume();

                console.log("Configurações de som salvas:", result);
            } catch (err) {
                console.error("Erro ao salvar sons:", err);
            } finally {
                removeLoading(saveSoundsButton);
            }
        });

        exitButton.addEventListener("click", () => {
            setDisabledAll(true, exitButton);
            setTimeout(() => {
                if (window.parent?.playAudio) window.parent.playAudio();
                window.location.replace("../../Pages/Hub/mainPage.html"), 150;
            });
        });

        // -------------------------------
        // Monta tudo
        // -------------------------------
        pauseContent.append(
            pauseTitle,
            resumeButton,
            soundContainer,
            musicContainer,
            saveSoundsButton,
            exitButton
        );
        pauseScreen.appendChild(pauseContent);
        document.body.appendChild(pauseScreen);
    });
}