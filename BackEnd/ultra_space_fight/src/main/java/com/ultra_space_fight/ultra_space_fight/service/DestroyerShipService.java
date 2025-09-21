package com.ultra_space_fight.ultra_space_fight.service;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.DestroyerShip;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.DestroyerShipDAO;

@Service
public class DestroyerShipService {
    
    public DestroyerShipDAO destroyerShipDAO;

    public DestroyerShipService(DestroyerShipDAO destroyerShipDAO) {
        this.destroyerShipDAO = destroyerShipDAO;
    }

    public void updateDestroyerShip(DestroyerShip destroyerShip) {

        destroyerShipDAO.update(destroyerShip);
    }

    public DestroyerShip getDestroyerShipById(long id) {

        return destroyerShipDAO.read(id);
    }
}
