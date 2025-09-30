package com.ultra_space_fight.ultra_space_fight.controller.controllerModels;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ultra_space_fight.ultra_space_fight.controller.ProtocolInterface;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.DestroyerShip;
import com.ultra_space_fight.ultra_space_fight.service.DestroyerShipService;

@RestController
@RequestMapping("/destroyerShip")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class DestroyerShipController implements ProtocolInterface<DestroyerShip> {
    
    private final DestroyerShipService destroyerShipService;
    
    public DestroyerShipController(DestroyerShipService destroyerShipService) {
        this.destroyerShipService = destroyerShipService;
    }

    @Override
    public DestroyerShip create(DestroyerShip destroyerShip) {
        return null;
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    @PutMapping("/update/{id}")
    public DestroyerShip update(@PathVariable long id, 
        @RequestBody DestroyerShip destroyerShip) {
        
        destroyerShip.setIdShip(id);
        destroyerShipService.updateDestroyerShip(destroyerShip);
        return destroyerShip;
    }

    @Override
    public DestroyerShip partialUpdate(long id, DestroyerShip destroyerShip) {
        return null;
    }

    @Override
    @GetMapping("/get/{id}")
    public DestroyerShip getById(@PathVariable long id) {
        
        return destroyerShipService.getDestroyerShipById(id);
    }
}
