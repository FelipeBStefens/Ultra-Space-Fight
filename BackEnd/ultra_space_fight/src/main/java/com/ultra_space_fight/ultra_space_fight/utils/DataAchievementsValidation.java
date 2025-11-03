
package com.ultra_space_fight.ultra_space_fight.utils;


import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score.AchievementsCashDTO;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.DataAchievementNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.DataAchievementUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;


public class DataAchievementsValidation {


    public static void updateCash(DataAchievements dataAchievements, AchievementsCashDTO achievementsCashDTO) {
        

        int newCash = dataAchievements.getUser().getCash() + achievementsCashDTO.getCash();
        

        dataAchievements.getUser().setCash(newCash);
    }


    public static void updateScore(DataAchievements dataAchievements, AchievementsCashDTO achievementsCashDTO) {
        

        int newScore = dataAchievements.getScore() + achievementsCashDTO.getScore();
        

        dataAchievements.setScore(newScore);
    }


    public static void updateScoreMatch(DataAchievements dataAchievements, AchievementsCashDTO achievementsCashDTO) {
        

        if (achievementsCashDTO.getScore() > dataAchievements.getScoreMatch()) {
            

            dataAchievements.setScoreMatch(achievementsCashDTO.getScore());
        }
    }


    public static void updateDefeatedEnemies(DataAchievements dataAchievements, AchievementsCashDTO achievementsCashDTO) {


        int newDefeatedEnemies = dataAchievements.getDefeatedEnemies() + achievementsCashDTO.getDefeatedEnemies();


        dataAchievements.setDefeatedEnemies(newDefeatedEnemies);
    }


    public static void updateDefeatedElite(DataAchievements dataAchievements, AchievementsCashDTO achievementsCashDTO) {


        int newDefeatedElite = dataAchievements.getDefeatedElite() + achievementsCashDTO.getDefeatedElite();


        dataAchievements.setDefeatedElite(newDefeatedElite);
    }


    public static void updateDefeatedBoss(DataAchievements dataAchievements, AchievementsCashDTO achievementsCashDTO) {


        int newDefeatedBoss = dataAchievements.getDefeatedBoss() + achievementsCashDTO.getDefeatedBoss();


        dataAchievements.setDefeatedBoss(newDefeatedBoss);
    }


    public static void verifyDataAchievements(DataAchievements dataAchievements) throws DataAchievementNotFoundException {
        

        if (dataAchievements == null) {
            

            throw new DataAchievementNotFoundException();
        }
    }


    public static void verifyAchievementsCash(AchievementsCashDTO achievementsCashDTO) throws DataAchievementUnauthorizedException {
        

        if (achievementsCashDTO == null) {
            

            throw new DataAchievementUnauthorizedException("AchievementsCashDTO");
        }
    }
}
