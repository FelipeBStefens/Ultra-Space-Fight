package com.ultra_space_fight.ultra_space_fight.exception.userExceptions;

import java.sql.SQLException;

public class UserNotCreatedException extends RuntimeException {
    
    public UserNotCreatedException(SQLException e) {
        super("User could not be created: " + e.getMessage());
    }
}
