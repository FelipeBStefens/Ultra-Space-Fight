// Package;
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements;

// DataAchievementNotFound Exception;
public class DataAchievementNotFoundException extends RuntimeException{
    
    // Constructor;
    public DataAchievementNotFoundException() {
        
        // Mensage;
        super("Data Achievement not found on the Database");
    }
}