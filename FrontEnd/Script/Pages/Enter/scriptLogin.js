import { getUserLogin } from "../../Utils/scriptFetch.js";
import { validateEmail, validatePassword } from "../../Utils/scriptValidation.js";

function validateInputs(emailInput, passwordInput, button) {
    
    let valid = true;

    const emailContainer = emailInput.closest(".inputContainer");
    const emailError = emailContainer.querySelector(".errorMessage");
    
    if (!validateEmail(emailInput.value)) {
        emailContainer.classList.add("error");
        emailError.textContent = "This isn't an E-Mail";
        valid = false;
    } 
    else {
        emailContainer.classList.remove("error");
        emailError.textContent = "";
    }

    const passwordContainer = passwordInput.closest(".inputContainer");
    const passwordError = passwordContainer.querySelector(".errorMessage");

    if (!validatePassword(passwordInput.value)) {
        passwordContainer.classList.add("error");
        passwordError.textContent = "password must be at least 8 characters and contain uppercase and lowercase letters, and numbers";
        valid = false;
    } 
    else {
        passwordContainer.classList.remove("error");
        passwordError.textContent = "";
    }

    button.disabled = !valid;
    return valid;
}

document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("button");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    emailInput.addEventListener("input", () => validateInputs(emailInput, passwordInput, button));
    passwordInput.addEventListener("input", () => validateInputs(emailInput, passwordInput, button));

    button.addEventListener("click", async (event) => {
        
        event.preventDefault();
        if (!validateInputs(emailInput, passwordInput, button)) {
            alert("Invalid Values of the Forms!");
            return;
        }

        button.disabled = true;
        button.textContent = "Loading...";
        button.classList.add("loading");

        const emailContainer = emailInput.closest(".inputContainer");
        const passwordContainer = passwordInput.closest(".inputContainer");
        const emailError = emailContainer.querySelector(".errorMessage");
        const passwordError = passwordContainer.querySelector(".errorMessage");

        const user = await getUserLogin(emailInput.value, passwordInput.value, button, emailContainer, emailError, passwordContainer, passwordError);
        
        if (user != null) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    });
});