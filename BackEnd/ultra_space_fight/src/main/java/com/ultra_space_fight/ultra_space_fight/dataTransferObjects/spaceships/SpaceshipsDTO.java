package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships;

public class SpaceshipsDTO {
    
    private int cash;
    private SpaceshipValuesDTO standartShip;
    private SpaceshipValuesDTO speedShip;
    private SpaceshipValuesDTO destroyerShip;
    private SpaceshipValuesDTO freighterShip;
    private SpaceshipValuesDTO eliteShip;

    public SpaceshipsDTO() {}

    public SpaceshipsDTO(int cash, SpaceshipValuesDTO standartShip, SpaceshipValuesDTO speedShip, SpaceshipValuesDTO destroyerShip, SpaceshipValuesDTO freighterShip, SpaceshipValuesDTO eliteShip) {
        this.cash = cash;
        this.destroyerShip = destroyerShip;
        this.eliteShip = eliteShip;
        this.freighterShip = freighterShip;
        this.speedShip = speedShip;
        this.standartShip = standartShip;
    }

    public int getCash() {
        return cash;
    }

    public void setCash(int cash) {
        this.cash = cash;
    }

    public SpaceshipValuesDTO getStandartShip() {
        return standartShip;
    }

    public void setStandartShip(SpaceshipValuesDTO standartShip) {
        this.standartShip = standartShip;
    }

    public SpaceshipValuesDTO getSpeedShip() {
        return speedShip;
    }

    public void setSpeedShip(SpaceshipValuesDTO speedShip) {
        this.speedShip = speedShip;
    }

    public SpaceshipValuesDTO getDestroyerShip() {
        return destroyerShip;
    }

    public void setDestroyerShip(SpaceshipValuesDTO destroyerShip) {
        this.destroyerShip = destroyerShip;
    }

    public SpaceshipValuesDTO getFreighterShip() {
        return freighterShip;
    }

    public void setFreighterShip(SpaceshipValuesDTO freighterShip) {
        this.freighterShip = freighterShip;
    }

    public SpaceshipValuesDTO getEliteShip() {
        return eliteShip;
    }

    public void setEliteShip(SpaceshipValuesDTO eliteShip) {
        this.eliteShip = eliteShip;
    }
}