// Package;
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.spaceships;

// SpaceshipInvalidValues Exception;
public class SpaceshipInvalidValuesException extends RuntimeException {
    
    // Constructor;
    public SpaceshipInvalidValuesException(String value) {
        
        // Mensage;
        super("Invalid value on the Database: " + value);
    }
}