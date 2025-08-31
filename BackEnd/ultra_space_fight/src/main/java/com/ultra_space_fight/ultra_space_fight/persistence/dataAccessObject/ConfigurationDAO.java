package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ultra_space_fight.ultra_space_fight.models.userProfile.Configuration;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;
import com.ultra_space_fight.ultra_space_fight.persistence.MysqlConnection;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;

public class ConfigurationDAO implements CrudInterface<Configuration> {

    private final String SQL_CREATE = """
        INSERT INTO configurations (id_configuration, id_user, language_user, soundtrack, sound_effects)
        VALUES (NULL, ?, ?, ?, ?);
        """; 
    
    private final String SQL_DELETE = """
        DELETE FROM configurations WHERE id_configuration = ?;    
        """;

    private final String SQL_UPDATE = """
        UPDATE configurations
        SET language_user = ?, soundtrack = ?, sound_effects = ?
        WHERE id_configuration = ?;    
        """;

    private final String SQL_READ = """
        SELECT * 
        FROM (users u INNER JOIN configurations c ON u.id_user = c.id_user) 
        WHERE id_configuration = ?;    
        """;

    private final String SQL_READ_ALL = """
        SELECT * 
        FROM (users u INNER JOIN configurations c ON u.id_user = c.id_user);    
        """;

    @Override
    public void create(Configuration configuration) {
        
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_CREATE);
            
            preparedStatement.setLong(1, configuration.getUser().getIdUser());
            preparedStatement.setString(2, configuration.getLanguage());
            preparedStatement.setBigDecimal(3, configuration.getSoundtrack());
            preparedStatement.setBigDecimal(4, configuration.getSoundEffects());

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
    public void update(Configuration configuration) {
        
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_UPDATE);
            
            preparedStatement.setString(1, configuration.getLanguage());
            preparedStatement.setBigDecimal(2, configuration.getSoundtrack());
            preparedStatement.setBigDecimal(3, configuration.getSoundEffects());
            preparedStatement.setLong(4, configuration.getIdConfiguration());

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
    public Configuration read(long id) {
        Configuration configuration = null;
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
                
                configuration = 
                    new Configuration(resultSet.getString("language_user"), resultSet.getBigDecimal("soundtrack"), 
                    resultSet.getBigDecimal("sound_effects"), user);
                configuration.setIdConfiguration(id);
            }
            
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
        return configuration;
    }

    @Override
    public List<Configuration> readAll() {
        
        ArrayList<Configuration> allConfigurations = new ArrayList<>();
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_READ_ALL);
            
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"), 
                resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                user.setIdUser(resultSet.getLong("id_user"));

                Configuration configuration = 
                    new Configuration(resultSet.getString("language_user"), resultSet.getBigDecimal("soundtrack"), 
                    resultSet.getBigDecimal("sound_effects"), user);
                configuration.setIdConfiguration(resultSet.getLong("id_configuration"));

                allConfigurations.add(configuration);
            }
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
        return allConfigurations;
    }  
}