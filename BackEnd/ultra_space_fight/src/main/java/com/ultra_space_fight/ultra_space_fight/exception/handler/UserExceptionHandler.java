// Package;
package com.ultra_space_fight.ultra_space_fight.exception.handler;

// Imports;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ultra_space_fight.ultra_space_fight.exception.ModelException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.user.UserConflictException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.user.UserInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.user.UserNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.user.UserUnauthorizedException;

// User Exception Handler class; 
@RestControllerAdvice
public class UserExceptionHandler {

    // Handler of UserNotFound Exception;
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ModelException> userNotFoundException(UserNotFoundException e) {

        // The Model Exception;
        ModelException userException = new ModelException(
            HttpStatus.NOT_FOUND.value(),
            "The User with that E-Mail and Password could not be found",
            e.getMessage()
        );

        // Returning NotFoundException;
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(userException);
    }

    // Handler of userInvalidValues Exception;
    @ExceptionHandler(UserInvalidValuesException.class)
    public ResponseEntity<ModelException> userValuesInvalid(UserInvalidValuesException e) {
        
        // The Model Exception;
        ModelException userException = new ModelException(
            HttpStatus.BAD_REQUEST.value(),
            "One of the User values is invalid",
            e.getMessage()
        );

        // Returning BadRequestException;
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userException);
    }

    // Handler of UserUnauthorized Exception;
    @ExceptionHandler(UserUnauthorizedException.class)
    public ResponseEntity<ModelException> userUnhathorized(UserUnauthorizedException e) {

        // The Model Exception;
        ModelException userException = new ModelException(
            HttpStatus.UNAUTHORIZED.value(),
            "User Unauthorized to Log In",
            e.getMessage()
        );

        // Returning UnauthorizedException;
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(userException);
    }

    // Handler of UserConflict Exception;
    @ExceptionHandler(UserConflictException.class) 
    public ResponseEntity<ModelException> userConflictValues(UserConflictException e) {

        // The Model Exception;
        ModelException userException = new ModelException(
            HttpStatus.CONFLICT.value(),
            "Username or E-Mail already used",
            e.getMessage()
        );

        // Returning ConflictException;
        return ResponseEntity.status(HttpStatus.CONFLICT).body(userException);
    }
}
