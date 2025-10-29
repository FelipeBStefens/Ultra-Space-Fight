import { getUserSignin } from "../Utils/scriptFetch.js";
import { validateUsername, validateEmail, validatePassword } from "../Utils/scriptValidation.js";

function validateInputs(usernameInput, emailInput, passwordInput, button) {

    let valid = true;

    const usernameContainer = usernameInput.closest(".inputContainer");
    const usernameError = usernameContainer.querySelector(".errorMessage");
    
    if (!validateUsername(usernameInput.value)) {
        usernameContainer.classList.add("error");
        usernameError.textContent = "Username must be less than 15 characters";
        valid = false;
    } 
    else {
        usernameContainer.classList.remove("error");
        usernameError.textContent = "";
    }

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
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    usernameInput.addEventListener("input", () => validateInputs(usernameInput, emailInput, passwordInput, button));
    emailInput.addEventListener("input", () => validateInputs(usernameInput, emailInput, passwordInput, button));
    passwordInput.addEventListener("input", () => validateInputs(usernameInput, emailInput, passwordInput, button));

    button.addEventListener("click", async (event) => {
        event.preventDefault();

        if (!validateInputs(usernameInput, emailInput, passwordInput, button)) {
            alert("Invalid Values of the Forms!");
            return;
        }

        button.disabled = true;
        button.innerHTML = "Loading...";
        button.classList.add("loading");

        const usernameContainer = usernameInput.closest(".inputContainer");
        const usernameError = usernameContainer.querySelector(".errorMessage");
        const emailContainer = emailInput.closest(".inputContainer");
        const emailError = emailContainer.querySelector(".errorMessage");

        const user = await getUserSignin(usernameInput.value, emailInput.value, passwordInput.value, button, usernameContainer, usernameError, emailContainer, emailError);

        if (user != null) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    });
});