// Package;
package com.ultra_space_fight.ultra_space_fight.utils;

// Imports;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score.ScoreCashDTO;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.DataAchievementNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.DataAchievementUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;

// Declaring the validations class of the DataAchivements;
public class DataAchievementsValidation {

    // Method to update the Cash;
    public static void updateCash(DataAchievements dataAchievements, ScoreCashDTO scoreCashDTO) {
        
        // Defining the new Cash value;
        int newCash = dataAchievements.getUser().getCash() + scoreCashDTO.getCash();
        
        // Setting the new Cash value;
        dataAchievements.getUser().setCash(newCash);
    }

    // Method to update the Score;
    public static void updateScore(DataAchievements dataAchievements, ScoreCashDTO scoreCashDTO) {
        
        // Defining the new Score value;
        int newScore = dataAchievements.getScore() + scoreCashDTO.getScore();
        
        // Setting the new Score value;
        dataAchievements.setScore(newScore);
    }

    // Method to update the Score in a Match;
    public static void updateScoreMatch(DataAchievements dataAchievements, ScoreCashDTO scoreCashDTO) {
        
        // If the Score on the Database is less than the Score of the Match;
        if (scoreCashDTO.getScore() > dataAchievements.getScoreMatch()) {
            
            // Setting the new Score Match;
            dataAchievements.setScoreMatch(scoreCashDTO.getScore());
        }
    }

    // Method to verify if exists DataAchievements;
    public static void verifyDataAchievements(DataAchievements dataAchievements) throws DataAchievementNotFoundException {
        
        // If the DataAchievements is null;
        if (dataAchievements == null) {
            
            // Throw new Exception;
            throw new DataAchievementNotFoundException();
        }
    }

    // Method to verify if exists ScoreCash;
    public static void verifyScoreCash(ScoreCashDTO scoreCashDTO) throws DataAchievementUnauthorizedException {
        
        // If the ScoreCash is null;
        if (scoreCashDTO == null) {
            
            // Throw new Exception;
            throw new DataAchievementUnauthorizedException("ScoreCashTDO");
        }
    }
}
