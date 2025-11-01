// Package;
package com.ultra_space_fight.ultra_space_fight.utils;

// Imports;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score.AchievementsCashDTO;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.DataAchievementNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.DataAchievementUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;

// Declaring the validations class of the DataAchivements;
public class DataAchievementsValidation {

    // Method to update the Cash;
    public static void updateCash(DataAchievements dataAchievements, AchievementsCashDTO achievementsCashDTO) {
        
        // Defining the new Cash value;
        int newCash = dataAchievements.getUser().getCash() + achievementsCashDTO.getCash();
        
        // Setting the new Cash value;
        dataAchievements.getUser().setCash(newCash);
    }

    // Method to update the Score;
    public static void updateScore(DataAchievements dataAchievements, AchievementsCashDTO achievementsCashDTO) {
        
        // Defining the new Score value;
        int newScore = dataAchievements.getScore() + achievementsCashDTO.getScore();
        
        // Setting the new Score value;
        dataAchievements.setScore(newScore);
    }

    // Method to update the Score in a Match;
    public static void updateScoreMatch(DataAchievements dataAchievements, AchievementsCashDTO achievementsCashDTO) {
        
        // If the Score on the Database is less than the Score of the Match;
        if (achievementsCashDTO.getScore() > dataAchievements.getScoreMatch()) {
            
            // Setting the new Score Match;
            dataAchievements.setScoreMatch(achievementsCashDTO.getScore());
        }
    }

    // Method to updated Defeated Enemies;
    public static void updateDefeatedEnemies(DataAchievements dataAchievements, AchievementsCashDTO achievementsCashDTO) {

        // Defining new Defeated Enemies;
        int newDefeatedEnemies = dataAchievements.getDefeatedEnemies() + achievementsCashDTO.getDefeatedEnemies();

        // Setting the new Defeated Enemies;
        dataAchievements.setDefeatedEnemies(newDefeatedEnemies);
    }

    // Method to updated Defeated Elite;
    public static void updateDefeatedElite(DataAchievements dataAchievements, AchievementsCashDTO achievementsCashDTO) {

        // Defining new Defeated Elite;
        int newDefeatedElite = dataAchievements.getDefeatedElite() + achievementsCashDTO.getDefeatedElite();

        // Setting the new Defeated Elite;
        dataAchievements.setDefeatedElite(newDefeatedElite);
    }

    // Method to updated Defeated Boss;
    public static void updateDefeatedBoss(DataAchievements dataAchievements, AchievementsCashDTO achievementsCashDTO) {

        // Defining new Defeated Boss;
        int newDefeatedBoss = dataAchievements.getDefeatedBoss() + achievementsCashDTO.getDefeatedBoss();

        // Setting the new Defeated Boss;
        dataAchievements.setDefeatedBoss(newDefeatedBoss);
    }

    // Method to verify if exists DataAchievements;
    public static void verifyDataAchievements(DataAchievements dataAchievements) throws DataAchievementNotFoundException {
        
        // If the DataAchievements is null;
        if (dataAchievements == null) {
            
            // Throw new Exception;
            throw new DataAchievementNotFoundException();
        }
    }

    // Method to verify if exists AchievementsCash;
    public static void verifyAchievementsCash(AchievementsCashDTO achievementsCashDTO) throws DataAchievementUnauthorizedException {
        
        // If the ScoreCash is null;
        if (achievementsCashDTO == null) {
            
            // Throw new Exception;
            throw new DataAchievementUnauthorizedException("AchievementsCashDTO");
        }
    }
}
