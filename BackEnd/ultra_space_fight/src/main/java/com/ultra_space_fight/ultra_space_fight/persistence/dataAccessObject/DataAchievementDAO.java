package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ultra_space_fight.ultra_space_fight.models.userProfile.DataAchievements;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;
import com.ultra_space_fight.ultra_space_fight.persistence.MysqlConnection;

public class DataAchievementDAO implements CrudInterface<DataAchievements> {

    private final String SQL_CREATE = """
        INSERT INTO data_achievements (id_data, id_user, score, score_match, defeated_enemies, defeated_elite, defeated_boss)
        VALUES (NULL, ?, ?, ?, ?, ?, ?);
        """; 
    
    private final String SQL_DELETE = """
        DELETE FROM data_achievements WHERE id_data = ?;    
        """;

    private final String SQL_UPDATE = """
        UPDATE data_achievements
        SET score = ?, score_match = ?, defeated_enemies = ?, defeated_elite = ?, defeated_boss = ?
        WHERE id_data = ?;    
        """;

    private final String SQL_READ = """
        SELECT * 
        FROM (users u INNER JOIN data_achievements d ON u.id_user = d.id_user) 
        WHERE id_data = ?;    
        """;

    private final String SQL_READ_ALL = """
        SELECT * 
        FROM (users u INNER JOIN data_achievements d ON u.id_user = d.id_user);    
        """;

    @Override
    public void create(DataAchievements dataAchievements) {
        
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_CREATE);
            
            preparedStatement.setLong(1, dataAchievements.getUser().getIdUser());
            preparedStatement.setInt(2, dataAchievements.getScore());
            preparedStatement.setInt(3, dataAchievements.getScoreMatch());
            preparedStatement.setInt(4, dataAchievements.getDefeatedEnemies());
            preparedStatement.setInt(5, dataAchievements.getDefeatedElite());
            preparedStatement.setInt(6, dataAchievements.getDefeatedBoss());

            preparedStatement.executeUpdate();
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
    }

    @Override
    public void delete(long id) {
       
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_DELETE);
            
            preparedStatement.setLong(1, id);

            preparedStatement.executeUpdate();
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
    }

    @Override
    public void update(DataAchievements DataAchievements) {
        
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_UPDATE);
            
            preparedStatement.setInt(1, DataAchievements.getScore());
            preparedStatement.setInt(2, DataAchievements.getScoreMatch());
            preparedStatement.setInt(3, DataAchievements.getDefeatedEnemies());
            preparedStatement.setInt(4, DataAchievements.getDefeatedElite());
            preparedStatement.setInt(5, DataAchievements.getDefeatedBoss());
            preparedStatement.setLong(6, DataAchievements.getIdDataAchievements());

            preparedStatement.executeUpdate();
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
    }

    @Override
    public DataAchievements read(long id) {
        DataAchievements dataAchievements = null;
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_READ);
            
            preparedStatement.setLong(1, id);
            
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"), 
                resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                user.setIdUser(resultSet.getLong("id_user"));

                dataAchievements = new DataAchievements(resultSet.getInt("score"), resultSet.getInt("score_match"),
                resultSet.getInt("defeated_enemies"), resultSet.getInt("defeated_elite"), resultSet.getInt("defeated_boss"), user);
                dataAchievements.setIdDataAchievements(resultSet.getLong("id_data"));
            }
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
        return dataAchievements;
    }

    @Override
    public List<DataAchievements> readAll() {
        
        ArrayList<DataAchievements> allDataAchievements = new ArrayList<>();
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_READ_ALL);
            
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"), 
                resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                user.setIdUser(resultSet.getLong("id_user"));

                DataAchievements dataAchievements = new DataAchievements(resultSet.getInt("score"), resultSet.getInt("score_match"),
                resultSet.getInt("defeated_enemies"), resultSet.getInt("defeated_elite"), resultSet.getInt("defeated_boss"), user);
                dataAchievements.setIdDataAchievements(resultSet.getLong("id_data"));

                allDataAchievements.add(dataAchievements);
            }
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
        return allDataAchievements;
    }
}