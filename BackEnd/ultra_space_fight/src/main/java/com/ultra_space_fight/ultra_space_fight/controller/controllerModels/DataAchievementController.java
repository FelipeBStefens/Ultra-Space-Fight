package com.ultra_space_fight.ultra_space_fight.controller.controllerModels;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ultra_space_fight.ultra_space_fight.controller.ProtocolInterface;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;
import com.ultra_space_fight.ultra_space_fight.service.DataAchievementsService;

@RestController
@RequestMapping("/data/achievement")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class DataAchievementController implements ProtocolInterface<DataAchievements> {
    
    private final DataAchievementsService dataAchievementsService;
    
    public DataAchievementController(DataAchievementsService dataAchievementsService) {
        this.dataAchievementsService = dataAchievementsService;
    }

    @Override
    public DataAchievements create(DataAchievements dataAchievements) {
        return null;
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    @PutMapping("/update/{id}")
    public DataAchievements update(@PathVariable long id, 
        @RequestBody DataAchievements dataAchievements) {
        
        dataAchievements.setIdDataAchievements(id);
        dataAchievementsService.updateDataAchievements(dataAchievements);
        return dataAchievements;
    }

    @Override
    public DataAchievements partialUpdate(long id, DataAchievements dataAchievements) {
        return null;
    }

    @Override
    @GetMapping("/get/{id}")
    public DataAchievements getById(long id) {
        
        return dataAchievementsService.getDataAchievementsById(id);
    }
}
