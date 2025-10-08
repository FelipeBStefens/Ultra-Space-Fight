document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("button");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

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
        if (!validateForm()) {
            alert("Invalid Values of the Forms!");
            return;
        }

        button.disabled = true;
        button.textContent = "Loading...";
        button.classList.add("loading");

        const emailContainer = emailInput.closest(".inputContainer");
        const passwordContainer = passwordInput.closest(".inputContainer");
        const emailError = emailContainer.querySelector(".error-message");
        const passwordError = passwordContainer.querySelector(".error-message");

        try {
            const response = await fetch(`http://localhost:8080/user/get/login?email=${encodeURIComponent(emailInput.value)}&password=${encodeURIComponent(passwordInput.value)}`);

            if (!response.ok) {
                
                switch (response.status) {
                    case 401: 
                        alert("Incorrect values on the Server!");
                        break;
                    case 404: 
                        passwordContainer.classList.add("error");
                        passwordError.textContent = "User not found!";
                        emailContainer.classList.add("error");
                        emailError.textContent = "User not found!";
                        break;
                    case 500:
                        alert("Server Error, try again lately...");
                        break;
                    default: 
                        alert(`WFT why is this error here? : ${response.status}`);
                }
                return; 
            }

            const data = await response.json();
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data));

            if (window.parent?.playAudio) window.parent.playAudio();
            if (window.parent?.setAudioVolume) window.parent.setAudioVolume(data.soundtrack);
            if (window.parent?.navigateToGame) window.parent.navigateToGame("Pages/Hub/mainPage.html");

        } 
        catch (error) {
            alert("Server or Connection Error, try again lately...");
        } 
        finally {
            button.disabled = false;
            button.textContent = "LOG IN";
            button.classList.remove("loading");
        }
    });
});