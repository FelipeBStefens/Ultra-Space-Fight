package com.ultra_space_fight.ultra_space_fight.controller.controllerModels;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ultra_space_fight.ultra_space_fight.controller.ProtocolInterface;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpeedShip;
import com.ultra_space_fight.ultra_space_fight.service.SpeedShipService;

@RestController
@RequestMapping("/speedShip")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class SpeedShipController implements ProtocolInterface<SpeedShip> {
    
    private final SpeedShipService speedShipService;

    public SpeedShipController(SpeedShipService speedShipService) {
        this.speedShipService = speedShipService;
    }

    @Override
    public SpeedShip create(SpeedShip speedShip) {
        return null;
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    @PutMapping("/update/{id}")
    public SpeedShip update(@PathVariable long id, 
        @RequestBody SpeedShip speedShip) {
        
        speedShip.setIdShip(id);
        speedShipService.updateSpeedShip(speedShip);
        return speedShip;
    }

    @Override
    public SpeedShip partialUpdate(long id, SpeedShip speedShip) {
        return null;
    }

    @Override
    @GetMapping("/get/{id}")
    public SpeedShip getById(@PathVariable long id) {
        
        return speedShipService.getSpeedShipById(id);
    }
}
