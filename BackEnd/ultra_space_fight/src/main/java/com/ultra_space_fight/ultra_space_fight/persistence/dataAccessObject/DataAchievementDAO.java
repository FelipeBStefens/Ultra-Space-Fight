package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

import java.util.ArrayList;
import java.util.List;

import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;

public class DataAchievementDAO implements CrudInterface<DataAchievements> {

    @Override
    public void create(DataAchievements dataAchievements) {
        // Implementation for creating data achievements
    }

    @Override
    public void delete(int id) {
        // Implementation for deleting data achievements by id
    }

    @Override
    public void update(DataAchievements dataAchievements) {
        // Implementation for updating data achievements
    }

    @Override
    public DataAchievements read(int id) {
        // Implementation for reading data achievements by id
        return null;
    }

    @Override
    public List<DataAchievements> readAll() {
        // Implementation for reading all data achievements
        return new ArrayList<>();
    }
}