package com.ultra_space_fight.ultra_space_fight.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ultra_space_fight.ultra_space_fight.service.ConfigurationService;
import com.ultra_space_fight.ultra_space_fight.transferObjects.ConfigurationsTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.SoundTDO;

@RestController
@RequestMapping("/configuration")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ConfigurationsController {
    
    private final ConfigurationService configurationService;

    public ConfigurationsController(ConfigurationService configurationService) {
        this.configurationService = configurationService;
    }

    @PutMapping("/update/values/{id}")
    public ResponseEntity<SoundTDO> updateConfigurationValues(
        @PathVariable long id, @RequestBody ConfigurationsTDO configurationsTDO) {

        SoundTDO soundTDO = configurationService.updateConfigurations(configurationsTDO, id);
        return ResponseEntity.status(HttpStatus.OK).body(soundTDO);
    }

    @PutMapping("/update/sound/{id}")
    public ResponseEntity<SoundTDO> updateSounds(@PathVariable long id, @RequestBody SoundTDO soundTDO) {

        SoundTDO newSoundTDO = configurationService.updateSounds(soundTDO, id);

        return ResponseEntity.status(HttpStatus.OK).body(newSoundTDO);
    }
}
