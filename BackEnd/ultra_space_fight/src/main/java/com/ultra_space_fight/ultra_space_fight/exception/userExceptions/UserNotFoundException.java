package com.ultra_space_fight.ultra_space_fight.exception.userExceptions;


public class UserNotFoundException extends RuntimeException {
    
    public UserNotFoundException() {
        super("User not found on the Database");
    }
}
