package com.ultra_space_fight.ultra_space_fight.service;

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

@Service
public class ConfigurationService {
    
    public final ConfigurationDAO configurationDAO;
    public final UserDAO userDAO;
    
    public ConfigurationService(ConfigurationDAO configurationDAO, UserDAO userDAO) {
        this.configurationDAO = configurationDAO;
        this.userDAO = userDAO;
    }

    public ConfigurationsDTO getConfigurations(long id) {

        IdValidation.validate(id, new ConfigurationUnauthorizedException("ID"));
        
        ConfigurationsDTO configurationsTDO = new ConfigurationsDTO();
        try {
            Configuration configuration = configurationDAO.read(id);

            ConfigurationValidate.verifyConfiguration(configuration);

            configurationsTDO.setLanguage(configuration.getLanguage());
            configurationsTDO.setUsername(configuration.getUser().getUsername());
            configurationsTDO.setPassword(configuration.getUser().getPassword());
        } 
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return configurationsTDO;
    }

    public SoundDTO updateConfigurations(
        ConfigurationsDTO configurationsTDO, long id) {
        
        IdValidation.validate(id, new ConfigurationInvalidValuesException("ID"));

        UserValidation.validUsername(configurationsTDO.getUsername());
        UserValidation.validPassword(configurationsTDO.getPassword());

        ConfigurationValidate.validateLanguage(configurationsTDO.getLanguage());
        ConfigurationValidate.validateSound(configurationsTDO.getSoundtrack());
        ConfigurationValidate.validateSound(configurationsTDO.getSoundEffects());

        SoundDTO soundTDO = null;
        try {

            Configuration configuration = configurationDAO.read(id);

            ConfigurationValidate.verifyConfiguration(configuration);
            User user = configuration.getUser();

            user.setUsername(configurationsTDO.getUsername());
            user.setPassword(configurationsTDO.getPassword());
            userDAO.update(user);

            configuration.setLanguage(configurationsTDO.getLanguage());
            configuration.setSoundtrack(configurationsTDO.getSoundtrack());
            configuration.setSoundEffects(configurationsTDO.getSoundEffects());

            configurationDAO.update(configuration);

            soundTDO = new SoundDTO(configurationsTDO.getSoundtrack(), 
                configurationsTDO.getSoundEffects());
        }
        catch (SQLException e) {
            throw new UserConflictException();
        }
        return soundTDO;
    }
    
    public SoundDTO updateSounds(SoundDTO soundTDO, long id) {

        IdValidation.validate(id, new ConfigurationInvalidValuesException("ID"));

        ConfigurationValidate.validateSound(soundTDO.getSoundtrack());
        ConfigurationValidate.validateSound(soundTDO.getSoundEffects());

        SoundDTO newSoundTDO = null; 
        try {
            Configuration configuration = configurationDAO.read(id);
            
            ConfigurationValidate.verifyConfiguration(configuration);

            configuration.setSoundtrack(soundTDO.getSoundtrack());
            configuration.setSoundEffects(soundTDO.getSoundEffects());

            configurationDAO.update(configuration);

            newSoundTDO = new SoundDTO(soundTDO.getSoundtrack(), soundTDO.getSoundEffects());
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return newSoundTDO;
    }
}