package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.DestroyerShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;
import com.ultra_space_fight.ultra_space_fight.persistence.MysqlConnection;

public class DestroyerShipDAO implements CrudInterface<DestroyerShip> {
    
    private final String SQL_CREATE = """
        INSERT INTO destroyer_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """; 
    
    private final String SQL_DELETE = """
        DELETE FROM destroyer_ship WHERE id_ship = ?;    
        """;

    private final String SQL_UPDATE = """
        UPDATE destroyer_ship
        SET life = ?, speed = ?, damage = ?
        WHERE id_ship = ?;    
        """;

    private final String SQL_READ = """
        SELECT * 
        FROM (users u INNER JOIN destroyer_ship d ON u.id_user = d.id_user)
        WHERE id_ship = ?;    
        """;

    private final String SQL_READ_ALL = """
        SELECT * 
        FROM (users u INNER JOIN destroyer_ship d ON u.id_user = d.id_user);    
        """;

    @Override
    public void create(DestroyerShip destroyerShip) {
        
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_CREATE);
            
            preparedStatement.setLong(1, destroyerShip.getUser().getIdUser());
            preparedStatement.setInt(2, destroyerShip.getLife());
            preparedStatement.setInt(3, destroyerShip.getSpeed());
            preparedStatement.setInt(4, destroyerShip.getDamage());

            preparedStatement.executeUpdate();
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
    }

    @Override
    public void delete(long id) {
       
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_DELETE);
            
            preparedStatement.setLong(1, id);

            preparedStatement.executeUpdate();
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
    }

    @Override
    public void update(DestroyerShip destroyerShip) {
        
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_UPDATE);
            
            preparedStatement.setInt(1, destroyerShip.getLife());
            preparedStatement.setInt(2, destroyerShip.getSpeed());
            preparedStatement.setInt(3, destroyerShip.getDamage());
            preparedStatement.setLong(4, destroyerShip.getIdShip());

            preparedStatement.executeUpdate();
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
    }

    @Override
    public DestroyerShip read(long id) {
        DestroyerShip destroyerShip = null;
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_READ);
            
            preparedStatement.setLong(1, id);
            
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"), 
                resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                user.setIdUser(resultSet.getLong("id_user"));

                destroyerShip = new DestroyerShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"), user);
                destroyerShip.setIdShip(resultSet.getLong("id_ship"));
            }
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
        return destroyerShip;
    }

    @Override
    public List<DestroyerShip> readAll() {
        
        ArrayList<DestroyerShip> allDestroyerShip = new ArrayList<>();
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_READ_ALL);
            
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"), 
                resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                user.setIdUser(resultSet.getLong("id_user"));

                DestroyerShip destroyerShip = new DestroyerShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"), user);
                destroyerShip.setIdShip(resultSet.getLong("id_ship"));
                allDestroyerShip.add(destroyerShip);
            }
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
        return allDestroyerShip;
    }
}
