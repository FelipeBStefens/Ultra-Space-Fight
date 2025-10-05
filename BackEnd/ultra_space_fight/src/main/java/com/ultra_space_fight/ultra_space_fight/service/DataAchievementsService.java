package com.ultra_space_fight.ultra_space_fight.service;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DataAchievementNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.DataAchievementDAO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.AchievementsTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.RankingScoreMatchTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.RankingScoreTDO;

@Service
public class DataAchievementsService {
    
    private final DataAchievementDAO dataAchievementDAO;
    
    public DataAchievementsService(DataAchievementDAO dataAchievementDAO) {
        this.dataAchievementDAO = dataAchievementDAO;
    }

    public ArrayList<RankingScoreTDO> getRankingList() {

        ArrayList<RankingScoreTDO> listRankingScoreTDO = new ArrayList<>();
        try {
            
            ArrayList<DataAchievements> arrayListDataAchievementses =
                new ArrayList<>(dataAchievementDAO.selectTopUsersByScore());
            
            for (DataAchievements dataAchievement : arrayListDataAchievementses) {
                
                RankingScoreTDO rankingScoreTDO = new RankingScoreTDO(
                    dataAchievement.getScore(), dataAchievement.getUser().getUsername());
                
                listRankingScoreTDO.add(rankingScoreTDO);
            } 
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return listRankingScoreTDO;
    }

    public ArrayList<RankingScoreMatchTDO> getRankingMatchList() {

        ArrayList<RankingScoreMatchTDO> listRankingScoreMatchTDO = new ArrayList<>();
        try {
            
            ArrayList<DataAchievements> arrayListDataAchievementses =
                new ArrayList<>(dataAchievementDAO.selectTopUsersByScore());
            
            for (DataAchievements dataAchievement : arrayListDataAchievementses) {
                
                RankingScoreMatchTDO rankingScoreTDO = new RankingScoreMatchTDO(
                    dataAchievement.getScoreMatch(), dataAchievement.getUser().getUsername());
                
                listRankingScoreMatchTDO.add(rankingScoreTDO);
            } 
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return listRankingScoreMatchTDO;
    }

    public AchievementsTDO getAchievements(long id) {

        AchievementsTDO achievementsTDO = null;

        try {
            DataAchievements dataAchievements = 
                dataAchievementDAO.read(id);

            if (dataAchievements == null) {
                throw new DataAchievementNotFoundException();
            }

            achievementsTDO = new AchievementsTDO(
                dataAchievements.getScore(), dataAchievements.getScoreMatch(),
                dataAchievements.getDefeatedEnemies(), dataAchievements.getDefeatedElite(), 
                dataAchievements.getDefeatedBoss());
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return achievementsTDO;
    }
}