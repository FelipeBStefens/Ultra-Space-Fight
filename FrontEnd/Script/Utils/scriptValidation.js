
export function validateUsername(username) {


    if (username.length <= 15) {

        return true;
    }

    else {

        return false;
    }
}


export function validateEmail(email) {


    if (email.endsWith("@gmail.com")) {

        return true;
    }

    else {

        return false;
    }
}


export function validatePassword(password) {


    const HAS_UPPER = /[A-Z]/.test(password);

    const HAS_LOWER = /[a-z]/.test(password);

    const HAS_NUMBER = /\d/.test(password);

    const HAS_MIN_LENGTH = password.length >= 8;


    if (HAS_UPPER && HAS_LOWER && HAS_NUMBER && HAS_MIN_LENGTH) {

        return true;
    }

    else {

        return false;
    }
}