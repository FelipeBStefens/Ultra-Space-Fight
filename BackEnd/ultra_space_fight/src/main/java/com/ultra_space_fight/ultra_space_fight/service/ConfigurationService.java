package com.ultra_space_fight.ultra_space_fight.service;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.models.userProfile.Configuration;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.ConfigurationDAO;

@Service
public class ConfigurationService {
    
    private final ConfigurationDAO configurationDAO;

    public ConfigurationService(ConfigurationDAO configurationDAO) {
        this.configurationDAO = configurationDAO;
    }

    public void updateConfiguration(Configuration configuration) {
        
        configurationDAO.update(configuration);
    }

    public Configuration getConfigurationById(long id) {
    
        return configurationDAO.read(id);
    }
}
