package com.ultra_space_fight.ultra_space_fight.service;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.EliteShip;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.EliteShipDAO;

@Service
public class EliteShipService {
    
    public EliteShipDAO eliteShipDAO;

    public EliteShipService(EliteShipDAO eliteShipDAO) {
        this.eliteShipDAO = eliteShipDAO;
    }

    public void updateEliteShip(EliteShip eliteShip) {

        eliteShipDAO.update(eliteShip);
    }

    public EliteShip getEliteShipById(long id) {

        return eliteShipDAO.read(id);
    }
}
