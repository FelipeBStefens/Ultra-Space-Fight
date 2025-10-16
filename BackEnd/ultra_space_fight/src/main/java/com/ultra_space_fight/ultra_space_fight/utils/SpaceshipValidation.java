package com.ultra_space_fight.ultra_space_fight.utils;

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships.SpaceshipUpdateDTO;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.spaceships.SpaceshipInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpaceShip;

public class SpaceshipValidation {
    
    private static final String[] VALID_SPACESHIPS = {"standart_ship", "speed_ship", "destroyer_ship", "freighter_ship", "elite_ship"};

    public static void verifySpaceship(SpaceShip spaceship) throws SpaceshipInvalidValuesException {
        if (spaceship == null) {
            throw new SpaceshipInvalidValuesException("ID");
        }
    }

    public static void validateSpaceship(String selectedSpaceship) throws SpaceshipInvalidValuesException{

        for (String spaceship : VALID_SPACESHIPS) {
            if (spaceship.equals(selectedSpaceship)) {
                return;
            }
        }
        throw new SpaceshipInvalidValuesException("Selected Spaceship");
    }

    public static void validateSpaceshipValues(SpaceshipUpdateDTO spaceshipUpdateTDO, SpaceShip spaceship) {

        if (spaceship.getUser().getCash() - spaceshipUpdateTDO.getCash() < 0) {
            throw new SpaceshipInvalidValuesException("Cash");
        }
        else if (spaceshipUpdateTDO.getSpaceshipValuesTDO().getLife() < 1 || spaceshipUpdateTDO.getSpaceshipValuesTDO().getLife() > 20) {
            throw new SpaceshipInvalidValuesException("Spaceship Life");
        }
        else if (spaceshipUpdateTDO.getSpaceshipValuesTDO().getSpeed() < 1 || spaceshipUpdateTDO.getSpaceshipValuesTDO().getSpeed() > 20) {
            throw new SpaceshipInvalidValuesException("Spaceship Speed");
        }
        else if (spaceshipUpdateTDO.getSpaceshipValuesTDO().getDamage() < 1 || spaceshipUpdateTDO.getSpaceshipValuesTDO().getDamage() > 20) {
            throw new SpaceshipInvalidValuesException("Spaceship Damage");
        }
    }
}
