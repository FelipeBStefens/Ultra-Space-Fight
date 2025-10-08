package com.ultra_space_fight.ultra_space_fight.service;

import java.sql.SQLException;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.SpaceshipInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.SpaceshipNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.SpaceshipUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.UserNotFoundException;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.DestroyerShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.EliteShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.FreighterShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpaceShip;
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
import com.ultra_space_fight.ultra_space_fight.transferObjects.SpaceshipUpdateTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.SpaceshipValuesTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.SpaceshipsTDO;

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

    private boolean validateSpaceship(String selectedSpaceship) {

        String[] validSpaceships = {"standart_ship", "speed_ship", "destroyer_ship", "freighter_ship", "elite_ship"};
        for (String spaceship : validSpaceships) {
            if (spaceship.equals(selectedSpaceship)) {
                return true;
            }
        }
        return false;
    }

    private boolean validateSpaceshipValues(SpaceshipUpdateTDO spaceshipUpdateTDO, SpaceShip spaceship) {

        if (spaceship.getUser().getCash() - spaceshipUpdateTDO.getCash() < 0) {
            return false;
        }
        else if (spaceshipUpdateTDO.getSpaceshipValuesTDO().getLife() < 0 || spaceshipUpdateTDO.getSpaceshipValuesTDO().getLife() > 100) {
            return false;
        }
        else if (spaceshipUpdateTDO.getSpaceshipValuesTDO().getSpeed() < 0 || spaceshipUpdateTDO.getSpaceshipValuesTDO().getSpeed() > 10) {
            return false;
        }
        else if (spaceshipUpdateTDO.getSpaceshipValuesTDO().getDamage() < 0 || spaceshipUpdateTDO.getSpaceshipValuesTDO().getDamage() > 15) {
            return false;
        }
        return true;
    }

    public SpaceshipsTDO getAllSpaceshipsValues(long id) {
        
        if (id <= 0) {
            throw new SpaceshipUnauthorizedException("ID");
        }

        SpaceshipsTDO spaceshipsTDO = null;

        try {
            
            if (userDAO.read(id) == null) {
                throw new SpaceshipNotFoundException();
            }

            StandartShip standartShip = standartShipDAO.read(id);
            SpeedShip speedShip = speedShipDAO.read(id);
            DestroyerShip destroyerShip = destroyerShipDAO.read(id);
            FreighterShip freighterShip = freighterShipDAO.read(id);
            EliteShip eliteShip = eliteShipDAO.read(id);

            SpaceshipValuesTDO standartShipTDO = new SpaceshipValuesTDO(
                standartShip.getLife(), standartShip.getSpeed(), standartShip.getDamage());

            SpaceshipValuesTDO speedShipTDO = new SpaceshipValuesTDO(
                speedShip.getLife(), speedShip.getSpeed(), speedShip.getDamage());

            SpaceshipValuesTDO destroyerShipTDO = new SpaceshipValuesTDO(
                destroyerShip.getLife(), destroyerShip.getSpeed(), destroyerShip.getDamage());

            SpaceshipValuesTDO freighterShipTDO = new SpaceshipValuesTDO(
                freighterShip.getLife(), freighterShip.getSpeed(), freighterShip.getDamage());

            SpaceshipValuesTDO eliteShipTDO = new SpaceshipValuesTDO(
                eliteShip.getLife(), eliteShip.getSpeed(), eliteShip.getDamage());
        
            spaceshipsTDO = new SpaceshipsTDO(standartShip.getUser().getCash(), 
                standartShipTDO, speedShipTDO, destroyerShipTDO, freighterShipTDO, eliteShipTDO);
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return spaceshipsTDO;
    }

    public String updateSelectedSpaceship(String selectedSpaceship, long id) {

        if (!validateSpaceship(selectedSpaceship)) {
            throw new SpaceshipInvalidValuesException("Selected Spaceship");
        }
        if (id <= 0) {
            throw new SpaceshipInvalidValuesException("ID");
        }

        String newSelectedSpaceship;
        try {
            User user = userDAO.read(id);

            if (user == null) {
                throw new UserNotFoundException();
            }
            user.setSelectedSpaceship(selectedSpaceship);
            userDAO.update(user);

            newSelectedSpaceship = selectedSpaceship;
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return newSelectedSpaceship;
    }


    public SpaceshipUpdateTDO updateStandartShip(SpaceshipUpdateTDO spaceshipsUpdateTDO, long id) {

        SpaceshipUpdateTDO newSpaceshipUpdateTDO = null;
        if (id <= 0) {
            throw new SpaceshipInvalidValuesException("ID");
        }

        try {
            StandartShip standartShip = standartShipDAO.read(id);

            if (standartShip == null) {
                throw new SpaceshipNotFoundException();
            }
            if (!validateSpaceshipValues(spaceshipsUpdateTDO, standartShip)) {
                throw new SpaceshipInvalidValuesException("Spaceship Values or Cash");
            }

            standartShip.getUser().setCash(standartShip.getUser().getCash() - spaceshipsUpdateTDO.getCash());
            userDAO.update(standartShip.getUser());

            standartShip.setLife(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getLife());
            standartShip.setSpeed(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getSpeed());
            standartShip.setDamage(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getDamage());
            standartShipDAO.update(standartShip);

            SpaceshipValuesTDO spaceshipValuesTDO = new SpaceshipValuesTDO(
                standartShip.getLife(), standartShip.getSpeed(), standartShip.getDamage());

            newSpaceshipUpdateTDO = new SpaceshipUpdateTDO(standartShip.getUser().getCash(), spaceshipValuesTDO);
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateTDO;
    }

    public SpaceshipUpdateTDO updateSpeedShip(SpaceshipUpdateTDO spaceshipsUpdateTDO, long id) {

        SpaceshipUpdateTDO newSpaceshipUpdateTDO = null;
        if (id <= 0) {
            throw new SpaceshipInvalidValuesException("ID");
        }

        try {
            SpeedShip speedShip = speedShipDAO.read(id);

            if (speedShip == null) {
                throw new SpaceshipNotFoundException();
            }
            if (!validateSpaceshipValues(spaceshipsUpdateTDO, speedShip)) {
                throw new SpaceshipInvalidValuesException("Spaceship Values or Cash");
            }

            speedShip.getUser().setCash(speedShip.getUser().getCash() - spaceshipsUpdateTDO.getCash());
            userDAO.update(speedShip.getUser());

            speedShip.setLife(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getLife());
            speedShip.setSpeed(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getSpeed());
            speedShip.setDamage(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getDamage());
            speedShipDAO.update(speedShip);

            SpaceshipValuesTDO spaceshipValuesTDO = new SpaceshipValuesTDO(
                speedShip.getLife(), speedShip.getSpeed(), speedShip.getDamage());

            newSpaceshipUpdateTDO = new SpaceshipUpdateTDO(speedShip.getUser().getCash(), spaceshipValuesTDO);
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateTDO;
    }

    public SpaceshipUpdateTDO updateDestroyerShip(SpaceshipUpdateTDO spaceshipsUpdateTDO, long id) {

        SpaceshipUpdateTDO newSpaceshipUpdateTDO = null;
        if (id <= 0) {
            throw new SpaceshipInvalidValuesException("ID");
        }

        try {
            DestroyerShip destroyerShip = destroyerShipDAO.read(id);

            if (destroyerShip == null) {
                throw new SpaceshipNotFoundException();
            }
            if (!validateSpaceshipValues(spaceshipsUpdateTDO, destroyerShip)) {
                throw new SpaceshipInvalidValuesException("Spaceship Values or Cash");
            }

            destroyerShip.getUser().setCash(destroyerShip.getUser().getCash() - spaceshipsUpdateTDO.getCash());
            userDAO.update(destroyerShip.getUser());

            destroyerShip.setLife(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getLife());
            destroyerShip.setSpeed(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getSpeed());
            destroyerShip.setDamage(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getDamage());
            destroyerShipDAO.update(destroyerShip);

            SpaceshipValuesTDO spaceshipValuesTDO = new SpaceshipValuesTDO(
                destroyerShip.getLife(), destroyerShip.getSpeed(), destroyerShip.getDamage());

            newSpaceshipUpdateTDO = new SpaceshipUpdateTDO(destroyerShip.getUser().getCash(), spaceshipValuesTDO);
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateTDO;
    }

    public SpaceshipUpdateTDO updateFreighterShip(SpaceshipUpdateTDO spaceshipsUpdateTDO, long id) {

        SpaceshipUpdateTDO newSpaceshipUpdateTDO = null;
        if (id <= 0) {
            throw new SpaceshipInvalidValuesException("ID");
        }

        try {
            FreighterShip freighterShip = freighterShipDAO.read(id);

            if (freighterShip == null) {
                throw new SpaceshipNotFoundException();
            }
            if (!validateSpaceshipValues(spaceshipsUpdateTDO, freighterShip)) {
                throw new SpaceshipInvalidValuesException("Spaceship Values or Cash");
            }

            freighterShip.getUser().setCash(freighterShip.getUser().getCash() - spaceshipsUpdateTDO.getCash());
            userDAO.update(freighterShip.getUser());

            freighterShip.setLife(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getLife());
            freighterShip.setSpeed(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getSpeed());
            freighterShip.setDamage(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getDamage());
            freighterShipDAO.update(freighterShip);

            SpaceshipValuesTDO spaceshipValuesTDO = new SpaceshipValuesTDO(
                freighterShip.getLife(), freighterShip.getSpeed(), freighterShip.getDamage());

            newSpaceshipUpdateTDO = new SpaceshipUpdateTDO(freighterShip.getUser().getCash(), spaceshipValuesTDO);
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateTDO;
    }

    public SpaceshipUpdateTDO updateEliteShip(SpaceshipUpdateTDO spaceshipsUpdateTDO, long id) {

        SpaceshipUpdateTDO newSpaceshipUpdateTDO = null;
        if (id <= 0) {
            throw new SpaceshipInvalidValuesException("ID");
        }

        try {
            EliteShip eliteShip = eliteShipDAO.read(id);

            if (eliteShip == null) {
                throw new SpaceshipNotFoundException();
            }
            if (!validateSpaceshipValues(spaceshipsUpdateTDO, eliteShip)) {
                throw new SpaceshipInvalidValuesException("Spaceship Values or Cash");
            }

            eliteShip.getUser().setCash(eliteShip.getUser().getCash() - spaceshipsUpdateTDO.getCash());
            userDAO.update(eliteShip.getUser());

            eliteShip.setLife(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getLife());
            eliteShip.setSpeed(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getSpeed());
            eliteShip.setDamage(spaceshipsUpdateTDO.getSpaceshipValuesTDO().getDamage());
            eliteShipDAO.update(eliteShip);

            SpaceshipValuesTDO spaceshipValuesTDO = new SpaceshipValuesTDO(
                eliteShip.getLife(), eliteShip.getSpeed(), eliteShip.getDamage());

            newSpaceshipUpdateTDO = new SpaceshipUpdateTDO(eliteShip.getUser().getCash(), spaceshipValuesTDO);
        } 
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return newSpaceshipUpdateTDO;
    }
}