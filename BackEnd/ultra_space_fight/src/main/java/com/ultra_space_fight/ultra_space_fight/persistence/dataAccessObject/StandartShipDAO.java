package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ultra_space_fight.ultra_space_fight.models.spaceships.StandartShip;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;
import com.ultra_space_fight.ultra_space_fight.persistence.MysqlConnection;

public class StandartShipDAO implements CrudInterface<StandartShip> {

    private final String SQL_CREATE = """
        INSERT INTO standart_ship (id_ship, id_user, life, speed, damage)
        VALUES (NULL, ?, ?, ?, ?);
        """; 
    
    private final String SQL_DELETE = """
        DELETE FROM standart_ship WHERE id_ship = ?;    
        """;

    private final String SQL_UPDATE = """
        UPDATE standart_ship
        SET life = ?, speed = ?, damage = ?
        WHERE id_ship = ?;    
        """;

    private final String SQL_READ = """
        SELECT * FROM standart_ship WHERE id_ship = ?;    
        """;

    private final String SQL_READ_ALL = """
        SELECT * FROM standart_ship;    
        """;

    @Override
    public void create(StandartShip standartShip) {
        
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_CREATE);
            
            preparedStatement.setLong(1, standartShip.getUser().getIdUser());
            preparedStatement.setInt(2, standartShip.getLife());
            preparedStatement.setInt(3, standartShip.getSpeed());
            preparedStatement.setInt(4, standartShip.getDamage());

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
    public void update(StandartShip standartShip) {
        
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_UPDATE);
            
            preparedStatement.setInt(1, standartShip.getLife());
            preparedStatement.setInt(2, standartShip.getSpeed());
            preparedStatement.setInt(3, standartShip.getDamage());
            preparedStatement.setLong(4, standartShip.getIdShip());

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
    public StandartShip read(long id) {
        StandartShip standartShip = null;
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_READ);
            
            preparedStatement.setLong(1, id);
            
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                UserDAO userDAO = new UserDAO();

                standartShip = new StandartShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"),
                userDAO.read(resultSet.getLong("id_user")));
                standartShip.setIdShip(resultSet.getLong("id_ship"));
            }
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
        return standartShip;
    }

    @Override
    public List<StandartShip> readAll() {
        
        ArrayList<StandartShip> allStandartShip = new ArrayList<>();
        try {
            MysqlConnection.openConnection();

            PreparedStatement preparedStatement = 
                MysqlConnection.getConnection().prepareStatement(SQL_READ_ALL);
            
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                
                UserDAO userDAO = new UserDAO();

                StandartShip standartShip = new StandartShip(resultSet.getInt("life"), resultSet.getInt("speed"), resultSet.getInt("damage"),
                userDAO.read(resultSet.getLong("id_user")));
                standartShip.setIdShip(resultSet.getLong("id_ship"));
                allStandartShip.add(standartShip);
            }
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            MysqlConnection.closeConnection();
        }
        return allStandartShip;
    }
}
