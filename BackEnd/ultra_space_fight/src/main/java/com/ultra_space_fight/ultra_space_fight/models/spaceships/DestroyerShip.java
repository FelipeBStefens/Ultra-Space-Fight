
package com.ultra_space_fight.ultra_space_fight.models.spaceships;


import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;


public class DestroyerShip extends SpaceShip {


    public DestroyerShip() {
        super(5, 5, 10);
    };
    

    public DestroyerShip(int life, int speed, int damage, User user) {
        super(life, speed, damage, user);
    }


    public DestroyerShip(User user) {
        super(5, 5, 10, user); 
    }
}