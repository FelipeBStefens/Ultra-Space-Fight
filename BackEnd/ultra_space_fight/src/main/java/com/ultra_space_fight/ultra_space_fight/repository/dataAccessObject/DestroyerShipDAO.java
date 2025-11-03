
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

import com.ultra_space_fight.ultra_space_fight.models.spaceships.DestroyerShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.repository.CrudInterface;


@Repository
public class DestroyerShipDAO implements CrudInterface<DestroyerShip> {


    private final DataSource dataSource;


    public DestroyerShipDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }


    private static final String SQL_CREATE = 
        """
        INSERT INTO destroyer_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """;


    private static final String SQL_DELETE = 
        """
        DELETE FROM destroyer_ship WHERE id_user = ?;                
        """;


    private static final String SQL_UPDATE =
        """
        UPDATE destroyer_ship 
        SET life = ?, speed = ?, damage = ?
        WHERE id_user = ?;
        """;
    

    private static final String SQL_READ = 
        """
        SELECT * 
        FROM (users u INNER JOIN destroyer_ship d USING(id_user))
        WHERE id_user = ?;
        """;
    

    private static final String SQL_READ_ALL = 
        """
        SELECT *
        FROM (users u INNER JOIN destroyer_ship d USING(id_user));
        """;
    

    @Override
    public void create(DestroyerShip destroyerShip) throws SQLException {
        

        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS)) {


            preparedStatement.setLong(1, destroyerShip.getUser().getIdUser());
            preparedStatement.setInt(2, destroyerShip.getLife());
            preparedStatement.setInt(3, destroyerShip.getSpeed());
            preparedStatement.setInt(4, destroyerShip.getDamage());


            preparedStatement.executeUpdate();


            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                if (resultSet.next()) {
                    

                    destroyerShip.setIdShip(resultSet.getLong(1));
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
    public void update(DestroyerShip destroyerShip) throws SQLException {
        
        
        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE)) {


            preparedStatement.setInt(1, destroyerShip.getLife());
            preparedStatement.setInt(2, destroyerShip.getSpeed());
            preparedStatement.setInt(3, destroyerShip.getDamage());
            preparedStatement.setLong(4, destroyerShip.getUser().getIdUser());


            preparedStatement.executeUpdate();
        }
    }


    @Override
    public DestroyerShip read(long id) throws SQLException {
        
        
        DestroyerShip destroyerShip = null;

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


                    destroyerShip = new DestroyerShip(
                        resultSet.getInt("life"),
                        resultSet.getInt("speed"),
                        resultSet.getInt("damage"),
                        user
                    );
                    destroyerShip.setIdShip(resultSet.getLong("id_ship"));
                }
            }
        }


        return destroyerShip;
    }


    @Override
    public List<DestroyerShip> readAll() throws SQLException {
        
        
        List<DestroyerShip> destroyerShipList = new ArrayList<>();


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


                DestroyerShip destroyerShip = new DestroyerShip(
                    resultSet.getInt("life"),
                    resultSet.getInt("speed"),
                    resultSet.getInt("damage"),
                    user
                );
                destroyerShip.setIdShip(resultSet.getLong("id_ship"));


                destroyerShipList.add(destroyerShip);
            }
        }


        return destroyerShipList;
    }
}