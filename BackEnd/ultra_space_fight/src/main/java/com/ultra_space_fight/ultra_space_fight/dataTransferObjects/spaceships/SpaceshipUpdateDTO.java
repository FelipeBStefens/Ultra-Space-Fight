// Package;
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships;

// Declaring SpaceshipUpdateDTO class;
public class SpaceshipUpdateDTO {
    
    // Attributes of SpaceshipUpdateDTO class;
    private int cash;
    private SpaceshipValuesDTO spaceshipValuesDTO;

    // Empty constructor;
    public SpaceshipUpdateDTO() {}

    // Constructor;
    public SpaceshipUpdateDTO(int cash, SpaceshipValuesDTO spaceshipValuesDTO) {
        
        // Initializing the Attribute values;
        this.cash = cash;
        this.spaceshipValuesDTO = spaceshipValuesDTO;
    }

    // Getter and Setter of Cash;
    public int getCash() {
        return cash;
    }

    public void setCash(int cash) {
        this.cash = cash;
    }

    // Getter and Setter of Spaceship Values;
    public SpaceshipValuesDTO getSpaceshipValuesDTO() {
        return spaceshipValuesDTO;
    }

    public void setSpaceshipValuesDTO(SpaceshipValuesDTO spaceshipValuesDTO) {
        this.spaceshipValuesDTO = spaceshipValuesDTO;
    }
}
