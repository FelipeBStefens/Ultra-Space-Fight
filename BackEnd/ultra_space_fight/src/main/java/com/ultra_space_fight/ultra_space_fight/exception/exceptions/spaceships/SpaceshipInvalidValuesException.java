package com.ultra_space_fight.ultra_space_fight.exception.exceptions.spaceships;

public class SpaceshipInvalidValuesException extends RuntimeException {
    
    public SpaceshipInvalidValuesException(String value) {
        super("Invalid value on the Database: " + value);
    }
}
