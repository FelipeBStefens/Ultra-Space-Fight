package com.ultra_space_fight.ultra_space_fight.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DataAchievementNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.UserConflictException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.UserInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.UserNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.UserUnauthorizedException;

@RestControllerAdvice
public class GlobalExceptionHandler {
     
    @ExceptionHandler(DatabaseConnectionException.class)
    public ResponseEntity<ModelException> databaseException(DatabaseConnectionException e) {

        ModelException globalException = new ModelException(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "The Server could not put your requests on the Database",
            e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(globalException);
    }

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

    @ExceptionHandler(DataAchievementNotFoundException.class)
    public ResponseEntity<ModelException> dataAchievementNotFoundException(DataAchievementNotFoundException e) {


        ModelException globalException = new ModelException(
            HttpStatus.NOT_FOUND.value(),
            "The Data Achievement could not be found",
            e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(globalException);
    }
}