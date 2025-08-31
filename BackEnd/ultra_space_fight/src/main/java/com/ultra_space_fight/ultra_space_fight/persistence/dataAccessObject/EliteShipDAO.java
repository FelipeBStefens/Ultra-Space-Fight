package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.EliteShip;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;
import com.ultra_space_fight.ultra_space_fight.persistence.MysqlConnection;

public class EliteShipDAO implements CrudInterface<EliteShip> {
    
    private final String SQL_CREATE = """
        INSERT INTO elite_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """; 
    
    private final String SQL_DELETE = """
        DELETE FROM elite_ship WHERE id_ship = ?;    
        """;

    private final String SQL_UPDATE = """
        UPDATE elite_ship
        SET life = ?, speed = ?, damage = ?
        WHERE id_ship = ?;    
        """;

    private final String SQL_READ = """
        SELECT * 
        FROM (users u INNER JOIN elite_ship e ON u.id_user = e.id_user) 
        WHERE id_ship = ?;    
        """;

    private final String SQL_READ_ALL = """
        SELECT * 
        FROM (users u INNER JOIN elite_ship e ON u.id_user = e.id_user);    
        """;

    @Override
    public void create(EliteShip eliteShip) {
        
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_CREATE);
            
            preparedStatement.setLong(1, eliteShip.getUser().getIdUser());
            preparedStatement.setInt(2, eliteShip.getLife());
            preparedStatement.setInt(3, eliteShip.getSpeed());
            preparedStatement.setInt(4, eliteShip.getDamage());

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
    public void update(EliteShip eliteShip) {
        
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_UPDATE);
            
            preparedStatement.setInt(1, eliteShip.getLife());
            preparedStatement.setInt(2, eliteShip.getSpeed());
            preparedStatement.setInt(3, eliteShip.getDamage());
            preparedStatement.setLong(4, eliteShip.getIdShip());

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
    public EliteShip read(long id) {
        EliteShip eliteShip = null;
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

                eliteShip = new EliteShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"), user);
                eliteShip.setIdShip(resultSet.getLong("id_ship"));
            }
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
        return eliteShip;
    }

    @Override
    public List<EliteShip> readAll() {
        
        ArrayList<EliteShip> allEliteShip = new ArrayList<>();
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_READ_ALL);
            
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                
                User user = new User(resultSet.getString("name_user"), resultSet.getString("email"), 
                resultSet.getString("password_user"), resultSet.getInt("cash"), resultSet.getString("selected_spaceship"));
                user.setIdUser(resultSet.getLong("id_user"));

                EliteShip eliteShip = new EliteShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"), user);
                eliteShip.setIdShip(resultSet.getLong("id_ship"));
                allEliteShip.add(eliteShip);
            }
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
        return allEliteShip;
    }
}
