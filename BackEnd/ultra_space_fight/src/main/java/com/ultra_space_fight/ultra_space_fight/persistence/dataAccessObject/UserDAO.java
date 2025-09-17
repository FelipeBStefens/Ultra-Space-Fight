// Declaring the package of the UserDAO class;
package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

// Imports necessary classes to aply the Data Access Object;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.DestroyerShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.EliteShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.FreighterShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpeedShip;
import com.ultra_space_fight.ultra_space_fight.models.spaceships.StandartShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.Configuration;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;
import com.ultra_space_fight.ultra_space_fight.persistence.MysqlConnection;

// Declaring the UserDAO Class implementing the CrudInterface;
// the generic value is User; 
@Repository
public class UserDAO implements CrudInterface<User> {

    // MySQL Connection variable, final because doesn't change;
    private final MysqlConnection MY_SQL_CONNECTION;
    private final ConfigurationDAO CONFIGURATION_DAO;
    private final DataAchievementDAO DATA_ACHIEVEMENT_DAO;
    private final StandartShipDAO STANDART_SHIP_DAO;
    private final SpeedShipDAO SPEED_SHIP_DAO;
    private final DestroyerShipDAO DESTROYER_SHIP_DAO;
    private final FreighterShipDAO FREIGHTER_SHIP_DAO;
    private final EliteShipDAO ELITE_SHIP_DAO;

    public UserDAO(MysqlConnection MY_SQL_CONNECTION,
                   ConfigurationDAO CONFIGURATION_DAO,
                   DataAchievementDAO DATA_ACHIEVEMENT_DAO,
                   StandartShipDAO STANDART_SHIP_DAO,
                   SpeedShipDAO SPEED_SHIP_DAO,
                   DestroyerShipDAO DESTROYER_SHIP_DAO,
                   FreighterShipDAO FREIGHTER_SHIP_DAO,
                   EliteShipDAO ELITE_SHIP_DAO) {
        
        this.MY_SQL_CONNECTION = MY_SQL_CONNECTION;
        this.CONFIGURATION_DAO = CONFIGURATION_DAO;
        this.DATA_ACHIEVEMENT_DAO = DATA_ACHIEVEMENT_DAO;
        this.STANDART_SHIP_DAO = STANDART_SHIP_DAO;
        this.SPEED_SHIP_DAO = SPEED_SHIP_DAO;
        this.DESTROYER_SHIP_DAO = DESTROYER_SHIP_DAO;
        this.FREIGHTER_SHIP_DAO = FREIGHTER_SHIP_DAO;
        this.ELITE_SHIP_DAO = ELITE_SHIP_DAO;
    }
    // SQL code insert a value;
    private final String SQL_CREATE = """
        INSERT INTO users (id_user, name_user, email, password_user, cash, selected_spaceship)
        VALUES (NULL, ?, ?, ?, ?, ?);
        """; 
    
    // SQL code delete a value;
    private final String SQL_DELETE = """
        DELETE FROM users WHERE id_user = ?;    
        """;

    // SQL code update a value;
    private final String SQL_UPDATE = """
        UPDATE users
        SET name_user = ?, email = ?, password_user = ?, cash = ?, selected_spaceship = ?
        WHERE id_user = ?;    
        """;

    // SQL code read a value;
    private final String SQL_READ = """
        SELECT * 
        FROM users 
        WHERE id_user = ?;    
        """;

    // SQL code read all values;
    private final String SQL_READ_ALL = """
        SELECT * 
        FROM users;    
        """;

    // SQL code get user id by email and password;
    private final String SQL_GET_ID = """
        SELECT id_user 
        FROM users 
        WHERE email = ? AND password_user = ?;
        """;

    // Method that create a new User in the database;
    @Override
    public void create(User user) {
        
        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();

            // Preparing a new Statement;
            PreparedStatement preparedStatement = 
                MY_SQL_CONNECTION.getConnection().prepareStatement(SQL_CREATE);
            
            // Setting the values of the Statement;
            preparedStatement.setString(1, user.getUsername());
            preparedStatement.setString(2, user.getEmail());
            preparedStatement.setString(3, user.getPassword());
            preparedStatement.setInt(4, user.getCash());
            preparedStatement.setString(5, user.getSelectedSpaceship());

            // Executing the Statement;
            preparedStatement.executeUpdate();
        }
        catch (SQLException e) {

            // Printing the Exception Message;
            System.out.println(e.getMessage());
        }
        finally {

            // Closing a Connection with the Database;
            MY_SQL_CONNECTION.closeConnection();
        }
    }

    // Method that delete a User in the database by id;
    @Override
    public void delete(long id) {
       
        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();

            // Preparing a new Statement;
            PreparedStatement preparedStatement = 
                MY_SQL_CONNECTION.getConnection().prepareStatement(SQL_DELETE);
            
            // Setting the values of the Statement;
            preparedStatement.setLong(1, id);

            // Executing the Statement;
            preparedStatement.executeUpdate();
        }
        catch (SQLException e) {

            // Printing the Exception Message;
            System.out.println(e.getMessage());
        }
        finally {

            // Closing a Connection with the Database;
            MY_SQL_CONNECTION.closeConnection();
        }
    }

    // Method that update a User in the database;
    @Override
    public void update(User user) {
        
        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();

            // Preparing a new Statement;
            PreparedStatement preparedStatement = 
                MY_SQL_CONNECTION.getConnection().prepareStatement(SQL_UPDATE);
            
            // Setting the values of the Statement;
            preparedStatement.setString(1, user.getUsername());
            preparedStatement.setString(2, user.getEmail());
            preparedStatement.setString(3, user.getPassword());
            preparedStatement.setInt(4, user.getCash());
            preparedStatement.setString(5, user.getSelectedSpaceship());
            preparedStatement.setLong(6, user.getIdUser());

            // Executing the Statement;
            preparedStatement.executeUpdate();
        }
        catch (SQLException e) {

            // Printing the Exception Message;
            System.out.println(e.getMessage());
        }
        finally {

            // Closing a Connection with the Database;
            MY_SQL_CONNECTION.closeConnection();
        }
    }

    // Method that read a User in the database by id;
    @Override
    public User read(long id) {

        // Declaring a new user;
        User user = null;

        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();

            // Preparing a new Statement;
            PreparedStatement preparedStatement = 
                MY_SQL_CONNECTION.getConnection().prepareStatement(SQL_READ);
            
            // Setting the values of the Statement;
            preparedStatement.setLong(1, id);
            
            // Getting the Set of all Results;
            ResultSet resultSet = preparedStatement.executeQuery();

            // Seeing all the possibilities;
            if (resultSet.next()) {
                
                // Creating a new user;
                user = new User(resultSet.getString("name_user"), resultSet.getString("email"), 
                resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                
                // Setting the id of that user;
                user.setIdUser(resultSet.getLong("id_user"));
            }
        }
        catch (SQLException e) {

            // Printing the Exception Message;
            System.out.println(e.getMessage());
        }
        finally {

            // Closing a Connection with the Database;
            MY_SQL_CONNECTION.closeConnection();
        }

        // Returning the user;
        return user;
    }

    // Method that read all Users in the database;
    @Override
    public List<User> readAll() {
        
        // Declaring a new list;
        ArrayList<User> allUsers = new ArrayList<>();

        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();

            // Preparing a new Statement;
            PreparedStatement preparedStatement = 
                MY_SQL_CONNECTION.getConnection().prepareStatement(SQL_READ_ALL);
            
            // Getting the Set of all Results;
            ResultSet resultSet = preparedStatement.executeQuery();

            // Seeing all the possibilities;
            while (resultSet.next()) {

                // Creating a new user;
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"), 
                resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                
                // Setting the id of that user;
                user.setIdUser(resultSet.getLong("id_user"));
                
                // Adding the user in the list; 
                allUsers.add(user);
            }
        }
        catch (SQLException e) {

            // Printing the Exception Message;
            System.out.println(e.getMessage());
        }
        finally {

            // Closing a Connection with the Database;
            MY_SQL_CONNECTION.closeConnection();
        }

        // Returning the list;
        return allUsers;
    }  

    // Method that get the user id by email and password;
    public long getUserId(String email, String password) {

        // Declaring the id of the user, if it doesn't found, return -1;
        long id = -1;

        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();
            
            // Preparing a new Statement;
            PreparedStatement preparedStatement = 
                MY_SQL_CONNECTION.getConnection().prepareStatement(SQL_GET_ID);
            
            // Setting the values of the Statement;
            preparedStatement.setString(1, email);
            preparedStatement.setString(2, password);

            // Getting the Set of all Results;
            ResultSet resultSet = preparedStatement.executeQuery();

            // Seeing all the possibilities;
            if (resultSet.next()) {

                // Getting the id of that user;
                id = resultSet.getLong("id_user");
            }
        }
        catch (SQLException e) {

            // Printing the Exception Message;
            System.out.println(e.getMessage());
        }
        finally {

            // Closing a Connection with the Database;
            MY_SQL_CONNECTION.closeConnection();
        }

        // Returning the if of the user;
        return id;
    }

    // Method that create a new User;
    // It creates all the others dependencies in the database;
    public void createNewUser(User user) {
        try {
            MY_SQL_CONNECTION.openConnection();
            MY_SQL_CONNECTION.getConnection().setAutoCommit(false); 
            
            create(user);
            user.setIdUser(getUserId(user.getEmail(), user.getPassword())); 

            Configuration configuration = new Configuration(user);
            CONFIGURATION_DAO.create(configuration); 

            DataAchievements dataAchievements = new DataAchievements(user);
            DATA_ACHIEVEMENT_DAO.create(dataAchievements); 

            StandartShip standartShip = new StandartShip(user);
            STANDART_SHIP_DAO.create(standartShip); 

            SpeedShip speedShip = new SpeedShip(user);
            SPEED_SHIP_DAO.create(speedShip); 

            DestroyerShip destroyerShip = new DestroyerShip(user);
            DESTROYER_SHIP_DAO.create(destroyerShip); 

            FreighterShip freighterShip = new FreighterShip(user);
            FREIGHTER_SHIP_DAO.create(freighterShip);

            EliteShip eliteShip = new EliteShip(user);
            ELITE_SHIP_DAO.create(eliteShip); 
            MY_SQL_CONNECTION.getConnection().commit(); 
        } 
        catch (SQLException e) {
            try {
                MY_SQL_CONNECTION.getConnection().rollback(); 
            } 
            catch (SQLException x) {
                System.out.println(x.getMessage());
            }
            System.out.println(e.getMessage());
        }
        finally {
            MY_SQL_CONNECTION.closeConnection();
        }
    }

    // Method that delete a User by user id;
    // It deletes all the others dependencies in the database;
    public void deleteAll(long userId) {
        try {
            MY_SQL_CONNECTION.openConnection();
            MY_SQL_CONNECTION.getConnection().setAutoCommit(false);
            
            CONFIGURATION_DAO.deleteByUser(userId); 
            DATA_ACHIEVEMENT_DAO.deleteByUser(userId); 
            STANDART_SHIP_DAO.deleteByUser(userId); 
            SPEED_SHIP_DAO.deleteByUser(userId); 
            DESTROYER_SHIP_DAO.deleteByUser(userId); 
            FREIGHTER_SHIP_DAO.deleteByUser(userId); 
            ELITE_SHIP_DAO.deleteByUser(userId); 
            delete(userId); 

            MY_SQL_CONNECTION.getConnection().commit();
        } 
        catch (SQLException e) {
            try {
                MY_SQL_CONNECTION.getConnection().rollback(); 
            } 
            catch (SQLException x) {
                System.out.println(x.getMessage());
            }
            System.out.println(e.getMessage());
        } 
        finally { 
            MY_SQL_CONNECTION.closeConnection();
        }
    }
}