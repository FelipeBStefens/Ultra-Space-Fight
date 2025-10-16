// Package;
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships;

// Declaring SpaceshipsDTO class;
public class SpaceshipsDTO {
    
    // Attributes of SpacshipsDTO class; 
    private int cash;
    private SpaceshipValuesDTO standartShip;
    private SpaceshipValuesDTO speedShip;
    private SpaceshipValuesDTO destroyerShip;
    private SpaceshipValuesDTO freighterShip;
    private SpaceshipValuesDTO eliteShip;

    // Empty constructor;
    public SpaceshipsDTO() {}

    // Constructor;
    public SpaceshipsDTO(int cash, SpaceshipValuesDTO standartShip, SpaceshipValuesDTO speedShip, SpaceshipValuesDTO destroyerShip, SpaceshipValuesDTO freighterShip, SpaceshipValuesDTO eliteShip) {
        
        // Initializing the Attribute values;
        this.cash = cash;
        this.destroyerShip = destroyerShip;
        this.eliteShip = eliteShip;
        this.freighterShip = freighterShip;
        this.speedShip = speedShip;
        this.standartShip = standartShip;
    }

    // Getter and Setter of Cash;
    public int getCash() {
        return cash;
    }

    public void setCash(int cash) {
        this.cash = cash;
    }

    // Getter and Setter of Standart Ship;
    public SpaceshipValuesDTO getStandartShip() {
        return standartShip;
    }

    public void setStandartShip(SpaceshipValuesDTO standartShip) {
        this.standartShip = standartShip;
    }

    // Getter and Setter of Speed Ship;
    public SpaceshipValuesDTO getSpeedShip() {
        return speedShip;
    }

    public void setSpeedShip(SpaceshipValuesDTO speedShip) {
        this.speedShip = speedShip;
    }

    // Getter and Setter of Destroyer Ship;
    public SpaceshipValuesDTO getDestroyerShip() {
        return destroyerShip;
    }

    public void setDestroyerShip(SpaceshipValuesDTO destroyerShip) {
        this.destroyerShip = destroyerShip;
    }

    // Getter and Setter of Freighter Ship;
    public SpaceshipValuesDTO getFreighterShip() {
        return freighterShip;
    }

    public void setFreighterShip(SpaceshipValuesDTO freighterShip) {
        this.freighterShip = freighterShip;
    }

    // Getter and Setter of Elite Ship;
    public SpaceshipValuesDTO getEliteShip() {
        return eliteShip;
    }

    public void setEliteShip(SpaceshipValuesDTO eliteShip) {
        this.eliteShip = eliteShip;
    }
}