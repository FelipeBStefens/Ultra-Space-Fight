package com.ultra_space_fight.ultra_space_fight.service;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpeedShip;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.SpeedShipDAO;

@Service
public class SpeedShipService {
    
    public SpeedShipDAO speedShipDAO;

    public SpeedShipService(SpeedShipDAO speedShipDAO) {
        this.speedShipDAO = speedShipDAO;
    }

    public void updateSpeedShip(SpeedShip speedShip) {

        speedShipDAO.update(speedShip);
    }

    public SpeedShip getSpeedShipById(long id) {

        return speedShipDAO.read(id);
    }
}
