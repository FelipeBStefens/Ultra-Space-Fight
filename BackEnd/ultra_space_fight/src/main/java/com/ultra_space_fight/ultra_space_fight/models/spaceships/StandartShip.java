
package com.ultra_space_fight.ultra_space_fight.models.spaceships;


import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;


public final class StandartShip extends SpaceShip {
    

    public StandartShip() {
        super(10, 5, 5);
    };
    

    public StandartShip(int life, int speed, int damage, User user) {
        super(life, speed, damage, user);
    }


    public StandartShip(User user) {
        super(10, 5, 5, user); 
    }
}