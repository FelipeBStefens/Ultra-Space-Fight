package com.ultra_space_fight.ultra_space_fight.utils;

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score.ScoreCashDTO;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.DataAchievementNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.DataAchievementUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;

public class DataAchievementsValidation {
    
    public static void verifyDataAchievements(DataAchievements dataAchievements) throws DataAchievementNotFoundException {
        if (dataAchievements == null) {
            throw new DataAchievementNotFoundException();
        }
    }

    public static void verifyScoreCash(ScoreCashDTO scoreCashDTO) throws DataAchievementUnauthorizedException {
        if (scoreCashDTO == null) {
            throw new DataAchievementUnauthorizedException("ScoreCashTDO");
        }
    }

    public static void updateCash(DataAchievements dataAchievements, ScoreCashDTO scoreCashDTO) {
        dataAchievements.getUser().setCash(dataAchievements.getUser().getCash() + scoreCashDTO.getCash());
    }

    public static void updateScore(DataAchievements dataAchievements, ScoreCashDTO scoreCashDTO) {
        dataAchievements.setScore(dataAchievements.getScore() + scoreCashDTO.getScore());
    }

    public static void updateScoreMatch(DataAchievements dataAchievements, ScoreCashDTO scoreCashDTO) {
        if (scoreCashDTO.getScore() > dataAchievements.getScoreMatch()) {
            dataAchievements.setScoreMatch(scoreCashDTO.getScore());
        }
    }
}
