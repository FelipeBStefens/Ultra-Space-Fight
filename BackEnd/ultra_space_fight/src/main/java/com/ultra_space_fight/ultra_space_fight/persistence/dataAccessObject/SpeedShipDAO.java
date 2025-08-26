package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.SpeedShip;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;
import com.ultra_space_fight.ultra_space_fight.persistence.MysqlConnection;

public class SpeedShipDAO implements CrudInterface<SpeedShip> {

    private final String SQL_CREATE = """
        INSERT INTO speed_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """; 
    
    private final String SQL_DELETE = """
        DELETE FROM speed_ship WHERE id_ship = ?;    
        """;

    private final String SQL_UPDATE = """
        UPDATE speed_ship
        SET life = ?, speed = ?, damage = ?
        WHERE id_ship = ?;    
        """;

    private final String SQL_READ = """
        SELECT * FROM speed_ship WHERE id_ship = ?;    
        """;

    private final String SQL_READ_ALL = """
        SELECT * FROM speed_ship;    
        """;

    @Override
    public void create(SpeedShip speedShip) {
        
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_CREATE);
            
            preparedStatement.setLong(1, speedShip.getUser().getIdUser());
            preparedStatement.setInt(2, speedShip.getLife());
            preparedStatement.setInt(3, speedShip.getSpeed());
            preparedStatement.setInt(4, speedShip.getDamage());

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
    public void update(SpeedShip speedShip) {
        
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_UPDATE);
            
            preparedStatement.setInt(1, speedShip.getLife());
            preparedStatement.setInt(2, speedShip.getSpeed());
            preparedStatement.setInt(3, speedShip.getDamage());
            preparedStatement.setLong(4, speedShip.getIdShip());

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
    public SpeedShip read(long id) {
        SpeedShip speedShip = null;
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_READ);
            
            preparedStatement.setLong(1, id);
            
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                UserDAO userDAO = new UserDAO();

                speedShip = new SpeedShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"),
                userDAO.read(resultSet.getLong("id_user")));
                speedShip.setIdShip(resultSet.getLong("id_ship"));
            }
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
        return speedShip;
    }

    @Override
    public List<SpeedShip> readAll() {
        
        ArrayList<SpeedShip> allSpeedShip = new ArrayList<>();
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_READ_ALL);
            
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                
                UserDAO userDAO = new UserDAO();

                SpeedShip speedShip = new SpeedShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"),
                userDAO.read(resultSet.getLong("id_user")));
                speedShip.setIdShip(resultSet.getLong("id_ship"));
                allSpeedShip.add(speedShip);
            }
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
        return allSpeedShip;
    }  
}
