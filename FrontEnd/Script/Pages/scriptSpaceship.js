// Function Expression, to initialize when the page start;
(function(){

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

  // All the Spaceship values;
  const ships = [
    { name: "Nave Alfa", life: 100, speed: 50, damage: 30 },
    { name: "Nave Beta", life: 80,  speed: 70, damage: 40 },
    { name: "Nave Gama", life: 120, speed: 40, damage: 50 },
    { name: "Nave Gama", life: 120, speed: 40, damage: 50 },
    { name: "Nave Gama", life: 120, speed: 40, damage: 50 }
  ];

  // Active Spaceship variable;
  let active = 0;

  // Selected Spaceship variable;
  let selected = 0;

  // functions to update the active Spaceship;
  function update(){

    // For loop in each achievement;
    spaceships.forEach((spaceship, i) => {
      
      // Removing that classes on the Div, if it has;
      spaceship.classList.remove("active", "left", "right");
      
      // Conditional expressions;
      if(i === active) {

        // Adding a new class on that Div; 
        spaceship.classList.add("active");

        // Shows the life of that Spaceship;
        document.getElementById("lifeValue")
          .textContent = ships[i].life;

        // Shows the speed of that Spaceship;
        document.getElementById("speedValue")
          .textContent = ships[i].speed;

        // Shows the damage of that Spaceship;
        document.getElementById("damageValue")
          .textContent = ships[i].damage;

        // If the Button is selected;
        if(i === selected) {

          // Shows it's Selected;
          actionButton.textContent = "Selected Spaceship";
          
          // Disable the Button;
          actionButton.disabled = true;
        }
        // If it's not Selected; 
        else {

          // Shows it can be Selected;
          actionButton.textContent = "Select Spaceship";
          
          // Active the Button;
          actionButton.disabled = false;
          
          // When the Button is clicked;
          actionButton.onclick = () => {

            // Update the Select value;
            selected = i;

            // Update the values with the function;
            update();
          };
        }
      }
      else if(i < active) {

        // Adding a new class on that Div; 
        spaceship.classList.add("left");
      }
      else if(i > active) {

        // Adding a new class on that Div; 
        spaceship.classList.add("right");
      }
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
    button.addEventListener("click", () => {

      // Getting the specific Stat value;
      const stat = statMap[button.dataset.stat];
      
      // Stat value plus 10; 
      ships[active][stat] += 10;

      // Update the values with the function;
      update();
    });
  });

  // Update the values with the function;
  update();
})();
