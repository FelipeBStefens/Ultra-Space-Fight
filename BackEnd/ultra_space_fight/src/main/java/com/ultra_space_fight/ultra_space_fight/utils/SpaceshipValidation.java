// Package;
package com.ultra_space_fight.ultra_space_fight.utils;

// Imports;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships.SpaceshipUpdateDTO;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.spaceships.SpaceshipInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpaceShip;

// Declaring the validations class of the Spaceships;
public class SpaceshipValidation {
    
    // Possible names of the Spaceship;
    private static final String[] VALID_SPACESHIPS = {"standart_ship", "speed_ship", "destroyer_ship", "freighter_ship", "elite_ship"};

    // Method to validate the Spaceship selected;
    public static void validateSpaceship(String selectedSpaceship) throws SpaceshipInvalidValuesException{

        // For loop going in each spaceship value of the Array;
        for (String spaceship : VALID_SPACESHIPS) {

            // If one of the values on array is equal the selected spaceship;
            if (spaceship.equals(selectedSpaceship)) {

                // End of the Method;
                return;
            }
        }

        // Throwing Exception;
        throw new SpaceshipInvalidValuesException("Selected Spaceship");
    }

    // Method to validate the values of the Spaceships;
    public static void validateSpaceshipValues(SpaceshipUpdateDTO spaceshipUpdateTDO, SpaceShip spaceship) {

        // If the Cash value is less than 0;
        if (spaceship.getUser().getCash() - spaceshipUpdateTDO.getCash() < 0) {
            
            // Throwing Exception;
            throw new SpaceshipInvalidValuesException("Cash");
        }

        // If the life is between 1 and 20;
        else if (spaceshipUpdateTDO.getSpaceshipValuesDTO().getLife() < 1 || spaceshipUpdateTDO.getSpaceshipValuesDTO().getLife() > 20) {
            
            // Throwing Exception;
            throw new SpaceshipInvalidValuesException("Spaceship Life");
        }

        // If the speed is between 1 and 20;
        else if (spaceshipUpdateTDO.getSpaceshipValuesDTO().getSpeed() < 1 || spaceshipUpdateTDO.getSpaceshipValuesDTO().getSpeed() > 20) {
            
            // Throwing Exception;
            throw new SpaceshipInvalidValuesException("Spaceship Speed");
        }

        // If the damage is between 1 and 20;
        else if (spaceshipUpdateTDO.getSpaceshipValuesDTO().getDamage() < 1 || spaceshipUpdateTDO.getSpaceshipValuesDTO().getDamage() > 20) {
            
            // Throwing Exception;
            throw new SpaceshipInvalidValuesException("Spaceship Damage");
        }
    }

    // Method to verify if exists Spaceship;
    public static void verifySpaceship(SpaceShip spaceship) throws SpaceshipInvalidValuesException {
        
        // If the Spaceship is null;
        if (spaceship == null) {

            // Throwing Exception;
            throw new SpaceshipInvalidValuesException("ID");
        }
    }
}