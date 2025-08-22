package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

import java.util.ArrayList;
import java.util.List;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpeedShip;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;

public class SpeedShipDAO implements CrudInterface<SpeedShip> {

    @Override
    public void create(SpeedShip speedShip) {
        // Implementation for creating a speed ship
    }

    @Override
    public void delete(int id) {
        // Implementation for deleting a speed ship by id
    }

    @Override
    public void update(SpeedShip speedShip) {
        // Implementation for updating a speed ship
    }

    @Override
    public SpeedShip read(int id) {
        // Implementation for reading a speed ship by id
        return null;
    }

    @Override
    public List<SpeedShip> readAll() {
        // Implementation for reading all speed ships
        return new ArrayList<>();
    }  
}
