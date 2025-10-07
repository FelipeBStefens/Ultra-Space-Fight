package com.ultra_space_fight.ultra_space_fight.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ultra_space_fight.ultra_space_fight.exception.exceptions.ConfigurationInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.ConfigurationNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.ConfigurationUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DataAchievementNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DataAchievementUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.DatabaseConnectionException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.RankingException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.SpaceshipInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.SpaceshipNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.SpaceshipUnauthorizedException;
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

    @ExceptionHandler(DataAchievementUnauthorizedException.class)
    public ResponseEntity<ModelException> dataAchievementUnhathorized(DataAchievementUnauthorizedException e) {

        ModelException globalException = new ModelException(
            HttpStatus.UNAUTHORIZED.value(),
            "Data Achievement Unauthorized to Get",
            e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(globalException);
    }

    @ExceptionHandler(ConfigurationNotFoundException.class)
    public ResponseEntity<ModelException> getConfigurationValues(ConfigurationNotFoundException e) {

        ModelException globalException = new ModelException(
            HttpStatus.NOT_FOUND.value(),
            "The Configuration could not be found",
            e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(globalException);
    }

    @ExceptionHandler(ConfigurationInvalidValuesException.class)
    public ResponseEntity<ModelException> configurationValuesInvalid(ConfigurationInvalidValuesException e) {
        
        ModelException globalException = new ModelException(
            HttpStatus.BAD_REQUEST.value(),
            "One of the Configuration values is invalid",
            e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(globalException);
    }

    @ExceptionHandler(ConfigurationUnauthorizedException.class)
    public ResponseEntity<ModelException> configurationUnhathorized(ConfigurationUnauthorizedException e) {

        ModelException globalException = new ModelException(
            HttpStatus.UNAUTHORIZED.value(),
            "Configuration Unauthorized to Get",
            e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(globalException);
    }

    @ExceptionHandler(RankingException.class)
    public ResponseEntity<ModelException> rankingException(RankingException e) {

        ModelException globalException = new ModelException(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "The Ranking could not be retrieved.",
            e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(globalException);
    }

    @ExceptionHandler(SpaceshipNotFoundException.class)
    public ResponseEntity<ModelException> spaceshipNotFoundException(SpaceshipNotFoundException e) {

        ModelException globalException = new ModelException(
            HttpStatus.NOT_FOUND.value(),
            "The Spaceship could not be found",
            e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(globalException);
    }

    @ExceptionHandler(SpaceshipInvalidValuesException.class)
    public ResponseEntity<ModelException> spaceshipValuesInvalid(SpaceshipInvalidValuesException e) {
        
        ModelException globalException = new ModelException(
            HttpStatus.BAD_REQUEST.value(),
            "One of the Spaceship values is invalid",
            e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(globalException);
    }

    @ExceptionHandler(SpaceshipUnauthorizedException.class)
    public ResponseEntity<ModelException> spaceshipUnhathorized(SpaceshipUnauthorizedException e) {

        ModelException globalException = new ModelException(
            HttpStatus.UNAUTHORIZED.value(),
            "Spaceship Unauthorized to Get",
            e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(globalException);
    }
}