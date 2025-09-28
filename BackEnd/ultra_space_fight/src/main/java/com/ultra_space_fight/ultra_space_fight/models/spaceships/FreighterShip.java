// Declaring the package of the FreighterShip class;
package com.ultra_space_fight.ultra_space_fight.models.spaceships;

// Importing the User class from the userProfile package;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;

// Declaring the StandartShip class extending the SpaceShip class;
public class FreighterShip extends SpaceShip {
    
    public FreighterShip() {
        super(20, 2, 5);
    };
    
    // Constructor of the FreighterShip class;
    public FreighterShip(int life, int speed, int damage, User user) {
        super(life, speed, damage, user);
    }

    // Constructor of the FreighterShip class with default values;
    public FreighterShip(User user) {
        super(20, 2, 5, user);
    }
}
