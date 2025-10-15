// Declaring the package of the SpeedShipDAO class;
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

import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpeedShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;

// Declaring the SpeedShipDAO Class implementing the CrudInterface;
// the generic value is SpeedShip; 
@Repository
public class SpeedShipDAO implements CrudInterface<SpeedShip> {

    private final DataSource dataSource;

    public SpeedShipDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // SQL code insert a value;
    private final String SQL_CREATE = """
        INSERT INTO speed_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """; 
    
    // SQL code delete a value;
    private final String SQL_DELETE = """
        DELETE FROM speed_ship 
        WHERE id_user = ?;    
        """;

    // SQL code update a value;
    private final String SQL_UPDATE = """
        UPDATE speed_ship
        SET life = ?, speed = ?, damage = ?
        WHERE id_user = ?;    
        """;

    // SQL code read a value;
    private final String SQL_READ = """
        SELECT * 
        FROM (users u INNER JOIN speed_ship s USING(id_user)) 
        WHERE id_user = ?;    
        """;

    // SQL code read all values;
    private final String SQL_READ_ALL = """
        SELECT * 
        FROM (users u INNER JOIN speed_ship s USING(id_user));    
        """;

    // Method that create a new SpeedShip in the database;
    @Override
    public void create(SpeedShip speedShip) throws SQLException {
        
        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {

            preparedStatement.setLong(1, speedShip.getUser().getIdUser());
            preparedStatement.setInt(2, speedShip.getLife());
            preparedStatement.setInt(3, speedShip.getSpeed());
            preparedStatement.setInt(4, speedShip.getDamage());

            preparedStatement.executeUpdate();

            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                if (resultSet.next()) {
                    speedShip.setIdShip(resultSet.getLong(1));
                }
            }
        }
        catch (SQLException e) {
            throw e;
        }
    }

    // Method that delete a SpeedShip in the database by id;
    @Override
    public void delete(long id) throws SQLException {
       
        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_DELETE)) {

            preparedStatement.setLong(1, id);
            preparedStatement.executeUpdate();
        }
        catch (SQLException e) {
            throw e;
        }
    }

    // Method that update a SpeedShip in the database;
    @Override
    public void update(SpeedShip speedShip) throws SQLException {
        
        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {

            preparedStatement.setInt(1, speedShip.getLife());
            preparedStatement.setInt(2, speedShip.getSpeed());
            preparedStatement.setInt(3, speedShip.getDamage());
            preparedStatement.setLong(4, speedShip.getUser().getIdUser());

            preparedStatement.executeUpdate();
        }
        catch (SQLException e) {
            throw e;
        }
    }

    // Method that read a SpeedShip in the database by id;
    @Override
    public SpeedShip read(long id) throws SQLException {

        // Declaring a new speedShip;
        SpeedShip speedShip = null;

        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ)) {

            preparedStatement.setLong(1, id);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    User user = new User(resultSet.getString("name_user"), resultSet.getString("email"),
                            resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                    user.setIdUser(id);

                    speedShip = new SpeedShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"), user);
                    speedShip.setIdShip(resultSet.getLong("id_ship"));
                }
            }
        }
        catch (SQLException e) {
            throw e;
        }

        // Returning the SpeedShip;
        return speedShip;
    }

    // Method that read all SpeedShip in the database;
    @Override
    public List<SpeedShip> readAll() throws SQLException {
        ArrayList<SpeedShip> allSpeedShip = new ArrayList<>();

        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ_ALL);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"),
                        resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                user.setIdUser(resultSet.getLong("id_user"));

                SpeedShip sp = new SpeedShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"), user);
                sp.setIdShip(resultSet.getLong("id_ship"));

                allSpeedShip.add(sp);
            }
        } catch (SQLException e) {
            throw e;
        }

        return allSpeedShip;
    }
}
