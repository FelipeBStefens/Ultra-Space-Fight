// Package;
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.spaceships;

// SpaceshipNotFound Exception;
public class SpaceshipNotFoundException extends RuntimeException {
    
    // Constructor;
    public SpaceshipNotFoundException() {
        
        // Mensage;
        super("Spaceship not found on the Database");
    }
}