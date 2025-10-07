package com.ultra_space_fight.ultra_space_fight.exception.exceptions;

public class SpaceshipNotFoundException extends RuntimeException {
    
    public SpaceshipNotFoundException() {
        super("Spaceship not found on the Database");
    }
}
