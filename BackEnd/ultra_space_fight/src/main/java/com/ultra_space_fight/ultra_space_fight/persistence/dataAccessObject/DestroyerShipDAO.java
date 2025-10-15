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

import com.ultra_space_fight.ultra_space_fight.models.spaceships.DestroyerShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;

@Repository
public class DestroyerShipDAO implements CrudInterface<DestroyerShip> {

    private final DataSource dataSource;

    public DestroyerShipDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    private static final String SQL_CREATE = "INSERT INTO destroyer_ship (id_ship, id_user, life, speed, damage) VALUES (NULL, ?, ?, ?, ?)";
    private static final String SQL_DELETE = "DELETE FROM destroyer_ship WHERE id_user = ?";
    private static final String SQL_UPDATE = "UPDATE destroyer_ship SET life = ?, speed = ?, damage = ? WHERE id_user = ?";
    private static final String SQL_READ = "SELECT * FROM (users u INNER JOIN destroyer_ship d USING(id_user)) WHERE id_user = ?";
    private static final String SQL_READ_ALL = "SELECT * FROM (users u INNER JOIN destroyer_ship d USING(id_user))";

    @Override
    public void create(DestroyerShip destroyerShip) throws SQLException {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {

            ps.setLong(1, destroyerShip.getUser().getIdUser());
            ps.setInt(2, destroyerShip.getLife());
            ps.setInt(3, destroyerShip.getSpeed());
            ps.setInt(4, destroyerShip.getDamage());

            ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) destroyerShip.setIdShip(rs.getLong(1));
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
    public void update(DestroyerShip destroyerShip) throws SQLException {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(SQL_UPDATE)) {

            ps.setInt(1, destroyerShip.getLife());
            ps.setInt(2, destroyerShip.getSpeed());
            ps.setInt(3, destroyerShip.getDamage());
            ps.setLong(4, destroyerShip.getUser().getIdUser());

            ps.executeUpdate();
        }
    }

    @Override
    public DestroyerShip read(long id) throws SQLException {
        DestroyerShip destroyerShip = null;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(SQL_READ)) {

            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    User user = new User(rs.getString("name_user"), rs.getString("email"), rs.getString("password_user"), rs.getInt("cash"), rs.getString("selected_spaceship"));
                    user.setIdUser(rs.getLong("id_user"));
                    destroyerShip = new DestroyerShip(rs.getInt("life"), rs.getInt("speed"), rs.getInt("damage"), user);
                    destroyerShip.setIdShip(rs.getLong("id_ship"));
                }
            }
        }
        return destroyerShip;
    }

    @Override
    public List<DestroyerShip> readAll() throws SQLException {
        List<DestroyerShip> all = new ArrayList<>();
        try (Connection connection = dataSource.getConnection();
             PreparedStatement ps = connection.prepareStatement(SQL_READ_ALL);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                User user = new User(rs.getString("name_user"), rs.getString("email"), rs.getString("password_user"), rs.getInt("cash"), rs.getString("selected_spaceship"));
                user.setIdUser(rs.getLong("id_user"));
                DestroyerShip ds = new DestroyerShip(rs.getInt("life"), rs.getInt("speed"), rs.getInt("damage"), user);
                ds.setIdShip(rs.getLong("id_ship"));
                all.add(ds);
            }
        }
        return all;
    }
}
