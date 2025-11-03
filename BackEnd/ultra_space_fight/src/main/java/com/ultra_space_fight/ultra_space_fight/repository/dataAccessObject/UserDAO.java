
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

import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;



@Repository
public class UserDAO implements CrudInterface<User> {


    private final DataSource dataSource;


    public UserDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }


    private final String SQL_CREATE = 
        """
        INSERT INTO users (id_user, name_user, email, password_user, cash, selected_spaceship)
        VALUES (NULL, ?, ?, ?, ?, ?);
        """;


    private final String SQL_DELETE = 
        """
        DELETE FROM users WHERE id_user = ?;    
        """;


    private final String SQL_UPDATE = 
        """
        UPDATE users
        SET name_user = ?, email = ?, password_user = ?, cash = ?, selected_spaceship = ?
        WHERE id_user = ?;    
        """;


    private final String SQL_READ = 
        """
        SELECT * 
        FROM users 
        WHERE id_user = ?;    
        """;


    private final String SQL_READ_ALL = 
        """
        SELECT * 
        FROM users;    
        """;


    private final String SQL_GET_ID = 
        """
        SELECT * 
        FROM users 
        WHERE email = ? AND password_user = ?;
        """;


    @Override
    public void create(User user) throws SQLException {
        
        
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {


            preparedStatement.setString(1, user.getUsername());
            preparedStatement.setString(2, user.getEmail());
            preparedStatement.setString(3, user.getPassword());
            preparedStatement.setInt(4, user.getCash());
            preparedStatement.setString(5, user.getSelectedSpaceship());


            preparedStatement.executeUpdate();


            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                
                
                if (resultSet.next()) {
                    
                    
                    user.setIdUser(resultSet.getLong(1));
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


    @Override
    public User read(long id) throws SQLException {
        
        
        User user = null;


        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_READ)) {


            preparedStatement.setLong(1, id);


            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                
                
                if (resultSet.next()) {
                    

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


        return user;
    }


    @Override
    public List<User> readAll() throws SQLException {
        
        
        List<User> allUsers = new ArrayList<>();

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
                allUsers.add(user);
            }
        }


        return allUsers;
    }


    public User getUser(String email, String password) throws SQLException {
        
        
        User user = null;

        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_GET_ID)) {


            preparedStatement.setString(1, email);
            preparedStatement.setString(2, password);


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


        return user;
    }
}