package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

import java.util.ArrayList;
import java.util.List;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.DestroyerShip;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;

public class DestroyerShipDAO implements CrudInterface<DestroyerShip> {

    @Override
    public void create(DestroyerShip destroyerShip) {
        // Implementation for creating a destroyer ship
    }

    @Override
    public void delete(int id) {
        // Implementation for deleting a destroyer ship by id
    }

    @Override
    public void update(DestroyerShip destroyerShip) {
        // Implementation for updating a destroyer ship
    }

    @Override
    public DestroyerShip read(int id) {
        // Implementation for reading a destroyer ship by id
        return null;
    }

    @Override
    public List<DestroyerShip> readAll() {
        // Implementation for reading all destroyer ships
        return new ArrayList<>();
    }
}
