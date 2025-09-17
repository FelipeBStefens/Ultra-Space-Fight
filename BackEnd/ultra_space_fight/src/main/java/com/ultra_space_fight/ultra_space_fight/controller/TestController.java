package com.ultra_space_fight.ultra_space_fight.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.UserDAO;

@RestController
public class TestController {
    
    public UserDAO userDAO;
    public TestController(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @GetMapping("/test")
    public String testDrive() {
        User user = new User("Felipe", "Felipe@gmail.com", "123");
        userDAO.create(user);
        return "Hello World! This is a test endpoint.";
    }
}
