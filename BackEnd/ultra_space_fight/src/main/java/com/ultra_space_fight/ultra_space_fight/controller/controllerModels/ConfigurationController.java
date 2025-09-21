package com.ultra_space_fight.ultra_space_fight.controller.controllerModels;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ultra_space_fight.ultra_space_fight.controller.ProtocolInterface;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.Configuration;
import com.ultra_space_fight.ultra_space_fight.service.ConfigurationService;

@RestController
@RequestMapping("/configurations")
@CrossOrigin(origins = "http://localhost:5500")
public class ConfigurationController implements ProtocolInterface<Configuration> {
    
    private final ConfigurationService configurationService;

    public ConfigurationController(ConfigurationService configurationService) {
        this.configurationService = configurationService;
    }

    @Override
    public Configuration post(Configuration configuration) {
        return null;
    }

    @Override
    public boolean delete(long id) {
        return false;
    }

    @Override
    @PutMapping("/update/{id}")
    public Configuration put(@PathVariable long id, 
        @RequestBody Configuration configuration) {
        
        configuration.setIdConfiguration(id);
        configurationService.updateConfiguration(configuration);
        return configuration;
    }

    @Override
    public Configuration patch(long id, Configuration configuration) {
        return null;
    }

    @Override
    @GetMapping("/get/{id}")
    public Configuration getById(long id) {
        
        return configurationService.getConfigurationById(id);
    }
}
