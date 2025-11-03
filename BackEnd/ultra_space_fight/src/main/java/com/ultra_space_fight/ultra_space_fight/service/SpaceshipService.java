
package com.ultra_space_fight.ultra_space_fight.service;


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


        SpaceshipsDTO spaceshipsDTO = null;


        try {

            UserValidation.verifyUsername(userDAO.read(id));


            StandartShip standartShip = standartShipDAO.read(id);
            SpeedShip speedShip = speedShipDAO.read(id);
            DestroyerShip destroyerShip = destroyerShipDAO.read(id);
            FreighterShip freighterShip = freighterShipDAO.read(id);
            EliteShip eliteShip = eliteShipDAO.read(id);


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
        

            spaceshipsDTO = new SpaceshipsDTO(standartShip.getUser().getCash(), 
                standartShipDTO, speedShipDTO, destroyerShipDTO, freighterShipDTO, eliteShipDTO);
        }
        catch (SQLException e) {

            throw new DatabaseConnectionException(e);
        }
        return spaceshipsDTO;
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


    public SpaceshipUpdateDTO updateStandartShip(SpaceshipUpdateDTO spaceshipsUpdateDTO, long id) {


        SpaceshipUpdateDTO newSpaceshipUpdateDTO = null;


        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));


        try {

            StandartShip standartShip = standartShipDAO.read(id);


            SpaceshipValidation.verifySpaceship(standartShip);
            SpaceshipValidation.validateSpaceshipValues(spaceshipsUpdateDTO, standartShip);


            standartShip.getUser().setCash(standartShip.getUser().getCash() - spaceshipsUpdateDTO.getCash());
            userDAO.update(standartShip.getUser());


            standartShip.setLife(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getLife());
            standartShip.setSpeed(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getSpeed());
            standartShip.setDamage(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getDamage());
            standartShipDAO.update(standartShip);


            SpaceshipValuesDTO spaceshipValuesDTO = new SpaceshipValuesDTO(
                standartShip.getLife(), standartShip.getSpeed(), standartShip.getDamage());

            newSpaceshipUpdateDTO = new SpaceshipUpdateDTO(standartShip.getUser().getCash(), spaceshipValuesDTO);
        }
        catch (SQLException e) {

            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateDTO;
    }


    public SpaceshipUpdateDTO updateSpeedShip(SpaceshipUpdateDTO spaceshipsUpdateDTO, long id) {

        SpaceshipUpdateDTO newSpaceshipUpdateDTO = null;
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        try {

            SpeedShip speedShip = speedShipDAO.read(id);


            SpaceshipValidation.verifySpaceship(speedShip);
            SpaceshipValidation.validateSpaceshipValues(spaceshipsUpdateDTO, speedShip);


            speedShip.getUser().setCash(speedShip.getUser().getCash() - spaceshipsUpdateDTO.getCash());
            userDAO.update(speedShip.getUser());


            speedShip.setLife(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getLife());
            speedShip.setSpeed(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getSpeed());
            speedShip.setDamage(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getDamage());
            speedShipDAO.update(speedShip);


            SpaceshipValuesDTO spaceshipValuesDTO = new SpaceshipValuesDTO(
                speedShip.getLife(), speedShip.getSpeed(), speedShip.getDamage());

            newSpaceshipUpdateDTO = new SpaceshipUpdateDTO(speedShip.getUser().getCash(), spaceshipValuesDTO);
        }
        catch (SQLException e) {

            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateDTO;
    }


    public SpaceshipUpdateDTO updateDestroyerShip(SpaceshipUpdateDTO spaceshipsUpdateDTO, long id) {

        SpaceshipUpdateDTO newSpaceshipUpdateDTO = null;
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        try {

            DestroyerShip destroyerShip = destroyerShipDAO.read(id);


            SpaceshipValidation.verifySpaceship(destroyerShip);
            SpaceshipValidation.validateSpaceshipValues(spaceshipsUpdateDTO, destroyerShip);


            destroyerShip.getUser().setCash(destroyerShip.getUser().getCash() - spaceshipsUpdateDTO.getCash());
            userDAO.update(destroyerShip.getUser());


            destroyerShip.setLife(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getLife());
            destroyerShip.setSpeed(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getSpeed());
            destroyerShip.setDamage(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getDamage());
            destroyerShipDAO.update(destroyerShip);


            SpaceshipValuesDTO spaceshipValuesDTO = new SpaceshipValuesDTO(
                destroyerShip.getLife(), destroyerShip.getSpeed(), destroyerShip.getDamage());

            newSpaceshipUpdateDTO = new SpaceshipUpdateDTO(destroyerShip.getUser().getCash(), spaceshipValuesDTO);
        }
        catch (SQLException e) {

            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateDTO;
    }


    public SpaceshipUpdateDTO updateFreighterShip(SpaceshipUpdateDTO spaceshipsUpdateDTO, long id) {

        SpaceshipUpdateDTO newSpaceshipUpdateDTO = null;
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        try {

            FreighterShip freighterShip = freighterShipDAO.read(id);


            SpaceshipValidation.verifySpaceship(freighterShip);
            SpaceshipValidation.validateSpaceshipValues(spaceshipsUpdateDTO, freighterShip);


            freighterShip.getUser().setCash(freighterShip.getUser().getCash() - spaceshipsUpdateDTO.getCash());
            userDAO.update(freighterShip.getUser());


            freighterShip.setLife(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getLife());
            freighterShip.setSpeed(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getSpeed());
            freighterShip.setDamage(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getDamage());
            freighterShipDAO.update(freighterShip);


            SpaceshipValuesDTO spaceshipValuesDTO = new SpaceshipValuesDTO(
                freighterShip.getLife(), freighterShip.getSpeed(), freighterShip.getDamage());

            newSpaceshipUpdateDTO = new SpaceshipUpdateDTO(freighterShip.getUser().getCash(), spaceshipValuesDTO);
        }
        catch (SQLException e) {

            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateDTO;
    }


    public SpaceshipUpdateDTO updateEliteShip(SpaceshipUpdateDTO spaceshipsUpdateDTO, long id) {

        SpaceshipUpdateDTO newSpaceshipUpdateDTO = null;
        IdValidation.validate(id, new SpaceshipInvalidValuesException("ID"));

        try {

            EliteShip eliteShip = eliteShipDAO.read(id);


            SpaceshipValidation.verifySpaceship(eliteShip);
            SpaceshipValidation.validateSpaceshipValues(spaceshipsUpdateDTO, eliteShip);


            eliteShip.getUser().setCash(eliteShip.getUser().getCash() - spaceshipsUpdateDTO.getCash());
            userDAO.update(eliteShip.getUser());


            eliteShip.setLife(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getLife());
            eliteShip.setSpeed(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getSpeed());
            eliteShip.setDamage(spaceshipsUpdateDTO.getSpaceshipValuesDTO().getDamage());
            eliteShipDAO.update(eliteShip);


            SpaceshipValuesDTO spaceshipValuesDTO = new SpaceshipValuesDTO(
                eliteShip.getLife(), eliteShip.getSpeed(), eliteShip.getDamage());

            newSpaceshipUpdateDTO = new SpaceshipUpdateDTO(eliteShip.getUser().getCash(), spaceshipValuesDTO);
        } 
        catch (SQLException e) {

            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateDTO;
    }
}