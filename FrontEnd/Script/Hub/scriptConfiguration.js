import { validateUsername, validatePassword } from "../Utils/scriptValidation.js";
import getTranslation from "../Utils/scriptTranslation.js";
import { updateConfigurations, deleteUser  } from "../Utils/scriptFetch.js";

function applyTranslation(translation) {

    document.getElementById("titleText").textContent = translation.title;
    document.getElementById("usernameText").textContent = translation.username;
    document.getElementById("passwordText").textContent = translation.password;
    document.getElementById("languageText").textContent = translation.language;
    document.getElementById("portugueseText").textContent = translation.portuguese;
    document.getElementById("englishText").textContent = translation.english;

    document.getElementById("soundtrackText").innerHTML = `
        <img src="../../Assets/Icons/Volume.png" alt="volume" class="icon">
        ${translation.soundtrack}
    `;

    document.getElementById("soundEffectText").innerHTML = `
        <img src="../../Assets/Icons/Volume.png" alt="volume" class="icon">
        ${translation.soundEffects}
    `;

    document.getElementById("save").textContent = translation.save;
    document.getElementById("logout").textContent = translation.logout;
    document.getElementById("delete").textContent = translation.delete;
}

function setDisabledAll(state = true, exceptButton = null, inputs, buttons) {
        
    inputs.forEach(id => document.getElementById(id).disabled = state);
        
    buttons.forEach(id => {
            
        const element = document.getElementById(id);
            
        if (!element) {
            return;
        }

        if (element === exceptButton && state) {

            element.classList.add("loading");
            element.disabled = false; 
        } 
        else {

            if (state) {
                element.classList.add("disabledOthers");
            }
            else {
                element.classList.remove("disabledOthers");
            }
            element.disabled = state;
        }
    });
}

function validateInputs(usernameInput, passwordInput, translation, button) {
        
    let valid = true;

    const usernameContainer = usernameInput.closest(".inputContainer");
    const usernameError = usernameContainer.querySelector(".errorMessage");

    if (!validateUsername(usernameInput.value)) {
        
        usernameContainer.classList.add("error");
        usernameError.textContent = translation.errors.usernameTooLong;
        valid = false;
    } 
    else {
        
        usernameContainer.classList.remove("error");
        usernameError.textContent = "";
    }

    const passwordContainer = passwordInput.closest(".inputContainer");
    const passwordError = passwordContainer.querySelector(".errorMessage");

    if (!validatePassword(passwordInput.value)) {

        passwordContainer.classList.add("error");
        passwordError.textContent = translation.errors.passwordInvalid;
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
    
    const configuration = JSON.parse(localStorage.getItem("configurations"));
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "../../index.html";
    }

    const translation = getTranslation(user?.language);
    applyTranslation(translation);

    const inputs = ["username", "password", "language", "soundtrack", "soundEffects"];
    const buttons = ["save", "logout", "delete"];

    document.getElementById("username").value = configuration.username;
    document.getElementById("password").value = configuration.password;
    document.getElementById("language").value = configuration.language;
    document.getElementById("soundtrack").value = user.soundtrack;
    document.getElementById("soundEffects").value = user.soundEffects;

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    
    const saveButton = document.getElementById("save");
    const logoutButton = document.getElementById("logout");
    const deleteButton = document.getElementById("delete");

    usernameInput.addEventListener("input", () => validateInputs(usernameInput, passwordInput, translation, saveButton));
    passwordInput.addEventListener("input", () => validateInputs(usernameInput, passwordInput, translation, saveButton));

    saveButton.addEventListener("click", async () => {
        
        if (!validateInputs(usernameInput, passwordInput, translation, saveButton)) {
            
            alert("Invalid username or password!");
            return;
        }

        setDisabledAll(true, saveButton, inputs, buttons);

        const configurations = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            language: document.getElementById("language").value,
            soundtrack: document.getElementById("soundtrack").value,
            soundEffects: document.getElementById("soundEffects").value
        };

        const newUser = await updateConfigurations(user.idUser, configurations, usernameInput, passwordInput, translation, saveButton, inputs, buttons);

        saveButton.classList.remove("loading");
        setDisabledAll(false, null, inputs, buttons);

        user.soundtrack = newUser.soundtrack;
        user.soundEffects = newUser.soundEffects;
        user.language = document.getElementById("language").value;

        localStorage.setItem("user", JSON.stringify(user));
            
        const newTranslation = getTranslation(user?.language);
        applyTranslation(newTranslation);
    });

    logoutButton.addEventListener("click", () => {
        
        setDisabledAll(true, logoutButton, inputs, buttons);
        
        localStorage.clear();
        if (window.parent?.stopAudio) window.parent.stopAudio();
        window.location.href = "../../index.html";
    });
    
    deleteButton.addEventListener("click", async () => {
        
        if (!confirm(translation.confirmDelete)) {
            return;
        }

        setDisabledAll(true, deleteButton, inputs, buttons);

        await deleteUser(user.idUser);

        deleteButton.classList.remove("loading");
        setDisabledAll(false, null, inputs, buttons);
    });
});