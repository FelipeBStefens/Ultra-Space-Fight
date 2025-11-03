
import getTranslation from "../Utils/scriptTranslation.js";

import { SPACESHIPS_REQUIREMENTS, SPACESHIPS_COSTS, MAX_STATS } from "../Utils/scriptConstants.js";

import { updateSelectedSpaceship, updateSpaceship } from "../Utils/scriptFetch.js";


function update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap) {
    

    spaceships.forEach((spaceship, i) => {


        spaceship.classList.remove("active", "left", "right", "blocked");


        const currentShip = ships[i];

        const requiredScore = SPACESHIPS_REQUIREMENTS[currentShip.name];

        const isLocked = user.score < requiredScore;


        if (i === active) {


            spaceship.classList.add("active");


            document.getElementById("lifeValue").textContent = currentShip.life;
            document.getElementById("speedValue").textContent = currentShip.speed;
            document.getElementById("damageValue").textContent = currentShip.damage;


            if (isLocked) {


                actionButton.textContent = `${t.locked} ${requiredScore} ${t.score}`;

                actionButton.disabled = true;


                spaceship.classList.add("blocked");

                upgradeCostDisplay.style.display = 'none';
            } 

            else {


                const cost = SPACESHIPS_COSTS[currentShip.name];

                costValueSpan.textContent = `${cost} ${t.coins}`;

                upgradeCostDisplay.style.display = 'flex';


                if (i === selected) {
                        

                    actionButton.textContent = t.selectedSpaceship;

                    actionButton.disabled = true;

                    actionButton.classList.add("selectedButton");
                } 

                else {


                    actionButton.textContent = t.selectSpaceship;

                    actionButton.disabled = false;

                    actionButton.classList.remove("selectedButton");
                }
            }
        } 

        else if (i < active) {
            spaceship.classList.add("left");
        } 

        else if (i > active) {
            spaceship.classList.add("right");
        }
    });


    document.querySelectorAll(".upgradeButton").forEach(button => {
            

        const currentShip = ships[active]; 

        const stat = statMap[button.dataset.stat];


        const isLocked = user.score < SPACESHIPS_REQUIREMENTS[currentShip.name];
        const isMaxed = currentShip[stat] >= MAX_STATS;


        button.style.filter = "";
        button.style.cursor = "pointer";

        button.disabled = isLocked || isMaxed;


        if (isMaxed) {


            button.style.filter = "grayscale(100%)";
            button.style.cursor = "not-allowed";

            button.textContent = t.maxed;
        } 

        else if (isLocked) {


            button.textContent = t.locked;
        } 

        else {


            button.textContent = t.upgrade;
        }
    });
}


function setLoadingState(isLoading, activeButton = null) {
    

    const allButtons = document.querySelectorAll("button");


    if (isLoading) {
        

        allButtons.forEach(button => {
            button.classList.add("disabledOthers");
            button.disabled = true;
        });


        if (activeButton) {


            activeButton.classList.remove("disabledOthers");
            activeButton.classList.add("loading");
            activeButton.disabled = true;

            const originalText = activeButton.textContent.trim();
            activeButton.dataset.originalText = originalText;


            activeButton.innerHTML = `
                <span>${originalText}</span>
                <div class="loadingSpinner"></div>
            `;
        }
    } 

    else {


        allButtons.forEach(button => {
            
            button.classList.remove("disabledOthers", "loading");
            button.disabled = false;


            if (button.dataset.originalText) {
                button.innerHTML = button.dataset.originalText;
                delete button.dataset.originalText;
            }


            if (button.classList.contains("upgradeButton")) {
                button.classList.remove("selectedButton");
            }
        });
    }
}


function updateCashDisplay(newCashValue, coinText, data) {
    

    if (data && coinText) {


        data.cash = newCashValue;

        localStorage.setItem("spaceships", JSON.stringify(data));

        coinText.textContent = newCashValue;
    }
}


(async function () {
    

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "../../enter.html";
    }


    const t = getTranslation(user?.language);


    document.querySelector('button#actionButton').textContent = t.selectSpaceship;
    document.querySelectorAll('.upgradeButton').forEach(button => button.textContent = t.upgrade);
    document.querySelector('#costValue').textContent = t.cost;

    document.getElementById("lifeText").innerHTML = `${t.life}: <span class="statValue" id="lifeValue"></span>`;
    document.getElementById("speedText").innerHTML = `${t.speed}: <span class="statValue" id="speedValue"></span>`;
    document.getElementById("damageText").innerHTML = `${t.damage}: <span class="statValue" id="damageValue"></span>`;


    const data = JSON.parse(localStorage.getItem("spaceships"));

    if (!data) {
        data = await getSpaceships(user.idUser);
        localStorage.setItem("spaceships", JSON.stringify(data));
    }


    const spaceships = document.querySelectorAll(".spaceship");
    const actionButton = document.getElementById("actionButton");
    const coinValueText = document.getElementById("coinValue");
    const upgradeCostDisplay = document.getElementById("upgradeCostDisplay");
    const costValueSpan = document.getElementById("costValue");


    const statMap = { 
        life: "life", 
        speed: "speed", 
        damage: "damage" 
    };


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


    let active = ships.findIndex(ship => ship.name === user.selectedSpaceship);
    if (active === -1) {
        active = 0;
    }


    let selected = ships.findIndex(ship => ship.name === user.selectedSpaceship);
    if (selected === -1) {
        selected = 0;
    }


    actionButton.onclick = async () => {

        const currentShip = ships[active];
        const requiredScore = SPACESHIPS_REQUIREMENTS[currentShip.name];
        const isLocked = user.score < requiredScore;
        const isSelected = selected === active;


        if (isLocked || isSelected) {
            return;
        } 


        setLoadingState(true, actionButton);


        selected = active;
        user.selectedSpaceship = currentShip.name;
        localStorage.setItem("user", JSON.stringify(user));


        const result = await updateSelectedSpaceship(user.idUser, currentShip.name);

        if (result != null) {


            user.spaceshipValues = {
                life: currentShip.life,
                speed: currentShip.speed,
                damage: currentShip.damage
            };
            localStorage.setItem("user", JSON.stringify(user));
        } 
        

        setLoadingState(false);
        update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);
    };


    document.getElementById("leftButton").addEventListener("click", () => {

        if (active > 0) {
            active--;
        }


        update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);
    });


    document.getElementById("rightButton").addEventListener("click", () => {

        if (active < spaceships.length - 1) {
            active++;
        }


        update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);
    });


    document.querySelectorAll(".upgradeButton").forEach(button => {
        
        button.addEventListener("click", async () => {
            
            const currentShip = ships[active];

            const requiredScore = SPACESHIPS_REQUIREMENTS[currentShip.name];
            const userScore = user.score;

            const stat = statMap[button.dataset.stat];

            const cost = SPACESHIPS_COSTS[ships[active].name];


            if (userScore < requiredScore) {
                alert("Blocked Upgrade");
                update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);
                return;
            }


            if (currentShip[stat] >= MAX_STATS) {
                alert("Blocked upgrade");
                update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);
                return;
            }


            if (user.cash < cost) {
                alert("User cash invalid");
                return;
            }


            setLoadingState(true, button);


            update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);

            ships[active][stat] += 1;
            

            const values = {
                cash: cost,
                spaceshipValuesDTO: {
                    life: ships[active].life,
                    speed: ships[active].speed,
                    damage: ships[active].damage
                }
            };
            

            const result = await updateSpaceship(user.idUser, ships[active].name, values);


            if (result != null) {
                

                updateCashDisplay(result.cash, coinValueText, data);
                

                if (ships[active].name === user.selectedSpaceship) {
                    user.spaceshipValues = values.spaceshipValuesDTO;
                    user.spaceshipValues[stat] = ships[active][stat];
                }
                localStorage.setItem("user", JSON.stringify(user));
            } 

            else {
                alert("Erro updating Spaceship!");
            }
            

            setLoadingState(false);
            update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);
        });
    });


    update(ships, user, selected, active, t, spaceships, actionButton, upgradeCostDisplay, costValueSpan, statMap);
    updateCashDisplay(data.cash, coinValueText, data);
}) ();