package com.ultra_space_fight.ultra_space_fight.exception.exceptions;

public class DataAchievementNotFoundException extends RuntimeException{
    
    public DataAchievementNotFoundException() {
        super("Data Achievement not found on the Database");
    }
}
