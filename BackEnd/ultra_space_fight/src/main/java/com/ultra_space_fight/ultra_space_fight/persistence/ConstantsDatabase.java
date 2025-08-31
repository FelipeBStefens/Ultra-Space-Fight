package com.ultra_space_fight.ultra_space_fight.persistence;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ConstantsDatabase {
    
    @Value("${spring.datasource.username}")
    private String user;

    @Value("${spring.datasource.password}")
    private String password;

    @Value("${spring.datasource.url}")
    private String address;

    @Value("${spring.datasource.driver-class-name}")
    private String driverClass;

    public String getUser() {
        return user;
    }
    public String getPassword() {
        return password;
    }
    public String getAddress() {
        return address;
    }
    public String getDriverClass() {
        return driverClass;
    }
}
