function handleHttpError(response, inputMap = {}) {
    if (response.ok) return null; // sem erro

    switch (response.status) {
        case 400:
            alert("Erro 400: Dados inválidos enviados ao servidor");
            break;
        case 401:
            alert("Erro 401: Não autorizado");
            break;
        case 404:
            alert("Erro 404: Recurso não encontrado");
            break;
        case 409:
            // se houver inputs mapeados, marca erro
            Object.values(inputMap).forEach(input => {
                const container = input.closest(".inputContainer");
                const errorSpan = container.querySelector(".error-message");
                container.classList.add("error");
                if (errorSpan) errorSpan.textContent = "Valor já utilizado!";
            });
            break;
        case 500:
            alert("Server error while fetching ranking score.");
            break;
        default:
            alert(`Unexpected error: ${response.status}`);
    }
    return true; // indica que houve erro
}


document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const configuration = JSON.parse(localStorage.getItem("configurations"));
    if (!user) window.location.href = "../../enter.html";

    const inputs = ["username", "password", "language", "soundtrack", "soundEffects"];
    const buttons = ["save", "logout", "delete"];

    // Inicializa valores
    document.getElementById("username").value = configuration.username;
    document.getElementById("password").value = configuration.password;
    document.getElementById("language").value = configuration.language;
    document.getElementById("soundtrack").value = user.soundtrack;
    document.getElementById("soundEffects").value = user.soundEffects;

    // Função para desativar tudo enquanto carrega
    function setDisabledAll(state = true, exceptButton = null) {
        inputs.forEach(id => document.getElementById(id).disabled = state);
        buttons.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            if (el === exceptButton && state) {
                el.classList.add("loading");
                el.disabled = false; // mantém spinner visível
            } else {
                if (state) el.classList.add("disabled-others");
                else el.classList.remove("disabled-others");
                el.disabled = state;
            }
        });
    }

    // ------------------ VALIDAÇÃO DINÂMICA (USERNAME / PASSWORD) ------------------

    const validationInputs = {
        username: document.getElementById("username"),
        password: document.getElementById("password")
    };

    // Cria mensagens de erro dinamicamente (igual ao SignIn)
    Object.values(validationInputs).forEach(input => {
        let container = input.closest(".inputContainer");
        let span = container.querySelector(".error-message");
        if (!span) {
            span = document.createElement("span");
            span.classList.add("error-message");
            container.appendChild(span);
        }
    });

    function validateConfigForm() {
        let valid = true;

        // --- USERNAME ---
        const usernameContainer = validationInputs.username.closest(".inputContainer");
        const usernameError = usernameContainer.querySelector(".error-message");

        if (validationInputs.username.value.length > 15) {
            usernameContainer.classList.add("error");
            usernameError.textContent = "Username must be less than 15 characters";
            valid = false;
        } else {
            usernameContainer.classList.remove("error");
            usernameError.textContent = "";
        }

        // --- PASSWORD ---
        const senha = validationInputs.password.value;
        const hasUpper = /[A-Z]/.test(senha);
        const hasLower = /[a-z]/.test(senha);
        const hasNumber = /\d/.test(senha);
        const hasMinLength = senha.length >= 8;

        const passwordContainer = validationInputs.password.closest(".inputContainer");
        const passwordError = passwordContainer.querySelector(".error-message");

        if (!hasUpper || !hasLower || !hasNumber || !hasMinLength) {
            passwordContainer.classList.add("error");
            passwordError.textContent =
                "Password must be at least 8 characters and contain uppercase, lowercase, and numbers";
            valid = false;
        } else {
            passwordContainer.classList.remove("error");
            passwordError.textContent = "";
        }

        // Desativa botão "Save" se inválido
        const saveButton = document.getElementById("save");
        saveButton.disabled = !valid;

        return valid;
    }

    // Validação em tempo real
    Object.values(validationInputs).forEach(input => {
        input.addEventListener("input", validateConfigForm);
    });

    // ------------------ SAVE ------------------
    const saveButton = document.getElementById("save");
    saveButton.addEventListener("click", async () => {
        if (!validateConfigForm()) {
            alert("Invalid username or password!");
            return;
        }

        setDisabledAll(true, saveButton);

        try {
            const configurations = {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                language: document.getElementById("language").value,
                soundtrack: document.getElementById("soundtrack").value,
                soundEffects: document.getElementById("soundEffects").value
            };

            const response = await fetch(`http://localhost:8080/configuration/update/values/${user.idUser}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(configurations)
            });

            if (handleHttpError(response, {
                username: document.getElementById("username"),
                password: document.getElementById("password")
            })) {
                return; // sai da função se houve erro
            }

            const result = await response.json();
            user.soundtrack = result.soundtrack;
            user.soundEffects = result.soundEffects;
            localStorage.setItem("user", JSON.stringify(user));
            if (window.parent?.setAudioVolume) window.parent.setAudioVolume(user.soundtrack);
            
            console.log("Configurações salvas com sucesso:", result);
        } 
        catch (err) {
            console.error(err);
            alert("Erro ao salvar configurações!");
        } finally {
            // Remove loading e reativa tudo
            saveButton.classList.remove("loading");
            setDisabledAll(false);
        }
    });

    // ------------------ LOGOUT ------------------
    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", () => {
        setDisabledAll(true, logoutButton);
        
        setTimeout(() => {
            localStorage.clear();
            if (window.parent?.stopAudio) window.parent.stopAudio();

            window.location.href = "../../Pages/Hub/enter.html";
        }, 500);
    });

    // ------------------ DELETE ------------------
    const deleteButton = document.getElementById("delete");
    deleteButton.addEventListener("click", async () => {
        if (!confirm("You really want to delete your Account?")) return;

        setDisabledAll(true, deleteButton);

        try {
            const response = await fetch(`http://localhost:8080/user/delete/${user.idUser}`, { method: "DELETE" });
            if (handleHttpError(response, {
                username: document.getElementById("username"),
                password: document.getElementById("password")
            })) {
                return; 
            }
            localStorage.clear();
            if (window.parent?.stopAudio) window.parent.stopAudio();
            window.location.href = "../../Pages/Hub/enter.html";
        } catch (err) {
            console.error(err);
            alert("Erro ao deletar usuário!");
        } finally {
            deleteButton.classList.remove("loading");
            setDisabledAll(false);
        }
    });
});