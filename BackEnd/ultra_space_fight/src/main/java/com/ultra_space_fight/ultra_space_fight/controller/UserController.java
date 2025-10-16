// Package;
package com.ultra_space_fight.ultra_space_fight.controller;

// Imports;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.user.UserResponseDTO;
import com.ultra_space_fight.ultra_space_fight.dataTransferObjects.user.UserSendDTO;
import com.ultra_space_fight.ultra_space_fight.service.UserService;

// Controller class for User;
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class UserController {
    
    // Declaring the Service of User;
    private final UserService userService;

    // Constructor;
    public UserController(UserService userService) {
        
        // Instanciating the User Service;
        this.userService = userService;
    }

    // Endpoint to create a new User;
    @PostMapping("/create")
    public ResponseEntity<UserResponseDTO> create(@RequestBody UserSendDTO userSendDTO) {

        // Creating a new User and getting it's values;
        UserResponseDTO userResponseDTO = userService.createUser(userSendDTO);
        
        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponseDTO);
    }

    // Endpoint to get the User by an E-Mail and Password;
    @GetMapping("/get/login")
    public ResponseEntity<UserResponseDTO> getUserLogin(@RequestParam String email, @RequestParam String password) {
        
        // Getting the User values;
        UserResponseDTO userResponseDTO = userService.getUserLogin(email, password);
        
        // Returning the HTTP of this values;
        return ResponseEntity.status(HttpStatus.OK).body(userResponseDTO);
    }
    
    // Endpoint to delete the User by Id;
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        
        // Deleting the User by id;
        userService.deleteUser(id);
        
        // Returning the HTTP with no body values;
        return ResponseEntity.noContent().build();
    }
}