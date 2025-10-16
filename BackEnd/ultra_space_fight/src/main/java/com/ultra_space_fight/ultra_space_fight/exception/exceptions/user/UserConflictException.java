// Package;
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.user;

// UserConflict Exception;
public class UserConflictException extends RuntimeException {
    
    // Constructor;
    public UserConflictException() {
        
        // Mensage;
        super("Username or E-Mail already used by another Account");
    }
}