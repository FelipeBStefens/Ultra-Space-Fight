package com.ultra_space_fight.ultra_space_fight.service;

import java.sql.SQLException;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.UserConflictException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.UserInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.UserNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.UserUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.DestroyerShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.EliteShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.FreighterShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpeedShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.StandartShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.Configuration;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.ConfigurationDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.DataAchievementDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.DestroyerShipDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.EliteShipDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.FreighterShipDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.SpeedShipDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.StandartShipDAO;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.UserDAO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.SpaceshipValuesTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.UserResponseTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.UserSendTDO;

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

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[\\w]+@gmail\\.com$");
    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$");
    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[\\w]{1,15}$");

    private static boolean isValidEmail(String email) {
        if (email == null) return false;
        return EMAIL_PATTERN.matcher(email).matches();
    }

    private static boolean isValidPassword(String password) {
        if (password == null) return false;
        return PASSWORD_PATTERN.matcher(password).matches();
    }

    private static boolean isValidUsername(String username) {
        if (username == null) return false;
        return USERNAME_PATTERN.matcher(username).matches();
    }

    private SpaceshipValuesTDO getSpaceshipValues(String spaceshipType, long id) throws SQLException {

        if (spaceshipType.equals("standart_ship")) {
            StandartShip standartShip = standartShipDAO.read(id);
            return new SpaceshipValuesTDO(standartShip.getLife(),
                standartShip.getSpeed(), standartShip.getDamage());
        }
        else if (spaceshipType.equals("speed_ship")) {
            SpeedShip speedShip = speedShipDAO.read(id);
            return new SpaceshipValuesTDO(speedShip.getLife(),
                speedShip.getSpeed(), speedShip.getDamage());
        }
        else if (spaceshipType.equals("destroyer_ship")) {
            DestroyerShip destroyerShip = destroyerShipDAO.read(id);
            return new SpaceshipValuesTDO(destroyerShip.getLife(),
                destroyerShip.getSpeed(), destroyerShip.getDamage());
        }
        else if (spaceshipType.equals("freighter_ship")) {
            FreighterShip freighterShip = freighterShipDAO.read(id);
            return new SpaceshipValuesTDO(freighterShip.getLife(),
                freighterShip.getSpeed(), freighterShip.getDamage());
        }
        else if (spaceshipType.equals("elite_ship")) {
            EliteShip eliteShip = eliteShipDAO.read(id);
            return new SpaceshipValuesTDO(eliteShip.getLife(),
                eliteShip.getSpeed(), eliteShip.getDamage());
        }
        return null;
    }

    public UserResponseTDO createUser(UserSendTDO userSendTDO) {

        if(!isValidUsername(userSendTDO.getUsername())) {
            throw new UserInvalidValuesException("Username");
        }
        else if(!isValidEmail(userSendTDO.getEmail())) {
            throw new UserInvalidValuesException("E-Mail");
        }
        else if(!isValidPassword(userSendTDO.getPassword())) {
            throw new UserInvalidValuesException("Password");
        }

        User user = new User(userSendTDO.getUsername(), 
            userSendTDO.getEmail(), userSendTDO.getPassword());

        Configuration configuration = new Configuration(user);
        DataAchievements dataAchievements = new DataAchievements(user);
        StandartShip standartShip = new StandartShip(user);
        SpeedShip speedShip = new SpeedShip(user);
        DestroyerShip destroyerShip = new DestroyerShip(user);
        FreighterShip freighterShip = new FreighterShip(user);
        EliteShip eliteShip = new EliteShip(user);
        
        SpaceshipValuesTDO spaceshipValues;
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
        return new UserResponseTDO(user.getIdUser(), user.getSelectedSpaceship(), spaceshipValues,
            dataAchievements.getScore(), dataAchievements.getScoreMatch(),
            configuration.getSoundtrack(), configuration.getSoundEffects());
    }


    public UserResponseTDO getUserLogin(String email, String password) {

        if(!isValidEmail(email)) {
            throw new UserUnauthorizedException("E-Mail");
        }
        else if(!isValidPassword(password)) {
            throw new UserUnauthorizedException("Password");
        }

        UserResponseTDO userResponseTDO = null;
        SpaceshipValuesTDO spaceshipValues;
        try {

            User user = userDAO.getUser(email, password);
            if (user == null) {
                throw new UserNotFoundException();
            }
            DataAchievements dataAchievements = dataAchievementDAO.read(user.getIdUser());
            Configuration configuration = configurationDAO.read(user.getIdUser());
            spaceshipValues = getSpaceshipValues(user.getSelectedSpaceship(), user.getIdUser()); 

            userResponseTDO = new UserResponseTDO(
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

        if (id <= 0) {
            throw new UserInvalidValuesException("ID");
        }

        try {

            if (userDAO.read(id) == null) {
                throw new UserNotFoundException();
            }

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