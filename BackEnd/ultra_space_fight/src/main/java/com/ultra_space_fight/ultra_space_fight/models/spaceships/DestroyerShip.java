// Package;
package com.ultra_space_fight.ultra_space_fight.models.spaceships;

// Imports;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;

// Declaring the DestroyerShip class extending the SpaceShip class;
public class DestroyerShip extends SpaceShip {

    // Empty constructor;
    public DestroyerShip() {
        super(5, 5, 10);
    };
    
    // Constructor of the DestroyerShip class;
    public DestroyerShip(int life, int speed, int damage, User user) {
        super(life, speed, damage, user);
    }

    // Constructor of the DestroyerShip class with default values;
    public DestroyerShip(User user) {
        super(5, 5, 10, user); 
    }
}