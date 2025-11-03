
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
        

        ConfigurationsDTO configurationsDTO = new ConfigurationsDTO();
        

        try {


            Configuration configuration = configurationDAO.read(id);


            ConfigurationValidate.verifyConfiguration(configuration);


            configurationsDTO.setLanguage(configuration.getLanguage());
            configurationsDTO.setUsername(configuration.getUser().getUsername());
            configurationsDTO.setPassword(configuration.getUser().getPassword());
        } 
        catch (SQLException e) {


            throw new DatabaseConnectionException(e);
        }


        return configurationsDTO;
    }


    public SoundDTO updateConfigurations(ConfigurationsDTO configurationsDTO, long id) {
        

        IdValidation.validate(id, new ConfigurationInvalidValuesException("ID"));
        UserValidation.validUsername(configurationsDTO.getUsername());
        UserValidation.validPassword(configurationsDTO.getPassword());


        ConfigurationValidate.validateLanguage(configurationsDTO.getLanguage());
        ConfigurationValidate.validateSound(configurationsDTO.getSoundtrack());
        ConfigurationValidate.validateSound(configurationsDTO.getSoundEffects());


        SoundDTO soundDTO = null;


        try {


            Configuration configuration = configurationDAO.read(id);


            ConfigurationValidate.verifyConfiguration(configuration);
            

            User user = configuration.getUser();


            user.setUsername(configurationsDTO.getUsername());
            user.setPassword(configurationsDTO.getPassword());
            userDAO.update(user);


            configuration.setLanguage(configurationsDTO.getLanguage());
            configuration.setSoundtrack(configurationsDTO.getSoundtrack());
            configuration.setSoundEffects(configurationsDTO.getSoundEffects());
            configurationDAO.update(configuration);


            soundDTO = new SoundDTO(configurationsDTO.getSoundtrack(), configurationsDTO.getSoundEffects());
        }
        catch (SQLException e) {


            throw new UserConflictException();
        }


        return soundDTO;
    }
    

    public SoundDTO updateSounds(SoundDTO soundDTO, long id) {


        IdValidation.validate(id, new ConfigurationInvalidValuesException("ID"));
        ConfigurationValidate.validateSound(soundDTO.getSoundtrack());
        ConfigurationValidate.validateSound(soundDTO.getSoundEffects());


        SoundDTO newsoundDTO = null; 


        try {


            Configuration configuration = configurationDAO.read(id);
            

            ConfigurationValidate.verifyConfiguration(configuration);


            configuration.setSoundtrack(soundDTO.getSoundtrack());
            configuration.setSoundEffects(soundDTO.getSoundEffects());
            configurationDAO.update(configuration);


            newsoundDTO = new SoundDTO(soundDTO.getSoundtrack(), soundDTO.getSoundEffects());
        }
        catch (SQLException e) {


            throw new DatabaseConnectionException(e);
        }


        return newsoundDTO;
    }
}