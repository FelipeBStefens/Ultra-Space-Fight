package com.ultra_space_fight.ultra_space_fight.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ultra_space_fight.ultra_space_fight.service.SpaceshipService;
import com.ultra_space_fight.ultra_space_fight.transferObjects.SpaceshipUpdateTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.SpaceshipsTDO;

@RestController
@RequestMapping("/spaceship")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class SpaceshipController {
    
    private final SpaceshipService spaceshipService;

    public SpaceshipController(SpaceshipService spaceshipService) {
        this.spaceshipService = spaceshipService;
    }

    @GetMapping("get/spaceships/{id}")
    public ResponseEntity<SpaceshipsTDO> getAllSpaceships(@PathVariable long id) {

        SpaceshipsTDO spaceshipsTDO = spaceshipService.getAllSpaceshipsValues(id);

        return ResponseEntity.status(HttpStatus.OK).body(spaceshipsTDO);
    }

    @PutMapping("update/standart_ship/{id}")
    public ResponseEntity<SpaceshipUpdateTDO> updateStandartShip(@PathVariable long id, 
        @RequestBody SpaceshipUpdateTDO spaceshipUpdateTDO) {
        
        SpaceshipUpdateTDO updatedValues = spaceshipService
            .updateStandartShip(spaceshipUpdateTDO, id);
        
        return ResponseEntity.status(HttpStatus.OK).body(updatedValues);
    }

    @PutMapping("update/speed_ship/{id}")
    public ResponseEntity<SpaceshipUpdateTDO> updateSpeedShip(@PathVariable long id, 
        @RequestBody SpaceshipUpdateTDO spaceshipUpdateTDO) {
        
        SpaceshipUpdateTDO updatedValues = spaceshipService
            .updateSpeedShip(spaceshipUpdateTDO, id);
        
        return ResponseEntity.status(HttpStatus.OK).body(updatedValues);
    }

    @PutMapping("update/destroyer_ship/{id}")
    public ResponseEntity<SpaceshipUpdateTDO> updateDestroyerShip(@PathVariable long id, 
        @RequestBody SpaceshipUpdateTDO spaceshipUpdateTDO) {
        
        SpaceshipUpdateTDO updatedValues = spaceshipService
            .updateDestroyerShip(spaceshipUpdateTDO, id);
        
        return ResponseEntity.status(HttpStatus.OK).body(updatedValues);
    }

    @PutMapping("update/freighter_ship/{id}")
    public ResponseEntity<SpaceshipUpdateTDO> updateFreighterShip(@PathVariable long id, 
        @RequestBody SpaceshipUpdateTDO spaceshipUpdateTDO) {
        
        SpaceshipUpdateTDO updatedValues = spaceshipService
            .updateFreighterShip(spaceshipUpdateTDO, id);
        
        return ResponseEntity.status(HttpStatus.OK).body(updatedValues);
    }

    @PutMapping("update/elite_ship/{id}")
    public ResponseEntity<SpaceshipUpdateTDO> updateEliteShip(@PathVariable long id, 
        @RequestBody SpaceshipUpdateTDO spaceshipUpdateTDO) {
        
        SpaceshipUpdateTDO updatedValues = spaceshipService
            .updateEliteShip(spaceshipUpdateTDO, id);
        
        return ResponseEntity.status(HttpStatus.OK).body(updatedValues);
    }

    @PutMapping("update/selected/spaceship/{id}")
    public ResponseEntity<String> updateSelectedSpaceship(@PathVariable long id, 
        @RequestBody String selectedSpaceship) {
        
        String newSelectedSpaceship = spaceshipService.updateSelectedSpaceship(selectedSpaceship, id);

        return ResponseEntity.status(HttpStatus.OK).body(newSelectedSpaceship);
    }
}
