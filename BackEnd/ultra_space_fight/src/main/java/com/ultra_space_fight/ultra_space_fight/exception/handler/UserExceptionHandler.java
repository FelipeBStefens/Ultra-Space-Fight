package com.ultra_space_fight.ultra_space_fight.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ultra_space_fight.ultra_space_fight.exception.ModelException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.user.UserConflictException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.user.UserInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.user.UserNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.user.UserUnauthorizedException;

public class UserExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ModelException> userNotFoundException(UserNotFoundException e) {

        ModelException globalException = new ModelException(
            HttpStatus.NOT_FOUND.value(),
            "The User with that E-Mail and Password could not be found",
            e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(globalException);
    }

    @ExceptionHandler(UserInvalidValuesException.class)
    public ResponseEntity<ModelException> userValuesInvalid(UserInvalidValuesException e) {
        
        ModelException globalException = new ModelException(
            HttpStatus.BAD_REQUEST.value(),
            "One of the User values is invalid",
            e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(globalException);
    }

    @ExceptionHandler(UserUnauthorizedException.class)
    public ResponseEntity<ModelException> userUnhathorized(UserUnauthorizedException e) {

        ModelException globalException = new ModelException(
            HttpStatus.UNAUTHORIZED.value(),
            "User Unauthorized to Log In",
            e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(globalException);
    }

    @ExceptionHandler(UserConflictException.class) 
    public ResponseEntity<ModelException> userConflictValues(UserConflictException e) {

        ModelException globalException = new ModelException(
            HttpStatus.CONFLICT.value(),
            "Username or E-Mail already used",
            e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(globalException);
    }
}
