package com.ultra_space_fight.ultra_space_fight.persistence;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ConstantsDatabase {
    
    @Value("${spring.datasource.username}")
    private static String user;

    @Value("${spring.datasource.password}")
    private static String password;

    @Value("${spring.datasource.url}")
    private static String address;

    @Value("${spring.datasource.driver-class-name}")
    private static String driverClass;

    public static String getUser() {
        return user;
    }
    public static String getPassword() {
        return password;
    }
    public static String getAddress() {
        return address;
    }
    public static String getDriverClass() {
        return driverClass;
    }
}
