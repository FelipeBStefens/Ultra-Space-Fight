// Declaring the package of the EliteShipDAO class;
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

import com.ultra_space_fight.ultra_space_fight.models.spaceships.EliteShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;

// Declaring the EliteShipDAO class implementing the CrudInterface;
// The generic type is EliteShip;
@Repository
public class EliteShipDAO implements CrudInterface<EliteShip> {

    // DataSource attribute to manage database connections;
    private final DataSource dataSource;

    // Constructor to initialize the DataSource;
    public EliteShipDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // SQL statement to create a new elite ship;
    private final String SQL_CREATE = 
        """
        INSERT INTO elite_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """;

    // SQL statement to delete an elite ship by user ID;
    private final String SQL_DELETE = 
        """
        DELETE FROM elite_ship WHERE id_user = ?;    
        """;

    // SQL statement to update an elite ship by user ID;
    private final String SQL_UPDATE = 
        """
        UPDATE elite_ship
        SET life = ?, speed = ?, damage = ?
        WHERE id_user = ?;    
        """;

    // SQL statement to read an elite ship by user ID;
    private final String SQL_READ =
        """
        SELECT * 
        FROM (users u INNER JOIN elite_ship e USING(id_user)) 
        WHERE id_user = ?;    
        """;

    // SQL statement to read all elite ships;
    private final String SQL_READ_ALL = 
        """
        SELECT * 
        FROM (users u INNER JOIN elite_ship e USING(id_user));    
        """;

    // Method to create a new elite ship record in the database;
    @Override
    public void create(EliteShip eliteShip) throws SQLException {
        
        // Try-with-resources ensures automatic closing of connection and statement;
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {

            // Set parameters in the SQL statement in the correct order;
            preparedStatement.setLong(1, eliteShip.getUser().getIdUser());
            preparedStatement.setInt(2, eliteShip.getLife());
            preparedStatement.setInt(3, eliteShip.getSpeed());
            preparedStatement.setInt(4, eliteShip.getDamage());

            // Execute the INSERT command;
            preparedStatement.executeUpdate();

            // Retrieve the generated ID (id_ship) and assign it to the object;
            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                
                
                if (resultSet.next()) {
                    
                    
                    eliteShip.setIdShip(resultSet.getLong(1));
                }
            }
        } 
    }

    // Method to delete an elite ship record by user ID;
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

    // Method to update an elite ship record in the database;
    @Override
    public void update(EliteShip eliteShip) throws SQLException {
        
        
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {

            // Set the updated values in the SQL statement;
            preparedStatement.setInt(1, eliteShip.getLife());
            preparedStatement.setInt(2, eliteShip.getSpeed());
            preparedStatement.setInt(3, eliteShip.getDamage());
            preparedStatement.setLong(4, eliteShip.getUser().getIdUser());

            // Execute the UPDATE command;
            preparedStatement.executeUpdate();
        } 
    }

    // Method to read an elite ship record by user ID;
    @Override
    public EliteShip read(long id) throws SQLException {
        
        // Initialize eliteShip as null to store the result;
        EliteShip eliteShip = null;


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

                    // Create the EliteShip object with values from the result set;
                    eliteShip = new EliteShip(
                        resultSet.getInt("life"),
                        resultSet.getInt("speed"),
                        resultSet.getInt("damage"),
                        user
                    );
                    eliteShip.setIdShip(resultSet.getLong("id_ship"));
                }
            }
        }

        // Return the elite ship object (or null if not found);
        return eliteShip;
    }

    // Method to read all elite ship records from the database;
    @Override
    public List<EliteShip> readAll() throws SQLException {
        
        
        List<EliteShip> eliteShipList = new ArrayList<>();


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

                // Create EliteShip object for each record;
                EliteShip eliteShip = new EliteShip(
                    resultSet.getInt("life"),
                    resultSet.getInt("speed"),
                    resultSet.getInt("damage"),
                    user
                );
                eliteShip.setIdShip(resultSet.getLong("id_ship"));

                // Add each object to the list;
                eliteShipList.add(eliteShip);
            }
        }

        // Return the complete list of elite ships;
        return eliteShipList;
    }
}