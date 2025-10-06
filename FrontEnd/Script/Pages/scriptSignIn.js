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
            alert("Invalid Values of the Forms!");
            return;
        }

        button.disabled = true;
        button.innerHTML = "Loading...";
        button.classList.add("loading");

        const newUser = {
            username: inputs.username.value,
            email: inputs.email.value,
            password: inputs.password.value
        };

        const usernameContainer = inputs.username.closest(".inputContainer");
        const usernameError = usernameContainer.querySelector(".error-message");

        const emailContainer = inputs.email.closest(".inputContainer");
        const emailError = emailContainer.querySelector(".error-message");

        try {
            const response = await fetch(`http://localhost:8080/user/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                
                switch (response.status) {
                    case 400: 
                        alert("Erro 400: Dados inválidos enviados ao servidor");
                        break;
                    case 409: 
                        
                        emailContainer.classList.add("error");
                        emailError.textContent = "E-Mail or Username already used!";

                        usernameContainer.classList.add("error");
                        usernameError.textContent = "E-Mail or Username already used!";
                        break;
                    default: 
                        alert(`WFT why is this error here? : ${response.status}`);
                }

                button.disabled = false;
                button.innerHTML = "Sign Up";
                button.classList.remove("loading");
            
                return; 
            }

            const data = await response.json();
            console.log(data);

            sessionStorage.setItem("user", JSON.stringify(data));

            if (window.parent?.playAudio) window.parent.playAudio();
            if (window.parent?.setAudioVolume) window.parent.setAudioVolume(data.soundtrack);
            if (window.parent?.navigateToGame) window.parent.navigateToGame("Pages/Hub/mainPage.html");
        } 
        catch (error) {
            alert("Server or Connection Error, try again lately...");
        
            button.disabled = false;
            button.innerHTML = "Sign Up";
            button.classList.remove("loading");
        } 
        finally {
            
            if (!button.disabled) {
                button.innerHTML = "Sign Up";
                button.classList.remove("loading");
            }
        }
    });
});