package com.ultra_space_fight.ultra_space_fight.service;

import java.sql.SQLException;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DataAchievementNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.DataAchievementDAO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.ScoreTDO;

@Service
public class DataAchievementsService {
    
    private final DataAchievementDAO dataAchievementDAO;
    
    public DataAchievementsService(DataAchievementDAO dataAchievementDAO) {
        this.dataAchievementDAO = dataAchievementDAO;
    }

    public ScoreTDO getScore(long id) {

        ScoreTDO scoreTDO = null;
        try {
            
            DataAchievements dataAchievement = 
                dataAchievementDAO.read(id);
            
            if (dataAchievement == null) {
                throw new DataAchievementNotFoundException();
            }

            scoreTDO = new ScoreTDO(dataAchievement.getScore(),
                dataAchievement.getScoreMatch());
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return scoreTDO;
    }
}
