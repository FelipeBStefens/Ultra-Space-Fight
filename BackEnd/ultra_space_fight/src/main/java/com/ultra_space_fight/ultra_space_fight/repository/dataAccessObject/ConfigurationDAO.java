// Package;
package com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject;

// Imports;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.stereotype.Repository;

import com.ultra_space_fight.ultra_space_fight.models.userProfile.Configuration;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;

// ConfigurationDAO class to connect with Database;
@Repository
public class ConfigurationDAO implements CrudInterface<Configuration> {

    // DataSource attribute;
    private final DataSource dataSource;

    // Constructor;
    public ConfigurationDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // SQL Create Command;
    private static final String SQL_CREATE = 
        """
        INSERT INTO configurations (id_configuration, id_user, language_user, soundtrack, sound_effects)
        VALUES (NULL, ?, ?, ?, ?);
        """;

    // SQL Delete Command;
    private static final String SQL_DELETE =
        """
        DELETE FROM configurations WHERE id_user = ?;    
        """;

    // SQL Update Command;
    private static final String SQL_UPDATE =
        """
        UPDATE configurations
        SET language_user = ?, soundtrack = ?, sound_effects = ? 
        WHERE id_user = ?;
        """; 

    // SQL Read Command;
    private static final String SQL_READ = 
        """
        SELECT *
        FROM (users u INNER JOIN configurations c USING(id_user))       
        WHERE id_user = ?;
        """;

    // SQL Read All Command;
    private static final String SQL_READ_ALL = 
        """
        SELECT *
        FROM (users u INNER JOIN configurations c USING(id_user));
        """;

    // Inserts a new configuration record in the database
    @Override
    public void create(Configuration configuration) throws SQLException {
        
        // Try-with-resources guarantees that the connection and statement are closed automatically;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {

            // Set query parameters in the same order as the SQL command;
            preparedStatement.setLong(1, configuration.getUser().getIdUser());
            preparedStatement.setString(2, configuration.getLanguage());
            preparedStatement.setBigDecimal(3, configuration.getSoundtrack());
            preparedStatement.setBigDecimal(4, configuration.getSoundEffects());

            // Execute the INSERT command;
            preparedStatement.executeUpdate();

            // Getting the Results (auto-generated keys);
            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                if (resultSet.next()) {

                    // Assign the generated ID back to the configuration object;
                    configuration.setIdConfiguration(resultSet.getLong(1));
                }
            }
        }
    }

    // Deletes configuration for a specific user
    @Override
    public void delete(long id) throws SQLException {
        
        // Open a connection and prepare the SQL DELETE statement;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_DELETE)) {

            // Set the user ID parameter to specify which record to delete;
            preparedStatement.setLong(1, id);

            // Execute the deletion;
            preparedStatement.executeUpdate();
        }
    }

    // Updates a user's configuration record
    @Override
    public void update(Configuration configuration) throws SQLException {
        
        // Open a connection and prepare the SQL UPDATE statement;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {

            // Fill parameters according to the SQL query;
            preparedStatement.setString(1, configuration.getLanguage());
            preparedStatement.setBigDecimal(2, configuration.getSoundtrack());
            preparedStatement.setBigDecimal(3, configuration.getSoundEffects());
            preparedStatement.setLong(4, configuration.getUser().getIdUser());

            // Execute the update;
            preparedStatement.executeUpdate();
        }
    }

    // Reads configuration data for a specific user by ID
    @Override
    public Configuration read(long id) throws SQLException {
        Configuration configuration = null;

        // Open connection and prepare SQL query;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ)) {

            // Set the user ID as query parameter;
            preparedStatement.setLong(1, id);

            // Execute the query and retrieve the results;
            try (ResultSet resultSet = preparedStatement.executeQuery()) {

                // Check if a record exists and build corresponding objects
                if (resultSet.next()) {
                    
                    // Build the User object based on the joined "users" table;
                    User user = new User(
                        resultSet.getString("name_user"),
                        resultSet.getString("email"),
                        resultSet.getString("password_user"),
                        resultSet.getInt("cash"),
                        resultSet.getString("selected_spaceship")
                    );
                    user.setIdUser(id);

                    // Build the Configuration object linked to that user;
                    configuration = new Configuration(
                        resultSet.getString("language_user"),
                        resultSet.getBigDecimal("soundtrack"),
                        resultSet.getBigDecimal("sound_effects"),
                        user
                    );
                    configuration.setIdConfiguration(resultSet.getLong("id_configuration"));
                }
            }
        }

        // Return the configuration found (or null if not found);
        return configuration;
    }

    // Reads and returns all user configurations from the database
    @Override
    public List<Configuration> readAll() throws SQLException {
        List<Configuration> listConfigurations = new ArrayList<>();

        // Open connection and execute SQL SELECT for all records;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ_ALL);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            // Loop through all records returned by the query
            while (resultSet.next()) {
               
                // Create the User object with joined user data;
                User user = new User(
                    resultSet.getString("name_user"),
                    resultSet.getString("email"),
                    resultSet.getString("password_user"),
                    resultSet.getInt("cash"),
                    resultSet.getString("selected_spaceship")
                );
                user.setIdUser(resultSet.getLong("id_user"));

                // Create the Configuration object with corresponding data;
                Configuration configuration = new Configuration(
                    resultSet.getString("language_user"),
                    resultSet.getBigDecimal("soundtrack"),
                    resultSet.getBigDecimal("sound_effects"),
                    user
                );
                configuration.setIdConfiguration(resultSet.getLong("id_configuration"));

                // Add the object to the list;
                listConfigurations.add(configuration);
            }
        }

        // Return the list containing all configurations found;
        return listConfigurations;
    }
}