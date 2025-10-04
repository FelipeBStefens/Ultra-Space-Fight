package com.ultra_space_fight.ultra_space_fight.transferObjects;

public class SpaceshipsTDO {
    
    private int cash;
    private int score;
    private SpaceshipValuesTDO standartShip;
    private SpaceshipValuesTDO speedShip;
    private SpaceshipValuesTDO destroyerShip;
    private SpaceshipValuesTDO freighterShip;
    private SpaceshipValuesTDO eliteShip;

    public SpaceshipsTDO() {}

    public SpaceshipsTDO(int cash, int score, SpaceshipValuesTDO standartShip, SpaceshipValuesTDO speedShip, SpaceshipValuesTDO destroyerShip, SpaceshipValuesTDO freighterShip, SpaceshipValuesTDO eliteShip) {
        this.cash = cash;
        this.score = score;
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

    public SpaceshipValuesTDO getStandartShip() {
        return standartShip;
    }

    public void setStandartShip(SpaceshipValuesTDO standartShip) {
        this.standartShip = standartShip;
    }

    public SpaceshipValuesTDO getSpeedShip() {
        return speedShip;
    }

    public void setSpeedShip(SpaceshipValuesTDO speedShip) {
        this.speedShip = speedShip;
    }

    public SpaceshipValuesTDO getDestroyerShip() {
        return destroyerShip;
    }

    public void setDestroyerShip(SpaceshipValuesTDO destroyerShip) {
        this.destroyerShip = destroyerShip;
    }

    public SpaceshipValuesTDO getFreighterShip() {
        return freighterShip;
    }

    public void setFreighterShip(SpaceshipValuesTDO freighterShip) {
        this.freighterShip = freighterShip;
    }

    public SpaceshipValuesTDO getEliteShip() {
        return eliteShip;
    }

    public void setEliteShip(SpaceshipValuesTDO eliteShip) {
        this.eliteShip = eliteShip;
    }

    public int getscore() {
        return score;
    }

    public void setscore(int score) {
        this.score = score;
    }
}