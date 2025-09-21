package com.ultra_space_fight.ultra_space_fight.controller.controllerModels;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ultra_space_fight.ultra_space_fight.controller.ProtocolInterface;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.EliteShip;
import com.ultra_space_fight.ultra_space_fight.service.EliteShipService;

@RestController
@RequestMapping("/eliteShip")
@CrossOrigin(origins = "http://localhost:5500")
public class EliteShipController implements ProtocolInterface<EliteShip>{
    
    private final EliteShipService eliteShipService;

    public EliteShipController(EliteShipService eliteShipService) {
        this.eliteShipService = eliteShipService;
    }

    @Override
    public EliteShip post(EliteShip eliteShip) {
        return null;
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    @PutMapping("/update/{id}")
    public EliteShip put(@PathVariable long id, 
        @RequestBody EliteShip eliteShip) {
        
        eliteShip.setIdShip(id);
        eliteShipService.updateEliteShip(eliteShip);
        return eliteShip;    
    }

    @Override
    public EliteShip patch(long id, EliteShip eliteShip) {
        return null;
    }

    @Override
    @GetMapping("/get/{id}")
    public EliteShip getById(@PathVariable long id) {
        
        return eliteShipService.getEliteShipById(id);
    }
}
