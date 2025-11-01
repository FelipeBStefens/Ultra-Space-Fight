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

import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;

// Declaring the DataAchievementsDAO Class;
@Repository
public class DataAchievementDAO implements CrudInterface<DataAchievements> {

    // DataSource attribute to manage database connections;
    private final DataSource dataSource;

    // Constructor that initializes the DataSource;
    public DataAchievementDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // SQL code to insert a value;
    private final String SQL_CREATE = 
        """
        INSERT INTO data_achievements (id_data, id_user, score, score_match, defeated_enemies, defeated_elite, defeated_boss)
        VALUES (NULL, ?, ?, ?, ?, ?, ?);
        """; 
    
    // SQL code to delete a value;
    private final String SQL_DELETE = 
        """
        DELETE FROM data_achievements WHERE id_user = ?;    
        """;

    // SQL code to update a value;
    private final String SQL_UPDATE = 
        """
        UPDATE data_achievements
        SET score = ?, score_match = ?, defeated_enemies = ?, defeated_elite = ?, defeated_boss = ?
        WHERE id_user = ?;    
        """;

    // SQL code to read a value by user ID;
    private final String SQL_READ = 
        """
        SELECT * 
        FROM (users u INNER JOIN data_achievements d USING(id_user)) 
        WHERE id_user = ?;    
        """;

    // SQL code to read all values;
    private final String SQL_READ_ALL = 
        """
        SELECT * 
        FROM (users u INNER JOIN data_achievements d USING(id_user));    
        """;

    // SQL code to select the top 10 users by total score;
    private final String SELECT_USERS_BY_SCORE = 
        """
        SELECT *
        FROM users u INNER JOIN data_achievements d USING(id_user)
        ORDER BY d.score DESC
        LIMIT 10;
        """;

    // SQL code to select the top 10 users by score in a single match;
    private final String SELECT_USERS_BY_SCORE_MATCH =  
        """
        SELECT *
        FROM users u INNER JOIN data_achievements d USING(id_user)
        ORDER BY d.score_match DESC
        LIMIT 10;
        """;

    // Method that creates a new DataAchievements record in the database;
    @Override
    public void create(DataAchievements dataAchievements) throws SQLException {
        
        // Try-with-resources ensures the connection and statement will be automatically closed;
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {

            // Set parameters in the same order as defined in the SQL statement;
            preparedStatement.setLong(1, dataAchievements.getUser().getIdUser());
            preparedStatement.setInt(2, dataAchievements.getScore());
            preparedStatement.setInt(3, dataAchievements.getScoreMatch());
            preparedStatement.setInt(4, dataAchievements.getDefeatedEnemies());
            preparedStatement.setInt(5, dataAchievements.getDefeatedElite());
            preparedStatement.setInt(6, dataAchievements.getDefeatedBoss());

            // Execute the INSERT command;
            preparedStatement.executeUpdate();

            // Getting the Results (auto-generated keys);            
            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                if (resultSet.next()) {
                    
                    // Assign the generated ID back to the configuration object;
                    dataAchievements.setIdDataAchievements(resultSet.getLong(1));
                }
            }
        }
    }

    // Method that deletes a DataAchievement record by user ID;
    @Override
    public void delete(long id) throws SQLException {
        
        // Open a new connection to the database;
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_DELETE)) {

            // Set the ID of the user whose data should be deleted;
            preparedStatement.setLong(1, id);

            // Execute the DELETE command;
            preparedStatement.executeUpdate();
        }
    }

    // Method that updates a DataAchievement record in the database;
    @Override
    public void update(DataAchievements dataAchievements) throws SQLException {
        
        // Create a connection and prepare the SQL statement;
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {

            // Assign each parameter with the updated values from the object;
            preparedStatement.setInt(1, dataAchievements.getScore());
            preparedStatement.setInt(2, dataAchievements.getScoreMatch());
            preparedStatement.setInt(3, dataAchievements.getDefeatedEnemies());
            preparedStatement.setInt(4, dataAchievements.getDefeatedElite());
            preparedStatement.setInt(5, dataAchievements.getDefeatedBoss());
            preparedStatement.setLong(6, dataAchievements.getUser().getIdUser());

            // Execute the UPDATE command;
            preparedStatement.executeUpdate();
        }
    }

    // Method that reads a DataAchievement record by user ID;
    @Override
    public DataAchievements read(long id) throws SQLException {
        
        
        DataAchievements dataAchievements = null;

        // Establish connection and prepare the SQL query;
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ)) {

            // Set the parameter for the user ID;
            preparedStatement.setLong(1, id);

            // Execute the query and read the result;
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                
                
                if (resultSet.next()) {
                    
                    // Create a User object from the "users" table data;
                    User user = new User(
                        resultSet.getString("name_user"),
                        resultSet.getString("email"),
                        resultSet.getString("password_user"),
                        resultSet.getInt("cash"),
                        resultSet.getString("selected_spaceship")
                    );
                    user.setIdUser(id);

                    // Create the DataAchievements object with data from "data_achievements";
                    dataAchievements = new DataAchievements(
                        resultSet.getInt("score"),
                        resultSet.getInt("score_match"),
                        resultSet.getInt("defeated_enemies"),
                        resultSet.getInt("defeated_elite"),
                        resultSet.getInt("defeated_boss"),
                        user
                    );
                    dataAchievements.setIdDataAchievements(resultSet.getLong("id_data"));
                }
            }
        }

        // Return the DataAchievements found (or null if not found);
        return dataAchievements;
    }

    // Method that reads all DataAchievements from the database;
    @Override
    public List<DataAchievements> readAll() throws SQLException {
        
        
        ArrayList<DataAchievements> allDataAchievements = new ArrayList<>();

        // Open connection and execute the SQL query to retrieve all records;
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ_ALL);
            ResultSet resultSet = preparedStatement.executeQuery()) {

            // Loop through all results returned from the query;
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

                // Create a DataAchievements object linked to that user;
                DataAchievements dataAchievements = new DataAchievements(
                    resultSet.getInt("score"),
                    resultSet.getInt("score_match"),
                    resultSet.getInt("defeated_enemies"),
                    resultSet.getInt("defeated_elite"),
                    resultSet.getInt("defeated_boss"),
                    user
                );
                dataAchievements.setIdDataAchievements(resultSet.getLong("id_data"));

                // Add each object to the list;
                allDataAchievements.add(dataAchievements);
            }
        }

        // Return the complete list;
        return allDataAchievements;
    }

    // Method that selects the top 10 users by total score;
    public List<DataAchievements> selectTopUsersByScore() throws SQLException {
        
        
        ArrayList<DataAchievements> topUsers = new ArrayList<>();

        // Open the connection and execute the query ordering by "score";
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SELECT_USERS_BY_SCORE);
            ResultSet resultSet = preparedStatement.executeQuery()) {

            // Iterate through each result returned by the query;
            while (resultSet.next()) {
                
                // Build the User object;
                User user = new User(
                    resultSet.getString("name_user"),
                    resultSet.getString("email"),
                    resultSet.getString("password_user"),
                    resultSet.getInt("cash"),
                    resultSet.getString("selected_spaceship")
                );
                user.setIdUser(resultSet.getLong("id_user"));

                // Build the DataAchievements object;
                DataAchievements dataAchievements = new DataAchievements(
                    resultSet.getInt("score"),
                    resultSet.getInt("score_match"),
                    resultSet.getInt("defeated_enemies"),
                    resultSet.getInt("defeated_elite"),
                    resultSet.getInt("defeated_boss"),
                    user
                );
                dataAchievements.setIdDataAchievements(resultSet.getLong("id_data"));

                // Add to the top users list;
                topUsers.add(dataAchievements);
            }
        }

        // Return the list containing the 10 best users by score;
        return topUsers;
    }

    // Method that selects the top 10 users by score in a single match;
    public List<DataAchievements> selectTopUsersByScoreMatch() throws SQLException {
        
        
        ArrayList<DataAchievements> topUsersMatch = new ArrayList<>();

        // Open connection and execute the SQL query ordering by "score_match";
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SELECT_USERS_BY_SCORE_MATCH);
            ResultSet resultSet = preparedStatement.executeQuery()) {

            // Iterate through the query results;
            while (resultSet.next()) {

                // Create a User object for the current record;
                User user = new User(
                    resultSet.getString("name_user"),
                    resultSet.getString("email"),
                    resultSet.getString("password_user"),
                    resultSet.getInt("cash"),
                    resultSet.getString("selected_spaceship")
                );
                user.setIdUser(resultSet.getLong("id_user"));

                // Create a DataAchievements object with the corresponding data;
                DataAchievements dataAchievements = new DataAchievements(
                    resultSet.getInt("score"),
                    resultSet.getInt("score_match"),
                    resultSet.getInt("defeated_enemies"),
                    resultSet.getInt("defeated_elite"),
                    resultSet.getInt("defeated_boss"),
                    user
                );
                dataAchievements.setIdDataAchievements(resultSet.getLong("id_data"));

                // Add the object to the list of top users;
                topUsersMatch.add(dataAchievements);
            }
        }

        // Return the list containing the 10 best users by match score;
        return topUsersMatch;
    }
}