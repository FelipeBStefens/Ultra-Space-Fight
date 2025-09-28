package com.ultra_space_fight.ultra_space_fight.service;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.FreighterShip;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.FreighterShipDAO;

@Service
public class FreighterShipService {
    
    public FreighterShipDAO freighterShipDAO;

    public FreighterShipService(FreighterShipDAO freighterShipDAO) {
        this.freighterShipDAO = freighterShipDAO;
    }

    public void updateFreighterShip(FreighterShip freighterShip) {

        freighterShipDAO.update(freighterShip);
    }

    public FreighterShip getFreighterShipById(long id) {

        return freighterShipDAO.read(id);
    }
}
