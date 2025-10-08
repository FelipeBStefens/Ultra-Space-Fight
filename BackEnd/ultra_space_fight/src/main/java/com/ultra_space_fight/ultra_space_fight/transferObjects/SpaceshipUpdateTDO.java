package com.ultra_space_fight.ultra_space_fight.transferObjects;

public class SpaceshipUpdateTDO {
    
    private int cash;
    private SpaceshipValuesTDO spaceshipValuesTDO;

    public SpaceshipUpdateTDO() {}

    public SpaceshipUpdateTDO(int cash, SpaceshipValuesTDO spaceshipValuesTDO) {
        this.cash = cash;
        this.spaceshipValuesTDO = spaceshipValuesTDO;
    }

    public int getCash() {
        return cash;
    }

    public void setCash(int cash) {
        this.cash = cash;
    }

    public SpaceshipValuesTDO getSpaceshipValuesTDO() {
        return spaceshipValuesTDO;
    }

    public void setSpaceshipValuesTDO(SpaceshipValuesTDO spaceshipValuesTDO) {
        this.spaceshipValuesTDO = spaceshipValuesTDO;
    }
}
