package com.ultra_space_fight.ultra_space_fight.service;

import java.sql.SQLException;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.exception.exceptions.ConfigurationNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.Configuration;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.ConfigurationDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.UserDAO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.ConfigurationsTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.SoundTDO;

@Service
public class ConfigurationService {
    
    public final ConfigurationDAO configurationDAO;
    public final UserDAO userDAO;
    
    public ConfigurationService(ConfigurationDAO configurationDAO, UserDAO userDAO) {
        this.configurationDAO = configurationDAO;
        this.userDAO = userDAO;
    }

    public ConfigurationsTDO getConfigurations(long id) {

        ConfigurationsTDO configurationsTDO = new ConfigurationsTDO();

        try {
            Configuration configuration = configurationDAO.read(id);

            configurationsTDO.setLanguage(configuration.getLanguage());
            configurationsTDO.setUsername(configuration.getUser().getUsername());
            configurationsTDO.setPassword(configuration.getUser().getPassword());
        } 
        catch (SQLException e) {
            throw new ConfigurationNotFoundException();
        }
        return configurationsTDO;
    }

    public SoundTDO updateConfigurations(
        ConfigurationsTDO configurationsTDO, long id) {
        
        SoundTDO soundTDO = null;
        try {
            User user = userDAO.read(id);
            user.setUsername(configurationsTDO.getUsername());
            user.setPassword(configurationsTDO.getPassword());

            userDAO.update(user);

            Configuration configuration = configurationDAO.read(id);
            configuration.setLanguage(configurationsTDO.getLanguage());
            configuration.setSoundtrack(configurationsTDO.getSoundtrack());
            configuration.setSoundEffects(configurationsTDO.getSoundEffects());

            configurationDAO.update(configuration);

            soundTDO = new SoundTDO(configurationsTDO.getSoundtrack(), 
                configurationsTDO.getSoundEffects());
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return soundTDO;
    }
    
    public SoundTDO updateSounds(SoundTDO soundTDO, long id) {

        SoundTDO newSoundTDO = null; 
        try {
            Configuration configuration = configurationDAO.read(id);

            configuration.setSoundtrack(soundTDO.getSoundtrack());
            configuration.setSoundEffects(soundTDO.getSoundEffects());

            configurationDAO.update(configuration);

            newSoundTDO = new SoundTDO(soundTDO.getSoundtrack(), soundTDO.getSoundEffects());
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return newSoundTDO;
    }
}
