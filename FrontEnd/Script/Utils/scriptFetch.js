// Constant defining the API endpoint for creating a new user;
const CREATE_USER_URL = "https://ultra-space-fight.onrender.com/user/create";
// Constant defining the API endpoint to get the global score ranking data;
const RANKING_SCORE = "https://ultra-space-fight.onrender.com/data/achievement/get/ranking/score";
// Constant defining the API endpoint to get the match score ranking data;
const RANKING_SCORE_MATCH = "https://ultra-space-fight.onrender.com/data/achievement/get/ranking/score/match";

// Function that constructs the login URL using email and password as query parameters;
function getLoginURL(email, password) {

    // Encodes the email for safe use in a URL query string;
    const ENCODE_EMAIL = encodeURIComponent(email);
    // Encodes the password for safe use in a URL query string;
    const ENCODE_PASSWORD = encodeURIComponent(password);
    // Returns the complete login URL with encoded parameters;
    return `https://ultra-space-fight.onrender.com/user/get/login?email=${ENCODE_EMAIL}&password=${ENCODE_PASSWORD}`;
}

// Function that constructs the URL to fetch a user's achievements by their ID;
function getAchievementsURL(id) {
    return `https://ultra-space-fight.onrender.com/data/achievement/get/achievements/${id}`;
}

// Function that constructs the URL to fetch a user's spaceships by their ID;
function getSpaceshipsURL(id) {
    return `https://ultra-space-fight.onrender.com/spaceship/get/spaceships/${id}`;
}

// Function that constructs the URL to fetch a user's configuration settings by their ID;
function getConfigurationsURL(id) {
    return `https://ultra-space-fight.onrender.com/configuration/get/values/${id}`;
}

// Function that constructs the URL to update a user's configuration settings by their ID;
function getUpdateConfigurationURL(id) {
    return `https://ultra-space-fight.onrender.com/configuration/update/values/${id}`;
}

// Function that constructs the URL to delete a user account by their ID;
function deleteUserURL(id) {
    return `https://ultra-space-fight.onrender.com/user/delete/${id}`;
}

// Function that constructs the URL to update a specific spaceship's properties for a user;
function updateSpaceshipURL(id, spaceship) {
    return `https://ultra-space-fight.onrender.com/spaceship/update/${spaceship}/${id}`;
}

// Function that constructs the URL to set a user's currently selected spaceship;
function updateSelectedSpaceshipURL(id) {
    return `https://ultra-space-fight.onrender.com/spaceship/update/selected/spaceship/${id}`;
}

// Function that constructs the URL to update a user's sound/audio settings;
function updateSoundsURL(id) {
    return `https://ultra-space-fight.onrender.com/configuration/update/sound/${id}`;
}

// Function that constructs the URL to update a user's achievement cash/currency;
function updateAchievementsCashURL(id) {
    return `https://ultra-space-fight.onrender.com/data/achievement/update/achievements/cash/${id}`;
}

// Asynchronous function to handle user sign-up/creation;
export async function getUserSignin(username, email, password, button, usernameContainer, usernameError, emailContainer, emailError) {
    
    // Creates a user object payload for the POST request;
    const USER = {
        username: username,
        email: email,
        password: password
    };

    // Starts a try block to handle potential network or server errors;
    try {

        // Sends a POST request to the CREATE_USER_URL with user data in JSON format;
        const response = await fetch(CREATE_USER_URL , {
            // Specifies the HTTP method as POST;
            method: "POST",
            // Sets the content type to JSON;
            headers: { "Content-Type": "application/json" },
            // Converts the user object to a JSON string for the request body;
            body: JSON.stringify(USER)
        });

        // Checks if the HTTP response status indicates an error (not OK, i.e., status >= 400);
        if (!response.ok) {

            // Handles different HTTP error status codes;
            switch (response.status) {
                // Bad Request - usually indicates invalid input format;
                case 400: 
                    alert("Incorrect values on the Server!");
                    break;
                // Conflict - typically used when a resource (like a username or email) already exists;
                case 409: 
                    // Adds an error class to the email container for visual feedback;
                    emailContainer.classList.add("error");
                    // Sets the email error message;
                    emailError.textContent = "E-Mail or Username already used!";

                    // Adds an error class to the username container;
                    usernameContainer.classList.add("error");
                    // Sets the username error message;
                    usernameError.textContent = "E-Mail or Username already used!";
                    break;
                // Default case for unexpected server errors;
                default: 
                    alert(`WFT why is this error here? : ${response.status}`);
                    break;
            }       
            // Returns null on error;
            return null;
        }

        // Parses the successful JSON response body into a user object;
        const user = await response.json();
        
        // Checks if the parent window has the 'playAudio' function and calls it;
        if (window.parent?.playAudio) window.parent.playAudio();
        // Checks for 'setAudioVolume' and calls it using the user's soundtrack setting;
        if (window.parent?.setAudioVolume) window.parent.setAudioVolume(user.soundtrack);
        // Checks for 'navigateToGame' and directs to the main game hub;
        if (window.parent?.navigateToGame) window.parent.navigateToGame("Pages/Hub/mainPage.html");
        
        // Returns the successful user object;
        return user;
    }
    // Catches network or other connection-related errors;
    catch(error) {
        // Alerts the user about a connection problem;
        alert("Server or Connection Error, try again lately...");
        // Returns null on error;
        return null;
    }
    // Code block that executes regardless of success or failure in the try/catch block;
    finally {
        // Re-enables the sign-up button;
        button.disabled = false;
        // Resets the button text;
        button.innerHTML = "Sign Up";
        // Removes the loading class;
        button.classList.remove("loading");
    }
}

// Asynchronous function to handle user login;
export async function getUserLogin(email, password, button, emailContainer, emailError, passwordContainer, passwordError) {
    
    // Starts a try block to handle potential network or server errors;
    try {

        // Fetches the login URL, which includes email and password in query parameters;
        const response = await fetch(getLoginURL(email, password));

        // Checks if the HTTP response status indicates an error;
        if(!response.ok) {

            // Handles different HTTP error status codes;
            switch (response.status) {
                // Unauthorized - typically means authentication failed (wrong password/credentials);
                case 401: 
                    alert("Incorrect values on the Server!");
                    break;
                // Not Found - typically means the user email does not exist;
                case 404: 
                    // Adds an error class to the password container and sets the message;
                    passwordContainer.classList.add("error");
                    passwordError.textContent = "User not found!";
                    // Adds an error class to the email container and sets the message;
                    emailContainer.classList.add("error");
                    emailError.textContent = "User not found!";
                    break;
                // Internal Server Error;
                case 500:
                    alert("Server Error, try again lately...");
                    break;
                // Default case for unexpected server errors;
                default: 
                    alert(`WFT why is this error here? : ${response.status}`);
                    break;
            }
            // Returns null on error;
            return null; 
        }

        // Parses the successful JSON response body into a user object;
        const user = await response.json();
        
        // Checks if parent window functions exist and calls them to start music and navigate to the game hub;
        if (window.parent?.playAudio) window.parent.playAudio();
        if (window.parent?.setAudioVolume) window.parent.setAudioVolume(user.soundtrack);
        if (window.parent?.navigateToGame) window.parent.navigateToGame("Pages/Hub/mainPage.html");
        
        // Returns the successful user object;
        return user;
    }
    // Catches network or other connection-related errors;
    catch(error) {
        // Alerts the user about a connection problem;
        alert("Server or Connection Error, try again lately...");
        // Returns null on error;
        return null;
    }
    // Code block that executes regardless of success or failure;
    finally {
        // Re-enables the login button;
        button.disabled = false;
        // Resets the button text;
        button.textContent = "LOG IN";
        // Removes the loading class;
        button.classList.remove("loading");
    }
}

// Asynchronous function to fetch the global score ranking;
export async function getRankingScore() {
    // Starts a try block;
    try {
        // Fetches the global ranking score from the constant URL;
        const response = await fetch(RANKING_SCORE);
        // Checks for error status;
        if (!response.ok) {
            // Handles different error status codes;
            switch (response.status) {
                case 500:
                    alert("Server error while fetching ranking score.");
                    break;
                default:
                    alert(`Unexpected error: ${response.status}`);
                    break;
            }
            // Returns null on error;
            return null;
        }

        // Returns the parsed JSON response (the ranking data);
        return await response.json();
    } 
    // Catches network error;
    catch (error) {        
        alert("Connection error while fetching ranking score.");
        return null;
    }
}

// Asynchronous function to fetch the match score ranking;
export async function getRankingScoreMatch() {
    // Starts a try block;
    try {
        // Fetches the match score ranking from the constant URL;
        const response = await fetch(RANKING_SCORE_MATCH);
        // Checks for error status;
        if (!response.ok) {
            // Handles different error status codes;
            switch (response.status) {
                case 500:
                    alert("Server error while fetching ranking score match.");
                    break;
                default:
                    alert(`Unexpected error: ${response.status}`);
                    break;
            }
            // Returns null on error;
            return null;
        }

        // Returns the parsed JSON response (the match ranking data);
        return await response.json();
    } 
    // Catches network error;
    catch (error) {
        alert("Connection error while fetching ranking score match.");
        return null;
    }
}

// Asynchronous function to fetch a user's achievements by ID;
export async function getAchievements(id) {
    // Starts a try block;
    try {
        // Fetches achievements using the constructed URL;
        const response = await fetch(getAchievementsURL(id));
        // Checks for error status;
        if (!response.ok) {
            // Handles different error status codes;
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
            // Returns null on error;
            return null;
        }
        
        // Returns the parsed JSON response (the achievements data);
        return await response.json();
    }
    // Catches network error;
    catch (error) {
        alert("Connection error while fetching achievements.");
        return null;
    }
}

// Asynchronous function to fetch a user's spaceships by ID;
export async function getSpaceships(id) {
    // Starts a try block;
    try {
        // Fetches spaceships using the constructed URL;
        const response = await fetch(getSpaceshipsURL(id));
        // Checks for error status;
        if (!response.ok) {
            // Handles different error status codes;
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
            // Returns null on error;
            return null;
        }

        // Returns the parsed JSON response (the spaceships data);
        return await response.json();
    } 
    // Catches network error;
    catch (error) {
        alert("Connection error while fetching spaceships.");
        return null;
    }
}

// Asynchronous function to fetch a user's configurations by ID;
export async function getConfigurations(id) {
    // Starts a try block;
    try {
        // Fetches configurations using the constructed URL;
        const response = await fetch(getConfigurationsURL(id));
        // Checks for error status;
        if (!response.ok) {
            // Handles different error status codes;
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
            // Returns null on error;
            return null;
        }

        // Returns the parsed JSON response (the configuration data);
        return await response.json();
    } 
    // Catches network error;
    catch (error) {
        alert("Connection error while fetching configuration.");
        return null;
    }
}

// Asynchronous function to update a user's configurations;
export async function updateConfigurations(id, configurations, usernameInput, passwordInput, translation, button, inputs, buttons) {
    
    // Starts a try block;
    try {
    
        // Sends a PUT request to update the configuration;
        const response = await fetch(getUpdateConfigurationURL(id), {
            // Specifies the HTTP method as PUT;
            method: "PUT",
            // Sets the content type to JSON;
            headers: { "Content-Type": "application/json" },
            // Sends the configurations object as a JSON string in the request body;
            body: JSON.stringify(configurations)
        });
    
        // Checks for error status;
        if (!response.ok) {

            // Handles different error status codes;
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
                // Conflict, likely due to a username/email conflict during configuration update;
                case 409:

                    // Finds the input container and error message element for the username;
                    const usernameContainer = usernameInput.closest(".inputContainer");
                    const usernameError = usernameContainer.querySelector(".errorMessage");
                    // Adds an error class and sets the translated error message;
                    usernameContainer.classList.add("error");
                    usernameError.textContent = translation.invalidForm;

                    // Finds the input container and error message element for the password;
                    const passwordContainer = passwordInput.closest(".inputContainer");
                    const passwordError = passwordContainer.querySelector(".errorMessage");
                    // Adds an error class and sets the translated error message;
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

            // Returns null on error;
            return null;
        }

    
        // Parses the successful JSON response body;
        const user = await response.json();

        // Updates the parent window's audio volume based on the new soundtrack setting;
        if (window.parent?.setAudioVolume) window.parent.setAudioVolume(user.soundtrack);

        // Returns the updated user object;
        return user;
    } 
    // Catches network error;
    catch (error) {

        // Alerts the translated invalid form message (acting as a generic connection error fallback);
        alert(translation.invalidForm);
        return null;
    } 
}

// Asynchronous function to delete a user account;
export async function deleteUser(id) {
    
    // Starts a try block;
    try {

        // Sends a DELETE request to delete the user;
        const response = await fetch(deleteUserURL(id), { 
            // Specifies the HTTP method as DELETE;
            method: "DELETE" 
        });

        // Checks for error status;
        if (!response.ok) {

            // Handles different error status codes;
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

            // Returns without further action on error;
            return;
        }

        // Clears all stored data in the browser's local storage;
        localStorage.clear();
        // Stops any background audio playing in the parent window;
        if (window.parent?.stopAudio) window.parent.stopAudio();
        // Redirects the current window to the application's index page;
        window.location.href = "../../index.html";

        // Returns after successful deletion and redirection;
        return;
    }
    // Catches network error;
    catch (error) {

        alert("Server or Connection Error, try again lately...");
        return;
    }
}

// Asynchronous function to update a specific spaceship's data;
export async function updateSpaceship(id, spaceship, values) {
    
    // Starts a try block;
    try {
        
        // Sends a PUT request to update the spaceship data;
        const response = await fetch(updateSpaceshipURL(id, spaceship), {
            // Specifies the HTTP method as PUT;
            method: "PUT",
            // Sets the content type to JSON;
            headers: { "Content-Type": "application/json" },
            // Sends the updated values object as a JSON string;
            body: JSON.stringify(values)
        });

        // Checks for error status;
        if (!response.ok) {
            
            // Handles different error status codes;
            switch(response.status) {
                
                case 400:
                    alert("Incorrect values on the Server!");
                    break;
                case 404:
                    alert("Spaceship not found");
                    break;
                case 409:
                    alert("Conflict updating spaceship values");
                    break;
                default:
                    alert(`Unexpected error: ${response.status}`);
            }

            // Returns null on error;
            return null;
        }

        // Returns the parsed JSON response (the updated spaceship data);
        return await response.json();
    } 
    // Catches network error;
    catch (error) {

        alert("Connection error while updating spaceships");
        return null;
    }
}

// Asynchronous function to update the user's selected spaceship;
export async function updateSelectedSpaceship(id, spaceship) {
    
    // Starts a try block;
    try {
        
        // Sends a PUT request to update the selected spaceship;
        const response = await fetch(updateSelectedSpaceshipURL(id), {
            // Specifies the HTTP method as PUT;
            method: "PUT",
            // Sets the content type to JSON;
            headers: { "Content-Type": "application/json" },
            // Sends the spaceship object as a JSON string;
            body: JSON.stringify(spaceship) 
        });

        // Checks for error status;
        if (!response.ok) {

            // Handles different error status codes;
            switch(response.status) {

                case 400:
                    alert("Incorrect values on the Server!");
                    break;
                case 404:
                    alert("Spaceship not found");
                    break;
                case 409:
                    alert("Conflict updating spaceship values");
                    break;
                default:
                    alert(`Unexpected error: ${response.status}`);
            }

            // Returns null on error;
            return null;
        }

        // Returns the successful response body as plain text (server might return a status message);
        return await response.text();
    } 
    // Catches network error;
    catch (error) {

        alert("Connection error while selecting spaceship");
        return null;
    }
}

// Asynchronous function to update the user's sound settings;
export async function updateSound(id, soundtrack, soundEffect) {

    // Starts a try block;
    try {

        // Creates an object containing the new soundtrack and sound effect volumes;
        const sounds = {
            soundtrack: soundtrack,
            soundEffects: soundEffect,
        };

        // Sends a PUT request to update the sound configurations;
        const response = await fetch(updateSoundsURL(id), {
            // Specifies the HTTP method as PUT;
            method: "PUT",
            // Sets the content type to JSON;
            headers: { "Content-Type": "application/json" },
            // Sends the sounds object as a JSON string;
            body: JSON.stringify(sounds),
        });

        // Checks for error status;
        if (!response.ok) {
            
            // Handles different error status codes;
            switch (response.status) {

                case 400:
                    alert("Incorrect values on the Server!");
                    break;
                case 401:
                    alert("Unauthorized values on the Server!");
                    break;
                case 404:
                    alert("Configurations not Found");
                    break;
                case 500:
                    alert("Server error while fetching ranking score.");
                    break;
                default:
                    alert(`Unexpected error: ${response.status}`);
            }

            // Returns null on error;
            return null;
        }

        // Parses the successful JSON response body (the updated sound settings);
        const newSounds = await response.json();
        // Updates the parent window's audio volume immediately with the new soundtrack setting;
        if (window.parent?.setAudioVolume) window.parent.setAudioVolume(newSounds.soundtrack);

        // Returns the updated sound settings object;
        return newSounds;
    } 
    // Catches network error;
    catch (error) {
        
        alert("Connection error while selecting spaceship");
        return null;
    } 
}

// Asynchronous function to update the user's achievement cash/currency;
export async function updateAchievementsCash(id, achievementsCash) {
    
    // Starts a try block;
    try {
        // Sends a PUT request to update the achievement cash;
        const response = await fetch(updateAchievementsCashURL(id), {
            // Specifies the HTTP method as PUT;
            method: "PUT",
            // Sets the content type to JSON;
            headers: { "Content-Type": "application/json" },
            // Sends the achievement cash object as a JSON string;
            body: JSON.stringify(achievementsCash) 
        });

        // Checks for error status;
        if (!response.ok) {
            // Handles different error status codes;
            switch(response.status) {
                case 400:
                    alert("Incorrect values on the Server!");
                    break;
                case 404:
                    alert("Configurations not Found");
                    break;
                case 409:
                    alert("Conflict error on the configuration");
                    break;
                default:
                    alert(`Unexpected error: ${response.status}`);
            }
            // Returns null on error;
            return null;
        }

        // Returns the parsed JSON response;
        return await response.json(); 
    } 
    // Catches network error;
    catch (error) {

        alert("Connection error while selecting spaceship");
        return null;
    }
}