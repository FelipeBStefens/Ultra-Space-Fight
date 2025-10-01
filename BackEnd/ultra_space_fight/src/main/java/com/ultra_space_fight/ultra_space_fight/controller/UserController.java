package com.ultra_space_fight.ultra_space_fight.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.service.UserService;
import com.ultra_space_fight.ultra_space_fight.transferObjects.UserResponseTDO;
import com.ultra_space_fight.ultra_space_fight.transferObjects.UserSendTDO;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<UserResponseTDO> create(@RequestBody UserSendTDO userSendTDO) {

        UserResponseTDO response = userService.createUser(userSendTDO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /*
    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable long id) {
        
        userService.deleteUser(id);
        return true;
    }

    @PutMapping("/update/{id}")
    public User update(@PathVariable long id, @RequestBody User user) {
        user.setIdUser(id);
        userService.updateUser(user);
        return user;
    }

    @GetMapping("/get/{id}")
    public User getById(@PathVariable long id) {

        return userService.getUserById(id);
    }

    @GetMapping("/get/login")
    public User getUserLogin(@RequestParam String email, 
        @RequestParam String password) {

        return userService.getUserLogin(email, password);
    }
    */
}
