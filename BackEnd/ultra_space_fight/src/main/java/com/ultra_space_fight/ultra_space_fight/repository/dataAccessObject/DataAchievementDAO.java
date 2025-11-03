
package com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject;


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


@Repository
public class DataAchievementDAO implements CrudInterface<DataAchievements> {


    private final DataSource dataSource;


    public DataAchievementDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }


    private final String SQL_CREATE = 
        """
        INSERT INTO data_achievements (id_data, id_user, score, score_match, defeated_enemies, defeated_elite, defeated_boss)
        VALUES (NULL, ?, ?, ?, ?, ?, ?);
        """; 
    

    private final String SQL_DELETE = 
        """
        DELETE FROM data_achievements WHERE id_user = ?;    
        """;


    private final String SQL_UPDATE = 
        """
        UPDATE data_achievements
        SET score = ?, score_match = ?, defeated_enemies = ?, defeated_elite = ?, defeated_boss = ?
        WHERE id_user = ?;    
        """;


    private final String SQL_READ = 
        """
        SELECT * 
        FROM (users u INNER JOIN data_achievements d USING(id_user)) 
        WHERE id_user = ?;    
        """;


    private final String SQL_READ_ALL = 
        """
        SELECT * 
        FROM (users u INNER JOIN data_achievements d USING(id_user));    
        """;


    private final String SELECT_USERS_BY_SCORE = 
        """
        SELECT *
        FROM users u INNER JOIN data_achievements d USING(id_user)
        ORDER BY d.score DESC
        LIMIT 10;
        """;


    private final String SELECT_USERS_BY_SCORE_MATCH =  
        """
        SELECT *
        FROM users u INNER JOIN data_achievements d USING(id_user)
        ORDER BY d.score_match DESC
        LIMIT 10;
        """;


    @Override
    public void create(DataAchievements dataAchievements) throws SQLException {
        

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
        }
    }


    @Override
    public void delete(long id) throws SQLException {
        

        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_DELETE)) {


            preparedStatement.setLong(1, id);


            preparedStatement.executeUpdate();
        }
    }


    @Override
    public void update(DataAchievements dataAchievements) throws SQLException {
        

        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {


            preparedStatement.setInt(1, dataAchievements.getScore());
            preparedStatement.setInt(2, dataAchievements.getScoreMatch());
            preparedStatement.setInt(3, dataAchievements.getDefeatedEnemies());
            preparedStatement.setInt(4, dataAchievements.getDefeatedElite());
            preparedStatement.setInt(5, dataAchievements.getDefeatedBoss());
            preparedStatement.setLong(6, dataAchievements.getUser().getIdUser());


            preparedStatement.executeUpdate();
        }
    }


    @Override
    public DataAchievements read(long id) throws SQLException {
        
        
        DataAchievements dataAchievements = null;


        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ)) {


            preparedStatement.setLong(1, id);


            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                
                
                if (resultSet.next()) {
                    

                    User user = new User(
                        resultSet.getString("name_user"),
                        resultSet.getString("email"),
                        resultSet.getString("password_user"),
                        resultSet.getInt("cash"),
                        resultSet.getString("selected_spaceship")
                    );
                    user.setIdUser(id);


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


        return dataAchievements;
    }


    @Override
    public List<DataAchievements> readAll() throws SQLException {
        
        
        ArrayList<DataAchievements> allDataAchievements = new ArrayList<>();


        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ_ALL);
            ResultSet resultSet = preparedStatement.executeQuery()) {


            while (resultSet.next()) {


                User user = new User(
                    resultSet.getString("name_user"),
                    resultSet.getString("email"),
                    resultSet.getString("password_user"),
                    resultSet.getInt("cash"),
                    resultSet.getString("selected_spaceship")
                );
                user.setIdUser(resultSet.getLong("id_user"));


                DataAchievements dataAchievements = new DataAchievements(
                    resultSet.getInt("score"),
                    resultSet.getInt("score_match"),
                    resultSet.getInt("defeated_enemies"),
                    resultSet.getInt("defeated_elite"),
                    resultSet.getInt("defeated_boss"),
                    user
                );
                dataAchievements.setIdDataAchievements(resultSet.getLong("id_data"));


                allDataAchievements.add(dataAchievements);
            }
        }


        return allDataAchievements;
    }


    public List<DataAchievements> selectTopUsersByScore() throws SQLException {
        
        
        ArrayList<DataAchievements> topUsers = new ArrayList<>();


        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SELECT_USERS_BY_SCORE);
            ResultSet resultSet = preparedStatement.executeQuery()) {


            while (resultSet.next()) {
                

                User user = new User(
                    resultSet.getString("name_user"),
                    resultSet.getString("email"),
                    resultSet.getString("password_user"),
                    resultSet.getInt("cash"),
                    resultSet.getString("selected_spaceship")
                );
                user.setIdUser(resultSet.getLong("id_user"));


                DataAchievements dataAchievements = new DataAchievements(
                    resultSet.getInt("score"),
                    resultSet.getInt("score_match"),
                    resultSet.getInt("defeated_enemies"),
                    resultSet.getInt("defeated_elite"),
                    resultSet.getInt("defeated_boss"),
                    user
                );
                dataAchievements.setIdDataAchievements(resultSet.getLong("id_data"));


                topUsers.add(dataAchievements);
            }
        }


        return topUsers;
    }


    public List<DataAchievements> selectTopUsersByScoreMatch() throws SQLException {
        
        
        ArrayList<DataAchievements> topUsersMatch = new ArrayList<>();


        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SELECT_USERS_BY_SCORE_MATCH);
            ResultSet resultSet = preparedStatement.executeQuery()) {


            while (resultSet.next()) {


                User user = new User(
                    resultSet.getString("name_user"),
                    resultSet.getString("email"),
                    resultSet.getString("password_user"),
                    resultSet.getInt("cash"),
                    resultSet.getString("selected_spaceship")
                );
                user.setIdUser(resultSet.getLong("id_user"));


                DataAchievements dataAchievements = new DataAchievements(
                    resultSet.getInt("score"),
                    resultSet.getInt("score_match"),
                    resultSet.getInt("defeated_enemies"),
                    resultSet.getInt("defeated_elite"),
                    resultSet.getInt("defeated_boss"),
                    user
                );
                dataAchievements.setIdDataAchievements(resultSet.getLong("id_data"));


                topUsersMatch.add(dataAchievements);
            }
        }


        return topUsersMatch;
    }
}