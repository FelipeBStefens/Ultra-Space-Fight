async function updateSpaceship(spaceship, values, id) {
  try {

    const response = await fetch(`http://localhost:8080/spaceship/update/${spaceship}/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } 
  catch (error) {
    console.error(error);
    return null;
  }
}

async function updateSelectedSpaceship(spaceship, id) {
  try {

    const response = await fetch(`http://localhost:8080/spaceship/update/selected/spaceship/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: spaceship
    });

    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.text();
  } 
  catch (error) {
    console.error(error);
    return null;
  }
}

const spaceshipRequirements = {
  standart_ship: 0,       
  speed_ship: 500,        
  destroyer_ship: 1000,   
  freighter_ship: 2000,   
  elite_ship: 4000        
};

// Function Expression, to initialize when the page start;
(async function(){

  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) {     
      window.location.href = "../../index.html";
  }

  // Selecting all Divs that are Spaceships;
  const spaceships = 
    document.querySelectorAll(".spaceship");

  // The Button to the Selected Spaceship;
  const actionButton = 
    document.getElementById("actionButton");

  const data = JSON.parse(sessionStorage.getItem("spaceships"));

  // All the Spaceship values;
  const ships = [
    { name: "standart_ship", life: data.standartShip.life, speed: data.standartShip.speed, damage: data.standartShip.damage},
    { name: "speed_ship", life: data.speedShip.life,  speed: data.speedShip.speed, damage: data.speedShip.damage},
    { name: "destroyer_ship", life: data.destroyerShip.life, speed: data.destroyerShip.speed, damage: data.destroyerShip.damage},
    { name: "freighter_ship", life: data.freighterShip.life, speed: data.freighterShip.speed, damage: data.freighterShip.damage},
    { name: "elite_ship", life: data.eliteShip.life, speed: data.eliteShip.speed, damage: data.eliteShip.damage}
  ];

  // Active Spaceship variable;
  let active = ships.findIndex(ship => ship.name === user.selectedSpaceship);
  if (active === -1) {
    active = 0;
  }

  // Selected Spaceship variable;
  let selected = ships.findIndex(ship => ship.name === user.selectedSpaceship);
  if (selected === -1) {
    selected = 0;
  }

  // functions to update the active Spaceship;
  function update() {
    spaceships.forEach((spaceship, i) => {
      spaceship.classList.remove("active", "left", "right", "blocked");

      const currentShip = ships[i];
      const requiredScore = spaceshipRequirements[currentShip.name];
      const isLocked = data.score < requiredScore;

      // Atualiza valores da nave ativa
      if (i === active) {
        spaceship.classList.add("active");

        document.getElementById("lifeValue").textContent = currentShip.life;
        document.getElementById("speedValue").textContent = currentShip.speed;
        document.getElementById("damageValue").textContent = currentShip.damage;

        if (isLocked) {
          // Exibe mensagem de bloqueio
          document.getElementById("actionButton").textContent = `Locked — requires ${requiredScore} score`;
          actionButton.disabled = true;

          // Adiciona um overlay visual
          spaceship.classList.add("blocked");
        } else {
          // Nave desbloqueada
          if(i === selected) {
              actionButton.textContent = "Selected Spaceship";
              actionButton.disabled = true;
          } 
          else {
              actionButton.textContent = "Select Spaceship";
              actionButton.disabled = false;
              actionButton.onclick = async () => {
                  selected = i;
                  user.selectedSpaceship = ships[i].name;
                  sessionStorage.setItem("user", JSON.stringify(user));

                  const result = await updateSelectedSpaceship(ships[i].name, user.idUser);
                  if (result) {
                      console.log(`✅ Nave selecionada: ${ships[i].name}`);
                      update();
                  } else {
                      console.error("❌ Erro ao atualizar nave selecionada no servidor");
                  }
              };
          }
        }
      } else if (i < active) {
        spaceship.classList.add("left");
      } else if (i > active) {
        spaceship.classList.add("right");
      }
    });

    // Atualiza o estado dos botões de upgrade
    document.querySelectorAll(".upgrade-button").forEach(button => {
      const currentShip = ships[active];
      const requiredScore = spaceshipRequirements[currentShip.name];
      const isLocked = data.score < requiredScore;
      button.disabled = isLocked;
    });
  }

  // Add an Event Listener on the left button; 
  document.getElementById("leftButton")
    .addEventListener("click", () => {
    
    // If the active is greater than 0;
    if(active > 0) {

      // active value minus 1; 
      active--;
    }

    // Update the values with the function;
    update();
  });

  // Add an Event Listener on the right button; 
  document.getElementById("rightButton")
    .addEventListener("click", () => {

    // If the active is less than the bigger index;
    if(active < spaceships.length - 1) {
      
      // active value plus 1;
      active++;
    }

    // Update the values with the function;
    update();
  });

  const statMap = {
    life: "life",
    speed: "speed",
    damage: "damage"
  };

  // Loop Selecting all Upgrade Buttons;
  document.querySelectorAll(".upgrade-button").forEach(button => {

    // Add an Event Listener on the upgrade button;
    button.addEventListener("click", async () => {

      // Getting the specific Stat value;
      const stat = statMap[button.dataset.stat];
      
      const upgradeCosts = {
        standart_ship: 50,
        speed_ship: 75,
        destroyer_ship: 100,
        freighter_ship: 125,
        elite_ship: 200
      };

      const cost = upgradeCosts[ships[active].name];

      // Stat value plus 10; 
      ships[active][stat] += 1;

      // Update the values with the function;
      update();

      const body = {
        cash: cost,
        spaceshipValuesTDO: {
          life: ships[active].life,
          speed: ships[active].speed,
          damage: ships[active].damage
        }
      };

      const result = await updateSpaceship(ships[active].name, body, user.idUser);
      if (result) {
        console.log(`✅ Nave ${ships[active].name} atualizada com sucesso:`, result);
      } else {
        console.error("❌ Erro ao atualizar a nave no servidor");
      }
    });
  });

  // Update the values with the function;
  update();
})();