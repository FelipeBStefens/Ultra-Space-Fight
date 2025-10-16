// Package;
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.user;

// UserUnauthorized Exception;
public class UserUnauthorizedException extends RuntimeException {

    // Constructor;
    public UserUnauthorizedException(String value) {
        
        // Mensage;
        super("User value unauthorized on the Server: " + value);
    }
}