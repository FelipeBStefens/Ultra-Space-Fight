package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships;

public class SpaceshipUpdateDTO {
    
    private int cash;
    private SpaceshipValuesDTO spaceshipValuesTDO;

    public SpaceshipUpdateDTO() {}

    public SpaceshipUpdateDTO(int cash, SpaceshipValuesDTO spaceshipValuesTDO) {
        this.cash = cash;
        this.spaceshipValuesTDO = spaceshipValuesTDO;
    }

    public int getCash() {
        return cash;
    }

    public void setCash(int cash) {
        this.cash = cash;
    }

    public SpaceshipValuesDTO getSpaceshipValuesTDO() {
        return spaceshipValuesTDO;
    }

    public void setSpaceshipValuesTDO(SpaceshipValuesDTO spaceshipValuesTDO) {
        this.spaceshipValuesTDO = spaceshipValuesTDO;
    }
}
