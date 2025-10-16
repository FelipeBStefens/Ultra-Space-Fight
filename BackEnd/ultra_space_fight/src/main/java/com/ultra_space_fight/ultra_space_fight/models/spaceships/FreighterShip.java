// Package;
package com.ultra_space_fight.ultra_space_fight.models.spaceships;

// Imports;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;

// Declaring the StandartShip class extending the SpaceShip class;
public class FreighterShip extends SpaceShip {
    
    // Empty Constructor;
    public FreighterShip() {
        super(20, 2, 5);
    };
    
    // Constructor;
    public FreighterShip(int life, int speed, int damage, User user) {
        super(life, speed, damage, user);
    }

    // Constructor with default values;
    public FreighterShip(User user) {
        super(20, 2, 5, user);
    }
}