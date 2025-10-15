package com.ultra_space_fight.ultra_space_fight.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ultra_space_fight.ultra_space_fight.exception.ModelException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration.ConfigurationInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration.ConfigurationNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration.ConfigurationUnauthorizedException;

@RestControllerAdvice
public class ConfigurationExceptionHandler {
    
    
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
}
