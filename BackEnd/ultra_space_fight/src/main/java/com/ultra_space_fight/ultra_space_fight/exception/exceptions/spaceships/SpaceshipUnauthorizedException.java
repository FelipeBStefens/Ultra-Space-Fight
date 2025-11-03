
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.spaceships;


public class SpaceshipUnauthorizedException extends RuntimeException {
    

    public SpaceshipUnauthorizedException(String value) {
        

        super("Spaceship value unauthorized on the Server: " + value);
    }
}