
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.database;


import java.sql.SQLException;


public class DatabaseConnectionException extends RuntimeException {
    

    public DatabaseConnectionException(SQLException e) {
        

        super("Database Error: " + e.getMessage());
    }
}