package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

import java.util.ArrayList;
import java.util.List;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.FreighterShip;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;

public class FreighterShipDAO implements CrudInterface<FreighterShip> {

    @Override
    public void create(FreighterShip freighterShip) {
        // Implementation for creating a freighter ship
    }

    @Override
    public void delete(int id) {
        // Implementation for deleting a freighter ship by id
    }

    @Override
    public void update(FreighterShip freighterShip) {
        // Implementation for updating a freighter ship
    }

    @Override
    public FreighterShip read(int id) {
        // Implementation for reading a freighter ship by id
        return null;
    }

    @Override
    public List<FreighterShip> readAll() {
        // Implementation for reading all freighter ships
        return new ArrayList<>();
    }
}
