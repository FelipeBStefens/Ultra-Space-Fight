document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("button");

    const inputs = {
        username: document.getElementById("username"),
        email: document.getElementById("email"),
        password: document.getElementById("password")
    };

    // Cria mensagens de erro dinamicamente
    Object.values(inputs).forEach(input => {
        let container = input.closest(".inputContainer");
        let span = container.querySelector(".error-message");
        if (!span) {
            span = document.createElement("span");
            span.classList.add("error-message");
            container.appendChild(span);
        }
    });

    // Validação completa
    function validateForm() {
        let valid = true;

        // --- USERNAME ---
        const usernameContainer = inputs.username.closest(".inputContainer");
        const usernameError = usernameContainer.querySelector(".error-message");
        if (inputs.username.value.length > 15) {
            usernameContainer.classList.add("error");
            usernameError.textContent = "Username must be less than 15 characters";
            valid = false;
        } else {
            usernameContainer.classList.remove("error");
            usernameError.textContent = "";
        }

        // --- EMAIL ---
        const emailContainer = inputs.email.closest(".inputContainer");
        const emailError = emailContainer.querySelector(".error-message");
        if (!inputs.email.value.endsWith("@gmail.com")) {
            emailContainer.classList.add("error");
            emailError.textContent = "This isn't an E-Mail";
            valid = false;
        } else {
            emailContainer.classList.remove("error");
            emailError.textContent = "";
        }

        // --- PASSWORD ---
        const senha = inputs.password.value;
        const hasUpper = /[A-Z]/.test(senha);
        const hasLower = /[a-z]/.test(senha);
        const hasNumber = /\d/.test(senha);
        const hasMinLength = senha.length >= 8;

        const passwordContainer = inputs.password.closest(".inputContainer");
        const passwordError = passwordContainer.querySelector(".error-message");

        if (!hasUpper || !hasLower || !hasNumber || !hasMinLength) {
            passwordContainer.classList.add("error");
            passwordError.textContent =
                "password must be at least 8 characters and contain uppercase and lowercase letters, and numbers";
            valid = false;
        } else {
            passwordContainer.classList.remove("error");
            passwordError.textContent = "";
        }

        // --- Botão de envio ---
        button.disabled = !valid;
        return valid;
    }

    // Validação em tempo real
    Object.values(inputs).forEach(input => {
        input.addEventListener("input", validateForm);
    });

    button.addEventListener("click", async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            console.warn("Formulário inválido. Corrija os campos destacados.");
            return;
        }

        // Desativa o botão e mostra estado de carregamento
        button.disabled = true;
        button.innerHTML = "Loading..."; // ou "Enviando..."
        button.classList.add("loading");

        const newUser = {
            username: inputs.username.value,
            email: inputs.email.value,
            password: inputs.password.value
        };

        try {
            const response = await fetch(`http://localhost:8080/user/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                throw new Error("Erro no servidor: " + response.status);
            }

            const data = await response.json();
            console.log(data);

            sessionStorage.setItem("user", JSON.stringify(data));
            window.location.replace("../../Pages/Hub/mainPage.html");

        } catch (error) {
            console.error("Erro ao criar usuário:", error);

            // Reativa o botão e mostra erro
            button.disabled = false;
            button.innerHTML = "Tentar novamente";
            button.classList.remove("loading");
        }
    });
});