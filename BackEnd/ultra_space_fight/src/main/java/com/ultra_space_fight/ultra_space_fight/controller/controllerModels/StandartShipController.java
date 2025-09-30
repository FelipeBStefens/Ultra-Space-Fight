package com.ultra_space_fight.ultra_space_fight.controller.controllerModels;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ultra_space_fight.ultra_space_fight.controller.ProtocolInterface;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.StandartShip;
import com.ultra_space_fight.ultra_space_fight.service.StandartShipService;

@RestController
@RequestMapping("/standartShip")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class StandartShipController implements ProtocolInterface<StandartShip> {
    
    private final StandartShipService standartShipService;

    public StandartShipController(StandartShipService standartShipService) {
        this.standartShipService = standartShipService;
    }

    @Override
    public StandartShip create(StandartShip standartShip) {
        return null;
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    @PutMapping("/update/{id}")
    public StandartShip update(@PathVariable long id, 
        @RequestBody StandartShip standartShip) {
    
        standartShip.setIdShip(id);
        standartShipService.updateStandartShip(standartShip);
        return standartShip;
    }

    @Override
    public StandartShip partialUpdate(long id, StandartShip standartShip) {
        return null;
    }

    @Override
    @GetMapping("/get/{id}")
    public StandartShip getById(@PathVariable long id) {
        
        return standartShipService.getStandartShipById(id);
    }
}
