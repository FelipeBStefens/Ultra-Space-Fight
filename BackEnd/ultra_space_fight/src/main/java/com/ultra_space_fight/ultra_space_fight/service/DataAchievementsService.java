// Package;
package com.ultra_space_fight.ultra_space_fight.service;

// Imports;
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

// DataAchievements Service class;
@Service
public class DataAchievementsService {
    
    // DAO properties;
    private final UserDAO userDAO;
    private final DataAchievementDAO dataAchievementDAO;
    
    // Constructor;
    public DataAchievementsService(DataAchievementDAO dataAchievementDAO, UserDAO userDAO) {
        
        // Initialyzing the DAO values;
        this.dataAchievementDAO = dataAchievementDAO;
        this.userDAO = userDAO;
    }

    // Method to get Ranking List;
    public ArrayList<RankingScoreDTO> getRankingList() {

        // declaring Rank List;
        ArrayList<RankingScoreDTO> listRankingScoreDTO = new ArrayList<>();
        
        // Try-Catch to Handle Exceptions;
        try {
            
            // Taking ArrayList of DataAchievements;
            ArrayList<DataAchievements> arrayListDataAchievementses =
                new ArrayList<>(dataAchievementDAO.selectTopUsersByScore());
            
            // For Loop getting each DataAchievement from the Array; 
            for (DataAchievements dataAchievement : arrayListDataAchievementses) {
                
                // Declaring the RankingScoreDTO;
                RankingScoreDTO rankingScoreDTO = new RankingScoreDTO(
                    dataAchievement.getScore(), dataAchievement.getUser().getUsername());
                
                // Adding it on the RankingScoreDTO;
                listRankingScoreDTO.add(rankingScoreDTO);
            } 
        }
        catch (SQLException e) {

            // Throw Exception;
            throw new RankingException();
        }

        // Return RankingScoreDTO List;
        return listRankingScoreDTO;
    }

    // Method to get Match Ranking List;
    public ArrayList<RankingScoreMatchDTO> getRankingMatchList() {

        // declaring Rank List;
        ArrayList<RankingScoreMatchDTO> listRankingScoreMatchDTO = new ArrayList<>();
        
        // Try-Catch to Handle Exceptions;
        try {
            
            // Taking ArrayList of DataAchievements;
            ArrayList<DataAchievements> arrayListDataAchievementses =
                new ArrayList<>(dataAchievementDAO.selectTopUsersByScore());
            
            // For Loop getting each DataAchievement from the Array; 
            for (DataAchievements dataAchievement : arrayListDataAchievementses) {
                
                // Declaring the RankingScoreMatchDTO;
                RankingScoreMatchDTO rankingScoreDTO = new RankingScoreMatchDTO(
                    dataAchievement.getScoreMatch(), dataAchievement.getUser().getUsername());
                
                // Adding it on the RankingScoreMatchDTO;
                listRankingScoreMatchDTO.add(rankingScoreDTO);
            } 
        }
        catch (SQLException e) {

            // Throw Exception;
            throw new RankingException();
        }
        // Return RankingScoreMatchDTO List;
        return listRankingScoreMatchDTO;
    }

    // Method to get Achievements by Id;
    public AchievementsDTO getAchievements(long id) {

        // Method to validate the Id;
        IdValidation.validate(id, new DataAchievementUnauthorizedException("ID"));

        // Declaring AchievementsDTO;
        AchievementsDTO achievementsDTO = null;

        // Try-Catch to Handle Exceptions;
        try {

            // Get Data Achievements by Id;
            DataAchievements dataAchievements = dataAchievementDAO.read(id);

            // Verify if exists DataAchievements;
            DataAchievementsValidation.verifyDataAchievements(dataAchievements);

            // Setting AchievementsDTO values;
            achievementsDTO = new AchievementsDTO(
                dataAchievements.getScore(), dataAchievements.getScoreMatch(),
                dataAchievements.getDefeatedEnemies(), dataAchievements.getDefeatedElite(), 
                dataAchievements.getDefeatedBoss());
        }
        catch (SQLException e) {

            // Throw Exception;
            throw new DatabaseConnectionException(e);
        }

        // Return AchievementsDTO;
        return achievementsDTO;
    }

    // Method to update Score and Cash; 
    public ScoreDTO updateAchievementsCash(long id, AchievementsCashDTO achievementsCashDTO) {

        // Methods to validate Id and ScoreCashDTO;
        IdValidation.validate(id, new DataAchievementUnauthorizedException("ID"));
        DataAchievementsValidation.verifyAchievementsCash(achievementsCashDTO);

        // Declaring ScoreDTO;
        ScoreDTO scoreDTO = null;

        // Try-Catch to Handle Exceptions;
        try {

            // Get Data Achievements by Id; 
            DataAchievements dataAchievements = dataAchievementDAO.read(id);

            // Verify if exists Data Achievements;
            DataAchievementsValidation.verifyDataAchievements(dataAchievements);

            // Update Score, Score Match and Cash; 
            DataAchievementsValidation.updateScore(dataAchievements, achievementsCashDTO);            
            DataAchievementsValidation.updateScoreMatch(dataAchievements, achievementsCashDTO);
            DataAchievementsValidation.updateCash(dataAchievements, achievementsCashDTO);
            DataAchievementsValidation.updateDefeatedEnemies(dataAchievements, achievementsCashDTO);
            DataAchievementsValidation.updateDefeatedElite(dataAchievements, achievementsCashDTO);
            DataAchievementsValidation.updateDefeatedBoss(dataAchievements, achievementsCashDTO);

            // Update DAOs values;
            userDAO.update(dataAchievements.getUser());
            dataAchievementDAO.update(dataAchievements);

            // Setting values of ScoreDTO;
            scoreDTO = new ScoreDTO(
                dataAchievements.getScore(), dataAchievements.getScoreMatch());
        }
        catch (SQLException e) {

            // Throw Exception;
            throw new DatabaseConnectionException(e);
        }

        // Return ScoreDTO;
        return scoreDTO;
    }
}