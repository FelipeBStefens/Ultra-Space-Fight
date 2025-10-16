// Package;
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements;

// Ranking Exception;
public class RankingException extends RuntimeException{
    
    // Constructor;
    public RankingException() {
        
        // Mensage;
        super("The Ranking could not be retrieved.");
    }
}