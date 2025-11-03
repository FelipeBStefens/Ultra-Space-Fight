
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

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.configurations.ConfigurationsDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.configurations.SoundDTO;
import com.ultra_space_fight.ultra_space_fight.service.ConfigurationService;


@RestController
@RequestMapping("/configuration")
@CrossOrigin(origins = "https://felipebstefens.github.io")
public class ConfigurationsController {
    

    private final ConfigurationService configurationService;


    public ConfigurationsController(ConfigurationService configurationService) {
        

        this.configurationService = configurationService;
    }


    @GetMapping("/get/values/{id}")
    public ResponseEntity<ConfigurationsDTO> getConfigurationValues(@PathVariable long id) {


        ConfigurationsDTO configurationsDTO = configurationService.getConfigurations(id);
        

        return ResponseEntity.status(HttpStatus.OK).body(configurationsDTO);
    }


    @PutMapping("/update/values/{id}")
    public ResponseEntity<SoundDTO> updateConfigurationValues(@PathVariable long id, @RequestBody ConfigurationsDTO configurationsDTO) {


        SoundDTO soundDTO = configurationService.updateConfigurations(configurationsDTO, id);
        

        return ResponseEntity.status(HttpStatus.OK).body(soundDTO);
    }


    @PutMapping("/update/sound/{id}")
    public ResponseEntity<SoundDTO> updateSounds(@PathVariable long id, @RequestBody SoundDTO soundDTO) {


        SoundDTO newSoundDTO = configurationService.updateSounds(soundDTO, id);
        

        return ResponseEntity.status(HttpStatus.OK).body(newSoundDTO);
    }
}