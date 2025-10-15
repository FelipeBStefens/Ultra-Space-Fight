package com.ultra_space_fight.ultra_space_fight.service;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.configurations.AchievementsDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.ranking.RankingScoreDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.ranking.RankingScoreMatchDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score.ScoreCashDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score.ScoreDTO;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DataAchievementNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DataAchievementUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.RankingException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.DataAchievementDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.UserDAO;

@Service
public class DataAchievementsService {
    
    private final UserDAO userDAO;
    private final DataAchievementDAO dataAchievementDAO;
    
    public DataAchievementsService(DataAchievementDAO dataAchievementDAO, UserDAO userDAO) {
        this.dataAchievementDAO = dataAchievementDAO;
        this.userDAO = userDAO;
    }

    public ArrayList<RankingScoreDTO> getRankingList() {

        ArrayList<RankingScoreDTO> listRankingScoreTDO = new ArrayList<>();
        try {
            
            ArrayList<DataAchievements> arrayListDataAchievementses =
                new ArrayList<>(dataAchievementDAO.selectTopUsersByScore());
            
            for (DataAchievements dataAchievement : arrayListDataAchievementses) {
                
                RankingScoreDTO rankingScoreTDO = new RankingScoreDTO(
                    dataAchievement.getScore(), dataAchievement.getUser().getUsername());
                
                listRankingScoreTDO.add(rankingScoreTDO);
            } 
        }
        catch (SQLException e) {
            throw new RankingException();
        }
        return listRankingScoreTDO;
    }

    public ArrayList<RankingScoreMatchDTO> getRankingMatchList() {

        ArrayList<RankingScoreMatchDTO> listRankingScoreMatchTDO = new ArrayList<>();
        try {
            
            ArrayList<DataAchievements> arrayListDataAchievementses =
                new ArrayList<>(dataAchievementDAO.selectTopUsersByScore());
            
            for (DataAchievements dataAchievement : arrayListDataAchievementses) {
                
                RankingScoreMatchDTO rankingScoreTDO = new RankingScoreMatchDTO(
                    dataAchievement.getScoreMatch(), dataAchievement.getUser().getUsername());
                
                listRankingScoreMatchTDO.add(rankingScoreTDO);
            } 
        }
        catch (SQLException e) {
            throw new RankingException();
        }
        return listRankingScoreMatchTDO;
    }

    public AchievementsDTO getAchievements(long id) {

        if (id <= 0) {
            throw new DataAchievementUnauthorizedException("ID");
        }

        AchievementsDTO achievementsTDO = null;

        try {
            DataAchievements dataAchievements = 
                dataAchievementDAO.read(id);

            if (dataAchievements == null) {
                throw new DataAchievementNotFoundException();
            }

            achievementsTDO = new AchievementsDTO(
                dataAchievements.getScore(), dataAchievements.getScoreMatch(),
                dataAchievements.getDefeatedEnemies(), dataAchievements.getDefeatedElite(), 
                dataAchievements.getDefeatedBoss());
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return achievementsTDO;
    }

    public ScoreDTO updateScoreCash(long id, ScoreCashDTO scoreCashTDO) {

        if (id <= 0) {
            throw new DataAchievementUnauthorizedException("ID");
        }
        if (scoreCashTDO == null) {
            throw new DataAchievementUnauthorizedException("ScoreCashTDO");
        }

        ScoreDTO scoreTDO = null;

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

            scoreTDO = new ScoreDTO(
                dataAchievements.getScore(), dataAchievements.getScoreMatch());
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return scoreTDO;
    }
}