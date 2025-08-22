package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

import java.util.ArrayList;
import java.util.List;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.EliteShip;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;

public class EliteShipDAO implements CrudInterface<EliteShip> {
    
    
    @Override
    public void create(EliteShip eliteShip) {
        // Implementation for creating a user
    }

    @Override
    public void delete(int id) {
        // Implementation for deleting a user by id
    }

    @Override
    public void update(EliteShip eliteShip) {
        // Implementation for updating a user
    }

    @Override
    public EliteShip read(int id) {
        // Implementation for reading a user by id
        return null;
    }

    @Override
    public List<EliteShip> readAll() {
        // Implementation for reading all users
        return new ArrayList<>();
    }
}
