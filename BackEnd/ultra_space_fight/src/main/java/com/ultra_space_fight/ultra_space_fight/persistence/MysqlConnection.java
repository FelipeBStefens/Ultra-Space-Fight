// Declaring the package of the MySQL Connection class;
package com.ultra_space_fight.ultra_space_fight.persistence;

// Java Imports;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

// Declaring the MysqlConnection class;
public class MysqlConnection {
    
    // The attribute Database connection;
    private Connection connection;

    // Open the connection in the Database;
    public void openConnection() {

        // Try-Catch to handle Execptions;
        try {

            // Initializing the ConstantsDatabase class to get the constants;
            ConstantsDatabase constantsDatabase = new ConstantsDatabase();

            // Getting the connection with the Drive Manager;
            Class.forName(constantsDatabase.getDriverClass());
            connection = DriverManager.getConnection(constantsDatabase.getAddress(), 
                constantsDatabase.getUser(), constantsDatabase.getPassword());
            
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