// Declaring the package of the SpaceShip class;
package com.ultra_space_fight.ultra_space_fight.models.spaceships;

// Importing the User class from the userProfile package;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;

// Declaring the SpaceShip class as an abstract class;
public abstract class SpaceShip {
    
    // Attributes of the SpaceShip class;
    private long idShip;
    private int life;
    private int speed;
    private int damage;

    // Relation with User class;
    private User user;

    // Constructor of the SpaceShip class;
    public SpaceShip(int life, int speed, int damage, User user) {
        
        // Initializing the attributes of the SpaceShip class;
        this.life = life;
        this.speed = speed;
        this.damage = damage;
        this.user = user;
    }

    // Getter and Setter of the idShip;
    public long getIdShip() {
        return idShip;
    }

    public void setIdShip(long idShip) {
        this.idShip = idShip;
    }

    // Getter and Setter of the life;
    public int getLife() {
        return life;
    }

    public void setLife(int life) {
        this.life = life;
    }

    // Getter and Setter of the speed;
    public int getSpeed() {
        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    // Getter and Setter of the damage;
    public int getDamage() {
        return damage;
    }

    public void setDamage(int damage) {
        this.damage = damage;
    }

    // Getter and Setter of the User class;
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
