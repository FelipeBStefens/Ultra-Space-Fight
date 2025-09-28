// Function Expression, to initialize when the page start;
(function(){

  // Active achievement variable;
  let active = 0;

  // Selecting all Divs that are Achievements;
  const achievements = 
    document.querySelectorAll('.achievement');
  
  // functions to update the active achievement; 
  function update() {

    // For loop in each achievement;
    achievements.forEach((achievement, i) => {

      // Removing that classes on the Div, if it has;
      achievement.classList
        .remove('active', 'left', 'right');
      
      // Conditional expressions;
      if (i === active) {

        // Adding a new class on that Div; 
        achievement.classList.add('active');
      }
      else if (i < active) {

        // Adding a new class on that Div;
        achievement.classList.add('left');
      }
      else if (i > active) {

        // Adding a new class on that Div;
        achievement.classList.add('right');
      } 
    });
  }

  // Add an Event Listener on the left button; 
  document.getElementById('leftButton')
    .addEventListener('click', () => {

    // If the active is greater than 0;
    if(active > 0) {

      // active value minus 1; 
      active--;
    }

    // Update the values with the function;
    update();
  });

  // Add an Event Listener on the right button;
  document.getElementById('rightButton').
    addEventListener('click', () => {

    // If the active is less than the bigger index;
    if(active < achievements.length - 1) {
      
      // active value plus 1;
      active++;
    }

    // Update the values with the function;
    update();
  });

  // Update the values with the function;
  update();
}) ();