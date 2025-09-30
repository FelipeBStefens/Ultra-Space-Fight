package com.ultra_space_fight.ultra_space_fight.controller.controllerModels;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ultra_space_fight.ultra_space_fight.controller.ProtocolInterface;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.FreighterShip;
import com.ultra_space_fight.ultra_space_fight.service.FreighterShipService;

@RestController
@RequestMapping("/freighterShip")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class FreighterShipController implements ProtocolInterface<FreighterShip> {

    private final FreighterShipService freighterShipService;

    public FreighterShipController(FreighterShipService freighterShipService) {
        this.freighterShipService = freighterShipService;
    }

    @Override
    public FreighterShip post(FreighterShip freighterShip) {
        return null;
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    @PutMapping("/update/{id}")
    public FreighterShip put(@PathVariable long id, 
        @RequestBody FreighterShip freighterShip) {
        
        freighterShip.setIdShip(id);
        freighterShipService.updateFreighterShip(freighterShip);
        return freighterShip;
    }

    @Override
    public FreighterShip patch(long id, FreighterShip freighterShip) {
        return null;
    }

    @Override
    @GetMapping("/get/{id}")
    public FreighterShip getById(@PathVariable long id) {
        
        return freighterShipService.getFreighterShipById(id);
    }
}
