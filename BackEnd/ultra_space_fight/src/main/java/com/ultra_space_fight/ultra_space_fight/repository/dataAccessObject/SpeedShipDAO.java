// Declaring the package of the SpeedShipDAO class;
package com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject;

// Imports necessary classes to handle SQL connections and operations;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.stereotype.Repository;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpeedShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;

// Declaring the SpeedShipDAO class implementing the CrudInterface;
// The generic type is SpeedShip;
@Repository
public class SpeedShipDAO implements CrudInterface<SpeedShip> {

    // DataSource attribute to manage database connections;
    private final DataSource dataSource;

    // Constructor to initialize the DataSource;
    public SpeedShipDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // SQL statement to create a new SpeedShip;
    private final String SQL_CREATE = 
        """
        INSERT INTO speed_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """;

    // SQL statement to delete a SpeedShip by user ID;
    private final String SQL_DELETE = 
        """
        DELETE FROM speed_ship WHERE id_user = ?;    
        """;

    // SQL statement to update a SpeedShip by user ID;
    private final String SQL_UPDATE = 
        """
        UPDATE speed_ship
        SET life = ?, speed = ?, damage = ?
        WHERE id_user = ?;    
        """;

    // SQL statement to read a SpeedShip by user ID;
    private final String SQL_READ = 
        """
        SELECT * 
        FROM (users u INNER JOIN speed_ship s USING(id_user)) 
        WHERE id_user = ?;    
        """;

    // SQL statement to read all SpeedShips;
    private final String SQL_READ_ALL = 
        """
        SELECT * 
        FROM (users u INNER JOIN speed_ship s USING(id_user));    
        """;

    // Method to create a new SpeedShip record in the database;
    @Override
    public void create(SpeedShip speedShip) throws SQLException {
        
        // Try-with-resources ensures automatic closing of connection and statement;
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {

            // Set parameters in the SQL statement in the correct order;
            preparedStatement.setLong(1, speedShip.getUser().getIdUser());
            preparedStatement.setInt(2, speedShip.getLife());
            preparedStatement.setInt(3, speedShip.getSpeed());
            preparedStatement.setInt(4, speedShip.getDamage());

            // Execute the INSERT command;
            preparedStatement.executeUpdate();

            // Retrieve the generated ID (id_ship) and assign it to the object;
            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                
                
                if (resultSet.next()) {
                    
                    
                    speedShip.setIdShip(resultSet.getLong(1));
                }
            }
        }
    }

    // Method to delete a SpeedShip record by user ID;
    @Override
    public void delete(long id) throws SQLException {
        
        
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_DELETE)) {

            // Set the user ID parameter;
            preparedStatement.setLong(1, id);

            // Execute the DELETE command;
            preparedStatement.executeUpdate();
        }
    }

    // Method to update a SpeedShip record in the database;
    @Override
    public void update(SpeedShip speedShip) throws SQLException {
        
        
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {

            // Set the updated values in the SQL statement;
            preparedStatement.setInt(1, speedShip.getLife());
            preparedStatement.setInt(2, speedShip.getSpeed());
            preparedStatement.setInt(3, speedShip.getDamage());
            preparedStatement.setLong(4, speedShip.getUser().getIdUser());

            // Execute the UPDATE command;
            preparedStatement.executeUpdate();
        }
    }

    // Method to read a SpeedShip record by user ID;
    @Override
    public SpeedShip read(long id) throws SQLException {
        
        // Initialize SpeedShip as null to store the result;
        SpeedShip speedShip = null;

        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ)) {

            // Set the user ID parameter;
            preparedStatement.setLong(1, id);

            // Execute the query and retrieve the result;
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                
                
                if (resultSet.next()) {
                    
                    // Create a User object from the result set;
                    User user = new User(
                        resultSet.getString("name_user"),
                        resultSet.getString("email"),
                        resultSet.getString("password_user"),
                        resultSet.getInt("cash"),
                        resultSet.getString("selected_spaceship")
                    );
                    user.setIdUser(resultSet.getLong("id_user"));

                    // Create the SpeedShip object with values from the result set;
                    speedShip = new SpeedShip(
                        resultSet.getInt("life"),
                        resultSet.getInt("speed"),
                        resultSet.getInt("damage"),
                        user
                    );
                    speedShip.setIdShip(resultSet.getLong("id_ship"));
                }
            }
        }

        // Return the SpeedShip object (or null if not found);
        return speedShip;
    }

    // Method to read all SpeedShip records from the database;
    @Override
    public List<SpeedShip> readAll() throws SQLException {
        
        // Initialize the list that will store all SpeedShips;
        List<SpeedShip> speedShipList = new ArrayList<>();

        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ_ALL);
            ResultSet resultSet = preparedStatement.executeQuery()) {

            // Loop through all results;
            while (resultSet.next()) {

                // Create a User object for each record;
                User user = new User(
                    resultSet.getString("name_user"),
                    resultSet.getString("email"),
                    resultSet.getString("password_user"),
                    resultSet.getInt("cash"),
                    resultSet.getString("selected_spaceship")
                );
                user.setIdUser(resultSet.getLong("id_user"));

                // Create SpeedShip object for each record;
                SpeedShip speedShip = new SpeedShip(
                    resultSet.getInt("life"),
                    resultSet.getInt("speed"),
                    resultSet.getInt("damage"),
                    user
                );
                speedShip.setIdShip(resultSet.getLong("id_ship"));

                // Add each object to the list;
                speedShipList.add(speedShip);
            }
        }

        // Return the complete list of SpeedShips;
        return speedShipList;
    }
}