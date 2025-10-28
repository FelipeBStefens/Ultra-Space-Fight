
const CREATE_USER_URL = "http://localhost:8080/user/create";
const RANKING_SCORE = "http://localhost:8080/data/achievement/get/ranking/score";
const RANKING_SCORE_MATCH = "http://localhost:8080/data/achievement/get/ranking/score/match";

function getLoginURL(email, password) {

    const ENCODE_EMAIL = encodeURIComponent(email);
    const ENCODE_PASSWORD = encodeURIComponent(password);
    return `http://localhost:8080/user/get/login?email=${ENCODE_EMAIL}&password=${ENCODE_PASSWORD}`;
}

function getAchievementsURL(id) {
    return `http://localhost:8080/data/achievement/get/achievements/${id}`;
}

function getSpaceshipsURL(id) {
    return `http://localhost:8080/spaceship/get/spaceships/${id}`;
}

function getConfigurationsURL(id) {
    return `http://localhost:8080/configuration/get/values/${id}`;
}

function getUpdateConfigurationURL(id) {
    return `http://localhost:8080/configuration/update/values/${id}`;
}

function deleteUserURL(id) {
    return `http://localhost:8080/user/delete/${id}`;
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
                    break;
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
                    break;
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

export async function getRankingScore() {
    try {
        const response = await fetch(RANKING_SCORE);
        if (!response.ok) {
            switch (response.status) {
                case 500:
                    alert("Server error while fetching ranking score.");
                    break;
                default:
                    alert(`Unexpected error: ${response.status}`);
                    break;
            }
            return null;
        }

        return await response.json();
    } 
    catch (error) {      
        alert("Connection error while fetching ranking score.");
        return null;
    }
}

export async function getRankingScoreMatch() {
    try {
        const response = await fetch(RANKING_SCORE_MATCH);
        if (!response.ok) {
            switch (response.status) {
                case 500:
                    alert("Server error while fetching ranking score match.");
                    break;
                default:
                    alert(`Unexpected error: ${response.status}`);
                    break;
            }
            return null;
        }

        return await response.json();
    } 
    catch (error) {
        alert("Connection error while fetching ranking score match.");
        return null;
    }
}

export async function getAchievements(id) {
    try {
        const response = await fetch(getAchievementsURL(id));
        if (!response.ok) {
            switch (response.status) {
                case 401:
                    alert("Achievements ID unauthorized!");
                    break;
                case 404:
                    alert("Achievements not found!");
                    break;
                case 500:
                    alert("Server error while fetching achievements.");
                    break;
                default:
                    alert(`Unexpected error: ${response.status}`);
                    break;
            }
            return null;
        }
        
        return await response.json();
    }
    catch (error) {
        alert("Connection error while fetching achievements.");
        return null;
    }
}

export async function getSpaceships(id) {
    try {
        const response = await fetch(getSpaceshipsURL(id));
        if (!response.ok) {
            switch (response.status) {
                case 401:
                    alert("Spaceships ID unauthorized!");
                    break;
                case 404:
                    alert("Spaceships not found!");
                    break;
                case 500:
                    alert("Server error while fetching spaceships.");
                    break;
                default:
                    alert(`Unexpected error: ${response.status}`);
                    break;
            }
            return null;
        }

        return await response.json();
    } 
    catch (error) {
        alert("Connection error while fetching spaceships.");
        return null;
    }
}

export async function getConfigurations(id) {
    try {
        const response = await fetch(getConfigurationsURL(id));
        if (!response.ok) {
            switch (response.status) {
                case 401:
                    alert("Configuration ID unauthorized!");
                    break;
                case 404:
                    alert("Configuration not found!");
                    break;
                case 500:
                    alert("Server error while fetching configuration.");
                    break;
                default:
                    alert(`Unexpected error: ${response.status}`);
            }
            return null;
        }

        return await response.json();
    } 
    catch (error) {
        alert("Connection error while fetching configuration.");
        return null;
    }
}

export async function updateConfigurations(id, configurations, usernameInput, passwordInput, translation, button, inputs, buttons) {
    
    try {
    
        const response = await fetch(getUpdateConfigurationURL(id), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(configurations)
        });
    
        if (!response.ok) {

            switch (response.status) {
                case 400:
                    alert("Incorrect values on the Server!");
                    break;
                case 401:
                    alert("Incorrect values on the Server");
                    break;
                case 404:
                    alert("Server not found");
                    break;
                case 409:

                    const usernameContainer = usernameInput.closest(".inputContainer");
                    const usernameError = usernameContainer.querySelector(".errorMessage");
                    usernameContainer.classList.add("error");
                    usernameError.textContent = translation.invalidForm;

                    const passwordContainer = passwordInput.closest(".inputContainer");
                    const passwordError = passwordContainer.querySelector(".errorMessage");
                    passwordContainer.classList.add("error");
                    passwordError.textContent = translation.invalidForm; 
                    break;
                case 500:
                    alert("Server error while fetching ranking score.");
                    break;
                default:
                    alert(`Unexpected error: ${response.status}`);
                    break;
            }

            return null;
        }

    
        const user = await response.json();

        if (window.parent?.setAudioVolume) window.parent.setAudioVolume(user.soundtrack);

        return user;
    } 
    catch (error) {

        alert(translation.invalidForm);
        return null;
    } 
}

export async function deleteUser(id) {
    
    try {

        const response = await fetch(deleteUserURL(id), { 
            method: "DELETE" 
        });

        if (!response.ok) {

            switch (response.status) {
                case 400:
                    alert("Incorrect values on the Server!");
                    break;
                case 401:
                    alert("Incorrect values on the Server");
                    break;
                case 404:
                    alert("Server not found");
                    break;
                case 500:
                    alert("Server error while fetching ranking score.");
                    break;
                default:
                    alert(`Unexpected error: ${response.status}`);
                    break;
            }

            return;
        }

        localStorage.clear();
        if (window.parent?.stopAudio) window.parent.stopAudio();
        window.location.href = "../../index.html";

        return;
    }
    catch (error) {

        alert("Server or Connection Error, try again lately...");
        return;
    }
}