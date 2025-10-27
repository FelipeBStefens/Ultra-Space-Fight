
const CREATE_USER_URL = `http://localhost:8080/user/create`;

function getLoginURL(email, password) {

    const ENCODE_EMAIL = encodeURIComponent(email);
    const ENCODE_PASSWORD = encodeURIComponent(password);
    return `http://localhost:8080/user/get/login?email=${ENCODE_EMAIL}&password=${ENCODE_PASSWORD}`;
}

export async function getUserSignin(username, email, password, button, usernameContainer, usernameError, emailContainer, emailError) {
    
    const USER = {
        username: username,
        email: email,
        password: password
    };

    try {

        const response = await fetch(CREATE_USER_URL , {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(USER)
        });

        if (!response.ok) {

            switch (response.status) {
                case 400: 
                    alert("Incorrect values on the Server!");
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
            return null;
        }

        const user = await response.json();
        
        if (window.parent?.playAudio) window.parent.playAudio();
        if (window.parent?.setAudioVolume) window.parent.setAudioVolume(user.soundtrack);
        if (window.parent?.navigateToGame) window.parent.navigateToGame("Pages/Hub/mainPage.html");
        
        return user;
    }
    catch(error) {
        alert("Server or Connection Error, try again lately...");
        return null;
    }
    finally {
        button.disabled = false;
        button.innerHTML = "Sign Up";
        button.classList.remove("loading");
    }
}

export async function getUserLogin(email, password, button, emailContainer, emailError, passwordContainer, passwordError) {
    
    try {

        const response = await fetch(getLoginURL(email, password));

        if(!response.ok) {

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
            return null; 
        }

        const user = await response.json();
        
        if (window.parent?.playAudio) window.parent.playAudio();
        if (window.parent?.setAudioVolume) window.parent.setAudioVolume(user.soundtrack);
        if (window.parent?.navigateToGame) window.parent.navigateToGame("Pages/Hub/mainPage.html");
        
        return user;
    }
    catch(error) {
        alert("Server or Connection Error, try again lately...");
        return null;
    }
    finally {
        button.disabled = false;
        button.textContent = "LOG IN";
        button.classList.remove("loading");
    }
}