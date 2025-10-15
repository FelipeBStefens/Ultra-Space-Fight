package com.ultra_space_fight.ultra_space_fight.service;

import java.sql.SQLException;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships.SpaceshipUpdateDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships.SpaceshipValuesDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.spaceships.SpaceshipsDTO;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.SpaceshipInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.SpaceshipUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.DestroyerShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.EliteShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.FreighterShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpeedShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.StandartShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.DataAchievementDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.DestroyerShipDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.EliteShipDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.FreighterShipDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.SpeedShipDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.StandartShipDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.UserDAO;
import com.ultra_space_fight.ultra_space_fight.utils.IdValidation;
import com.ultra_space_fight.ultra_space_fight.utils.SpaceshipValidation;
import com.ultra_space_fight.ultra_space_fight.utils.UserValidation;

@Service
public class SpaceshipService {
    
    public final UserDAO userDAO;
    public final StandartShipDAO standartShipDAO;
    public final SpeedShipDAO speedShipDAO;
    public final DestroyerShipDAO destroyerShipDAO;
    public final FreighterShipDAO freighterShipDAO;
    public final EliteShipDAO eliteShipDAO;
    public final DataAchievementDAO dataAchievementDAO;

    public SpaceshipService(UserDAO userDAO, StandartShipDAO standartShipDAO,
        SpeedShipDAO speedShipDAO, DestroyerShipDAO destroyerShipDAO, 
        FreighterShipDAO freighterShipDAO, EliteShipDAO eliteShipDAO,
        DataAchievementDAO dataAchievementDAO) {
        
        this.userDAO = userDAO;
        this.standartShipDAO = standartShipDAO;
        this.speedShipDAO = speedShipDAO;
        this.destroyerShipDAO = destroyerShipDAO;
        this.freighterShipDAO = freighterShipDAO;
        this.eliteShipDAO = eliteShipDAO;
        this.dataAchievementDAO = dataAchievementDAO;
    }

    public SpaceshipsDTO getAllSpaceshipsValues(long id) {
        
        IdValidation.validate(id, new SpaceshipUnauthorizedException("ID"));


        SpaceshipsDTO spaceshipsTDO = null;

        try {
            
            UserValidation.verifyUsername(userDAO.read(id));

            StandartShip standartShip = standartShipDAO.read(id);
            SpeedShip speedShip = speedShipDAO.read(id);
            DestroyerShip destroyerShip = destroyerShipDAO.read(id);
            FreighterShip freighterShip = freighterShipDAO.read(id);
            EliteShip eliteShip = eliteShipDAO.read(id);

            SpaceshipValuesDTO standartShipTDO = new SpaceshipValuesDTO(
                standartShip.getLife(), standartShip.getSpeed(), standartShip.getDamage());

            SpaceshipValuesDTO speedShipTDO = new SpaceshipValuesDTO(
                speedShip.getLife(), speedShip.getSpeed(), speedShip.getDamage());

            SpaceshipValuesDTO destroyerShipTDO = new SpaceshipValuesDTO(
                destroyerShip.getLife(), destroyerShip.getSpeed(), destroyerShip.getDamage());

            SpaceshipValuesDTO freighterShipTDO = new SpaceshipValuesDTO(
                freighterShip.getLife(), freighterShip.getSpeed(), freighterShip.getDamage());

            SpaceshipValuesDTO eliteShipTDO = new SpaceshipValuesDTO(
                eliteShip.getLife(), eliteShip.getSpeed(), eliteShip.getDamage());
        
            spaceshipsTDO = new SpaceshipsDTO(standartShip.getUser().getCash(), 
                standartShipTDO, speedShipTDO, destroyerShipTDO, freighterShipTDO, eliteShipTDO);
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return spaceshipsTDO;
    }

    public String updateSelectedSpaceship(String selectedSpaceship, long id) {

        SpaceshipValidation.validateSpaceship(selectedSpaceship);
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        String newSelectedSpaceship;
        try {
            User user = userDAO.read(id);

            UserValidation.verifyUsername(user);
            user.setSelectedSpaceship(selectedSpaceship);
            userDAO.update(user);

            newSelectedSpaceship = selectedSpaceship;
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return newSelectedSpaceship;
    }


    public SpaceshipUpdateDTO updateStandartShip(SpaceshipUpdateDTO spaceshipsUpdateTDO, long id) {

        SpaceshipUpdateDTO newSpaceshipUpdateTDO = null;
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        try {
            StandartShip standartShip = standartShipDAO.read(id);

            SpaceshipValidation.verifySpaceship(standartShip);
            SpaceshipValidation.validateSpaceshipValues(newSpaceshipUpdateTDO, standartShip);

            standartShip.getUser().setCash(standartShip.getUser().getCash() - spaceshipsUpdateTDO.getCash());
            userDAO.update(standartShip.getUser());

            standartShip.setLife(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getLife());
            standartShip.setSpeed(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getSpeed());
            standartShip.setDamage(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getDamage());
            standartShipDAO.update(standartShip);

            SpaceshipValuesDTO spaceshipValuesTDO = new SpaceshipValuesDTO(
                standartShip.getLife(), standartShip.getSpeed(), standartShip.getDamage());

            newSpaceshipUpdateTDO = new SpaceshipUpdateDTO(standartShip.getUser().getCash(), spaceshipValuesTDO);
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateTDO;
    }

    public SpaceshipUpdateDTO updateSpeedShip(SpaceshipUpdateDTO spaceshipsUpdateTDO, long id) {

        SpaceshipUpdateDTO newSpaceshipUpdateTDO = null;
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        try {
            SpeedShip speedShip = speedShipDAO.read(id);

            SpaceshipValidation.verifySpaceship(speedShip);
            SpaceshipValidation.validateSpaceshipValues(newSpaceshipUpdateTDO, speedShip);

            speedShip.getUser().setCash(speedShip.getUser().getCash() - spaceshipsUpdateTDO.getCash());
            userDAO.update(speedShip.getUser());

            speedShip.setLife(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getLife());
            speedShip.setSpeed(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getSpeed());
            speedShip.setDamage(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getDamage());
            speedShipDAO.update(speedShip);

            SpaceshipValuesDTO spaceshipValuesTDO = new SpaceshipValuesDTO(
                speedShip.getLife(), speedShip.getSpeed(), speedShip.getDamage());

            newSpaceshipUpdateTDO = new SpaceshipUpdateDTO(speedShip.getUser().getCash(), spaceshipValuesTDO);
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateTDO;
    }

    public SpaceshipUpdateDTO updateDestroyerShip(SpaceshipUpdateDTO spaceshipsUpdateTDO, long id) {

        SpaceshipUpdateDTO newSpaceshipUpdateTDO = null;
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        try {
            DestroyerShip destroyerShip = destroyerShipDAO.read(id);

            SpaceshipValidation.verifySpaceship(destroyerShip);
            SpaceshipValidation.validateSpaceshipValues(newSpaceshipUpdateTDO, destroyerShip);

            destroyerShip.getUser().setCash(destroyerShip.getUser().getCash() - spaceshipsUpdateTDO.getCash());
            userDAO.update(destroyerShip.getUser());

            destroyerShip.setLife(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getLife());
            destroyerShip.setSpeed(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getSpeed());
            destroyerShip.setDamage(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getDamage());
            destroyerShipDAO.update(destroyerShip);

            SpaceshipValuesDTO spaceshipValuesTDO = new SpaceshipValuesDTO(
                destroyerShip.getLife(), destroyerShip.getSpeed(), destroyerShip.getDamage());

            newSpaceshipUpdateTDO = new SpaceshipUpdateDTO(destroyerShip.getUser().getCash(), spaceshipValuesTDO);
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateTDO;
    }

    public SpaceshipUpdateDTO updateFreighterShip(SpaceshipUpdateDTO spaceshipsUpdateTDO, long id) {

        SpaceshipUpdateDTO newSpaceshipUpdateTDO = null;
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        try {
            FreighterShip freighterShip = freighterShipDAO.read(id);

            SpaceshipValidation.verifySpaceship(freighterShip);
            SpaceshipValidation.validateSpaceshipValues(newSpaceshipUpdateTDO, freighterShip);

            freighterShip.getUser().setCash(freighterShip.getUser().getCash() - spaceshipsUpdateTDO.getCash());
            userDAO.update(freighterShip.getUser());

            freighterShip.setLife(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getLife());
            freighterShip.setSpeed(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getSpeed());
            freighterShip.setDamage(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getDamage());
            freighterShipDAO.update(freighterShip);

            SpaceshipValuesDTO spaceshipValuesTDO = new SpaceshipValuesDTO(
                freighterShip.getLife(), freighterShip.getSpeed(), freighterShip.getDamage());

            newSpaceshipUpdateTDO = new SpaceshipUpdateDTO(freighterShip.getUser().getCash(), spaceshipValuesTDO);
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateTDO;
    }

    public SpaceshipUpdateDTO updateEliteShip(SpaceshipUpdateDTO spaceshipsUpdateTDO, long id) {

        SpaceshipUpdateDTO newSpaceshipUpdateTDO = null;
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        try {
            EliteShip eliteShip = eliteShipDAO.read(id);

            SpaceshipValidation.verifySpaceship(eliteShip);
            SpaceshipValidation.validateSpaceshipValues(newSpaceshipUpdateTDO, eliteShip);

            eliteShip.getUser().setCash(eliteShip.getUser().getCash() - spaceshipsUpdateTDO.getCash());
            userDAO.update(eliteShip.getUser());

            eliteShip.setLife(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getLife());
            eliteShip.setSpeed(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getSpeed());
            eliteShip.setDamage(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getDamage());
            eliteShipDAO.update(eliteShip);

            SpaceshipValuesDTO spaceshipValuesTDO = new SpaceshipValuesDTO(
                eliteShip.getLife(), eliteShip.getSpeed(), eliteShip.getDamage());

            newSpaceshipUpdateTDO = new SpaceshipUpdateDTO(eliteShip.getUser().getCash(), spaceshipValuesTDO);
        } 
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateTDO;
    }
}