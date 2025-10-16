// Package;
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.user;

// UserInvalidValues Exception;
public class UserInvalidValuesException extends RuntimeException{
    
    // Constructor;
    public UserInvalidValuesException(String value) {
        
        // Mensage;
        super("Invalid value on the Database: " + value);
    }
}