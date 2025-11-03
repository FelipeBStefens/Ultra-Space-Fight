
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

import com.ultra_space_fight.ultra_space_fight.models.userProfile.Configuration;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;


@Repository
public class ConfigurationDAO implements CrudInterface<Configuration> {


    private final DataSource dataSource;


    public ConfigurationDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }


    private static final String SQL_CREATE = 
        """
        INSERT INTO configurations (id_configuration, id_user, language_user, soundtrack, sound_effects)
        VALUES (NULL, ?, ?, ?, ?);
        """;


    private static final String SQL_DELETE =
        """
        DELETE FROM configurations WHERE id_user = ?;    
        """;


    private static final String SQL_UPDATE =
        """
        UPDATE configurations
        SET language_user = ?, soundtrack = ?, sound_effects = ? 
        WHERE id_user = ?;
        """; 


    private static final String SQL_READ = 
        """
        SELECT *
        FROM (users u INNER JOIN configurations c USING(id_user))       
        WHERE id_user = ?;
        """;


    private static final String SQL_READ_ALL = 
        """
        SELECT *
        FROM (users u INNER JOIN configurations c USING(id_user));
        """;


    @Override
    public void create(Configuration configuration) throws SQLException {
        

        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {


            preparedStatement.setLong(1, configuration.getUser().getIdUser());
            preparedStatement.setString(2, configuration.getLanguage());
            preparedStatement.setBigDecimal(3, configuration.getSoundtrack());
            preparedStatement.setBigDecimal(4, configuration.getSoundEffects());


            preparedStatement.executeUpdate();


            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                if (resultSet.next()) {


                    configuration.setIdConfiguration(resultSet.getLong(1));
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
    public void update(Configuration configuration) throws SQLException {
        

        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {


            preparedStatement.setString(1, configuration.getLanguage());
            preparedStatement.setBigDecimal(2, configuration.getSoundtrack());
            preparedStatement.setBigDecimal(3, configuration.getSoundEffects());
            preparedStatement.setLong(4, configuration.getUser().getIdUser());


            preparedStatement.executeUpdate();
        }
    }


    @Override
    public Configuration read(long id) throws SQLException {
        Configuration configuration = null;


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


                    configuration = new Configuration(
                        resultSet.getString("language_user"),
                        resultSet.getBigDecimal("soundtrack"),
                        resultSet.getBigDecimal("sound_effects"),
                        user
                    );
                    configuration.setIdConfiguration(resultSet.getLong("id_configuration"));
                }
            }
        }


        return configuration;
    }


    @Override
    public List<Configuration> readAll() throws SQLException {
        List<Configuration> listConfigurations = new ArrayList<>();


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


                Configuration configuration = new Configuration(
                    resultSet.getString("language_user"),
                    resultSet.getBigDecimal("soundtrack"),
                    resultSet.getBigDecimal("sound_effects"),
                    user
                );
                configuration.setIdConfiguration(resultSet.getLong("id_configuration"));


                listConfigurations.add(configuration);
            }
        }


        return listConfigurations;
    }
}