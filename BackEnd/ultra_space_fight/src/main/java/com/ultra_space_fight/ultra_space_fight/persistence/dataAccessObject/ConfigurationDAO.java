package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

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
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;

@Repository
public class ConfigurationDAO implements CrudInterface<Configuration> {

    private final DataSource dataSource;

    public ConfigurationDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    private static final String SQL_CREATE = "INSERT INTO configurations (id_configuration, id_user, language_user, soundtrack, sound_effects) VALUES (NULL, ?, ?, ?, ?)";
    private static final String SQL_DELETE = "DELETE FROM configurations WHERE id_user = ?";
    private static final String SQL_UPDATE = "UPDATE configurations SET language_user = ?, soundtrack = ?, sound_effects = ? WHERE id_user = ?";
    private static final String SQL_READ = "SELECT * FROM (users u INNER JOIN configurations c USING(id_user)) WHERE id_user = ?";
    private static final String SQL_READ_ALL = "SELECT * FROM (users u INNER JOIN configurations c USING(id_user))";

    @Override
    public void create(Configuration configuration) throws SQLException {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {

            ps.setLong(1, configuration.getUser().getIdUser());
            ps.setString(2, configuration.getLanguage());
            ps.setBigDecimal(3, configuration.getSoundtrack());
            ps.setBigDecimal(4, configuration.getSoundEffects());

            ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) configuration.setIdConfiguration(rs.getLong(1));
            }
        }
    }

    @Override
    public void delete(long id) throws SQLException {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(SQL_DELETE)) {
            ps.setLong(1, id);
            ps.executeUpdate();
        }
    }

    @Override
    public void update(Configuration configuration) throws SQLException {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(SQL_UPDATE)) {

            ps.setString(1, configuration.getLanguage());
            ps.setBigDecimal(2, configuration.getSoundtrack());
            ps.setBigDecimal(3, configuration.getSoundEffects());
            ps.setLong(4, configuration.getUser().getIdUser());

            ps.executeUpdate();
        }
    }

    @Override
    public Configuration read(long id) throws SQLException {
        Configuration configuration = null;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(SQL_READ)) {

            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    User user = new User(rs.getString("name_user"), rs.getString("email"), rs.getString("password_user"), rs.getInt("cash"), rs.getString("selected_spaceship"));
                    user.setIdUser(id);
                    configuration = new Configuration(rs.getString("language_user"), rs.getBigDecimal("soundtrack"), rs.getBigDecimal("sound_effects"), user);
                    configuration.setIdConfiguration(id);
                }
            }
        }
        return configuration;
    }

    @Override
    public List<Configuration> readAll() throws SQLException {
        List<Configuration> all = new ArrayList<>();
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(SQL_READ_ALL);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                User user = new User(rs.getString("name_user"), rs.getString("email"), rs.getString("password_user"), rs.getInt("cash"), rs.getString("selected_spaceship"));
                user.setIdUser(rs.getLong("id_user"));
                Configuration cfg = new Configuration(rs.getString("language_user"), rs.getBigDecimal("soundtrack"), rs.getBigDecimal("sound_effects"), user);
                cfg.setIdConfiguration(rs.getLong("id_configuration"));
                all.add(cfg);
            }
        }
        return all;
    }
}