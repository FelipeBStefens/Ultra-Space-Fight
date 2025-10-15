package com.ultra_space_fight.ultra_space_fight.exception.exceptions.user;

public class UserUnauthorizedException extends RuntimeException {

    public UserUnauthorizedException(String value) {
        super("User value unauthorized on the Server: " + value);
    }
}