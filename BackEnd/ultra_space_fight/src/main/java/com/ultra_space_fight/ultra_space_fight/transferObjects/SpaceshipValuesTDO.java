package com.ultra_space_fight.ultra_space_fight.transferObjects;

public class SpaceshipValuesTDO {
    
    private int life;
    private int speed;
    private int damage;

    public SpaceshipValuesTDO() {}

    public SpaceshipValuesTDO(int life, int speed, int damage) {
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