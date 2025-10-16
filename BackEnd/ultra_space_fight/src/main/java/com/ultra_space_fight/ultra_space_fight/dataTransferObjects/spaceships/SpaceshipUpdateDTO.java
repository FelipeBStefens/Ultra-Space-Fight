// Package;
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships;

// Declaring SpaceshipUpdateDTO class;
public class SpaceshipUpdateDTO {
    
    // Attributes of SpaceshipUpdateDTO class;
    private int cash;
    private SpaceshipValuesDTO spaceshipValuesTDO;

    // Empty constructor;
    public SpaceshipUpdateDTO() {}

    // Constructor;
    public SpaceshipUpdateDTO(int cash, SpaceshipValuesDTO spaceshipValuesTDO) {
        
        // Initializing the Attribute values;
        this.cash = cash;
        this.spaceshipValuesTDO = spaceshipValuesTDO;
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
        return spaceshipValuesTDO;
    }

    public void setSpaceshipValuesDTO(SpaceshipValuesDTO spaceshipValuesTDO) {
        this.spaceshipValuesTDO = spaceshipValuesTDO;
    }
}
