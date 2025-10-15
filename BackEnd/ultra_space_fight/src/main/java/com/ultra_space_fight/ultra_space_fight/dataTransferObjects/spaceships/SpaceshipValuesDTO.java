package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships;

public class SpaceshipValuesDTO {
    
    private int life;
    private int speed;
    private int damage;

    public SpaceshipValuesDTO() {}

    public SpaceshipValuesDTO(int life, int speed, int damage) {
        this.damage = damage;
        this.life = life;
        this.speed = speed;
    }

    public int getLife() {
        return life;
    }

    public void setLife(int life) {
        this.life = life;
    }

    public int getSpeed() {
        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    public int getDamage() {
        return damage;
    }

    public void setDamage(int damage) {
        this.damage = damage;
    }
}