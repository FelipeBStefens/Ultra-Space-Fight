// Package;
package com.ultra_space_fight.ultra_space_fight.models.spaceships;

// Imports;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;

// Declaring the SpeedShip class extending the SpaceShip class;
public class SpeedShip extends SpaceShip {
    
    // Empty constructor;
    public SpeedShip() {
        super(5, 10, 5);
    };
    
    // Constructor of the SpeedShip class;
    public SpeedShip(int life, int speed, int damage, User user) {
        super(life, speed, damage, user);
    }

    // Constructor of the SpeedShip class with default values;
    public SpeedShip(User user) {
        super(5, 10, 5, user); 
    }
}