// Package;
package com.ultra_space_fight.ultra_space_fight.models.spaceships;

// Imports;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;

// Declaring the EliteShip class extending the SpaceShip class;
public class EliteShip extends SpaceShip {
    
    // Empty constructor; 
    public EliteShip() {
        super(20, 10, 10); 
    };

    // Constructor of the EliteShip class;
    public EliteShip(int life, int speed, int damage, User user) {
        super(life, speed, damage, user);
    }

    // Constructor of the EliteShip class with default values;
    public EliteShip(User user) {
        super(20, 10, 10, user); 
    }
}