
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

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships.SpaceshipUpdateDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships.SpaceshipsDTO;
import com.ultra_space_fight.ultra_space_fight.service.SpaceshipService;


@RestController
@RequestMapping("/spaceship")
@CrossOrigin(origins = "https://felipebstefens.github.io")
public class SpaceshipController {
    

    private final SpaceshipService spaceshipService;


    public SpaceshipController(SpaceshipService spaceshipService) {
        

        this.spaceshipService = spaceshipService;
    }


    @GetMapping("get/spaceships/{id}")
    public ResponseEntity<SpaceshipsDTO> getAllSpaceships(@PathVariable long id) {


        SpaceshipsDTO spaceshipsDTO = spaceshipService.getAllSpaceshipsValues(id);


        return ResponseEntity.status(HttpStatus.OK).body(spaceshipsDTO);
    }


    @PutMapping("update/selected/spaceship/{id}")
    public ResponseEntity<String> updateSelectedSpaceship(@PathVariable long id, @RequestBody String selectedSpaceship) {
        

        selectedSpaceship = selectedSpaceship.replace("\"", "");
        

        String newSelectedSpaceship = spaceshipService.updateSelectedSpaceship(selectedSpaceship, id);


        return ResponseEntity.status(HttpStatus.OK).body(newSelectedSpaceship);
    }


    @PutMapping("update/standart_ship/{id}")
    public ResponseEntity<SpaceshipUpdateDTO> updateStandartShip(@PathVariable long id, @RequestBody SpaceshipUpdateDTO spaceshipUpdateTDO) {
        

        SpaceshipUpdateDTO updatedValues = spaceshipService.updateStandartShip(spaceshipUpdateTDO, id);
        

        return ResponseEntity.status(HttpStatus.OK).body(updatedValues);
    }


    @PutMapping("update/speed_ship/{id}")
    public ResponseEntity<SpaceshipUpdateDTO> updateSpeedShip(@PathVariable long id, @RequestBody SpaceshipUpdateDTO spaceshipUpdateTDO) {
        

        SpaceshipUpdateDTO updatedValues = spaceshipService.updateSpeedShip(spaceshipUpdateTDO, id);
        

        return ResponseEntity.status(HttpStatus.OK).body(updatedValues);
    }


    @PutMapping("update/destroyer_ship/{id}")
    public ResponseEntity<SpaceshipUpdateDTO> updateDestroyerShip(@PathVariable long id, @RequestBody SpaceshipUpdateDTO spaceshipUpdateTDO) {
        

        SpaceshipUpdateDTO updatedValues = spaceshipService.updateDestroyerShip(spaceshipUpdateTDO, id);
        

        return ResponseEntity.status(HttpStatus.OK).body(updatedValues);
    }


    @PutMapping("update/freighter_ship/{id}")
    public ResponseEntity<SpaceshipUpdateDTO> updateFreighterShip(@PathVariable long id, @RequestBody SpaceshipUpdateDTO spaceshipUpdateTDO) {
        

        SpaceshipUpdateDTO updatedValues = spaceshipService.updateFreighterShip(spaceshipUpdateTDO, id);
        

        return ResponseEntity.status(HttpStatus.OK).body(updatedValues);
    }


    @PutMapping("update/elite_ship/{id}")
    public ResponseEntity<SpaceshipUpdateDTO> updateEliteShip(@PathVariable long id, @RequestBody SpaceshipUpdateDTO spaceshipUpdateTDO) {
        

        SpaceshipUpdateDTO updatedValues = spaceshipService.updateEliteShip(spaceshipUpdateTDO, id);
        

        return ResponseEntity.status(HttpStatus.OK).body(updatedValues);
    }
}