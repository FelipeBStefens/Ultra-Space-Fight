package com.ultra_space_fight.ultra_space_fight.service;

import java.sql.SQLException;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.configurations.ConfigurationsDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.configurations.SoundDTO;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.ConfigurationInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.ConfigurationNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.ConfigurationUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.UserConflictException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.UserInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.Configuration;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.ConfigurationDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.UserDAO;

@Service
public class ConfigurationService {
    
    public final ConfigurationDAO configurationDAO;
    public final UserDAO userDAO;
    
    public ConfigurationService(ConfigurationDAO configurationDAO, UserDAO userDAO) {
        this.configurationDAO = configurationDAO;
        this.userDAO = userDAO;
    }

    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$");
    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[\\w]{1,15}$");

    private static boolean isValidPassword(String password) {
        if (password == null) return false;
        return PASSWORD_PATTERN.matcher(password).matches();
    }

    private static boolean isValidUsername(String username) {
        if (username == null) return false;
        return USERNAME_PATTERN.matcher(username).matches();
    }

    public ConfigurationsDTO getConfigurations(long id) {

        if (id <= 0) {
            throw new ConfigurationUnauthorizedException("ID");
        }
        ConfigurationsDTO configurationsTDO = new ConfigurationsDTO();
        try {
            Configuration configuration = configurationDAO.read(id);

            if (configuration == null) {
                throw new ConfigurationNotFoundException();
            }

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
        
        if (id <= 0) {
            throw new ConfigurationInvalidValuesException("ID");
        }

        if (!isValidUsername(configurationsTDO.getUsername())) {
            throw new UserInvalidValuesException("Username");
        }
        else if (!isValidPassword(configurationsTDO.getPassword())) {
            throw new UserInvalidValuesException("Password");
        }
        else if (!(configurationsTDO.getLanguage().equals("Portuguese") || configurationsTDO.getLanguage().equals("English"))) {
            throw new ConfigurationInvalidValuesException("Language");
        }
        else if (configurationsTDO.getSoundtrack().doubleValue() < 0 || configurationsTDO.getSoundtrack().doubleValue() > 1) {
            throw new ConfigurationInvalidValuesException("Soundtrack");
        }
        else if (configurationsTDO.getSoundEffects().doubleValue() < 0 || configurationsTDO.getSoundEffects().doubleValue() > 1) {
            throw new ConfigurationInvalidValuesException("Sound Effects");
        }

        SoundDTO soundTDO = null;
        try {

            Configuration configuration = configurationDAO.read(id);

            if (configuration == null) {
                throw new ConfigurationNotFoundException();
            }
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

        if (id <= 0) {
            throw new ConfigurationInvalidValuesException("ID");
        }

        if (soundTDO.getSoundtrack().doubleValue() < 0 || soundTDO.getSoundtrack().doubleValue() > 1) {
            throw new ConfigurationInvalidValuesException("Soundtrack");
        }
        else if (soundTDO.getSoundEffects().doubleValue() < 0 || soundTDO.getSoundEffects().doubleValue() > 1) {
            throw new ConfigurationInvalidValuesException("Sound Effects");
        }

        SoundDTO newSoundTDO = null; 
        try {
            Configuration configuration = configurationDAO.read(id);
            if (configuration == null) {
                throw new ConfigurationNotFoundException();
            }

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