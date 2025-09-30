package com.ultra_space_fight.ultra_space_fight.service;

import org.springframework.stereotype.Service;

import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject.UserDAO;

@Service
public class UserService {
    
    private final UserDAO userDAO;

    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public void createUser(User user) {
        
        userDAO.createNewUser(user);
    }

    public void deleteUser(long id) {

        userDAO.deleteAll(id);
    }

    public void updateUser(User user) {
        
        userDAO.update(user);
    }

    public User getUserById(long id) {
    
        return userDAO.read(id);
    }

    public User getUserLogin(String email, String password) {

        long idUser = userDAO.getUserId(email, password);
        return userDAO.read(idUser);
    }
}
