// Declaring the package of the FreighterShipDAO class;
package com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject;

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

import com.ultra_space_fight.ultra_space_fight.models.spaceships.FreighterShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;

// Declaring the FreighterShipDAO Class implementing the CrudInterface;
// the generic value is FreighterShip; 
@Repository
public class FreighterShipDAO implements CrudInterface<FreighterShip> {

    private final DataSource dataSource;

    public FreighterShipDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // SQL code insert a value;
    private final String SQL_CREATE = """
        INSERT INTO freighter_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """; 
    
    // SQL code delete a value;
    private final String SQL_DELETE = """
        DELETE FROM freighter_ship WHERE id_user = ?;    
        """;

    // SQL code update a value;
    private final String SQL_UPDATE = """
        UPDATE freighter_ship
        SET life = ?, speed = ?, damage = ?
        WHERE id_user = ?;    
        """;

    // SQL code read a value;
    private final String SQL_READ = """
        SELECT * 
        FROM (users u INNER JOIN freighter_ship f USING(id_user)) 
        WHERE id_user = ?;    
        """;

    // SQL code read all values;
    private final String SQL_READ_ALL = """
        SELECT * 
        FROM (users u INNER JOIN freighter_ship f USING(id_user));    
        """;

    // Method that create a new FreighterShip in the database;
    @Override
    public void create(FreighterShip freighterShip) throws SQLException {
        
        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {

            preparedStatement.setLong(1, freighterShip.getUser().getIdUser());
            preparedStatement.setInt(2, freighterShip.getLife());
            preparedStatement.setInt(3, freighterShip.getSpeed());
            preparedStatement.setInt(4, freighterShip.getDamage());

            preparedStatement.executeUpdate();

            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                if (resultSet.next()) {
                    freighterShip.setIdShip(resultSet.getLong(1));
                }
            }
        }
        catch (SQLException e) {
            throw e;
        }
    }

    // Method that delete a FreighterShip in the database by id;
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

    // Method that update a FreighterShip in the database;
    @Override
    public void update(FreighterShip freighterShip) throws SQLException {
        
        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {

            preparedStatement.setInt(1, freighterShip.getLife());
            preparedStatement.setInt(2, freighterShip.getSpeed());
            preparedStatement.setInt(3, freighterShip.getDamage());
            preparedStatement.setLong(4, freighterShip.getUser().getIdUser());

            preparedStatement.executeUpdate();
        }
        catch (SQLException e) {
            throw e;
        }
    }

    // Method that read a FreighterShip in the database by id;
    @Override
    public FreighterShip read(long id) throws SQLException {

        // Declaring a new FreighterShip;
        FreighterShip freighterShip = null;

        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ)) {

            preparedStatement.setLong(1, id);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    User user = new User(resultSet.getString("name_user"), resultSet.getString("email"),
                            resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                    user.setIdUser(id);

                    freighterShip = new FreighterShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"), user);
                    freighterShip.setIdShip(resultSet.getLong("id_ship"));
                }
            }
        }
        catch (SQLException e) {
            throw e;
        }

        // Returning the freighterShip;
        return freighterShip;
    }

    // Method that read all FreighterShip in the database;
    @Override
    public List<FreighterShip> readAll() throws SQLException {
        
        // Declaring a new list;
        ArrayList<FreighterShip> allFreighterShip = new ArrayList<>();

        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ_ALL);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"),
                        resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                user.setIdUser(resultSet.getLong("id_user"));

                FreighterShip fs = new FreighterShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"), user);
                fs.setIdShip(resultSet.getLong("id_ship"));

                allFreighterShip.add(fs);
            }
        } catch (SQLException e) {
            throw e;
        }

        // Returning the list;
        return allFreighterShip;
    }
}