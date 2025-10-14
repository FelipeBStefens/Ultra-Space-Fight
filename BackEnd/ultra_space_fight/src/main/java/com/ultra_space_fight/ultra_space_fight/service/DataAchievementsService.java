package com.ultra_space_fight.ultra_space_fight.service;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DataAchievementNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DataAchievementUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.RankingException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.DataAchievementDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.UserDAO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.AchievementsTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.RankingScoreMatchTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.RankingScoreTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.ScoreCashTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.ScoreTDO;

@Service
public class DataAchievementsService {
    
    private final UserDAO userDAO;
    private final DataAchievementDAO dataAchievementDAO;
    
    public DataAchievementsService(DataAchievementDAO dataAchievementDAO, UserDAO userDAO) {
        this.dataAchievementDAO = dataAchievementDAO;
        this.userDAO = userDAO;
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
            throw new RankingException();
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
            throw new RankingException();
        }
        return listRankingScoreMatchTDO;
    }

    public AchievementsTDO getAchievements(long id) {

        if (id <= 0) {
            throw new DataAchievementUnauthorizedException("ID");
        }

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

    public ScoreTDO updateScoreCash(long id, ScoreCashTDO scoreCashTDO) {

        if (id <= 0) {
            throw new DataAchievementUnauthorizedException("ID");
        }
        if (scoreCashTDO == null) {
            throw new DataAchievementUnauthorizedException("ScoreCashTDO");
        }

        ScoreTDO scoreTDO = null;

        try {
            DataAchievements dataAchievements = 
                dataAchievementDAO.read(id);

            if (dataAchievements == null) {
                throw new DataAchievementNotFoundException();
            }

            dataAchievements.setScore(dataAchievements.getScore() + scoreCashTDO.getScore());
            
            dataAchievements.getUser().setCash(dataAchievements.getUser().getCash() + scoreCashTDO.getCash());
            
            if (scoreCashTDO.getScore() > dataAchievements.getScoreMatch()) {
                dataAchievements.setScoreMatch(scoreCashTDO.getScore());
            }
            
            userDAO.update(dataAchievements.getUser());
            dataAchievementDAO.update(dataAchievements);

            scoreTDO = new ScoreTDO(
                dataAchievements.getScore(), dataAchievements.getScoreMatch());
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return scoreTDO;
    }
}