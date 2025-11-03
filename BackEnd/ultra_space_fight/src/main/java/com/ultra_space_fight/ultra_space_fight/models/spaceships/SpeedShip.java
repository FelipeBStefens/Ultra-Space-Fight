
package com.ultra_space_fight.ultra_space_fight.models.spaceships;


import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;


public class SpeedShip extends SpaceShip {
    

    public SpeedShip() {
        super(5, 10, 5);
    };
    

    public SpeedShip(int life, int speed, int damage, User user) {
        super(life, speed, damage, user);
    }


    public SpeedShip(User user) {
        super(5, 10, 5, user); 
    }
}