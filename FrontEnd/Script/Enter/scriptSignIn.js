// Imports the asynchronous function for user registration/sign-up (API call) from the scriptFetch utility file;
import { getUserSignin } from "../Utils/scriptFetch.js";
// Imports the client-side validation functions for username, email, and password;
import { validateUsername, validateEmail, validatePassword } from "../Utils/scriptValidation.js";

// Function to validate all form inputs and update the UI with error messages;
function validateInputs(usernameInput, emailInput, passwordInput, button) {

    // Flag to track the overall validity of all inputs. Starts as true;
    let valid = true;

    // Gets the main container element for the username input (for styling);
    const usernameContainer = usernameInput.closest(".inputContainer");
    // Gets the element where the username error message is displayed;
    const usernameError = usernameContainer.querySelector(".errorMessage");
    
    // Checks if the username input value is invalid based on external validation rules;
    if (!validateUsername(usernameInput.value)) {
        // Adds an error class for visual feedback;
        usernameContainer.classList.add("error");
        // Sets the specific error message;
        usernameError.textContent = "Username must be less than 15 characters";
        // Sets the overall form validity to false;
        valid = false;
    } 
    // If validation passes;
    else {
        // Removes the error class;
        usernameContainer.classList.remove("error");
        // Clears the error message;
        usernameError.textContent = "";
    }

    // Gets the main container and error display element for the email input;
    const emailContainer = emailInput.closest(".inputContainer");
    // Gets the element where the email error message is displayed;
    const emailError = emailContainer.querySelector(".errorMessage");

    // Checks if the email input value is invalid;
    if (!validateEmail(emailInput.value)) {
        // Adds an error class for visual feedback;
        emailContainer.classList.add("error");
        // Sets the specific error message;
        emailError.textContent = "This isn't an E-Mail";
        // Sets the overall form validity to false;
        valid = false;
    } 
    // If validation passes;
    else {
        // Removes the error class;
        emailContainer.classList.remove("error");
        // Clears the error message;
        emailError.textContent = "";
    }

    // Gets the main container and error display element for the password input;
    const passwordContainer = passwordInput.closest(".inputContainer");
    // Gets the element where the password error message is displayed;
    const passwordError = passwordContainer.querySelector(".errorMessage");

    // Checks if the password input value is invalid;
    if (!validatePassword(passwordInput.value)) {
        // Adds an error class for visual feedback;
        passwordContainer.classList.add("error");
        // Sets the specific error message text;
        passwordError.textContent = "password must be at least 8 characters and contain uppercase and lowercase letters, and numbers";
        // Sets the overall form validity to false;
        valid = false;
    } 
    // If validation passes;
    else {
        // Removes the error class;
        passwordContainer.classList.remove("error");
        // Clears the error message;
        passwordError.textContent = "";
    }

    // Toggles the button's disabled state based on the form's overall validity;
    button.disabled = !valid;
    // Returns the final validity status;
    return valid;
}

// Event listener that executes when the entire HTML document structure is loaded;
document.addEventListener("DOMContentLoaded", () => {
    
    // Gets a reference to the submit button;
    const button = document.getElementById("button");
    // Gets a reference to the username input field;
    const usernameInput = document.getElementById("username");
    // Gets a reference to the email input field;
    const emailInput = document.getElementById("email");
    // Gets a reference to the password input field;
    const passwordInput = document.getElementById("password");

    // Attaches an event listener to the username input for real-time validation;
    usernameInput.addEventListener("input", () => validateInputs(usernameInput, emailInput, passwordInput, button));
    // Attaches an event listener to the email input for real-time validation;
    emailInput.addEventListener("input", () => validateInputs(usernameInput, emailInput, passwordInput, button));
    // Attaches an event listener to the password input for real-time validation;
    passwordInput.addEventListener("input", () => validateInputs(usernameInput, emailInput, passwordInput, button));

    // Attaches a click event listener to the button to handle the form submission;
    button.addEventListener("click", async (event) => {
        // Prevents the default form submission behavior (page reload);
        event.preventDefault();

        // Validates inputs one last time;
        if (!validateInputs(usernameInput, emailInput, passwordInput, button)) {
            // Alerts the user and stops the submission if inputs are invalid;
            alert("Invalid Values of the Forms!");
            return;
        }

        // Disables the button to prevent multiple submissions;
        button.disabled = true;
        // Updates the button text to show a loading status;
        button.innerHTML = "Loading...";
        // Adds a class to visually indicate loading;
        button.classList.add("loading");

        // Finds the container and error elements for the username input;
        const usernameContainer = usernameInput.closest(".inputContainer");
        const usernameError = usernameContainer.querySelector(".errorMessage");
        // Finds the container and error elements for the email input;
        const emailContainer = emailInput.closest(".inputContainer");
        const emailError = emailContainer.querySelector(".errorMessage");

        // Calls the asynchronous sign-up function, passing input values and UI elements for server-side error handling;
        const user = await getUserSignin(usernameInput.value, emailInput.value, passwordInput.value, button, usernameContainer, usernameError, emailContainer, emailError);

        // Checks if the sign-up was successful (user object returned);
        if (user != null) {
            // Stores the successful user data in Local Storage for session management;
            localStorage.setItem("user", JSON.stringify(user));
        }
    });
});