package com.ultra_space_fight.ultra_space_fight.exception.exceptions;

public class UserInvalidValuesException extends RuntimeException{
    
    public UserInvalidValuesException(String value) {
        super("Invalid value on the Database: " + value);
    }
}
