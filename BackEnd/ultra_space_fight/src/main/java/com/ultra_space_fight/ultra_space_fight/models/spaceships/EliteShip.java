
package com.ultra_space_fight.ultra_space_fight.models.spaceships;


import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;


public class EliteShip extends SpaceShip {
    

    public EliteShip() {
        super(20, 10, 10); 
    };


    public EliteShip(int life, int speed, int damage, User user) {
        super(life, speed, damage, user);
    }


    public EliteShip(User user) {
        super(20, 10, 10, user); 
    }
}