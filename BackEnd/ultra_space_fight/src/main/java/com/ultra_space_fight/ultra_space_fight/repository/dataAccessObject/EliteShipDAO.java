// Declaring the package of the EliteShipDAO class;
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

import com.ultra_space_fight.ultra_space_fight.models.spaceships.EliteShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;

// Declaring the EliteShipDAO Class implementing the CrudInterface;
// the generic value is EliteShip; 
@Repository
public class EliteShipDAO implements CrudInterface<EliteShip> {
    
    private final DataSource dataSource;

    public EliteShipDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // SQL code insert a value;
    private final String SQL_CREATE = """
        INSERT INTO elite_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """; 
    
    // SQL code delete a value;
    private final String SQL_DELETE = """
        DELETE FROM elite_ship WHERE id_user = ?;    
        """;

    // SQL code update a value;
    private final String SQL_UPDATE = """
        UPDATE elite_ship
        SET life = ?, speed = ?, damage = ?
        WHERE id_user = ?;    
        """;

    // SQL code read a value;
    private final String SQL_READ = """
        SELECT * 
        FROM (users u INNER JOIN elite_ship e USING(id_user)) 
        WHERE id_user = ?;    
        """;

    // SQL code read all values;
    private final String SQL_READ_ALL = """
        SELECT * 
        FROM (users u INNER JOIN elite_ship e USING(id_user));    
        """;

    // Method that create a new EliteShip in the database;
    @Override
    public void create(EliteShip eliteShip) throws SQLException {
        
        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {

            preparedStatement.setLong(1, eliteShip.getUser().getIdUser());
            preparedStatement.setInt(2, eliteShip.getLife());
            preparedStatement.setInt(3, eliteShip.getSpeed());
            preparedStatement.setInt(4, eliteShip.getDamage());

            preparedStatement.executeUpdate();

            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                if (resultSet.next()) {
                    eliteShip.setIdShip(resultSet.getLong(1));
                }
            }
        }
        catch (SQLException e) {
            throw e;
        }
    }

    // Method that delete a EliteShip in the database by id;
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

    // Method that update a EliteShip in the database;
    @Override
    public void update(EliteShip eliteShip) throws SQLException {
        
        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {

            preparedStatement.setInt(1, eliteShip.getLife());
            preparedStatement.setInt(2, eliteShip.getSpeed());
            preparedStatement.setInt(3, eliteShip.getDamage());
            preparedStatement.setLong(4, eliteShip.getUser().getIdUser());

            preparedStatement.executeUpdate();
        }
        catch (SQLException e) {
            throw e;
        }
    }

    // Method that read a EliteShip in the database by id;
    @Override
    public EliteShip read(long id) throws SQLException {

        // Declaring a new EliteShip;
        EliteShip eliteShip = null;

        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ)) {

            preparedStatement.setLong(1, id);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    User user = new User(resultSet.getString("name_user"), resultSet.getString("email"),
                            resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                    user.setIdUser(id);

                    eliteShip = new EliteShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"), user);
                    eliteShip.setIdShip(resultSet.getLong("id_ship"));
                }
            }
        }
        catch (SQLException e) {
            throw e;
        }

        // Returning the EliteShip;
        return eliteShip;
    }

    // Method that read all EliteShip in the database;
    @Override
    public List<EliteShip> readAll() throws SQLException {
        ArrayList<EliteShip> allEliteShip = new ArrayList<>();

        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ_ALL);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"),
                        resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                user.setIdUser(resultSet.getLong("id_user"));

                EliteShip es = new EliteShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"), user);
                es.setIdShip(resultSet.getLong("id_ship"));

                allEliteShip.add(es);
            }
        } catch (SQLException e) {
            throw e;
        }

        return allEliteShip;
    }
}
