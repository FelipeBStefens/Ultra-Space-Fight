package com.ultra_space_fight.ultra_space_fight.service;

import java.sql.SQLException;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships.SpaceshipValuesDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.user.UserResponseDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.user.UserSendDTO;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.UserConflictException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.UserInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.DestroyerShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.EliteShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.FreighterShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpeedShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.StandartShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.Configuration;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.ConfigurationDAO;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.DataAchievementDAO;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.DestroyerShipDAO;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.EliteShipDAO;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.FreighterShipDAO;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.SpeedShipDAO;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.StandartShipDAO;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.UserDAO;
import com.ultra_space_fight.ultra_space_fight.utils.IdValidation;
import com.ultra_space_fight.ultra_space_fight.utils.UserValidation;

@Service
public class UserService {
    
    private final UserDAO userDAO;
    private final ConfigurationDAO configurationDAO;
    private final DataAchievementDAO dataAchievementDAO;
    private final StandartShipDAO standartShipDAO;
    private final SpeedShipDAO speedShipDAO;
    private final DestroyerShipDAO destroyerShipDAO;
    private final FreighterShipDAO freighterShipDAO;
    private final EliteShipDAO eliteShipDAO;

    public UserService(UserDAO userDAO, ConfigurationDAO configurationDAO, 
        DataAchievementDAO dataAchievementDAO, StandartShipDAO standartShipDAO, 
        SpeedShipDAO speedShipDAO, DestroyerShipDAO destroyerShipDAO, 
        FreighterShipDAO freighterShipDAO, EliteShipDAO eliteShipDAO) {
        
        this.userDAO = userDAO;
        this.configurationDAO = configurationDAO;
        this.dataAchievementDAO = dataAchievementDAO;
        this.standartShipDAO = standartShipDAO;
        this.speedShipDAO = speedShipDAO;
        this.destroyerShipDAO = destroyerShipDAO;
        this.freighterShipDAO = freighterShipDAO;
        this.eliteShipDAO = eliteShipDAO;
    }

    private SpaceshipValuesDTO getSpaceshipValues(String spaceshipType, long id) throws SQLException {

        switch (spaceshipType) {
            case "standart_ship" -> {
                StandartShip standartShip = standartShipDAO.read(id);
                return new SpaceshipValuesDTO(standartShip.getLife(),
                        standartShip.getSpeed(), standartShip.getDamage());
            }
            case "speed_ship" -> {
                SpeedShip speedShip = speedShipDAO.read(id);
                return new SpaceshipValuesDTO(speedShip.getLife(),
                        speedShip.getSpeed(), speedShip.getDamage());
            }
            case "destroyer_ship" -> {
                DestroyerShip destroyerShip = destroyerShipDAO.read(id);
                return new SpaceshipValuesDTO(destroyerShip.getLife(),
                        destroyerShip.getSpeed(), destroyerShip.getDamage());
            }
            case "freighter_ship" -> {
                FreighterShip freighterShip = freighterShipDAO.read(id);
                return new SpaceshipValuesDTO(freighterShip.getLife(),
                        freighterShip.getSpeed(), freighterShip.getDamage());
            }
            case "elite_ship" -> {
                EliteShip eliteShip = eliteShipDAO.read(id);
                return new SpaceshipValuesDTO(eliteShip.getLife(),
                        eliteShip.getSpeed(), eliteShip.getDamage());
            }
            default -> {}
        }
        return null;
    }

    public UserResponseDTO createUser(UserSendDTO userSendTDO) {

        UserValidation.validUsername(userSendTDO.getUsername());
        UserValidation.validEmail(userSendTDO.getEmail());
        UserValidation.validPassword(userSendTDO.getPassword());

        User user = new User(userSendTDO.getUsername(), 
            userSendTDO.getEmail(), userSendTDO.getPassword());

        Configuration configuration = new Configuration(user);
        DataAchievements dataAchievements = new DataAchievements(user);
        StandartShip standartShip = new StandartShip(user);
        SpeedShip speedShip = new SpeedShip(user);
        DestroyerShip destroyerShip = new DestroyerShip(user);
        FreighterShip freighterShip = new FreighterShip(user);
        EliteShip eliteShip = new EliteShip(user);
        
        SpaceshipValuesDTO spaceshipValues;
        try {
            userDAO.create(user);
            configurationDAO.create(configuration);
            dataAchievementDAO.create(dataAchievements);
            standartShipDAO.create(standartShip);
            speedShipDAO.create(speedShip);
            destroyerShipDAO.create(destroyerShip);
            freighterShipDAO.create(freighterShip);
            eliteShipDAO.create(eliteShip);

            spaceshipValues = getSpaceshipValues(user.getSelectedSpaceship(), user.getIdUser());
        }
        catch (SQLException e) {
            throw new UserConflictException();
        }
        return new UserResponseDTO(user.getIdUser(), user.getSelectedSpaceship(), spaceshipValues,
            dataAchievements.getScore(), dataAchievements.getScoreMatch(),
            configuration.getSoundtrack(), configuration.getSoundEffects());
    }


    public UserResponseDTO getUserLogin(String email, String password) {

        UserValidation.validEmail(email);
        UserValidation.validPassword(password);

        UserResponseDTO userResponseTDO = null;
        SpaceshipValuesDTO spaceshipValues;
        try {

            User user = userDAO.getUser(email, password);
            UserValidation.verifyUsername(user);

            DataAchievements dataAchievements = dataAchievementDAO.read(user.getIdUser());
            Configuration configuration = configurationDAO.read(user.getIdUser());
            spaceshipValues = getSpaceshipValues(user.getSelectedSpaceship(), user.getIdUser()); 

            userResponseTDO = new UserResponseDTO(
                user.getIdUser(), user.getSelectedSpaceship(), spaceshipValues,
                dataAchievements.getScore(), dataAchievements.getScoreMatch(),
                configuration.getSoundtrack(), configuration.getSoundEffects()); 
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return userResponseTDO;
    }

    public void deleteUser(long id) {

        IdValidation.validate(id, new UserInvalidValuesException("ID"));

        try {

            UserValidation.verifyUsername(userDAO.read(id));

            configurationDAO.delete(id);
            dataAchievementDAO.delete(id);
            standartShipDAO.delete(id);
            speedShipDAO.delete(id);
            destroyerShipDAO.delete(id);
            freighterShipDAO.delete(id);
            eliteShipDAO.delete(id);
            userDAO.delete(id);
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
    }
}