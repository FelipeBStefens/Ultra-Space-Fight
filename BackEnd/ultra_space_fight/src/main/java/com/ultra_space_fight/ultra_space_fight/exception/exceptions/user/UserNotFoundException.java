// Package;
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.user;

// UserNotFound Exception;
public class UserNotFoundException extends RuntimeException {
    
    // Constructor;
    public UserNotFoundException() {
        
        // Mensage;
        super("User not found on the Database");
    }
}