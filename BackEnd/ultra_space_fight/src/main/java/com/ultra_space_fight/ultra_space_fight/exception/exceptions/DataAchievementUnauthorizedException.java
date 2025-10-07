package com.ultra_space_fight.ultra_space_fight.exception.exceptions;

public class DataAchievementUnauthorizedException extends RuntimeException{
    
    public DataAchievementUnauthorizedException(String value) {
        super("Data Achievement value unauthorized on the Server: " + value);
    }
}
