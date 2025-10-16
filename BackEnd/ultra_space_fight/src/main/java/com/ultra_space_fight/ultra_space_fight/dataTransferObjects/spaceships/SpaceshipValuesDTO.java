// Package;
package com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships;

// Declaring SpaceshipValuesDTO class;
public class SpaceshipValuesDTO {
    
    // Attributes of SpaceshipValuesDTO class;
    private int life;
    private int speed;
    private int damage;

    // Empty constructor;
    public SpaceshipValuesDTO() {}

    // Constructor;
    public SpaceshipValuesDTO(int life, int speed, int damage) {
        
        // Initializing the Attribute values;
        this.damage = damage;
        this.life = life;
        this.speed = speed;
    }

    // Getter and Setter of Life;
    public int getLife() {
        return life;
    }

    public void setLife(int life) {
        this.life = life;
    }

    // Getter and Setter of Speed;
    public int getSpeed() {
        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    // Getter and Setter of Damage;
    public int getDamage() {
        return damage;
    }

    public void setDamage(int damage) {
        this.damage = damage;
    }
}