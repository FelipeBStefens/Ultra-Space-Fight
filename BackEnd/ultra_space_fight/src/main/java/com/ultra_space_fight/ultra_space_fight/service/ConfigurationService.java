// Package;
package com.ultra_space_fight.ultra_space_fight.service;

// Imports;
import java.sql.SQLException;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.configurations.ConfigurationsDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.configurations.SoundDTO;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration.ConfigurationInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration.ConfigurationUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.database.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.user.UserConflictException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.Configuration;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.ConfigurationDAO;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.UserDAO;
import com.ultra_space_fight.ultra_space_fight.utils.ConfigurationValidate;
import com.ultra_space_fight.ultra_space_fight.utils.IdValidation;
import com.ultra_space_fight.ultra_space_fight.utils.UserValidation;

// Configuration Service class;
@Service
public class ConfigurationService {
    
    // DAO properties;
    public final ConfigurationDAO configurationDAO;
    public final UserDAO userDAO;
    
    // Constructor;
    public ConfigurationService(ConfigurationDAO configurationDAO, UserDAO userDAO) {
        
        // Initialyzing the DAO values;
        this.configurationDAO = configurationDAO;
        this.userDAO = userDAO;
    }

    // Method to get the Configurations by Id;
    public ConfigurationsDTO getConfigurations(long id) {

        // Method to validate Id;
        IdValidation.validate(id, new ConfigurationUnauthorizedException("ID"));
        
        // Initialyzing the ConfigurationDTOs;
        ConfigurationsDTO configurationsDTO = new ConfigurationsDTO();
        
        // Try-Catch to Handle Exception;
        try {

            // Get the configuration by Id;
            Configuration configuration = configurationDAO.read(id);

            // Verify if exists the configuration;
            ConfigurationValidate.verifyConfiguration(configuration);

            // Setting the configurationDTO with configuration values;
            configurationsDTO.setLanguage(configuration.getLanguage());
            configurationsDTO.setUsername(configuration.getUser().getUsername());
            configurationsDTO.setPassword(configuration.getUser().getPassword());
        } 
        catch (SQLException e) {

            // Throw Exception;
            throw new DatabaseConnectionException(e);
        }

        // return the configurationsDTO;
        return configurationsDTO;
    }

    // Method to update configurations by Id;
    public SoundDTO updateConfigurations(ConfigurationsDTO configurationsDTO, long id) {
        
        // Methods to validate the Id, Username and Password; 
        IdValidation.validate(id, new ConfigurationInvalidValuesException("ID"));
        UserValidation.validUsername(configurationsDTO.getUsername());
        UserValidation.validPassword(configurationsDTO.getPassword());

        // Methods to validate Language, Soundtrack and Sound Effects;
        ConfigurationValidate.validateLanguage(configurationsDTO.getLanguage());
        ConfigurationValidate.validateSound(configurationsDTO.getSoundtrack());
        ConfigurationValidate.validateSound(configurationsDTO.getSoundEffects());

        // Declaring the SoundDTO;
        SoundDTO soundDTO = null;

        // Try-Catch to Handle Exception;
        try {

            // Get the configuration by Id;
            Configuration configuration = configurationDAO.read(id);

            // Verify if exists the configurations;
            ConfigurationValidate.verifyConfiguration(configuration);
            
            // Getting the User by Configuration;
            User user = configuration.getUser();

            // Setting User values and Update in DAO;
            user.setUsername(configurationsDTO.getUsername());
            user.setPassword(configurationsDTO.getPassword());
            userDAO.update(user);

            // Setting Configuration values and Update in DAO;
            configuration.setLanguage(configurationsDTO.getLanguage());
            configuration.setSoundtrack(configurationsDTO.getSoundtrack());
            configuration.setSoundEffects(configurationsDTO.getSoundEffects());
            configurationDAO.update(configuration);

            // Setting SoundDTO values;
            soundDTO = new SoundDTO(configurationsDTO.getSoundtrack(), configurationsDTO.getSoundEffects());
        }
        catch (SQLException e) {

            // Throw Exception;
            throw new UserConflictException();
        }

        // Returning SoundDTO;
        return soundDTO;
    }
    
    // Method to update the sounds by Id;
    public SoundDTO updateSounds(SoundDTO soundDTO, long id) {

        // Methods to validate the Id, Soundtrack and Sound Effects;
        IdValidation.validate(id, new ConfigurationInvalidValuesException("ID"));
        ConfigurationValidate.validateSound(soundDTO.getSoundtrack());
        ConfigurationValidate.validateSound(soundDTO.getSoundEffects());

        // Declaring the new Sound;
        SoundDTO newsoundDTO = null; 

        // Try-Catch to Handle Exception;
        try {

            // Get configuration by Id;
            Configuration configuration = configurationDAO.read(id);
            
            // Verify if configuration exists;
            ConfigurationValidate.verifyConfiguration(configuration);

            // Setting the Soundtraack, Sound Effects, and update it;
            configuration.setSoundtrack(soundDTO.getSoundtrack());
            configuration.setSoundEffects(soundDTO.getSoundEffects());
            configurationDAO.update(configuration);

            // Setting this values on new SoundDTO;
            newsoundDTO = new SoundDTO(soundDTO.getSoundtrack(), soundDTO.getSoundEffects());
        }
        catch (SQLException e) {

            // Throw Exception;
            throw new DatabaseConnectionException(e);
        }

        // Return the new SoundDTO;
        return newsoundDTO;
    }
}