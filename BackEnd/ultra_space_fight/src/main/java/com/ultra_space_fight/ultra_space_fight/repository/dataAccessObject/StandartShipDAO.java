// Declaring the package of the StandartShipDAO class;
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

import com.ultra_space_fight.ultra_space_fight.models.spaceships.StandartShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;

// Declaring the StandartShipDAO Class implementing the CrudInterface;
// the generic value is StandartShip; 
@Repository
public class StandartShipDAO implements CrudInterface<StandartShip> {

    // DataSource injected by Spring
    private final DataSource dataSource;

    public StandartShipDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // SQL code insert a value;
    private final String SQL_CREATE = """
        INSERT INTO standart_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """; 
    
    // SQL code delete a value;
    private final String SQL_DELETE = """
        DELETE FROM standart_ship 
        WHERE id_user = ?;    
        """;

    // SQL code update a value;
    private final String SQL_UPDATE = """
        UPDATE standart_ship
        SET life = ?, speed = ?, damage = ?
        WHERE id_user = ?;    
        """;

    // SQL code read a value;
    private final String SQL_READ = """
        SELECT * 
        FROM (users u INNER JOIN standart_ship s USING(id_user)) 
        WHERE id_user = ?;    
        """;

    // SQL code read all values;
    private final String SQL_READ_ALL = """
        SELECT * 
        FROM (users u INNER JOIN standart_ship s USING(id_user));    
        """;

    // Method that create a new StandartShip in the database;
    @Override
    public void create(StandartShip standartShip) throws SQLException {
        
        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {

            preparedStatement.setLong(1, standartShip.getUser().getIdUser());
            preparedStatement.setInt(2, standartShip.getLife());
            preparedStatement.setInt(3, standartShip.getSpeed());
            preparedStatement.setInt(4, standartShip.getDamage());

            preparedStatement.executeUpdate();

            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                if (resultSet.next()) {
                    standartShip.setIdShip(resultSet.getLong(1));
                }
            }
        }
        catch (SQLException e) {
            throw e;
        }
    }

    // Method that delete a StandartShip in the database by id;
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

    // Method that update a StandartShip in the database;
    @Override
    public void update(StandartShip standartShip) throws SQLException {
        
        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {

            preparedStatement.setInt(1, standartShip.getLife());
            preparedStatement.setInt(2, standartShip.getSpeed());
            preparedStatement.setInt(3, standartShip.getDamage());
            preparedStatement.setLong(4, standartShip.getUser().getIdUser());

            preparedStatement.executeUpdate();
        }
        catch (SQLException e) {
            throw e;
        }
    }

    // Method that read a StandartShip in the database by id;
    @Override
    public StandartShip read(long id) throws SQLException {

        // Declaring a new StandartShip;
        StandartShip standartShip = null;

        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ)) {

            preparedStatement.setLong(1, id);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    User user = new User(resultSet.getString("name_user"), resultSet.getString("email"),
                            resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                    user.setIdUser(id);

                    standartShip = new StandartShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"), user);
                    standartShip.setIdShip(resultSet.getLong("id_ship"));
                }
            }
        }
        catch (SQLException e) {
            throw e;
        }

        // Returning the StandartShip;
        return standartShip;
    }

    // Method that read all StandartShip in the database;
    @Override
    public List<StandartShip> readAll() throws SQLException {
        
        // Declaring a new list;
        ArrayList<StandartShip> allStandartShip = new ArrayList<>();
        // Use DataSource with try-with-resources
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ_ALL);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"),
                        resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                user.setIdUser(resultSet.getLong("id_user"));

                StandartShip standartShip = new StandartShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"), user);
                standartShip.setIdShip(resultSet.getLong("id_ship"));

                allStandartShip.add(standartShip);
            }
        } catch (SQLException e) {
            throw e;
        }
        // Returning the list;
        return allStandartShip;
    }
}
