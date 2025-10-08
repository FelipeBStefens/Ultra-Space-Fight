// Declaring the package of the SpeedShipDAO class;
package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

// Imports necessary classes to aply the Data Access Object;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpeedShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;
import com.ultra_space_fight.ultra_space_fight.persistence.MysqlConnection;

// Declaring the SpeedShipDAO Class implementing the CrudInterface;
// the generic value is SpeedShip; 
@Repository
public class SpeedShipDAO implements CrudInterface<SpeedShip> {

    // MySQL Connection variable, final because doesn't change;
    private final MysqlConnection MY_SQL_CONNECTION;

    // Constructor of the class when there is already a Connection;
    public SpeedShipDAO(MysqlConnection MY_SQL_CONNECTION) {
        this.MY_SQL_CONNECTION = MY_SQL_CONNECTION;
    }

    // SQL code insert a value;
    private final String SQL_CREATE = """
        INSERT INTO speed_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """; 
    
    // SQL code delete a value;
    private final String SQL_DELETE = """
        DELETE FROM speed_ship 
        WHERE id_user = ?;    
        """;

    // SQL code update a value;
    private final String SQL_UPDATE = """
        UPDATE speed_ship
        SET life = ?, speed = ?, damage = ?
        WHERE id_user = ?;    
        """;

    // SQL code read a value;
    private final String SQL_READ = """
        SELECT * 
        FROM (users u INNER JOIN speed_ship s USING(id_user)) 
        WHERE id_user = ?;    
        """;

    // SQL code read all values;
    private final String SQL_READ_ALL = """
        SELECT * 
        FROM (users u INNER JOIN speed_ship s USING(id_user));    
        """;

    // Method that create a new SpeedShip in the database;
    @Override
    public void create(SpeedShip speedShip) throws SQLException {
        
        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();

            // Preparing a new Statement;
            PreparedStatement preparedStatement = 
                MY_SQL_CONNECTION.getConnection().prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);
            
            // Setting the values of the Statement;
            preparedStatement.setLong(1, speedShip.getUser().getIdUser());
            preparedStatement.setInt(2, speedShip.getLife());
            preparedStatement.setInt(3, speedShip.getSpeed());
            preparedStatement.setInt(4, speedShip.getDamage());

            // Executing the Statement;
            preparedStatement.executeUpdate();

            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                speedShip.setIdShip(resultSet.getLong(1));
            }
        }
        catch (SQLException e) {

            // Printing the Exception Message;
            throw e;
        }
        finally {

            // Closing a Connection with the Database;
            MY_SQL_CONNECTION.closeConnection();
        }
    }

    // Method that delete a SpeedShip in the database by id;
    @Override
    public void delete(long id) throws SQLException {
       
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
            throw e;
        }
        finally {

            // Closing a Connection with the Database;
            MY_SQL_CONNECTION.closeConnection();
        }
    }

    // Method that update a SpeedShip in the database;
    @Override
    public void update(SpeedShip speedShip) throws SQLException {
        
        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();

            // Preparing a new Statement;
            PreparedStatement preparedStatement = 
                MY_SQL_CONNECTION.getConnection().prepareStatement(SQL_UPDATE);
            
            // Setting the values of the Statement;
            preparedStatement.setInt(1, speedShip.getLife());
            preparedStatement.setInt(2, speedShip.getSpeed());
            preparedStatement.setInt(3, speedShip.getDamage());
            preparedStatement.setLong(4, speedShip.getUser().getIdUser());

            // Executing the Statement;
            preparedStatement.executeUpdate();
        }
        catch (SQLException e) {

            // Printing the Exception Message;
            throw e;
        }
        finally {

            // Closing a Connection with the Database;
            MY_SQL_CONNECTION.closeConnection();
        }
    }

    // Method that read a SpeedShip in the database by id;
    @Override
    public SpeedShip read(long id) throws SQLException {

        // Declaring a new speedShip;
        SpeedShip speedShip = null;

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
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"), 
                resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                
                // Setting the id of that user;
                user.setIdUser(id);

                // Creating a new speedShip;
                speedShip = new SpeedShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"), user);
                
                // Setting the id of that speedShip;
                speedShip.setIdShip(resultSet.getLong("id_ship"));
            }
        }
        catch (SQLException e) {

            // Printing the Exception Message;
            throw e;
        }
        finally {

            // Closing a Connection with the Database;
            MY_SQL_CONNECTION.closeConnection();
        }

        // Returning the SpeedShip;
        return speedShip;
    }

    // Method that read all SpeedShip in the database;
    @Override
    public List<SpeedShip> readAll() throws SQLException {
        
        // Declaring a new list;
        ArrayList<SpeedShip> allSpeedShip = new ArrayList<>();

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

                // Creating a new speedShip;
                SpeedShip speedShip = new SpeedShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"), user);
                
                // Setting the id of that speedShip;
                speedShip.setIdShip(resultSet.getLong("id_ship"));

                // Adding the speedShip in the list; 
                allSpeedShip.add(speedShip);
            }
        }
        catch (SQLException e) {

            // Printing the Exception Message;
            throw e;
        }
        finally {

            // Closing a Connection with the Database;
            MY_SQL_CONNECTION.closeConnection();
        }

        // Returning the list;
        return allSpeedShip;
    }  
}
