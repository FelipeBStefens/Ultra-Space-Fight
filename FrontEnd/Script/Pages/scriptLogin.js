document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("button");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Cria spans de erro dinamicamente
    [emailInput, passwordInput].forEach(input => {
        const container = input.closest(".inputContainer");
        let span = container.querySelector(".error-message");
        if (!span) {
            span = document.createElement("span");
            span.classList.add("error-message");
            container.appendChild(span);
        }
    });

    // Função de validação
    function validateForm() {
        let valid = true;

        // --- Email ---
        const emailContainer = emailInput.closest(".inputContainer");
        const emailError = emailContainer.querySelector(".error-message");
        if (!emailInput.value.endsWith("@gmail.com")) {
            emailContainer.classList.add("error");
            emailError.textContent = "This isn't an E-Mail";
            valid = false;
        } else {
            emailContainer.classList.remove("error");
            emailError.textContent = "";
        }

        // --- Senha ---
        const senha = passwordInput.value;
        const hasUpper = /[A-Z]/.test(senha);
        const hasLower = /[a-z]/.test(senha);
        const hasNumber = /\d/.test(senha);
        const hasMinLength = senha.length >= 8;

        const passwordContainer = passwordInput.closest(".inputContainer");
        const passwordError = passwordContainer.querySelector(".error-message");

        if (!hasUpper || !hasLower || !hasNumber || !hasMinLength) {
            passwordContainer.classList.add("error");
            passwordError.textContent = "password must be at least 8 characters and contain uppercase and lowercase letters, and numbers";
            valid = false;
        } else {
            passwordContainer.classList.remove("error");
            passwordError.textContent = "";
        }

        // Controla botão
        button.disabled = !valid;
        return valid;
    }

    // Validação em tempo real
    emailInput.addEventListener("input", validateForm);
    passwordInput.addEventListener("input", validateForm);

    button.addEventListener("click", async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        
        // --- Estado de loading no próprio botão ---
        button.disabled = true;
        button.textContent = "Loading...";
        button.classList.add("loading");

        try {
            const response = await fetch(`http://localhost:8080/user/get/login?email=${encodeURIComponent(emailInput.value)}&password=${encodeURIComponent(passwordInput.value)}`);
            if (!response.ok) throw new Error("Erro no servidor");

            const data = await response.json();
            if (!data || Object.keys(data).length === 0) throw new Error("Usuário ou senha inválidos");

            sessionStorage.setItem("user", JSON.stringify(data));
            
            if (window.parent && window.parent.playAudio) {
                console.log("Tentando chamar playAudio() no elemento pai..."); // <-- ADICIONE ESTA LINHA
                window.parent.playAudio();
            } else {
                console.error("ERRO GRAVE: window.parent.playAudio não existe. iFrame ou função não está carregada no Pai."); // <-- ADICIONE ESTA LINHA
            }

            // NOVO CÓDIGO AQUI: Chama a função do PAI para redirecionar o iframe
            if (window.parent && window.parent.navigateToGame) {
                window.parent.navigateToGame("Pages/Hub/mainPage.html");
            }
        } 
        catch (error) {
            console.error(error);

            // Volta botão ao normal
            button.disabled = false;
            button.textContent = "LOG IN";
            button.classList.remove("loading");
        }
    });
});
