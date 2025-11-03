
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

import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpeedShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;



@Repository
public class SpeedShipDAO implements CrudInterface<SpeedShip> {


    private final DataSource dataSource;


    public SpeedShipDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }


    private final String SQL_CREATE = 
        """
        INSERT INTO speed_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """;


    private final String SQL_DELETE = 
        """
        DELETE FROM speed_ship WHERE id_user = ?;    
        """;


    private final String SQL_UPDATE = 
        """
        UPDATE speed_ship
        SET life = ?, speed = ?, damage = ?
        WHERE id_user = ?;    
        """;


    private final String SQL_READ = 
        """
        SELECT * 
        FROM (users u INNER JOIN speed_ship s USING(id_user)) 
        WHERE id_user = ?;    
        """;


    private final String SQL_READ_ALL = 
        """
        SELECT * 
        FROM (users u INNER JOIN speed_ship s USING(id_user));    
        """;


    @Override
    public void create(SpeedShip speedShip) throws SQLException {
        

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
    public void update(SpeedShip speedShip) throws SQLException {
        
        
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {


            preparedStatement.setInt(1, speedShip.getLife());
            preparedStatement.setInt(2, speedShip.getSpeed());
            preparedStatement.setInt(3, speedShip.getDamage());
            preparedStatement.setLong(4, speedShip.getUser().getIdUser());


            preparedStatement.executeUpdate();
        }
    }


    @Override
    public SpeedShip read(long id) throws SQLException {
        

        SpeedShip speedShip = null;

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
                    user.setIdUser(resultSet.getLong("id_user"));


                    speedShip = new SpeedShip(
                        resultSet.getInt("life"),
                        resultSet.getInt("speed"),
                        resultSet.getInt("damage"),
                        user
                    );
                    speedShip.setIdShip(resultSet.getLong("id_ship"));
                }
            }
        }


        return speedShip;
    }


    @Override
    public List<SpeedShip> readAll() throws SQLException {
        

        List<SpeedShip> speedShipList = new ArrayList<>();

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


                SpeedShip speedShip = new SpeedShip(
                    resultSet.getInt("life"),
                    resultSet.getInt("speed"),
                    resultSet.getInt("damage"),
                    user
                );
                speedShip.setIdShip(resultSet.getLong("id_ship"));


                speedShipList.add(speedShip);
            }
        }


        return speedShipList;
    }
}