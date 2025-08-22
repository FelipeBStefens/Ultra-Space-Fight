package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

import java.util.ArrayList;
import java.util.List;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.StandartShip;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;

public class StandartShipDAO implements CrudInterface<StandartShip> {

    @Override
    public void create(StandartShip ship) {
        // Implementation for creating a standard ship
    }

    @Override
    public void delete(int id) {
        // Implementation for deleting a standard ship by id
    }

    @Override
    public void update(StandartShip ship) {
        // Implementation for updating a standard ship
    }

    @Override
    public StandartShip read(int id) {
        // Implementation for reading a standard ship by id
        return null;
    }

    @Override
    public List<StandartShip> readAll() {
        // Implementation for reading all standard ships
        return new ArrayList<>();
    }
    
}
