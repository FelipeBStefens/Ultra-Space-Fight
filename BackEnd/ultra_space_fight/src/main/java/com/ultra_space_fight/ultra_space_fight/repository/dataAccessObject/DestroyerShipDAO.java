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

import com.ultra_space_fight.ultra_space_fight.models.spaceships.DestroyerShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;

// Declaring the DestroyerShipDAO class;
@Repository
public class DestroyerShipDAO implements CrudInterface<DestroyerShip> {

    // DataSource attribute to manage database connections;
    private final DataSource dataSource;

    // Constructor that initializes the DataSource;
    public DestroyerShipDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // SQL statement to create a new destroyer ship;
    private static final String SQL_CREATE = 
        """
        INSERT INTO destroyer_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """;

    // SQL statement to delete a destroyer ship by user ID;
    private static final String SQL_DELETE = 
        """
        DELETE FROM destroyer_ship WHERE id_user = ?;                
        """;

    // SQL statement to update a destroyer ship by user ID;
    private static final String SQL_UPDATE =
        """
        UPDATE destroyer_ship 
        SET life = ?, speed = ?, damage = ?
        WHERE id_user = ?;
        """;
    
    // SQL statement to read a destroyer ship by user ID;
    private static final String SQL_READ = 
        """
        SELECT * 
        FROM (users u INNER JOIN destroyer_ship d USING(id_user))
        WHERE id_user = ?;
        """;
    
    // SQL statement to read all destroyer ships;
    private static final String SQL_READ_ALL = 
        """
        SELECT *
        FROM (users u INNER JOIN destroyer_ship d USING(id_user));
        """;
    
    // Method to create a new destroyer ship record in the database;
    @Override
    public void create(DestroyerShip destroyerShip) throws SQLException {
        
        // Try-with-resources ensures automatic closing of connection and statement;
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {

            // Set parameters in the SQL statement;
            preparedStatement.setLong(1, destroyerShip.getUser().getIdUser());
            preparedStatement.setInt(2, destroyerShip.getLife());
            preparedStatement.setInt(3, destroyerShip.getSpeed());
            preparedStatement.setInt(4, destroyerShip.getDamage());

            // Execute the INSERT command;
            preparedStatement.executeUpdate();

            // Getting the Results (auto-generated keys);
            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                if (resultSet.next()) {
                    
                    // Assign the generated ID back to the configuration object;
                    destroyerShip.setIdShip(resultSet.getLong(1));
                }
            }
        }
    }

    // Method to delete a destroyer ship record by user ID;
    @Override
    public void delete(long id) throws SQLException {
        
        
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_DELETE)) {

            // Set the user ID to delete;
            preparedStatement.setLong(1, id);

            // Execute the DELETE command;
            preparedStatement.executeUpdate();
        }
    }

    // Method to update a destroyer ship record in the database;
    @Override
    public void update(DestroyerShip destroyerShip) throws SQLException {
        
        
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {

            // Set the updated values in the SQL statement;
            preparedStatement.setInt(1, destroyerShip.getLife());
            preparedStatement.setInt(2, destroyerShip.getSpeed());
            preparedStatement.setInt(3, destroyerShip.getDamage());
            preparedStatement.setLong(4, destroyerShip.getUser().getIdUser());

            // Execute the UPDATE command;
            preparedStatement.executeUpdate();
        }
    }

    // Method to read a destroyer ship record by user ID;
    @Override
    public DestroyerShip read(long id) throws SQLException {
        
        
        DestroyerShip destroyerShip = null;

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

                    // Create the DestroyerShip object with values from the result set;
                    destroyerShip = new DestroyerShip(
                        resultSet.getInt("life"),
                        resultSet.getInt("speed"),
                        resultSet.getInt("damage"),
                        user
                    );
                    destroyerShip.setIdShip(resultSet.getLong("id_ship"));
                }
            }
        }

        // Return the destroyer ship object (or null if not found);
        return destroyerShip;
    }

    // Method to read all destroyer ship records from the database;
    @Override
    public List<DestroyerShip> readAll() throws SQLException {
        
        
        List<DestroyerShip> destroyerShipList = new ArrayList<>();


        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ_ALL);
            ResultSet resultSet = preparedStatement.executeQuery()) {

            // Loop through all results;
            while (resultSet.next()) {
                
                // Create User object for each record;
                User user = new User(
                    resultSet.getString("name_user"),
                    resultSet.getString("email"),
                    resultSet.getString("password_user"),
                    resultSet.getInt("cash"),
                    resultSet.getString("selected_spaceship")
                );
                user.setIdUser(resultSet.getLong("id_user"));

                // Create DestroyerShip object for each record;
                DestroyerShip destroyerShip = new DestroyerShip(
                    resultSet.getInt("life"),
                    resultSet.getInt("speed"),
                    resultSet.getInt("damage"),
                    user
                );
                destroyerShip.setIdShip(resultSet.getLong("id_ship"));

                // Add to the list of destroyer ships;
                destroyerShipList.add(destroyerShip);
            }
        }

        // Return the complete list of destroyer ships;
        return destroyerShipList;
    }
}