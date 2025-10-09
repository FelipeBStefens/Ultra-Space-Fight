const pauseButton = document.getElementById("pauseButton");

const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "../../enter.html";

pauseButton.addEventListener("click", () => {
    if (document.getElementById("pauseScreen")) return;
    
    console.log("Pause button clicked ✅");
    const pauseScreen = document.createElement("div");
    pauseScreen.id = "pauseScreen";

    const pauseContent = document.createElement("div");
    pauseContent.id = "pauseContent";

    const pauseTitle = document.createElement("div");
    pauseTitle.id = "pauseTitle";
    pauseTitle.textContent = "Pause";

    // Botões e sliders
    const resumeButton = document.createElement("button");
    resumeButton.id = "resumeButton";
    resumeButton.className = "pauseButton";
    resumeButton.textContent = "Resume";

    const soundSlider = document.createElement("input");
    soundSlider.type = "range";
    soundSlider.min = "0";
    soundSlider.max = "1";
    soundSlider.step = "0.01";
    soundSlider.value = user.soundEffects;
    soundSlider.className = "pauseSlider";

    const musicSlider = document.createElement("input");
    musicSlider.type = "range";
    musicSlider.min = "0";
    musicSlider.max = "1";
    musicSlider.step = "0.01";
    musicSlider.value = user.soundtrack;
    musicSlider.className = "pauseSlider";

    const saveSoundsButton = document.createElement("button");
    saveSoundsButton.id = "saveSoundsButton";
    saveSoundsButton.className = "pauseButton";
    saveSoundsButton.textContent = "Save Sounds";

    const exitButton = document.createElement("button");
    exitButton.id = "exitButton";
    exitButton.className = "pauseButton";
    exitButton.textContent = "Sair da partida";

    const allButtons = [resumeButton, saveSoundsButton, exitButton];
    const allInputs = [soundSlider, musicSlider];

    // Função para desabilitar tudo, exceto o botão ativo
    function setDisabledAll(state = true, activeButton = null) {
        allInputs.forEach(input => input.disabled = state);
        allButtons.forEach(btn => {
            if (btn === activeButton && state) {
                btn.classList.add("loading");
                btn.disabled = false; // botão ativo continua clicável
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
        allInputs.forEach(input => input.disabled = false);
    }

    // EVENT LISTENERS
    resumeButton.addEventListener("click", () => {
        setDisabledAll(true, resumeButton);
        setTimeout(() => pauseScreen.remove(), 150);
    });

    saveSoundsButton.addEventListener("click", async () => {
        setDisabledAll(true, saveSoundsButton);

        const body = {
            soundtrack: musicSlider.valueAsNumber,
            soundEffects: soundSlider.valueAsNumber
        };

        try {
            const response = await fetch(`http://localhost:8080/configuration/update/sound/${user.idUser}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (!response.ok) throw new Error(response.status);
            const result = await response.json();

            user.soundtrack = result.soundtrack;
            user.soundEffects = result.soundEffects;
            localStorage.setItem("user", JSON.stringify(user));
            if (window.parent?.setAudioVolume) window.parent.setAudioVolume(user.soundtrack);

            console.log("Configurações salvas com sucesso:", result);
        } catch (err) {
            console.error(err);
        } finally {
            removeLoading(saveSoundsButton);
        }
    });

    exitButton.addEventListener("click", () => {
        setDisabledAll(true, exitButton);
        setTimeout(() => {
            if (window.parent?.playAudio) window.parent.playAudio();
            window.location.replace("../../Pages/Hub/mainPage.html"), 150
        });
    });

    // Append elementos
    pauseContent.append(pauseTitle, resumeButton, soundSlider, musicSlider, saveSoundsButton, exitButton);
    pauseScreen.appendChild(pauseContent);
    document.body.appendChild(pauseScreen);
});