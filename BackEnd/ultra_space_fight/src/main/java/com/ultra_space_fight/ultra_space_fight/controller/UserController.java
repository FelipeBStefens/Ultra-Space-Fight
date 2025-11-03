
package com.ultra_space_fight.ultra_space_fight.controller;


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


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "https://felipebstefens.github.io")
public class UserController {
    

    private final UserService userService;


    public UserController(UserService userService) {
        

        this.userService = userService;
    }


    @PostMapping("/create")
    public ResponseEntity<UserResponseDTO> create(@RequestBody UserSendDTO userSendDTO) {


        UserResponseDTO userResponseDTO = userService.createUser(userSendDTO);
        

        return ResponseEntity.status(HttpStatus.CREATED).body(userResponseDTO);
    }


    @GetMapping("/get/login")
    public ResponseEntity<UserResponseDTO> getUserLogin(@RequestParam String email, @RequestParam String password) {
        

        UserResponseDTO userResponseDTO = userService.getUserLogin(email, password);
        

        return ResponseEntity.status(HttpStatus.OK).body(userResponseDTO);
    }
    

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        

        userService.deleteUser(id);
        

        return ResponseEntity.noContent().build();
    }
}