
package com.ultra_space_fight.ultra_space_fight.models.spaceships;


import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;


public class FreighterShip extends SpaceShip {
    

    public FreighterShip() {
        super(20, 2, 5);
    };
    

    public FreighterShip(int life, int speed, int damage, User user) {
        super(life, speed, damage, user);
    }


    public FreighterShip(User user) {
        super(20, 2, 5, user);
    }
}