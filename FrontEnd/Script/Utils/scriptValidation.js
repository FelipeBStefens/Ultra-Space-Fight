// Function to validate the provided username;
export function validateUsername(username) {

    // Checks if the length of the username is 15 characters or less;
    if (username.length <= 15) {
        // Returns true if the username length is acceptable;
        return true;
    }
    // If the length is greater than 15;
    else {
        // Returns false indicating the username is too long;
        return false;
    }
}

// Function to validate the provided email address;
export function validateEmail(email) {

    // Checks if the email string ends specifically with "@gmail.com". NOTE: This is a very restrictive validation;
    if (email.endsWith("@gmail.com")) {
        // Returns true if the email is a "@gmail.com" address;
        return true;
    }
    // If the email does not end with "@gmail.com";
    else {
        // Returns false;
        return false;
    }
}

// Function to validate the strength and format of the provided password;
export function validatePassword(password) {

    // Uses a regular expression to test if the password contains at least one uppercase letter (A-Z);
    const HAS_UPPER = /[A-Z]/.test(password);
    // Uses a regular expression to test if the password contains at least one lowercase letter (a-z);
    const HAS_LOWER = /[a-z]/.test(password);
    // Uses a regular expression to test if the password contains at least one digit (0-9);
    const HAS_NUMBER = /\d/.test(password);
    // Checks if the password is at least 8 characters long;
    const HAS_MIN_LENGTH = password.length >= 8;

    // Checks if ALL the defined criteria (uppercase, lowercase, number, and min length) are true;
    if (HAS_UPPER && HAS_LOWER && HAS_NUMBER && HAS_MIN_LENGTH) {
        // Returns true if all criteria are met (strong enough);
        return true;
    }
    // If one or more criteria are not met;
    else {
        // Returns false;
        return false;
    }
}