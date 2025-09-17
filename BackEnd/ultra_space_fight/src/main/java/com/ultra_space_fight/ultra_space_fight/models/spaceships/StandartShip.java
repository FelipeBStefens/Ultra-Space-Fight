// Declaring the package of the StandartShip class;
package com.ultra_space_fight.ultra_space_fight.models.spaceships;

// Importing the User class from the userProfile package;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;

// Declaring the StandartShip class extending the SpaceShip class;
public final class StandartShip extends SpaceShip {
    
    public StandartShip() {};
    
    // Constructor of the StandartShip class;
    public StandartShip(int life, int speed, int damage, User user) {
        super(life, speed, damage, user);
    }

    // Constructor of the StandartShip class with default values;
    public StandartShip(User user) {
        super(10, 5, 5, user); 
    }
}
