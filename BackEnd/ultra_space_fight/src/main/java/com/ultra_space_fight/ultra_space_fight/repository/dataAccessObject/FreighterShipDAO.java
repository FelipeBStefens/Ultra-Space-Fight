// Declaring the package of the FreighterShipDAO class;
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

import com.ultra_space_fight.ultra_space_fight.models.spaceships.FreighterShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;

// Declaring the FreighterShipDAO class implementing the CrudInterface;
// The generic type is FreighterShip;
@Repository
public class FreighterShipDAO implements CrudInterface<FreighterShip> {

    // DataSource attribute to manage database connections;
    private final DataSource dataSource;

    // Constructor to initialize the DataSource;
    public FreighterShipDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // SQL statement to create a new freighter ship;
    private final String SQL_CREATE = """
        INSERT INTO freighter_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """;

    // SQL statement to delete a freighter ship by user ID;
    private final String SQL_DELETE = """
        DELETE FROM freighter_ship WHERE id_user = ?;    
        """;

    // SQL statement to update a freighter ship by user ID;
    private final String SQL_UPDATE = """
        UPDATE freighter_ship
        SET life = ?, speed = ?, damage = ?
        WHERE id_user = ?;    
        """;

    // SQL statement to read a freighter ship by user ID;
    private final String SQL_READ = """
        SELECT * 
        FROM (users u INNER JOIN freighter_ship f USING(id_user)) 
        WHERE id_user = ?;    
        """;

    // SQL statement to read all freighter ships;
    private final String SQL_READ_ALL = """
        SELECT * 
        FROM (users u INNER JOIN freighter_ship f USING(id_user));    
        """;

    // Method to create a new freighter ship record in the database;
    @Override
    public void create(FreighterShip freighterShip) throws SQLException {
        // Try-with-resources ensures automatic closing of connection and statement;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {

            // Set parameters in the SQL statement in the correct order;
            preparedStatement.setLong(1, freighterShip.getUser().getIdUser());
            preparedStatement.setInt(2, freighterShip.getLife());
            preparedStatement.setInt(3, freighterShip.getSpeed());
            preparedStatement.setInt(4, freighterShip.getDamage());

            // Execute the INSERT command;
            preparedStatement.executeUpdate();

            // Retrieve the generated ID (id_ship) and assign it to the object;
            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                if (resultSet.next()) {
                    freighterShip.setIdShip(resultSet.getLong(1));
                }
            }
        } catch (SQLException e) {
            // Re-throwing the exception for higher-level handling;
            throw e;
        }
    }

    // Method to delete a freighter ship record by user ID;
    @Override
    public void delete(long id) throws SQLException {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_DELETE)) {

            // Set the user ID parameter;
            preparedStatement.setLong(1, id);

            // Execute the DELETE command;
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            throw e;
        }
    }

    // Method to update a freighter ship record in the database;
    @Override
    public void update(FreighterShip freighterShip) throws SQLException {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {

            // Set the updated values in the SQL statement;
            preparedStatement.setInt(1, freighterShip.getLife());
            preparedStatement.setInt(2, freighterShip.getSpeed());
            preparedStatement.setInt(3, freighterShip.getDamage());
            preparedStatement.setLong(4, freighterShip.getUser().getIdUser());

            // Execute the UPDATE command;
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            throw e;
        }
    }

    // Method to read a freighter ship record by user ID;
    @Override
    public FreighterShip read(long id) throws SQLException {
        // Initialize freighterShip as null to store the result;
        FreighterShip freighterShip = null;

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

                    // Create the FreighterShip object with values from the result set;
                    freighterShip = new FreighterShip(
                        resultSet.getInt("life"),
                        resultSet.getInt("speed"),
                        resultSet.getInt("damage"),
                        user
                    );
                    freighterShip.setIdShip(resultSet.getLong("id_ship"));
                }
            }
        } catch (SQLException e) {
            throw e;
        }

        // Return the freighter ship object (or null if not found);
        return freighterShip;
    }

    // Method to read all freighter ship records from the database;
    @Override
    public List<FreighterShip> readAll() throws SQLException {
        // Initialize the list that will store all freighter ships;
        List<FreighterShip> freighterShipList = new ArrayList<>();

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

                // Create FreighterShip object for each record;
                FreighterShip freighterShip = new FreighterShip(
                    resultSet.getInt("life"),
                    resultSet.getInt("speed"),
                    resultSet.getInt("damage"),
                    user
                );
                freighterShip.setIdShip(resultSet.getLong("id_ship"));

                // Add each object to the list;
                freighterShipList.add(freighterShip);
            }
        } catch (SQLException e) {
            throw e;
        }

        // Return the complete list of freighter ships;
        return freighterShipList;
    }
}