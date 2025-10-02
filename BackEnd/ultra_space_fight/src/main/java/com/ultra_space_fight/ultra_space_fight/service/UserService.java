package com.ultra_space_fight.ultra_space_fight.service;

import java.sql.SQLException;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.UserNotFoundException;
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

    public UserResponseTDO createUser(UserSendTDO userSendTDO) {

        User user = new User(userSendTDO.getUsername(), 
            userSendTDO.getEmail(), userSendTDO.getPassword());

        Configuration configuration = new Configuration(user);
        DataAchievements dataAchievements = new DataAchievements(user);
        StandartShip standartShip = new StandartShip(user);
        SpeedShip speedShip = new SpeedShip(user);
        DestroyerShip destroyerShip = new DestroyerShip(user);
        FreighterShip freighterShip = new FreighterShip(user);
        EliteShip eliteShip = new EliteShip(user);
        
        try {
            userDAO.create(user);
            configurationDAO.create(configuration);
            dataAchievementDAO.create(dataAchievements);
            standartShipDAO.create(standartShip);
            speedShipDAO.create(speedShip);
            destroyerShipDAO.create(destroyerShip);
            freighterShipDAO.create(freighterShip);
            eliteShipDAO.create(eliteShip);
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return new UserResponseTDO(user.getIdUser(), user.getSelectedSpaceship());
    }


    public UserResponseTDO getUserLogin(String email, String password) {

        UserResponseTDO userResponseTDO = null;

        try {
            User user = userDAO.getUser(email, password);
            
            if (user == null) {
                throw new UserNotFoundException();
            }
            userResponseTDO = new UserResponseTDO(
                user.getIdUser(), user.getSelectedSpaceship()); 
        }
        catch (SQLException e) {
            throw new DatabaseConnectionException(e);
        }
        return userResponseTDO;
    }
}