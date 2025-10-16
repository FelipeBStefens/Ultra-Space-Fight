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

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.configurations.ConfigurationsDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.configurations.SoundDTO;
import com.ultra_space_fight.ultra_space_fight.service.ConfigurationService;

// Controller class for Configurations;
@RestController
@RequestMapping("/configuration")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ConfigurationsController {
    
    // Declaring the Service of Configuration;
    private final ConfigurationService configurationService;

    // Constructor; 
    public ConfigurationsController(ConfigurationService configurationService) {
        
        // Instanciating the Configuration Service;
        this.configurationService = configurationService;
    }

    // Endpoint to get the configuration by Id;
    @GetMapping("/get/values/{id}")
    public ResponseEntity<ConfigurationsDTO> getConfigurationValues(@PathVariable long id) {

        // Getting the Configurations values;
        ConfigurationsDTO configurationsDTO = configurationService.getConfigurations(id);
        
        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.OK).body(configurationsDTO);
    }

    // Endpoint to update the configuration by Id;
    @PutMapping("/update/values/{id}")
    public ResponseEntity<SoundDTO> updateConfigurationValues(@PathVariable long id, @RequestBody ConfigurationsDTO configurationsDTO) {

        // Updating the values and returning the Sound values;
        SoundDTO soundDTO = configurationService.updateConfigurations(configurationsDTO, id);
        
        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.OK).body(soundDTO);
    }

    // Endpoint to update the sound by Id;
    @PutMapping("/update/sound/{id}")
    public ResponseEntity<SoundDTO> updateSounds(@PathVariable long id, @RequestBody SoundDTO soundDTO) {

        // Updating and getting the Sound values;
        SoundDTO newSoundDTO = configurationService.updateSounds(soundDTO, id);
        
        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.OK).body(newSoundDTO);
    }
}