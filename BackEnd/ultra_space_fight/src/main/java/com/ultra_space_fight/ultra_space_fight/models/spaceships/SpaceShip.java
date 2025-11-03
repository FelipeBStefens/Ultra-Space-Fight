
package com.ultra_space_fight.ultra_space_fight.models.spaceships;


import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;


public abstract class SpaceShip {
    

    protected long idShip;
    protected int life;
    protected int speed;
    protected int damage;


    protected User user;


    public SpaceShip() {};


    public SpaceShip(int life, int speed, int damage, User user) {
        

        this.life = life;
        this.speed = speed;
        this.damage = damage;
        this.user = user;
    }


    public SpaceShip(int life, int speed, int damage) {
        

        this.life = life;
        this.speed = speed;
        this.damage = damage;
    }


    public long getIdShip() {
        return idShip;
    }

    public void setIdShip(long idShip) {
        this.idShip = idShip;
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


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}