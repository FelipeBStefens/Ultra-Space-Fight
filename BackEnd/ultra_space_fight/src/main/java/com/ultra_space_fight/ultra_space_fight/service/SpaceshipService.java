// Package;
package com.ultra_space_fight.ultra_space_fight.service;

// Imports;
import java.sql.SQLException;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships.SpaceshipUpdateDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships.SpaceshipValuesDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships.SpaceshipsDTO;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.database.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.spaceships.SpaceshipInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.spaceships.SpaceshipUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.DestroyerShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.EliteShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.FreighterShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpeedShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.StandartShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.DataAchievementDAO;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.DestroyerShipDAO;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.EliteShipDAO;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.FreighterShipDAO;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.SpeedShipDAO;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.StandartShipDAO;
import com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject.UserDAO;
import com.ultra_space_fight.ultra_space_fight.utils.IdValidation;
import com.ultra_space_fight.ultra_space_fight.utils.SpaceshipValidation;
import com.ultra_space_fight.ultra_space_fight.utils.UserValidation;

// Spaceship Service class;
@Service
public class SpaceshipService {
    
    // DAO properties;
    public final UserDAO userDAO;
    public final StandartShipDAO standartShipDAO;
    public final SpeedShipDAO speedShipDAO;
    public final DestroyerShipDAO destroyerShipDAO;
    public final FreighterShipDAO freighterShipDAO;
    public final EliteShipDAO eliteShipDAO;
    public final DataAchievementDAO dataAchievementDAO;

    // Constructor;
    public SpaceshipService(UserDAO userDAO, StandartShipDAO standartShipDAO,
        SpeedShipDAO speedShipDAO, DestroyerShipDAO destroyerShipDAO, 
        FreighterShipDAO freighterShipDAO, EliteShipDAO eliteShipDAO,
        DataAchievementDAO dataAchievementDAO) {
        
        // Initializing DAO values;
        this.userDAO = userDAO;
        this.standartShipDAO = standartShipDAO;
        this.speedShipDAO = speedShipDAO;
        this.destroyerShipDAO = destroyerShipDAO;
        this.freighterShipDAO = freighterShipDAO;
        this.eliteShipDAO = eliteShipDAO;
        this.dataAchievementDAO = dataAchievementDAO;
    }

    // Method to get all spaceships and their values for a user;
    public SpaceshipsDTO getAllSpaceshipsValues(long id) {
        
        // Validating ID value;
        IdValidation.validate(id, new SpaceshipUnauthorizedException("ID"));

        // Declaring DTO;
        SpaceshipsDTO spaceshipsDTO = null;

        // Try-Catch block to handle SQL exceptions;
        try {
            // Verify if the user exists in database;
            UserValidation.verifyUsername(userDAO.read(id));

            // Reading all spaceship types for the user;
            StandartShip standartShip = standartShipDAO.read(id);
            SpeedShip speedShip = speedShipDAO.read(id);
            DestroyerShip destroyerShip = destroyerShipDAO.read(id);
            FreighterShip freighterShip = freighterShipDAO.read(id);
            EliteShip eliteShip = eliteShipDAO.read(id);

            // Creating DTOs with spaceship attributes;
            SpaceshipValuesDTO standartShipDTO = new SpaceshipValuesDTO(
                standartShip.getLife(), standartShip.getSpeed(), standartShip.getDamage());

            SpaceshipValuesDTO speedShipDTO = new SpaceshipValuesDTO(
                speedShip.getLife(), speedShip.getSpeed(), speedShip.getDamage());

            SpaceshipValuesDTO destroyerShipDTO = new SpaceshipValuesDTO(
                destroyerShip.getLife(), destroyerShip.getSpeed(), destroyerShip.getDamage());

            SpaceshipValuesDTO freighterShipDTO = new SpaceshipValuesDTO(
                freighterShip.getLife(), freighterShip.getSpeed(), freighterShip.getDamage());

            SpaceshipValuesDTO eliteShipDTO = new SpaceshipValuesDTO(
                eliteShip.getLife(), eliteShip.getSpeed(), eliteShip.getDamage());
        
            // Creating and returning SpaceshipsDTO containing all ship data and user cash;
            spaceshipsDTO = new SpaceshipsDTO(standartShip.getUser().getCash(), 
                standartShipDTO, speedShipDTO, destroyerShipDTO, freighterShipDTO, eliteShipDTO);
        }
        catch (SQLException e) {
            // Throw database exception if any SQL error occurs;
            throw new DatabaseConnectionException(e);
        }
        return spaceshipsDTO;
    }

    // Method to update which spaceship is currently selected by the user;
    public String updateSelectedSpaceship(String selectedSpaceship, long id) {

        // Validating spaceship name and user ID;
        SpaceshipValidation.validateSpaceship(selectedSpaceship);
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        String newSelectedSpaceship;

        // Try-Catch block to handle SQL exceptions;
        try {
            // Reading user from database;
            User user = userDAO.read(id);

            // Verify if user exists;
            UserValidation.verifyUsername(user);

            // Updating selected spaceship and saving;
            user.setSelectedSpaceship(selectedSpaceship);
            userDAO.update(user);

            newSelectedSpaceship = selectedSpaceship;
        }
        catch (SQLException e) {
            // Throw database exception if update fails;
            throw new DatabaseConnectionException(e);
        }
        return newSelectedSpaceship;
    }

    // Method to update Standart Ship;
    public SpaceshipUpdateDTO updateStandartShip(SpaceshipUpdateDTO spaceshipsUpdateDTO, long id) {

        // Declaring new DTO;
        SpaceshipUpdateDTO newSpaceshipUpdateDTO = null;

        // Validating ID;
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        // Try-Catch block to handle SQL exceptions;
        try {
            // Reading spaceship from database;
            StandartShip standartShip = standartShipDAO.read(id);

            // Verifying spaceship existence and values;
            SpaceshipValidation.verifySpaceship(standartShip);
            SpaceshipValidation.validateSpaceshipValues(spaceshipsUpdateDTO, standartShip);

            // Updating user cash based on upgrade cost;
            standartShip.getUser().setCash(standartShip.getUser().getCash() - spaceshipsUpdateDTO.getCash());
            userDAO.update(standartShip.getUser());

            // Updating spaceship stats;
            standartShip.setLife(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getLife());
            standartShip.setSpeed(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getSpeed());
            standartShip.setDamage(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getDamage());
            standartShipDAO.update(standartShip);

            // Creating new DTO to return updated data;
            SpaceshipValuesDTO spaceshipValuesDTO = new SpaceshipValuesDTO(
                standartShip.getLife(), standartShip.getSpeed(), standartShip.getDamage());

            newSpaceshipUpdateDTO = new SpaceshipUpdateDTO(standartShip.getUser().getCash(), spaceshipValuesDTO);
        }
        catch (SQLException e) {
            // Throw database exception if update fails;
            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateDTO;
    }

    // Method to update Speed Ship;
    public SpaceshipUpdateDTO updateSpeedShip(SpaceshipUpdateDTO spaceshipsUpdateDTO, long id) {

        SpaceshipUpdateDTO newSpaceshipUpdateDTO = null;
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        try {
            // Reading spaceship from database;
            SpeedShip speedShip = speedShipDAO.read(id);

            // Validating spaceship existence and values;
            SpaceshipValidation.verifySpaceship(speedShip);
            SpaceshipValidation.validateSpaceshipValues(spaceshipsUpdateDTO, speedShip);

            // Updating user cash after spending on upgrade;
            speedShip.getUser().setCash(speedShip.getUser().getCash() - spaceshipsUpdateDTO.getCash());
            userDAO.update(speedShip.getUser());

            // Updating spaceship attributes;
            speedShip.setLife(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getLife());
            speedShip.setSpeed(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getSpeed());
            speedShip.setDamage(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getDamage());
            speedShipDAO.update(speedShip);

            // Creating DTO with updated data;
            SpaceshipValuesDTO spaceshipValuesDTO = new SpaceshipValuesDTO(
                speedShip.getLife(), speedShip.getSpeed(), speedShip.getDamage());

            newSpaceshipUpdateDTO = new SpaceshipUpdateDTO(speedShip.getUser().getCash(), spaceshipValuesDTO);
        }
        catch (SQLException e) {
            // Throw database exception if update fails;
            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateDTO;
    }

    // Method to update Destroyer Ship;
    public SpaceshipUpdateDTO updateDestroyerShip(SpaceshipUpdateDTO spaceshipsUpdateDTO, long id) {

        SpaceshipUpdateDTO newSpaceshipUpdateDTO = null;
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        try {
            // Reading spaceship from database;
            DestroyerShip destroyerShip = destroyerShipDAO.read(id);

            // Validating spaceship existence and values;
            SpaceshipValidation.verifySpaceship(destroyerShip);
            SpaceshipValidation.validateSpaceshipValues(spaceshipsUpdateDTO, destroyerShip);

            // Updating user cash after spending on upgrade;
            destroyerShip.getUser().setCash(destroyerShip.getUser().getCash() - spaceshipsUpdateDTO.getCash());
            userDAO.update(destroyerShip.getUser());

            // Updating spaceship attributes;
            destroyerShip.setLife(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getLife());
            destroyerShip.setSpeed(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getSpeed());
            destroyerShip.setDamage(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getDamage());
            destroyerShipDAO.update(destroyerShip);

            // Creating DTO with updated data;
            SpaceshipValuesDTO spaceshipValuesDTO = new SpaceshipValuesDTO(
                destroyerShip.getLife(), destroyerShip.getSpeed(), destroyerShip.getDamage());

            newSpaceshipUpdateDTO = new SpaceshipUpdateDTO(destroyerShip.getUser().getCash(), spaceshipValuesDTO);
        }
        catch (SQLException e) {
            // Throw database exception if update fails;
            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateDTO;
    }

    // Method to update Freighter Ship;
    public SpaceshipUpdateDTO updateFreighterShip(SpaceshipUpdateDTO spaceshipsUpdateDTO, long id) {

        SpaceshipUpdateDTO newSpaceshipUpdateDTO = null;
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        try {
            // Reading spaceship from database;
            FreighterShip freighterShip = freighterShipDAO.read(id);

            // Validating spaceship existence and values;
            SpaceshipValidation.verifySpaceship(freighterShip);
            SpaceshipValidation.validateSpaceshipValues(spaceshipsUpdateDTO, freighterShip);

            // Updating user cash after spending on upgrade;
            freighterShip.getUser().setCash(freighterShip.getUser().getCash() - spaceshipsUpdateDTO.getCash());
            userDAO.update(freighterShip.getUser());

            // Updating spaceship attributes;
            freighterShip.setLife(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getLife());
            freighterShip.setSpeed(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getSpeed());
            freighterShip.setDamage(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getDamage());
            freighterShipDAO.update(freighterShip);

            // Creating DTO with updated data;
            SpaceshipValuesDTO spaceshipValuesDTO = new SpaceshipValuesDTO(
                freighterShip.getLife(), freighterShip.getSpeed(), freighterShip.getDamage());

            newSpaceshipUpdateDTO = new SpaceshipUpdateDTO(freighterShip.getUser().getCash(), spaceshipValuesDTO);
        }
        catch (SQLException e) {
            // Throw database exception if update fails;
            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateDTO;
    }

    // Method to update Elite Ship;
    public SpaceshipUpdateDTO updateEliteShip(SpaceshipUpdateDTO spaceshipsUpdateDTO, long id) {

        SpaceshipUpdateDTO newSpaceshipUpdateDTO = null;
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        try {
            // Reading spaceship from database;
            EliteShip eliteShip = eliteShipDAO.read(id);

            // Validating spaceship existence and values;
            SpaceshipValidation.verifySpaceship(eliteShip);
            SpaceshipValidation.validateSpaceshipValues(spaceshipsUpdateDTO, eliteShip);

            // Updating user cash after spending on upgrade;
            eliteShip.getUser().setCash(eliteShip.getUser().getCash() - spaceshipsUpdateDTO.getCash());
            userDAO.update(eliteShip.getUser());

            // Updating spaceship attributes;
            eliteShip.setLife(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getLife());
            eliteShip.setSpeed(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getSpeed());
            eliteShip.setDamage(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getDamage());
            eliteShipDAO.update(eliteShip);

            // Creating DTO with updated data;
            SpaceshipValuesDTO spaceshipValuesDTO = new SpaceshipValuesDTO(
                eliteShip.getLife(), eliteShip.getSpeed(), eliteShip.getDamage());

            newSpaceshipUpdateDTO = new SpaceshipUpdateDTO(eliteShip.getUser().getCash(), spaceshipValuesDTO);
        } 
        catch (SQLException e) {
            // Throw database exception if update fails;
            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateDTO;
    }
}