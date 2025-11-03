
package com.ultra_space_fight.ultra_space_fight.service;


import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.configurations.AchievementsDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.ranking.RankingScoreDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.ranking.RankingScoreMatchDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score.AchievementsCashDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.score.ScoreDTO;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.DataAchievementUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.RankingException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.database.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.DataAchievementDAO;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.UserDAO;
import com.ultra_space_fight.ultra_space_fight.utils.DataAchievementsValidation;
import com.ultra_space_fight.ultra_space_fight.utils.IdValidation;


@Service
public class DataAchievementsService {
    

    private final UserDAO userDAO;
    private final DataAchievementDAO dataAchievementDAO;
    

    public DataAchievementsService(DataAchievementDAO dataAchievementDAO, UserDAO userDAO) {
        

        this.dataAchievementDAO = dataAchievementDAO;
        this.userDAO = userDAO;
    }


    public ArrayList<RankingScoreDTO> getRankingList() {


        ArrayList<RankingScoreDTO> listRankingScoreDTO = new ArrayList<>();
        

        try {
            

            ArrayList<DataAchievements> arrayListDataAchievementses =
                new ArrayList<>(dataAchievementDAO.selectTopUsersByScore());
            

            for (DataAchievements dataAchievement : arrayListDataAchievementses) {
                

                RankingScoreDTO rankingScoreDTO = new RankingScoreDTO(
                    dataAchievement.getScore(), dataAchievement.getUser().getUsername());
                

                listRankingScoreDTO.add(rankingScoreDTO);
            } 
        }
        catch (SQLException e) {


            throw new RankingException();
        }


        return listRankingScoreDTO;
    }


    public ArrayList<RankingScoreMatchDTO> getRankingMatchList() {


        ArrayList<RankingScoreMatchDTO> listRankingScoreMatchDTO = new ArrayList<>();
        

        try {
            

            ArrayList<DataAchievements> arrayListDataAchievementses =
                new ArrayList<>(dataAchievementDAO.selectTopUsersByScore());
            

            for (DataAchievements dataAchievement : arrayListDataAchievementses) {
                

                RankingScoreMatchDTO rankingScoreDTO = new RankingScoreMatchDTO(
                    dataAchievement.getScoreMatch(), dataAchievement.getUser().getUsername());
                

                listRankingScoreMatchDTO.add(rankingScoreDTO);
            } 
        }
        catch (SQLException e) {


            throw new RankingException();
        }

        return listRankingScoreMatchDTO;
    }


    public AchievementsDTO getAchievements(long id) {


        IdValidation.validate(id, new DataAchievementUnauthorizedException("ID"));


        AchievementsDTO achievementsDTO = null;


        try {


            DataAchievements dataAchievements = dataAchievementDAO.read(id);


            DataAchievementsValidation.verifyDataAchievements(dataAchievements);


            achievementsDTO = new AchievementsDTO(
                dataAchievements.getScore(), dataAchievements.getScoreMatch(),
                dataAchievements.getDefeatedEnemies(), dataAchievements.getDefeatedElite(), 
                dataAchievements.getDefeatedBoss());
        }
        catch (SQLException e) {


            throw new DatabaseConnectionException(e);
        }


        return achievementsDTO;
    }


    public ScoreDTO updateAchievementsCash(long id, AchievementsCashDTO achievementsCashDTO) {


        IdValidation.validate(id, new DataAchievementUnauthorizedException("ID"));
        DataAchievementsValidation.verifyAchievementsCash(achievementsCashDTO);


        ScoreDTO scoreDTO = null;


        try {


            DataAchievements dataAchievements = dataAchievementDAO.read(id);


            DataAchievementsValidation.verifyDataAchievements(dataAchievements);


            DataAchievementsValidation.updateScore(dataAchievements, achievementsCashDTO);            
            DataAchievementsValidation.updateScoreMatch(dataAchievements, achievementsCashDTO);
            DataAchievementsValidation.updateCash(dataAchievements, achievementsCashDTO);
            DataAchievementsValidation.updateDefeatedEnemies(dataAchievements, achievementsCashDTO);
            DataAchievementsValidation.updateDefeatedElite(dataAchievements, achievementsCashDTO);
            DataAchievementsValidation.updateDefeatedBoss(dataAchievements, achievementsCashDTO);


            userDAO.update(dataAchievements.getUser());
            dataAchievementDAO.update(dataAchievements);


            scoreDTO = new ScoreDTO(
                dataAchievements.getScore(), dataAchievements.getScoreMatch());
        }
        catch (SQLException e) {


            throw new DatabaseConnectionException(e);
        }


        return scoreDTO;
    }
}