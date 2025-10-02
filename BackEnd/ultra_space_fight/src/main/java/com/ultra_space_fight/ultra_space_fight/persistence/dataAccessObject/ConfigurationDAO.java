// Declaring the package of the ConfigurationDAO class;
package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

// Imports necessary classes to aply the Data Access Object;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.ultra_space_fight.ultra_space_fight.models.userProfile.Configuration;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;
import com.ultra_space_fight.ultra_space_fight.persistence.MysqlConnection;

// Declaring the ConfigurationDAO Class implementing the CrudInterface;
// the generic value is Configuration;
@Repository 
public class ConfigurationDAO implements CrudInterface<Configuration> {

    // MySQL Connection variable, final because doesn't change;
    private final MysqlConnection MY_SQL_CONNECTION;

    // Constructor of the class when there is already a Connection;
    public ConfigurationDAO(MysqlConnection MY_SQL_CONNECTION) {
        this.MY_SQL_CONNECTION = MY_SQL_CONNECTION;
    }
    
    // SQL code insert a value;
    private final String SQL_CREATE = """
        INSERT INTO configurations (id_configuration, id_user, language_user, soundtrack, sound_effects)
        VALUES (NULL, ?, ?, ?, ?);
        """; 
    
    // SQL code delete a value;
    private final String SQL_DELETE = """
        DELETE FROM configurations WHERE id_user = ?;    
        """;

    // SQL code update a value;
    private final String SQL_UPDATE = """
        UPDATE configurations
        SET language_user = ?, soundtrack = ?, sound_effects = ?
        WHERE id_user = ?;    
        """;

    // SQL code read a value;
    private final String SQL_READ = """
        SELECT * 
        FROM (users u INNER JOIN configurations c USING(id_user)) 
        WHERE id_user = ?;    
        """;

    // SQL code read all values;
    private final String SQL_READ_ALL = """
        SELECT * 
        FROM (users u INNER JOIN configurations c USING(id_user));    
        """;

    // Method that create a new Configuration in the database;
    @Override
    public void create(Configuration configuration) throws SQLException{
        
        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();

            // Preparing a new Statement;
            PreparedStatement preparedStatement = 
                MY_SQL_CONNECTION.getConnection().prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);
            
            // Setting the values of the Statement;
            preparedStatement.setLong(1, configuration.getUser().getIdUser());
            preparedStatement.setString(2, configuration.getLanguage());
            preparedStatement.setBigDecimal(3, configuration.getSoundtrack());
            preparedStatement.setBigDecimal(4, configuration.getSoundEffects());

            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                configuration.setIdConfiguration(resultSet.getLong(1));
            }

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

    // Method that delete a Configuration in the database by id;
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

    // Method that update a Configuration in the database;
    @Override
    public void update(Configuration configuration) throws SQLException {
        
        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();

            // Preparing a new Statement;
            PreparedStatement preparedStatement = 
                MY_SQL_CONNECTION.getConnection().prepareStatement(SQL_UPDATE);
            
            // Setting the values of the Statement;
            preparedStatement.setString(1, configuration.getLanguage());
            preparedStatement.setBigDecimal(2, configuration.getSoundtrack());
            preparedStatement.setBigDecimal(3, configuration.getSoundEffects());
            preparedStatement.setLong(4, configuration.getUser().getIdUser());

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

    // Method that read a Configuration in the database by id;
    @Override
    public Configuration read(long id) throws SQLException {

        // Declaring a new Configuration;
        Configuration configuration = null;

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
                
                // Creating a new configuration;
                configuration = 
                    new Configuration(resultSet.getString("language_user"), resultSet.getBigDecimal("soundtrack"), 
                    resultSet.getBigDecimal("sound_effects"), user);
                
                // Setting the id of that configuration;
                configuration.setIdConfiguration(id);
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

        // Returning the Configuration;
        return configuration;
    }

    // Method that read all Configurations in the database;
    @Override
    public List<Configuration> readAll() throws SQLException {
        
        // Declaring a new list;
        ArrayList<Configuration> allConfigurations = new ArrayList<>();

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

                // Creating a new configuration;
                Configuration configuration = 
                    new Configuration(resultSet.getString("language_user"), resultSet.getBigDecimal("soundtrack"), 
                    resultSet.getBigDecimal("sound_effects"), user);
                
                // Setting the id of that configuration;
                configuration.setIdConfiguration(resultSet.getLong("id_configuration"));

                // Adding the configuration in the list; 
                allConfigurations.add(configuration);
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
        return allConfigurations;
    }  
}