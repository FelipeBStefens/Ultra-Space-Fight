// Declaring the package of the DataAchievementsDAO class;
package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

// Imports necessary classes to aply the Data Access Object;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;
import com.ultra_space_fight.ultra_space_fight.persistence.MysqlConnection;

// Declaring the DataAchievementsDAO Class implementing the CrudInterface;
// the generic value is DataAchievements;
public class DataAchievementDAO implements CrudInterface<DataAchievements> {

    // MySQL Connection variable, final because doesn't change;
    private final MysqlConnection MY_SQL_CONNECTION;

    // Constructor of the class initialyzing the MySQL Connection;
    public DataAchievementDAO() {
        MY_SQL_CONNECTION = new MysqlConnection();
    }

    // Constructor of the class when there is already a Connection;
    public DataAchievementDAO(MysqlConnection mySqlConnection) {
        MY_SQL_CONNECTION = mySqlConnection;
    }

    // SQL code insert a value;
    private final String SQL_CREATE = """
        INSERT INTO data_achievements (id_data, id_user, score, score_match, defeated_enemies, defeated_elite, defeated_boss)
        VALUES (NULL, ?, ?, ?, ?, ?, ?);
        """; 
    
    // SQL code delete a value;
    private final String SQL_DELETE = """
        DELETE FROM data_achievements WHERE id_data = ?;    
        """;

    // SQL code update a value;
    private final String SQL_UPDATE = """
        UPDATE data_achievements
        SET score = ?, score_match = ?, defeated_enemies = ?, defeated_elite = ?, defeated_boss = ?
        WHERE id_data = ?;    
        """;

    // SQL code read a value;
    private final String SQL_READ = """
        SELECT * 
        FROM (users u INNER JOIN data_achievements d ON u.id_user = d.id_user) 
        WHERE id_data = ?;    
        """;

    // SQL code read all values;
    private final String SQL_READ_ALL = """
        SELECT * 
        FROM (users u INNER JOIN data_achievements d ON u.id_user = d.id_user);    
        """;

    // SQL code select top 10 users by score;
    private final String SELECT_USERS_BY_SCORE = """
        SELECT id_user
        FROM (users u INNER JOIN data_achievements d ON u.id_user = d.id_user)
        ORDER BY d.score DESC
        LIMIT 10;
        """;

    // SQL code select top 10 users by score of a specific match;
    private final String SELECT_USERS_BY_SCORE_MATCH = """
        SELECT id_user
        FROM (users u INNER JOIN data_achievements d ON u.id_user = d.id_user)
        ORDER BY d.score_match DESC
        LIMIT 10;
        """;

    // Method that create a new DataAchievements in the database;
    @Override
    public void create(DataAchievements dataAchievements) {
        
        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();

            // Preparing a new Statement;
            PreparedStatement preparedStatement = 
                MY_SQL_CONNECTION.getConnection().prepareStatement(SQL_CREATE);
            
            // Setting the values of the Statement;
            preparedStatement.setLong(1, dataAchievements.getUser().getIdUser());
            preparedStatement.setInt(2, dataAchievements.getScore());
            preparedStatement.setInt(3, dataAchievements.getScoreMatch());
            preparedStatement.setInt(4, dataAchievements.getDefeatedEnemies());
            preparedStatement.setInt(5, dataAchievements.getDefeatedElite());
            preparedStatement.setInt(6, dataAchievements.getDefeatedBoss());

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

    // Method that delete a DataAchievement in the database by id;
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

    // Method that update a DataAchievement in the database;
    @Override
    public void update(DataAchievements DataAchievements) {
        
        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();

            // Preparing a new Statement;
            PreparedStatement preparedStatement = 
                MY_SQL_CONNECTION.getConnection().prepareStatement(SQL_UPDATE);
            
            // Setting the values of the Statement;
            preparedStatement.setInt(1, DataAchievements.getScore());
            preparedStatement.setInt(2, DataAchievements.getScoreMatch());
            preparedStatement.setInt(3, DataAchievements.getDefeatedEnemies());
            preparedStatement.setInt(4, DataAchievements.getDefeatedElite());
            preparedStatement.setInt(5, DataAchievements.getDefeatedBoss());
            preparedStatement.setLong(6, DataAchievements.getIdDataAchievements());

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

    // Method that read a DataAchievement in the database by id;
    @Override
    public DataAchievements read(long id) {

        // Declaring a new DataAchievement;
        DataAchievements dataAchievements = null;

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
                user.setIdUser(resultSet.getLong("id_user"));

                // Creating a new dataAchievement;
                dataAchievements = new DataAchievements(resultSet.getInt("score"), resultSet.getInt("score_match"),
                resultSet.getInt("defeated_enemies"), resultSet.getInt("defeated_elite"), resultSet.getInt("defeated_boss"), user);
                
                // Setting the id of that dataAchievement;
                dataAchievements.setIdDataAchievements(resultSet.getLong("id_data"));
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

        // Returning the DataAchievement;
        return dataAchievements;
    }

    // Method that read all DataAchievements in the database;
    @Override
    public List<DataAchievements> readAll() {
        
        // Declaring a new list;
        ArrayList<DataAchievements> allDataAchievements = new ArrayList<>();
        
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

                // Creating a new dataAchievement;
                DataAchievements dataAchievements = new DataAchievements(resultSet.getInt("score"), resultSet.getInt("score_match"),
                resultSet.getInt("defeated_enemies"), resultSet.getInt("defeated_elite"), resultSet.getInt("defeated_boss"), user);
                
                // Setting the id of that dataAchievement;
                dataAchievements.setIdDataAchievements(resultSet.getLong("id_data"));

                // Adding the dataAchievement in the list; 
                allDataAchievements.add(dataAchievements);
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
        return allDataAchievements;
    }

    // Method that selects the 10 users with greatest score;
    public List<User> selectTopUsersByScore() {
        
        // Declaring the list of the 10 users;
        ArrayList<User> topUsers = new ArrayList<>();

        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();

            // Preparing a new Statement;
            PreparedStatement preparedStatement = 
                MY_SQL_CONNECTION.getConnection().prepareStatement(SELECT_USERS_BY_SCORE);
            
            // Getting the Set of all Results;
            ResultSet resultSet = preparedStatement.executeQuery();

            // Seeing all the possibilities;
            while (resultSet.next()) {

                // Creating a new user;
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"), 
                resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                
                // Setting the id of that user;
                user.setIdUser(resultSet.getLong("id_user"));
                
                // Adding the User in the list;
                topUsers.add(user);
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
        return topUsers;
    }

    // Method that selects the 10 users with greatest score in a match;
    public List<User> selectTopUsersByScoreMatch() {
        
        // Declaring the list of the 10 users;
        ArrayList<User> topUsersMatch = new ArrayList<>();

        // Try-Catch to handle Execptions;
        try {

            // Opening a Connection with the Database;
            MY_SQL_CONNECTION.openConnection();

            // Preparing a new Statement;
            PreparedStatement preparedStatement = 
                MY_SQL_CONNECTION.getConnection().prepareStatement(SELECT_USERS_BY_SCORE_MATCH);
            
            // Getting the Set of all Results;
            ResultSet resultSet = preparedStatement.executeQuery();

            // Seeing all the possibilities;
            while (resultSet.next()) {

                // Creating a new user;
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"), 
                resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                
                // Setting the id of that user;
                user.setIdUser(resultSet.getLong("id_user"));
                
                // Adding the User in the list;
                topUsersMatch.add(user);
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
        return topUsersMatch;
    }
}