// Declaring the package of the DataAchievementsDAO class;
package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

// Imports necessary classes to aply the Data Access Object;
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
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;

// Declaring the DataAchievementsDAO Class implementing the CrudInterface;
// the generic value is DataAchievements;
@Repository
public class DataAchievementDAO implements CrudInterface<DataAchievements> {

    private final DataSource dataSource;

    public DataAchievementDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // SQL code insert a value;
    private final String SQL_CREATE = """
        INSERT INTO data_achievements (id_data, id_user, score, score_match, defeated_enemies, defeated_elite, defeated_boss)
        VALUES (NULL, ?, ?, ?, ?, ?, ?);
        """; 
    
    // SQL code delete a value;
    private final String SQL_DELETE = """
        DELETE FROM data_achievements WHERE id_user = ?;    
        """;

    // SQL code update a value;
    private final String SQL_UPDATE = """
        UPDATE data_achievements
        SET score = ?, score_match = ?, defeated_enemies = ?, defeated_elite = ?, defeated_boss = ?
        WHERE id_user = ?;    
        """;

    // SQL code read a value;
    private final String SQL_READ = """
        SELECT * 
        FROM (users u INNER JOIN data_achievements d USING(id_user)) 
        WHERE id_user = ?;    
        """;

    // SQL code read all values;
    private final String SQL_READ_ALL = """
        SELECT * 
        FROM (users u INNER JOIN data_achievements d USING(id_user));    
        """;

    // SQL code select top 10 users by score;
    private final String SELECT_USERS_BY_SCORE = """
        SELECT *
        FROM users u INNER JOIN data_achievements d USING(id_user)
        ORDER BY d.score DESC
        LIMIT 10;
        """;

    // SQL code select top 10 users by score of a specific match;
    private final String SELECT_USERS_BY_SCORE_MATCH = """
        SELECT *
        FROM users u INNER JOIN data_achievements d USING(id_user)
        ORDER BY d.score_match DESC
        LIMIT 10;
        """;

    // Method that create a new DataAchievements in the database;
    @Override
    public void create(DataAchievements dataAchievements) throws SQLException{
        
        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {

            preparedStatement.setLong(1, dataAchievements.getUser().getIdUser());
            preparedStatement.setInt(2, dataAchievements.getScore());
            preparedStatement.setInt(3, dataAchievements.getScoreMatch());
            preparedStatement.setInt(4, dataAchievements.getDefeatedEnemies());
            preparedStatement.setInt(5, dataAchievements.getDefeatedElite());
            preparedStatement.setInt(6, dataAchievements.getDefeatedBoss());

            preparedStatement.executeUpdate();

            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                if (resultSet.next()) {
                    dataAchievements.setIdDataAchievements(resultSet.getLong(1));
                }
            }
        } catch (SQLException e) {
            throw e;
        }
    }

    // Method that delete a DataAchievement in the database by id;
    @Override
    public void delete(long id) throws SQLException {
       
        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_DELETE)) {

            preparedStatement.setLong(1, id);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            throw e;
        }
    }

    // Method that update a DataAchievement in the database;
    @Override
    public void update(DataAchievements DataAchievements) throws SQLException {
        
        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {

            preparedStatement.setInt(1, DataAchievements.getScore());
            preparedStatement.setInt(2, DataAchievements.getScoreMatch());
            preparedStatement.setInt(3, DataAchievements.getDefeatedEnemies());
            preparedStatement.setInt(4, DataAchievements.getDefeatedElite());
            preparedStatement.setInt(5, DataAchievements.getDefeatedBoss());
            preparedStatement.setLong(6, DataAchievements.getUser().getIdUser());

            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            throw e;
        }
    }

    // Method that read a DataAchievement in the database by id;
    @Override
    public DataAchievements read(long id) throws SQLException {

        // Declaring a new DataAchievement;
        DataAchievements dataAchievements = null;

        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ)) {

            preparedStatement.setLong(1, id);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    User user = new User(resultSet.getString("name_user"), resultSet.getString("email"),
                            resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                    user.setIdUser(id);

                    dataAchievements = new DataAchievements(resultSet.getInt("score"), resultSet.getInt("score_match"),
                            resultSet.getInt("defeated_enemies"), resultSet.getInt("defeated_elite"), resultSet.getInt("defeated_boss"), user);
                    dataAchievements.setIdDataAchievements(resultSet.getLong("id_data"));
                }
            }
        } catch (SQLException e) {
            throw e;
        }

        // Returning the DataAchievement;
        return dataAchievements;
    }

    // Method that read all DataAchievements in the database;
    @Override
    public List<DataAchievements> readAll() throws SQLException {
        
        // Declaring a new list;
        ArrayList<DataAchievements> allDataAchievements = new ArrayList<>();
        
        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ_ALL);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"),
                        resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                user.setIdUser(resultSet.getLong("id_user"));

                DataAchievements da = new DataAchievements(resultSet.getInt("score"), resultSet.getInt("score_match"),
                        resultSet.getInt("defeated_enemies"), resultSet.getInt("defeated_elite"), resultSet.getInt("defeated_boss"), user);
                da.setIdDataAchievements(resultSet.getLong("id_data"));

                allDataAchievements.add(da);
            }
        } catch (SQLException e) {
            throw e;
        }

        // Returning the list;
        return allDataAchievements;
    }

    // Method that selects the 10 users with greatest score;
    public List<DataAchievements> selectTopUsersByScore() throws SQLException {
        
        // Declaring the list of the 10 users;
        ArrayList<DataAchievements> topUsers = new ArrayList<>();

        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SELECT_USERS_BY_SCORE);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"),
                        resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                user.setIdUser(resultSet.getLong("id_user"));

                DataAchievements da = new DataAchievements(resultSet.getInt("score"), resultSet.getInt("score_match"),
                        resultSet.getInt("defeated_enemies"), resultSet.getInt("defeated_elite"), resultSet.getInt("defeated_boss"), user);
                da.setIdDataAchievements(resultSet.getLong("id_data"));

                topUsers.add(da);
            }
        } catch (SQLException e) {
            throw e;
        }

        // Returning the list;
        return topUsers;
    }

    // Method that selects the 10 users with greatest score in a match;
    public List<DataAchievements> selectTopUsersByScoreMatch() throws SQLException {
        
        // Declaring the list of the 10 users;
        ArrayList<DataAchievements> topUsersMatch = new ArrayList<>();

        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SELECT_USERS_BY_SCORE_MATCH);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"),
                        resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                user.setIdUser(resultSet.getLong("id_user"));

                DataAchievements da = new DataAchievements(resultSet.getInt("score"), resultSet.getInt("score_match"),
                        resultSet.getInt("defeated_enemies"), resultSet.getInt("defeated_elite"), resultSet.getInt("defeated_boss"), user);
                da.setIdDataAchievements(resultSet.getLong("id_data"));

                topUsersMatch.add(da);
            }
        } catch (SQLException e) {
            throw e;
        }

        // Returning the list;
        return topUsersMatch;
    }
}