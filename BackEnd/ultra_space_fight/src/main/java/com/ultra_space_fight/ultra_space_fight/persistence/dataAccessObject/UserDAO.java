// Declaring the package of the UserDAO class;
package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

// Imports necessary classes to aply the Data Access Object;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

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
public class UserDAO implements CrudInterface<User> {

    // MySQL Connection variable, final because doesn't change;
    private final MysqlConnection MY_SQL_CONNECTION;

    // Constructor of the class initialyzing the MySQL Connection;
    public UserDAO() {
        MY_SQL_CONNECTION = new MysqlConnection();
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
                resultSet.getString("passaword"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                
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
                resultSet.getString("passaword"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                
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
        
        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();

            // Getting the connection and setting the AutoCommit with false;
            // Because, when commit, will do all that together. If it gets an
            // error, it will rollback all the changes, not bugging the database;  
            MY_SQL_CONNECTION.getConnection().setAutoCommit(false); 
            
            // Create a new User
            create(user);

            // Setting the id of the user;
            user.setIdUser(getUserId(user.getEmail(), user.getPassword())); 

            // Creating a new Configuration;
            Configuration configuration = new Configuration(user);
            new ConfigurationDAO(MY_SQL_CONNECTION).create(configuration);

            // Creating a new DataAchievements;
            DataAchievements dataAchievements = new DataAchievements(user);
            new DataAchievementDAO(MY_SQL_CONNECTION).create(dataAchievements);

            // Creating a new StandartShip;
            StandartShip standartShip = new StandartShip(user);
            new StandartShipDAO(MY_SQL_CONNECTION).create(standartShip);

            // Creating a new SpeedShip;
            SpeedShip speedShip = new SpeedShip(user);
            new SpeedShipDAO(MY_SQL_CONNECTION).create(speedShip);

            // Creating a new DestroyerShip;
            DestroyerShip destroyerShip = new DestroyerShip(user);
            new DestroyerShipDAO(MY_SQL_CONNECTION).create(destroyerShip);

            // Creating a new FreighterShip;
            FreighterShip freighterShip = new FreighterShip(user);
            new FreighterShipDAO(MY_SQL_CONNECTION).create(freighterShip);

            // Creating a new EliteShip;
            EliteShip eliteShip = new EliteShip(user);
            new EliteShipDAO(MY_SQL_CONNECTION).create(eliteShip);

            // Committing the changes in the database;
            MY_SQL_CONNECTION.getConnection().commit(); 
        } 
        catch (SQLException e) {

            // Try-Catch to handle Execptions;
            try {

                // Doing a rollback, canceling all the changes;
                MY_SQL_CONNECTION.getConnection().rollback(); 
            } 
            catch (SQLException x) {

                // Printing the Exception Message;
                System.out.println(x.getMessage());
            }

            // Printing the Exception Message;
            System.out.println(e.getMessage());
        }
        finally {

            // Closing a Connection with the Database;
            MY_SQL_CONNECTION.closeConnection();
        }
    }

    // Method that delete a User by user id;
    // It deletes all the others dependencies in the database;
    public void deleteAll(long userId) {

        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();

            // Getting the connection and setting the AutoCommit with false;
            // Because, when commit, will do all that together. If it gets an
            // error, it will rollback all the changes, not bugging the database;  
            MY_SQL_CONNECTION.getConnection().setAutoCommit(false);

            // Delete the Configuration;
            new ConfigurationDAO(MY_SQL_CONNECTION).delete(userId);

            // Delete the DataAchievements;
            new DataAchievementDAO(MY_SQL_CONNECTION).delete(userId);

            // Delete the StandartShip;
            new StandartShipDAO(MY_SQL_CONNECTION).delete(userId);

            // Delete the SpeedShip;
            new SpeedShipDAO(MY_SQL_CONNECTION).delete(userId);

            // Delete the DestroyerShip;
            new DestroyerShipDAO(MY_SQL_CONNECTION).delete(userId);

            // Delete the FreighterShi´p;
            new FreighterShipDAO(MY_SQL_CONNECTION).delete(userId);

            // Delete the EliteShip;
            new EliteShipDAO(MY_SQL_CONNECTION).delete(userId);

            // Delete the User;
            delete(userId); 

            // Committing the changes in the database;
            MY_SQL_CONNECTION.getConnection().commit();
        } 
        catch (SQLException e) {

            // Try-Catch to handle Execptions;
            try {

                // Doing a rollback, canceling all the changes;
                MY_SQL_CONNECTION.getConnection().rollback(); 
            } 
            catch (SQLException x) {

                // Printing the Exception Message;
                System.out.println(x.getMessage());
            }

            // Printing the Exception Message;
            System.out.println(e.getMessage());
        } 
        finally {  

            // Closing a Connection with the Database;
            MY_SQL_CONNECTION.closeConnection();
        }
    }
}