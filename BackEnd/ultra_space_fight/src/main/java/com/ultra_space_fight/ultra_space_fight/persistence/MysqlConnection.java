// Declaring the package of the MySQL Connection class;
package com.ultra_space_fight.ultra_space_fight.persistence;

// Java Imports;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

// Declaring the MysqlConnection class;
public class MysqlConnection {
    
    // The attribute Database connection;
    public static Connection connection;

    // Open the connection in the Database;
    public static void openConnection() {

        // Try-Catch to handle Execptions;
        try {

            // Getting the connection with the Drive Manager;
            Class.forName(ConstantsDatabase.DRIVER_CLASS);
            connection = DriverManager.getConnection(ConstantsDatabase.ADDRESS, 
                ConstantsDatabase.USER, ConstantsDatabase.PASSWORD);
            
        }
        catch (ClassNotFoundException | SQLException e) {

            // Printing the Exception Message;
            System.out.println(e.getMessage());
        }
    }

    // Close the connection in the Database;
    public static void closeConnection() {

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
}
