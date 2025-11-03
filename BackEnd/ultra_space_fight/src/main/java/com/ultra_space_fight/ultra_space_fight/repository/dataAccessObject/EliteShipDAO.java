
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

import com.ultra_space_fight.ultra_space_fight.models.spaceships.EliteShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;



@Repository
public class EliteShipDAO implements CrudInterface<EliteShip> {


    private final DataSource dataSource;


    public EliteShipDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }


    private final String SQL_CREATE = 
        """
        INSERT INTO elite_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """;


    private final String SQL_DELETE = 
        """
        DELETE FROM elite_ship WHERE id_user = ?;    
        """;


    private final String SQL_UPDATE = 
        """
        UPDATE elite_ship
        SET life = ?, speed = ?, damage = ?
        WHERE id_user = ?;    
        """;


    private final String SQL_READ =
        """
        SELECT * 
        FROM (users u INNER JOIN elite_ship e USING(id_user)) 
        WHERE id_user = ?;    
        """;


    private final String SQL_READ_ALL = 
        """
        SELECT * 
        FROM (users u INNER JOIN elite_ship e USING(id_user));    
        """;


    @Override
    public void create(EliteShip eliteShip) throws SQLException {
        

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
    public void update(EliteShip eliteShip) throws SQLException {
        
        
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {


            preparedStatement.setInt(1, eliteShip.getLife());
            preparedStatement.setInt(2, eliteShip.getSpeed());
            preparedStatement.setInt(3, eliteShip.getDamage());
            preparedStatement.setLong(4, eliteShip.getUser().getIdUser());


            preparedStatement.executeUpdate();
        } 
    }


    @Override
    public EliteShip read(long id) throws SQLException {
        

        EliteShip eliteShip = null;


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


                    eliteShip = new EliteShip(
                        resultSet.getInt("life"),
                        resultSet.getInt("speed"),
                        resultSet.getInt("damage"),
                        user
                    );
                    eliteShip.setIdShip(resultSet.getLong("id_ship"));
                }
            }
        }


        return eliteShip;
    }


    @Override
    public List<EliteShip> readAll() throws SQLException {
        
        
        List<EliteShip> eliteShipList = new ArrayList<>();


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


                EliteShip eliteShip = new EliteShip(
                    resultSet.getInt("life"),
                    resultSet.getInt("speed"),
                    resultSet.getInt("damage"),
                    user
                );
                eliteShip.setIdShip(resultSet.getLong("id_ship"));


                eliteShipList.add(eliteShip);
            }
        }


        return eliteShipList;
    }
}