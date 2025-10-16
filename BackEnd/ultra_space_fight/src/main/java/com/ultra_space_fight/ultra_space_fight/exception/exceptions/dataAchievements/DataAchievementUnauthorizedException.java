// Package;
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements;

// DataAchievementUnauthorized Exception;
public class DataAchievementUnauthorizedException extends RuntimeException{
    
    // Constructor;
    public DataAchievementUnauthorizedException(String value) {
        
        // Mensage;
        super("Data Achievement value unauthorized on the Server: " + value);
    }
}