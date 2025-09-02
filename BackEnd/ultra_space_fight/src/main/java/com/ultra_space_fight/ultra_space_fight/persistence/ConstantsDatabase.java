// Declaring the package of the ConstantsDatabase class;
package com.ultra_space_fight.ultra_space_fight.persistence;

// Importing necessary classes for the interface;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

// Declaring the ConstantsDatabase Class
// It's a Component that holds the database connection constants
// The values are injected from the application properties  
@Component
public class ConstantsDatabase {
    
    // Username of the database;
    @Value("${spring.datasource.username}")
    private String user;

    // Password of the database;
    @Value("${spring.datasource.password}")
    private String password;

    // Address of the database;
    @Value("${spring.datasource.url}")
    private String address;

    // Driver class of the Java-Database-Connection;
    @Value("${spring.datasource.driver-class-name}")
    private String driverClass;

    // Getter method of the Username;
    public String getUser() {
        return user;
    }

    // Getter method of the Password;
    public String getPassword() {
        return password;
    }

    // Getter method of the Address;
    public String getAddress() {
        return address;
    }

    // Getter method of the Driver Class;
    public String getDriverClass() {
        return driverClass;
    }
}
