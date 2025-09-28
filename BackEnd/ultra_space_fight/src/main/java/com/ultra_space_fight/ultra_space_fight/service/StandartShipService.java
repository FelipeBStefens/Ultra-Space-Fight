package com.ultra_space_fight.ultra_space_fight.service;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.StandartShip;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.StandartShipDAO;

@Service
public class StandartShipService {
    
    public StandartShipDAO standartShipDAO;

    public StandartShipService(StandartShipDAO standartShipDAO) {
        this.standartShipDAO = standartShipDAO;
    }

    public void updateStandartShip(StandartShip standartShip) {

        standartShipDAO.update(standartShip);
    }

    public StandartShip getStandartShipById(long id) {

        return standartShipDAO.read(id);
    }
}
