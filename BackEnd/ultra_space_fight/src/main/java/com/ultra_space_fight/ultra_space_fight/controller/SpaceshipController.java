// Package;
package com.ultra_space_fight.ultra_space_fight.controller;

// Imports;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships.SpaceshipUpdateDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships.SpaceshipsDTO;
import com.ultra_space_fight.ultra_space_fight.service.SpaceshipService;

// Controller class for the Spaceships;
@RestController
@RequestMapping("/spaceship")
@CrossOrigin(origins = "https://felipebstefens.github.io")
public class SpaceshipController {
    
    // Declaring the Service of the Spaceships;
    private final SpaceshipService spaceshipService;

    // Constructor;
    public SpaceshipController(SpaceshipService spaceshipService) {
        
        // Instanciating the Spaceship Service;
        this.spaceshipService = spaceshipService;
    }

    // Endpoint to get the Spaceships values by Id;
    @GetMapping("get/spaceships/{id}")
    public ResponseEntity<SpaceshipsDTO> getAllSpaceships(@PathVariable long id) {

        // Getting the Spaceship values;
        SpaceshipsDTO spaceshipsDTO = spaceshipService.getAllSpaceshipsValues(id);

        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.OK).body(spaceshipsDTO);
    }

    // Endpoint to update the Selected Spaceship by Id;
    @PutMapping("update/selected/spaceship/{id}")
    public ResponseEntity<String> updateSelectedSpaceship(@PathVariable long id, @RequestBody String selectedSpaceship) {
        
        // Throw out "";
        selectedSpaceship = selectedSpaceship.replace("\"", "");
        
        // Getting the new Selected Spaceship;
        String newSelectedSpaceship = spaceshipService.updateSelectedSpaceship(selectedSpaceship, id);

        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.OK).body(newSelectedSpaceship);
    }

    // Endpoint to Update Speed Ship values;
    @PutMapping("update/standart_ship/{id}")
    public ResponseEntity<SpaceshipUpdateDTO> updateStandartShip(@PathVariable long id, @RequestBody SpaceshipUpdateDTO spaceshipUpdateTDO) {
        
        // Updating and Getting values;
        SpaceshipUpdateDTO updatedValues = spaceshipService.updateStandartShip(spaceshipUpdateTDO, id);
        
        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.OK).body(updatedValues);
    }

    // Endpoint to Update Standart Ship values;
    @PutMapping("update/speed_ship/{id}")
    public ResponseEntity<SpaceshipUpdateDTO> updateSpeedShip(@PathVariable long id, @RequestBody SpaceshipUpdateDTO spaceshipUpdateTDO) {
        
        // Updating and Getting values;
        SpaceshipUpdateDTO updatedValues = spaceshipService.updateSpeedShip(spaceshipUpdateTDO, id);
        
        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.OK).body(updatedValues);
    }

    // Endpoint to Update Destroyer Ship values;
    @PutMapping("update/destroyer_ship/{id}")
    public ResponseEntity<SpaceshipUpdateDTO> updateDestroyerShip(@PathVariable long id, @RequestBody SpaceshipUpdateDTO spaceshipUpdateTDO) {
        
        // Updating and Getting values;
        SpaceshipUpdateDTO updatedValues = spaceshipService.updateDestroyerShip(spaceshipUpdateTDO, id);
        
        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.OK).body(updatedValues);
    }

    // Endpoint to Update Freighter Ship values;
    @PutMapping("update/freighter_ship/{id}")
    public ResponseEntity<SpaceshipUpdateDTO> updateFreighterShip(@PathVariable long id, @RequestBody SpaceshipUpdateDTO spaceshipUpdateTDO) {
        
        // Updating and Getting values;
        SpaceshipUpdateDTO updatedValues = spaceshipService.updateFreighterShip(spaceshipUpdateTDO, id);
        
        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.OK).body(updatedValues);
    }

    // Endpoint to Update Elite Ship values;
    @PutMapping("update/elite_ship/{id}")
    public ResponseEntity<SpaceshipUpdateDTO> updateEliteShip(@PathVariable long id, @RequestBody SpaceshipUpdateDTO spaceshipUpdateTDO) {
        
        // Updating and Getting values;
        SpaceshipUpdateDTO updatedValues = spaceshipService.updateEliteShip(spaceshipUpdateTDO, id);
        
        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.OK).body(updatedValues);
    }
}