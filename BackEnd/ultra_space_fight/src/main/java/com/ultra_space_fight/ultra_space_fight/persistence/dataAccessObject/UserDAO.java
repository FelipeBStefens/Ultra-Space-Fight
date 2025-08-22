package com.ultra_space_fight.ultra_space_fight.persistence.dataAccessObject;

import java.util.ArrayList;
import java.util.List;

import com.ultra_space_fight.ultra_space_fight.models.userProfile.User;
import com.ultra_space_fight.ultra_space_fight.persistence.CrudInterface;

public class UserDAO implements CrudInterface<User> {

    @Override
    public void create(User user) {
        // Implementation for creating a user
    }

    public void createNewUser(User user) {
        // Implementation for creating a new user with username and password
    }

    @Override
    public void delete(int id) {
        // Implementation for deleting a user by id
    }

    @Override
    public void update(User user) {
        // Implementation for updating a user
    }

    @Override
    public User read(int id) {
        // Implementation for reading a user by id
        return null;
    }

    @Override
    public List<User> readAll() {
        // Implementation for reading all users
        return new ArrayList<>();
    }
}