// Declaring the package of the MySQL Connection class;
package com.ultra_space_fight.ultra_space_fight.persistence;

// Java Imports;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.springframework.stereotype.Component;

// Declaring the MysqlConnection class;
@Component
public class MysqlConnection {
    
    // The attribute Database connection;
    private Connection connection;

    // Constants of the Database;
    private final ConstantsDatabase CONSTANTS_DATABASE;

    // Auto Wired the ConstantsDatabase class;
    public MysqlConnection(ConstantsDatabase CONSTANTS_DATABASE) {
        this.CONSTANTS_DATABASE = CONSTANTS_DATABASE;
    }

    // Open the connection in the Database;
    public void openConnection() {

        // Try-Catch to handle Execptions;
        try {

            // Getting the connection with the Drive Manager;
            Class.forName(CONSTANTS_DATABASE.getDriverClass());
            connection = DriverManager.getConnection(CONSTANTS_DATABASE.getAddress(), 
                CONSTANTS_DATABASE.getUser(), CONSTANTS_DATABASE.getPassword());
        }
        catch (ClassNotFoundException | SQLException e) {

            // Printing the Exception Message;
            System.out.println(e.getMessage());
        }
    }

    // Close the connection in the Database;
    public void closeConnection() {

        // Try-Catch to handle Execptions;
        try {

            // Close the connection if it hasn't closed yet;
            if (!connection.isClosed()) {
                connection.close();
            }
        }
        catch (SQLException e) {

            // Printing the Exception Message;
            System.out.println(e.getMessage());
        }
    }

    // Method to get the Database Connection;
    public Connection getConnection() {
        return connection;
    }
}