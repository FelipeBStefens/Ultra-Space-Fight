
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.user;


public class UserNotFoundException extends RuntimeException {
    

    public UserNotFoundException() {
        

        super("User not found on the Database");
    }
}