
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships;


public class SpaceshipUpdateDTO {
    

    private int cash;
    private SpaceshipValuesDTO spaceshipValuesDTO;


    public SpaceshipUpdateDTO() {}


    public SpaceshipUpdateDTO(int cash, SpaceshipValuesDTO spaceshipValuesDTO) {
        

        this.cash = cash;
        this.spaceshipValuesDTO = spaceshipValuesDTO;
    }


    public int getCash() {
        return cash;
    }

    public void setCash(int cash) {
        this.cash = cash;
    }


    public SpaceshipValuesDTO getSpaceshipValuesDTO() {
        return spaceshipValuesDTO;
    }

    public void setSpaceshipValuesDTO(SpaceshipValuesDTO spaceshipValuesDTO) {
        this.spaceshipValuesDTO = spaceshipValuesDTO;
    }
}
