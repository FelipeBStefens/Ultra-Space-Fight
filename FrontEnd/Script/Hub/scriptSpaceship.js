// Imports the function for fetching translated strings;
import getTranslation from "../Utils/scriptTranslation.js";
// Imports constant values for ship requirements (score), upgrade costs, and max stat limits;
import { SPACESHIPS_REQUIREMENTS, SPACESHIPS_COSTS, MAX_STATS } from "../Utils/scriptConstants.js";
// Imports asynchronous functions for updating the currently selected ship and for upgrading a ship's stats;
import { updateSelectedSpaceship, updateSpaceship } from "../Utils/scriptFetch.js";

// Main function to update the entire UI state of the spaceship shop based on current data;
function update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap) {
    
    // Iterates through all spaceship DOM elements to update their visual state;
    spaceships.forEach((spaceship, i) => {

        // Removes all position and state classes to reset the element;
        spaceship.classList.remove("active", "left", "right", "blocked");

        // Gets the data object for the current ship being processed;
        const currentShip = ships[i];
        // Calculates the required score to unlock the ship;
        const requiredScore = SPACESHIPS_REQUIREMENTS[currentShip.name];
        // Checks if the user's score is insufficient to unlock the ship;
        const isLocked = user.score < requiredScore;

        // Logic for the currently viewed (active) spaceship;
        if (i === active) {

            // Sets the active class for the main visual element;
            spaceship.classList.add("active");

            // Updates the displayed stats (life, speed, damage) in the UI;
            document.getElementById("lifeValue").textContent = currentShip.life;
            document.getElementById("speedValue").textContent = currentShip.speed;
            document.getElementById("damageValue").textContent = currentShip.damage;

            // Handles the state if the ship is LOCKED by score requirement;
            if (isLocked) {

                // Updates the action button text to display the unlock score requirement;
                actionButton.textContent = `${t.locked} ${requiredScore} ${t.score}`;
                // Disables the action button;
                actionButton.disabled = true;

                // Adds the 'blocked' class for visual dimming/locking of the ship;
                spaceship.classList.add("blocked");
                // Hides the cost/upgrade display;
                upgradeCostDisplay.style.display = 'none';
            } 
            // Handles the state if the ship is UNLOCKED;
            else {

                // Gets the cost of the ship/upgrade;
                const cost = SPACESHIPS_COSTS[currentShip.name];
                // Displays the cost in the UI with the translated currency name;
                costValueSpan.textContent = `${cost} ${t.coins}`;
                // Shows the upgrade cost display;
                upgradeCostDisplay.style.display = 'flex';

                // Handles the state if the ship is the CURRENTLY SELECTED ship;
                if (i === selected) {
                        
                    // Changes the button text to indicate it's already selected;
                    actionButton.textContent = t.selectedSpaceship;
                    // Disables the button;
                    actionButton.disabled = true;
                    // Adds a style class for selected state;
                    actionButton.classList.add("selectedButton");
                } 
                // Handles the state if the ship is unlocked but NOT selected;
                else {

                    // Changes the button text to prompt selection;
                    actionButton.textContent = t.selectSpaceship;
                    // Enables the button for selection;
                    actionButton.disabled = false;
                    // Removes the selected style class;
                    actionButton.classList.remove("selectedButton");
                }
            }
        } 
        // Sets the position class for ships to the left of the active one (carousel logic);
        else if (i < active) {
            spaceship.classList.add("left");
        } 
        // Sets the position class for ships to the right of the active one (carousel logic);
        else if (i > active) {
            spaceship.classList.add("right");
        }
    });

    // Iterates through all upgrade buttons (life, speed, damage);
    document.querySelectorAll(".upgradeButton").forEach(button => {
            
        // Gets the currently active ship data;
        const currentShip = ships[active]; 
        // Maps the data-stat attribute to the correct property name in the ship object;
        const stat = statMap[button.dataset.stat];

        // Recalculates locked and maxed states for the upgrade buttons;
        const isLocked = user.score < SPACESHIPS_REQUIREMENTS[currentShip.name];
        const isMaxed = currentShip[stat] >= MAX_STATS;

        // Resets button styles and cursor for the unlocked state;
        button.style.filter = "";
        button.style.cursor = "pointer";
        // Disables the button if the ship is locked OR if the stat is maxed;
        button.disabled = isLocked || isMaxed;

        // Updates button appearance if the stat is MAXED;
        if (isMaxed) {

            // Applies a visual filter and changes the cursor;
            button.style.filter = "grayscale(100%)";
            button.style.cursor = "not-allowed";
            // Updates button text to indicate max level;
            button.textContent = t.maxed;
        } 
        // Updates button appearance if the ship is SCORE LOCKED;
        else if (isLocked) {

            // Updates button text to indicate locked status;
            button.textContent = t.locked;
        } 
        // Updates button appearance for a regular upgrade state;
        else {

            // Updates button text to prompt upgrade;
            button.textContent = t.upgrade;
        }
    });
}

// Function to control the visual loading state across the entire page;
function setLoadingState(isLoading, activeButton = null) {
    
    // Gets all button elements on the page;
    const allButtons = document.querySelectorAll("button");

    // Logic to set the loading state;
    if (isLoading) {
        
        // Disables and visually dims all buttons;
        allButtons.forEach(button => {
            button.classList.add("disabledOthers");
            button.disabled = true;
        });

        // Specific logic for the button that initiated the loading process;
        if (activeButton) {

            // Removes the dimming class, adds the loading class, and saves the original text;
            activeButton.classList.remove("disabledOthers");
            activeButton.classList.add("loading");
            activeButton.disabled = true;

            const originalText = activeButton.textContent.trim();
            activeButton.dataset.originalText = originalText;

            // Inserts HTML for a loading spinner alongside the original text;
            activeButton.innerHTML = `
                <span>${originalText}</span>
                <div class="loadingSpinner"></div>
            `;
        }
    } 
    // Logic to reset the loading state;
    else {

        // Resets all buttons to their normal state;
        allButtons.forEach(button => {
            
            button.classList.remove("disabledOthers", "loading");
            button.disabled = false;

            // Restores the original text if it was saved;
            if (button.dataset.originalText) {
                button.innerHTML = button.dataset.originalText;
                delete button.dataset.originalText;
            }

            // Ensures 'selectedButton' class is removed from upgrade buttons if present (cleanup);
            if (button.classList.contains("upgradeButton")) {
                button.classList.remove("selectedButton");
            }
        });
    }
}

// Function to update the user's cash value in local storage and the UI;
function updateCashDisplay(newCashValue, coinText, data) {
    
    // Ensures necessary elements are available;
    if (data && coinText) {

        // Updates the cash value in the local spaceship data object;
        data.cash = newCashValue;
        // Saves the updated data back to Local Storage;
        localStorage.setItem("spaceships", JSON.stringify(data));
        // Updates the text content of the coin value display element;
        coinText.textContent = newCashValue;
    }
}

// Immediately Invoked Asynchronous Function Expression (IIAFE) for page initialization;
(async function () {
    
    // Retrieves user data and redirects if not logged in;
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "../../enter.html";
    }

    // Fetches translations;
    const t = getTranslation(user?.language);

    // Initial translation of static elements;
    document.querySelector('button#actionButton').textContent = t.selectSpaceship;
    document.querySelectorAll('.upgradeButton').forEach(button => button.textContent = t.upgrade);
    document.querySelector('#costValue').textContent = t.cost;
    // Updates stat labels to include the translated name and a span for the dynamic value;
    document.getElementById("lifeText").innerHTML = `${t.life}: <span class="statValue" id="lifeValue"></span>`;
    document.getElementById("speedText").innerHTML = `${t.speed}: <span class="statValue" id="speedValue"></span>`;
    document.getElementById("damageText").innerHTML = `${t.damage}: <span class="statValue" id="damageValue"></span>`;

    // Retrieves spaceship inventory/stat data;
    const data = JSON.parse(localStorage.getItem("spaceships"));

    if (!data) {
        data = await getSpaceships(user.idUser);
        localStorage.setItem("spaceships", JSON.stringify(data));
    }

    // Gets references to key DOM elements;
    const spaceships = document.querySelectorAll(".spaceship");
    const actionButton = document.getElementById("actionButton");
    const coinValueText = document.getElementById("coinValue");
    const upgradeCostDisplay = document.getElementById("upgradeCostDisplay");
    const costValueSpan = document.getElementById("costValue");

    // Mapping of button data attributes to ship data properties;
    const statMap = { 
        life: "life", 
        speed: "speed", 
        damage: "damage" 
    };

    // Compiles a central array of ship data from the local storage object;
    const ships = [
        { 
            name: "standart_ship", 
            life: data.standartShip.life, 
            speed: data.standartShip.speed, 
            damage: data.standartShip.damage 
        },
        { 
            name: "speed_ship", 
            life: data.speedShip.life, 
            speed: data.speedShip.speed, 
            damage: data.speedShip.damage 
        },
        { 
            name: "destroyer_ship", 
            life: data.destroyerShip.life, 
            speed: data.destroyerShip.speed, 
            damage: data.destroyerShip.damage 
        },
        { 
            name: "freighter_ship", 
            life: data.freighterShip.life, 
            speed: data.freighterShip.speed, 
            damage: data.freighterShip.damage 
        },
        { 
            name: "elite_ship", 
            life: data.eliteShip.life, 
            speed: data.eliteShip.speed, 
            damage: data.eliteShip.damage 
        }
    ];

    // Finds the index of the currently selected ship to set as the initial active view;
    let active = ships.findIndex(ship => ship.name === user.selectedSpaceship);
    if (active === -1) {
        active = 0; // Default to the first ship if not found;
    }

    // Finds the index of the officially selected ship;
    let selected = ships.findIndex(ship => ship.name === user.selectedSpaceship);
    if (selected === -1) {
        selected = 0; // Default to the first ship if not found;
    }

    // Attaches click handler for the main Action Button (Select Ship);
    actionButton.onclick = async () => {

        const currentShip = ships[active];
        const requiredScore = SPACESHIPS_REQUIREMENTS[currentShip.name];
        const isLocked = user.score < requiredScore;
        const isSelected = selected === active;

        // Prevents execution if the ship is locked or already selected;
        if (isLocked || isSelected) {
            return;
        } 

        // Sets the loading state while the server updates the selection;
        setLoadingState(true, actionButton);

        // Updates local variables to reflect the new selection;
        selected = active;
        user.selectedSpaceship = currentShip.name;
        localStorage.setItem("user", JSON.stringify(user));

        // Calls the API to update the user's selected ship on the server;
        const result = await updateSelectedSpaceship(user.idUser, currentShip.name);
        // If the server update is successful;
        if (result != null) {

            // Updates the 'user' object in Local Storage with the current stats of the newly selected ship;
            user.spaceshipValues = {
                life: currentShip.life,
                speed: currentShip.speed,
                damage: currentShip.damage
            };
            localStorage.setItem("user", JSON.stringify(user));
        } 
        
        // Resets the loading state and refreshes the UI;
        setLoadingState(false);
        update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);
    };

    // Attaches click handler for the Left Navigation Button (carousel movement);
    document.getElementById("leftButton").addEventListener("click", () => {
        // Decrements active index if not at the beginning;
        if (active > 0) {
            active--;
        }

        // Refreshes the UI state;
        update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);
    });

    // Attaches click handler for the Right Navigation Button (carousel movement);
    document.getElementById("rightButton").addEventListener("click", () => {
        // Increments active index if not at the end;
        if (active < spaceships.length - 1) {
            active++;
        }

        // Refreshes the UI state;
        update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);
    });

    // Attaches click handler for each Upgrade Button;
    document.querySelectorAll(".upgradeButton").forEach(button => {
        
        button.addEventListener("click", async () => {
            
            const currentShip = ships[active];

            const requiredScore = SPACESHIPS_REQUIREMENTS[currentShip.name];
            const userScore = user.score;

            const stat = statMap[button.dataset.stat];

            const cost = SPACESHIPS_COSTS[ships[active].name];

            // Client-side checks: Blocked by Score;
            if (userScore < requiredScore) {
                alert("Blocked Upgrade");
                update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);
                return;
            }

            // Client-side checks: Blocked by Maxed Stat;
            if (currentShip[stat] >= MAX_STATS) {
                alert("Blocked upgrade");
                update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);
                return;
            }

            // Client-side checks: Blocked by Insufficient Cash;
            if (user.cash < cost) {
                alert("User cash invalid"); // The alert message seems incorrect/simple; should mention cash;
                return;
            }

            // Sets the loading state on the clicked button;
            setLoadingState(true, button);

            // Refreshes the UI to reflect the loading state;
            update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);

            ships[active][stat] += 1;
            
            // Prepares the data transfer object (DTO) for the API call;
            const values = {
                cash: cost, // Cost to be deducted;
                spaceshipValuesDTO: {
                    life: ships[active].life,
                    speed: ships[active].speed,
                    damage: ships[active].damage
                }
            };
            
            // Calls the API to perform the spaceship upgrade;
            const result = await updateSpaceship(user.idUser, ships[active].name, values);

            // If the server update is successful;
            if (result != null) {
                
                // Updates the displayed cash value using the new cash value returned by the server;
                updateCashDisplay(result.cash, coinValueText, data);
                
                // Updates the user's selected ship stats in Local Storage if the currently active ship IS the selected ship;
                if (ships[active].name === user.selectedSpaceship) {
                    user.spaceshipValues = values.spaceshipValuesDTO; // Needs to be updated with the newly incremented stat value;
                    user.spaceshipValues[stat] = ships[active][stat]; // Manually correcting the stat value in the DTO before saving to user;
                }
                localStorage.setItem("user", JSON.stringify(user));
            } 
            // Handles API error;
            else {
                alert("Erro updating Spaceship!");
            }
            
            // Resets the loading state and refreshes the UI;
            setLoadingState(false);
            update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);
        });
    });

    // Final UI updates on page load;
    update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);
    updateCashDisplay(data.cash, coinValueText, data); // Ensures cash display is correct;
}) ();