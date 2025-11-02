// Declaring the package of the UserDAO class;
package com.ultra_space_fight.ultra_space_fight.repository.dataAccessObject;

// Imports necessary classes to handle SQL connections and operations
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
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;

// Declaring the UserDAO class implementing the CrudInterface
// The generic type is User
@Repository
public class UserDAO implements CrudInterface<User> {

    // DataSource injected by Spring to manage database connections
    private final DataSource dataSource;

    // Constructor to initialize the DataSource
    public UserDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // SQL statement to create a new User
    private final String SQL_CREATE = 
        """
        INSERT INTO users (id_user, name_user, email, password_user, cash, selected_spaceship)
        VALUES (NULL, ?, ?, ?, ?, ?);
        """;

    // SQL statement to delete a User by ID
    private final String SQL_DELETE = 
        """
        DELETE FROM users WHERE id_user = ?;    
        """;

    // SQL statement to update a User by ID
    private final String SQL_UPDATE = 
        """
        UPDATE users
        SET name_user = ?, email = ?, password_user = ?, cash = ?, selected_spaceship = ?
        WHERE id_user = ?;    
        """;

    // SQL statement to read a User by ID
    private final String SQL_READ = 
        """
        SELECT * 
        FROM users 
        WHERE id_user = ?;    
        """;

    // SQL statement to read all Users
    private final String SQL_READ_ALL = 
        """
        SELECT * 
        FROM users;    
        """;

    // SQL statement to get a user by email and password
    private final String SQL_GET_ID = 
        """
        SELECT * 
        FROM users 
        WHERE email = ? AND password_user = ?;
        """;

    // Method to create a new User in the database
    @Override
    public void create(User user) throws SQLException {
        
        
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {

            // Set SQL parameters from the User object
            preparedStatement.setString(1, user.getUsername());
            preparedStatement.setString(2, user.getEmail());
            preparedStatement.setString(3, user.getPassword());
            preparedStatement.setInt(4, user.getCash());
            preparedStatement.setString(5, user.getSelectedSpaceship());

            // Execute the INSERT statement
            preparedStatement.executeUpdate();

            // Retrieve generated ID (id_user) and assign it to the object
            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                
                
                if (resultSet.next()) {
                    
                    
                    user.setIdUser(resultSet.getLong(1));
                }
            }
        }
    }

    // Method to delete a User by ID
    @Override
    public void delete(long id) throws SQLException {
        
        
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_DELETE)) {

            // Set the ID parameter
            preparedStatement.setLong(1, id);

            // Execute the DELETE statement
            preparedStatement.executeUpdate();
        }
    }

    // Method to update a User in the database
    @Override
    public void update(User user) throws SQLException {
        
        
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {

            // Set updated values from the User object
            preparedStatement.setString(1, user.getUsername());
            preparedStatement.setString(2, user.getEmail());
            preparedStatement.setString(3, user.getPassword());
            preparedStatement.setInt(4, user.getCash());
            preparedStatement.setString(5, user.getSelectedSpaceship());
            preparedStatement.setLong(6, user.getIdUser());

            // Execute the UPDATE statement
            preparedStatement.executeUpdate();
        }
    }

    // Method to read a User by ID
    @Override
    public User read(long id) throws SQLException {
        
        
        User user = null;


        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ)) {

            // Set the ID parameter
            preparedStatement.setLong(1, id);

            // Execute query and process the result set
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                
                
                if (resultSet.next()) {
                    
                    // Create a User object from the result set
                    user = new User(
                        resultSet.getString("name_user"),
                        resultSet.getString("email"),
                        resultSet.getString("password_user"),
                        resultSet.getInt("cash"),
                        resultSet.getString("selected_spaceship")
                    );
                    user.setIdUser(resultSet.getLong("id_user"));
                }
            }
        }

        // Return the User object (or null if not found)
        return user;
    }

    // Method to read all Users from the database
    @Override
    public List<User> readAll() throws SQLException {
        
        
        List<User> allUsers = new ArrayList<>();

        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ_ALL);
            ResultSet resultSet = preparedStatement.executeQuery()) {

            // Iterate over all records
            while (resultSet.next()) {
                
                
                User user = new User(
                    resultSet.getString("name_user"),
                    resultSet.getString("email"),
                    resultSet.getString("password_user"),
                    resultSet.getInt("cash"),
                    resultSet.getString("selected_spaceship")
                );
                user.setIdUser(resultSet.getLong("id_user"));
                allUsers.add(user);
            }
        }

        // Return the complete list of Users
        return allUsers;
    }

    // Method to get a User by email and password (login)
    public User getUser(String email, String password) throws SQLException {
        
        
        User user = null;

        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_GET_ID)) {

            // Set email and password parameters
            preparedStatement.setString(1, email);
            preparedStatement.setString(2, password);

            // Execute query and process the result set
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                
                
                if (resultSet.next()) {
                    
                    
                    user = new User(
                        resultSet.getString("name_user"),
                        email,
                        password,
                        resultSet.getInt("cash"),
                        resultSet.getString("selected_spaceship")
                    );
                    user.setIdUser(resultSet.getLong("id_user"));
                }
            }
        }

        // Return the User object (or null if not found)
        return user;
    }
}