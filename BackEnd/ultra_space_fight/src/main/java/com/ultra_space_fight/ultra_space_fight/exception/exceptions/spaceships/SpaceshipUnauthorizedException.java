// Package;
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.spaceships;

// SpaceshipUnauthorized Exception;
public class SpaceshipUnauthorizedException extends RuntimeException {
    
    // Constructor;
    public SpaceshipUnauthorizedException(String value) {
        
        // Mensage;
        super("Spaceship value unauthorized on the Server: " + value);
    }
}