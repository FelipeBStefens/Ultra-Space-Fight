// Imports validation functions for username and password;
import { validateUsername, validatePassword } from "../Utils/scriptValidation.js";
// Imports the function for fetching translated strings;
import getTranslation from "../Utils/scriptTranslation.js";
// Imports asynchronous functions for updating configurations and deleting the user account;
import { updateConfigurations, deleteUser  } from "../Utils/scriptFetch.js";

// Function responsible for updating all static text elements on the page with translations;
function applyTranslation(translation) {

    // Sets the text content for the main title;
    document.getElementById("titleText").textContent = translation.title;
    // Sets the text content for the username label;
    document.getElementById("usernameText").textContent = translation.username;
    // Sets the text content for the password label;
    document.getElementById("passwordText").textContent = translation.password;
    // Sets the text content for the language selection label;
    document.getElementById("languageText").textContent = translation.language;
    // Sets the text content for the Portuguese language option;
    document.getElementById("portugueseText").textContent = translation.portuguese;
    // Sets the text content for the English language option;
    document.getElementById("englishText").textContent = translation.english;

    // Sets the text content and includes an icon for the soundtrack volume label;
    document.getElementById("soundtrackText").innerHTML = `
        <img src="../../Assets/Icons/Volume.png" alt="volume" class="icon">
        ${translation.soundtrack}
    `;

    // Sets the text content and includes an icon for the sound effects volume label;
    document.getElementById("soundEffectText").innerHTML = `
        <img src="../../Assets/Icons/Volume.png" alt="volume" class="icon">
        ${translation.soundEffects}
    `;

    // Sets the text content for the Save button;
    document.getElementById("save").textContent = translation.save;
    // Sets the text content for the Logout button;
    document.getElementById("logout").textContent = translation.logout;
    // Sets the text content for the Delete button;
    document.getElementById("delete").textContent = translation.delete;
}

// Function to control the disabled state and loading/dimming visual state of inputs and buttons;
function setDisabledAll(state = true, exceptButton = null, inputs, buttons) {
        
    // Iterates through input IDs and sets their disabled state;
    inputs.forEach(id => document.getElementById(id).disabled = state);
        
    // Iterates through button IDs;
    buttons.forEach(id => {
            
        const element = document.getElementById(id);
            
        // Skips if the element does not exist;
        if (!element) {
            return;
        }

        // Checks if the current button is the one that should remain enabled and show loading state;
        if (element === exceptButton && state) {

            // Adds 'loading' class;
            element.classList.add("loading");
            // Keeps the button enabled;
            element.disabled = false; 
        } 
        // Handles all other buttons or the state reset;
        else {

            // Applies the 'disabledOthers' visual class if the general state is 'disabled' (true);
            if (state) {
                element.classList.add("disabledOthers");
            }
            // Removes the 'disabledOthers' class if resetting the state;
            else {
                element.classList.remove("disabledOthers");
            }
            // Sets the disabled property based on the 'state' argument;
            element.disabled = state;
        }
    });
}

// Function to validate username and password inputs and handle UI error feedback;
function validateInputs(usernameInput, passwordInput, translation, button) {
        
    // Flag for overall input validity;
    let valid = true;

    // Gets the container and error elements for the username input;
    const usernameContainer = usernameInput.closest(".inputContainer");
    const usernameError = usernameContainer.querySelector(".errorMessage");

    // Validates username length;
    if (!validateUsername(usernameInput.value)) {
        
        // Displays username error;
        usernameContainer.classList.add("error");
        usernameError.textContent = translation.errors.usernameTooLong;
        valid = false;
    } 
    // If validation passes;
    else {
        
        // Clears username error;
        usernameContainer.classList.remove("error");
        usernameError.textContent = "";
    }

    // Gets the container and error elements for the password input;
    const passwordContainer = passwordInput.closest(".inputContainer");
    const passwordError = passwordContainer.querySelector(".errorMessage");

    // Validates password strength;
    if (!validatePassword(passwordInput.value)) {

        // Displays password error;
        passwordContainer.classList.add("error");
        passwordError.textContent = translation.errors.passwordInvalid;
        valid = false;
    } 
    // If validation passes;
    else {

        // Clears password error;
        passwordContainer.classList.remove("error");
        passwordError.textContent = "";
    }

    // Disables the save button if inputs are invalid;
    button.disabled = !valid;
    // Returns overall validity status;
    return valid;
}

// Executes code once the entire DOM is loaded;
document.addEventListener("DOMContentLoaded", () => {
    
    // Loads the stored configurations and user data from Local Storage;
    const configuration = JSON.parse(localStorage.getItem("configurations"));
    const user = JSON.parse(localStorage.getItem("user"));
    // Redirects if the user is not logged in;
    if (!user) {
        window.location.href = "../../index.html";
    }

    // Loads translations based on the user's language preference;
    const translation = getTranslation(user?.language);
    // Applies translations to the UI;
    applyTranslation(translation);

    // Arrays containing the IDs of all controllable inputs and buttons;
    const inputs = ["username", "password", "language", "soundtrack", "soundEffects"];
    const buttons = ["save", "logout", "delete"];

    // Populates input fields with current configuration and user data;
    document.getElementById("username").value = configuration.username;
    document.getElementById("password").value = configuration.password;
    document.getElementById("language").value = configuration.language;
    document.getElementById("soundtrack").value = user.soundtrack;
    document.getElementById("soundEffects").value = user.soundEffects;

    // Gets references to frequently used elements;
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const saveButton = document.getElementById("save");
    const logoutButton = document.getElementById("logout");
    const deleteButton = document.getElementById("delete");

    // Attaches event listeners for real-time input validation on username and password;
    usernameInput.addEventListener("input", () => validateInputs(usernameInput, passwordInput, translation, saveButton));
    passwordInput.addEventListener("input", () => validateInputs(usernameInput, passwordInput, translation, saveButton));

    // Handles the Save button click event;
    saveButton.addEventListener("click", async () => {
        
        // Performs final validation check before submission;
        if (!validateInputs(usernameInput, passwordInput, translation, saveButton)) {
            
            alert("Invalid username or password!");
            return;
        }

        // Disables all other elements and enables the Save button in a loading state;
        setDisabledAll(true, saveButton, inputs, buttons);

        // Compiles the new configuration data from input values;
        const configurations = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            language: document.getElementById("language").value,
            soundtrack: document.getElementById("soundtrack").value,
            soundEffects: document.getElementById("soundEffects").value
        };

        // Calls the API to update the configurations and gets the updated user object;
        const newUser = await updateConfigurations(user.idUser, configurations, usernameInput, passwordInput, translation, saveButton, inputs, buttons);

        // Removes the loading state from the Save button;
        saveButton.classList.remove("loading");
        // Re-enables all inputs and buttons;
        setDisabledAll(false, null, inputs, buttons);

        // Updates local user data with the new settings returned from the server;
        user.soundtrack = newUser.soundtrack;
        user.soundEffects = newUser.soundEffects;
        user.language = document.getElementById("language").value;

        // Saves the updated user object back to Local Storage;
        localStorage.setItem("user", JSON.stringify(user));
            
        // Re-fetches and re-applies translations if the language was changed;
        const newTranslation = getTranslation(user?.language);
        applyTranslation(newTranslation);
    });

    // Handles the Logout button click event;
    logoutButton.addEventListener("click", () => {
        
        // Disables all elements and sets the Logout button to loading state;
        setDisabledAll(true, logoutButton, inputs, buttons);
        
        // Clears all data from Local Storage (ending the session);
        localStorage.clear();
        // Stops background audio if the function exists in the parent frame;
        if (window.parent?.stopAudio) window.parent.stopAudio();
        // Redirects to the login page;
        window.location.href = "../../index.html";
    });
    
    // Handles the Delete button click event;
    deleteButton.addEventListener("click", async () => {
        
        // Shows a confirmation dialog using a translated string;
        if (!confirm(translation.confirmDelete)) {
            // Stops the process if the user cancels;
            return;
        }

        // Disables all elements and sets the Delete button to loading state;
        setDisabledAll(true, deleteButton, inputs, buttons);

        // Calls the API to permanently delete the user account;
        await deleteUser(user.idUser);

        // Removes loading state and re-enables all elements (though a redirect would typically follow a successful delete);
        deleteButton.classList.remove("loading");
        setDisabledAll(false, null, inputs, buttons);
    });
});