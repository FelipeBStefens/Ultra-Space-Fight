// Declaring the package of the UserDAO class;
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

import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;

// Declaring the UserDAO Class implementing the CrudInterface;
// the generic value is User; 
@Repository
public class UserDAO implements CrudInterface<User> {

    // The attribute MysqlConnection and DAOs;
    private final DataSource dataSource;

    // Auto Wired the DAOs and MysqlConnection class;
    public UserDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // SQL code insert a value;
    private final String SQL_CREATE = """
        INSERT INTO users (id_user, name_user, email, password_user, cash, selected_spaceship)
        VALUES (NULL, ?, ?, ?, ?, ?);
        """; 
    
    // SQL code delete a value;
    private final String SQL_DELETE = """
        DELETE FROM users WHERE id_user = ?;    
        """;

    // SQL code update a value;
    private final String SQL_UPDATE = """
        UPDATE users
        SET name_user = ?, email = ?, password_user = ?, cash = ?, selected_spaceship = ?
        WHERE id_user = ?;    
        """;

    // SQL code read a value;
    private final String SQL_READ = """
        SELECT * 
        FROM users 
        WHERE id_user = ?;    
        """;

    // SQL code read all values;
    private final String SQL_READ_ALL = """
        SELECT * 
        FROM users;    
        """;

    // SQL code get user id by email and password;
    private final String SQL_GET_ID = """
        SELECT * 
        FROM users 
        WHERE email = ? AND password_user = ?;
        """;

    // Method that create a new User in the database;
    @Override
    public void create(User user) throws SQLException {

        // Try-Catch to handle Execptions;
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = 
                connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);){

            // Setting the values of the Statement;
            preparedStatement.setString(1, user.getUsername());
            preparedStatement.setString(2, user.getEmail());
            preparedStatement.setString(3, user.getPassword());
            preparedStatement.setInt(4, user.getCash());
            preparedStatement.setString(5, user.getSelectedSpaceship());

            // Executing the Statement;
            preparedStatement.executeUpdate();

            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                if (resultSet.next()) {
                    user.setIdUser(resultSet.getLong(1));
                }
            }
        }
        catch (SQLException e) {

            // Printing the Exception Message;
            throw e;
        }
    }

    // Method that delete a User in the database by id;
    @Override
    public void delete(long id) throws SQLException {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_DELETE)) {

            preparedStatement.setLong(1, id);
            preparedStatement.executeUpdate();
        }
    }

    // Method that update a User in the database;
    @Override
    public void update(User user) throws SQLException {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {

            preparedStatement.setString(1, user.getUsername());
            preparedStatement.setString(2, user.getEmail());
            preparedStatement.setString(3, user.getPassword());
            preparedStatement.setInt(4, user.getCash());
            preparedStatement.setString(5, user.getSelectedSpaceship());
            preparedStatement.setLong(6, user.getIdUser());

            preparedStatement.executeUpdate();
        }
    }

    // Method that read a User in the database by id;
    @Override
    public User read(long id) throws SQLException {

        // Declaring a new user;
        User user = null;

        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ)) {

            preparedStatement.setLong(1, id);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    user = new User(resultSet.getString("name_user"), resultSet.getString("email"),
                            resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                    user.setIdUser(resultSet.getLong("id_user"));
                }
            }
        }

        // Returning the user;
        return user;
    }

    // Method that read all Users in the database;
    @Override
    public List<User> readAll() throws SQLException {
        
        // Declaring a new list;
        ArrayList<User> allUsers = new ArrayList<>();

        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ_ALL);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"),
                        resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                user.setIdUser(resultSet.getLong("id_user"));
                allUsers.add(user);
            }
        }

        // Returning the list;
        return allUsers;
    }  

    // Method that get the user id by email and password;
    public User getUser(String email, String password) throws SQLException {

        // Declaring the id of the user, if it doesn't found, return -1;
        User user = null; 

        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SQL_GET_ID)) {

            preparedStatement.setString(1, email);
            preparedStatement.setString(2, password);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    user = new User(resultSet.getString("name_user"), email, password,
                            resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                    user.setIdUser(resultSet.getLong("id_user"));
                }
            }
        }

        // Returning the if of the user;
        return user;
    }
}