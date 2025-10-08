package com.ultra_space_fight.ultra_space_fight.exception.exceptions;

public class UserConflictException extends RuntimeException {
    
    public UserConflictException() {
        super("Username or E-Mail already used by another Account");
    }
}
