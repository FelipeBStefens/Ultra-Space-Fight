// Package;
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.database;

// Import;
import java.sql.SQLException;

// DatabaseConnection Exception;
public class DatabaseConnectionException extends RuntimeException {
    
    // Constructor;
    public DatabaseConnectionException(SQLException e) {
        
        // Mensage;
        super("Database Error: " + e.getMessage());
    }
}