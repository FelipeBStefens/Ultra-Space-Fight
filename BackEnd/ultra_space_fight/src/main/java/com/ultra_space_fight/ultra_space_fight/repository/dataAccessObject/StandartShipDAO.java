// Declaring the package of the StandartShipDAO class;
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

import com.ultra_space_fight.ultra_space_fight.models.spaceships.StandartShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;

// Declaring the StandartShipDAO class implementing the CrudInterface;
// The generic type is StandartShip;
@Repository
public class StandartShipDAO implements CrudInterface<StandartShip> {

    // DataSource injected by Spring to manage database connections
    private final DataSource dataSource;

    // Constructor to initialize DataSource
    public StandartShipDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // SQL statement to create a new StandartShip
    private final String SQL_CREATE = 
        """
        INSERT INTO standart_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """;

    // SQL statement to delete a StandartShip by user ID
    private final String SQL_DELETE = 
        """
        DELETE FROM standart_ship 
        WHERE id_user = ?;    
        """;

    // SQL statement to update a StandartShip by user ID
    private final String SQL_UPDATE = 
        """
        UPDATE standart_ship
        SET life = ?, speed = ?, damage = ?
        WHERE id_user = ?;    
        """;

    // SQL statement to read a StandartShip by user ID
    private final String SQL_READ = 
        """
        SELECT * 
        FROM (users u INNER JOIN standart_ship s USING(id_user)) 
        WHERE id_user = ?;    
        """;

    // SQL statement to read all StandartShips
    private final String SQL_READ_ALL = 
        """
        SELECT * 
        FROM (users u INNER JOIN standart_ship s USING(id_user));    
        """;

    // Method to create a new StandartShip record in the database
    @Override
    public void create(StandartShip standartShip) throws SQLException {
        
        
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {

            // Set SQL parameters from the StandartShip object
            preparedStatement.setLong(1, standartShip.getUser().getIdUser());
            preparedStatement.setInt(2, standartShip.getLife());
            preparedStatement.setInt(3, standartShip.getSpeed());
            preparedStatement.setInt(4, standartShip.getDamage());

            // Execute the INSERT statement
            preparedStatement.executeUpdate();

            // Retrieve generated ID (id_ship) and assign it to the object
            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                
                
                if (resultSet.next()) {
                    
                    
                    standartShip.setIdShip(resultSet.getLong(1));
                }
            }
        }
    }

    // Method to delete a StandartShip record by user ID
    @Override
    public void delete(long id) throws SQLException {
        
        
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_DELETE)) {

            // Set the user ID parameter
            preparedStatement.setLong(1, id);

            // Execute the DELETE statement
            preparedStatement.executeUpdate();
        }
    }

    // Method to update a StandartShip record in the database
    @Override
    public void update(StandartShip standartShip) throws SQLException {
        
        
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {

            // Set updated values from the StandartShip object
            preparedStatement.setInt(1, standartShip.getLife());
            preparedStatement.setInt(2, standartShip.getSpeed());
            preparedStatement.setInt(3, standartShip.getDamage());
            preparedStatement.setLong(4, standartShip.getUser().getIdUser());

            // Execute the UPDATE statement
            preparedStatement.executeUpdate();
        }
    }

    // Method to read a StandartShip record by user ID
    @Override
    public StandartShip read(long id) throws SQLException {
        
        // Initialize StandartShip as null
        StandartShip standartShip = null;

        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ)) {

            // Set the user ID parameter
            preparedStatement.setLong(1, id);

            // Execute the query and process the result set
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                

                if (resultSet.next()) {
                    
                    // Create a User object from the result set
                    User user = new User(
                        resultSet.getString("name_user"),
                        resultSet.getString("email"),
                        resultSet.getString("password_user"),
                        resultSet.getInt("cash"),
                        resultSet.getString("selected_spaceship")
                    );
                    user.setIdUser(resultSet.getLong("id_user"));

                    // Create the StandartShip object
                    standartShip = new StandartShip(
                        resultSet.getInt("life"),
                        resultSet.getInt("speed"),
                        resultSet.getInt("damage"),
                        user
                    );
                    standartShip.setIdShip(resultSet.getLong("id_ship"));
                }
            }
        }

        // Return the StandartShip object (or null if not found)
        return standartShip;
    }

    // Method to read all StandartShip records from the database
    @Override
    public List<StandartShip> readAll() throws SQLException {
        
        // Initialize list to store all StandartShips
        List<StandartShip> allStandartShip = new ArrayList<>();

        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ_ALL);
            ResultSet resultSet = preparedStatement.executeQuery()) {

            // Iterate over all records
            while (resultSet.next()) {

                // Create a User object for each record
                User user = new User(
                    resultSet.getString("name_user"),
                    resultSet.getString("email"),
                    resultSet.getString("password_user"),
                    resultSet.getInt("cash"),
                    resultSet.getString("selected_spaceship")
                );
                user.setIdUser(resultSet.getLong("id_user"));

                // Create a StandartShip object for each record
                StandartShip standartShip = new StandartShip(
                    resultSet.getInt("life"),
                    resultSet.getInt("speed"),
                    resultSet.getInt("damage"),
                    user
                );
                standartShip.setIdShip(resultSet.getLong("id_ship"));

                // Add the object to the list
                allStandartShip.add(standartShip);
            }
        }

        // Return the complete list
        return allStandartShip;
    }
}