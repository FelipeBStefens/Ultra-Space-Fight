// Declaring the package of the StandartShip class;
package com.ultra_space_fight.ultra_space_fight.models.spaceships;

// Importing the User class from the userProfile package;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;

// Declaring the DestroyerShip class extending the SpaceShip class;
public class DestroyerShip extends SpaceShip {

    public DestroyerShip() {};
    
    // Constructor of the DestroyerShip class;
    public DestroyerShip(int life, int speed, int damage, User user) {
        super(life, speed, damage, user);
    }

    // Constructor of the DestroyerShip class with default values;
    public DestroyerShip(User user) {
        super(5, 5, 10, user); 
    }
}