package com.ultra_space_fight.ultra_space_fight.service;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.DataAchievementDAO;

@Service
public class DataAchievementsService {
    
    public DataAchievementDAO dataAchievementDAO;

    public DataAchievementsService(DataAchievementDAO dataAchievementDAO) {
        this.dataAchievementDAO = dataAchievementDAO;
    }

    public void updateDataAchievements(DataAchievements dataAchievements) {

        dataAchievementDAO.update(dataAchievements);
    }

    public DataAchievements getDataAchievementsById(long id) {
        
        return dataAchievementDAO.read(id);
    }
}
