// Package;
package com.ultra_space_fight.ultra_space_fight.service;

// Imports;
import java.sql.SQLException;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships.SpaceshipValuesDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.user.UserResponseDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.user.UserSendDTO;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.database.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.user.UserConflictException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.user.UserInvalidValuesException;
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

// User Service class;
@Service
public class UserService {
    
    // DAO properties;
    private final UserDAO userDAO;
    private final ConfigurationDAO configurationDAO;
    private final DataAchievementDAO dataAchievementDAO;
    private final StandartShipDAO standartShipDAO;
    private final SpeedShipDAO speedShipDAO;
    private final DestroyerShipDAO destroyerShipDAO;
    private final FreighterShipDAO freighterShipDAO;
    private final EliteShipDAO eliteShipDAO;

    // Constructor;
    public UserService(UserDAO userDAO, ConfigurationDAO configurationDAO, 
        DataAchievementDAO dataAchievementDAO, StandartShipDAO standartShipDAO, 
        SpeedShipDAO speedShipDAO, DestroyerShipDAO destroyerShipDAO, 
        FreighterShipDAO freighterShipDAO, EliteShipDAO eliteShipDAO) {
        
        // Initializing DAO values;
        this.userDAO = userDAO;
        this.configurationDAO = configurationDAO;
        this.dataAchievementDAO = dataAchievementDAO;
        this.standartShipDAO = standartShipDAO;
        this.speedShipDAO = speedShipDAO;
        this.destroyerShipDAO = destroyerShipDAO;
        this.freighterShipDAO = freighterShipDAO;
        this.eliteShipDAO = eliteShipDAO;
    }

    // Private method to get spaceship values by type;
    private SpaceshipValuesDTO getSpaceshipValues(String spaceshipType, long id) throws SQLException {

        // Switch verifying spaceship type and returning its values;
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
        // Return null if spaceship type is invalid;
        return null;
    }

    // Method to create a new User;
    public UserResponseDTO createUser(UserSendDTO userSendTDO) {

        // Validating username, email and password;
        UserValidation.validUsername(userSendTDO.getUsername());
        UserValidation.validEmail(userSendTDO.getEmail());
        UserValidation.validPassword(userSendTDO.getPassword());

        // Creating new User instance;
        User user = new User(userSendTDO.getUsername(), 
            userSendTDO.getEmail(), userSendTDO.getPassword());

        // Creating related entities linked to the User;
        Configuration configuration = new Configuration(user);
        DataAchievements dataAchievements = new DataAchievements(user);
        StandartShip standartShip = new StandartShip(user);
        SpeedShip speedShip = new SpeedShip(user);
        DestroyerShip destroyerShip = new DestroyerShip(user);
        FreighterShip freighterShip = new FreighterShip(user);
        EliteShip eliteShip = new EliteShip(user);
        
        // Declaring SpaceshipValuesDTO;
        SpaceshipValuesDTO spaceshipValues;

        // Try-Catch to handle exceptions;
        try {

            // Creating records in database;
            userDAO.create(user);
            configurationDAO.create(configuration);
            dataAchievementDAO.create(dataAchievements);
            standartShipDAO.create(standartShip);
            speedShipDAO.create(speedShip);
            destroyerShipDAO.create(destroyerShip);
            freighterShipDAO.create(freighterShip);
            eliteShipDAO.create(eliteShip);

            // Getting spaceship values of the selected spaceship;
            spaceshipValues = getSpaceshipValues(user.getSelectedSpaceship(), user.getIdUser());
        }
        catch (SQLException e) {

            // Throw Exception;
            throw new UserConflictException();
        }

        // Returning response DTO with all user data;
        return new UserResponseDTO(user.getIdUser(), user.getSelectedSpaceship(), spaceshipValues,
            dataAchievements.getScore(), dataAchievements.getScoreMatch(),
            configuration.getSoundtrack(), configuration.getSoundEffects());
    }

    // Method to get User by email and password;
    public UserResponseDTO getUserLogin(String email, String password) {

        // Validating email and password values;
        UserValidation.validEmail(email);
        UserValidation.validPassword(password);

        // Declaring DTOs;
        UserResponseDTO userResponseTDO = null;
        SpaceshipValuesDTO spaceshipValues;

        // Try-Catch to handle exceptions;
        try {

            // Getting User from database;
            User user = userDAO.getUser(email, password);

            // Verifying if User exists;
            UserValidation.verifyUsername(user);

            // Reading related entities;
            DataAchievements dataAchievements = dataAchievementDAO.read(user.getIdUser());
            Configuration configuration = configurationDAO.read(user.getIdUser());

            // Getting spaceship values of selected spaceship;
            spaceshipValues = getSpaceshipValues(user.getSelectedSpaceship(), user.getIdUser()); 

            // Setting response DTO values;
            userResponseTDO = new UserResponseDTO(
                user.getIdUser(), user.getSelectedSpaceship(), spaceshipValues,
                dataAchievements.getScore(), dataAchievements.getScoreMatch(),
                configuration.getSoundtrack(), configuration.getSoundEffects()); 
        }
        catch (SQLException e) {

            // Throw exception;
            throw new DatabaseConnectionException(e);
        }

        // Return UserResponseDTO;
        return userResponseTDO;
    }

    // Method to delete an User by ID;
    public void deleteUser(long id) {

        // Validating ID value;
        IdValidation.validate(id, new UserInvalidValuesException("ID"));

        // Try-Catch to handle exceptions;
        try {

            // Verify if user exists before deleting;
            UserValidation.verifyUsername(userDAO.read(id));

            // Deleting user-related entities in correct order;
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

            // Throw exception;
            throw new DatabaseConnectionException(e);
        }
    }
}