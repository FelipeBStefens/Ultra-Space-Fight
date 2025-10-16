// Package;
package com.ultra_space_fight.ultra_space_fight.exception.handler;

// Imports;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ultra_space_fight.ultra_space_fight.exception.ModelException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration.ConfigurationInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration.ConfigurationNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration.ConfigurationUnauthorizedException;

// Configuration Exception Handler;
@RestControllerAdvice
public class ConfigurationExceptionHandler {
    
    // Handler to ConfigurationNotFound Exception;
    @ExceptionHandler(ConfigurationNotFoundException.class)
    public ResponseEntity<ModelException> getConfigurationValues(ConfigurationNotFoundException e) {

        // The Model Exception;
        ModelException configurationException = new ModelException(
            HttpStatus.NOT_FOUND.value(),
            "The Configuration could not be found",
            e.getMessage()
        );

        // Returning NotFoundException;
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(configurationException);
    }

    // Handler to ConfigrationInvalidValues Exception;
    @ExceptionHandler(ConfigurationInvalidValuesException.class)
    public ResponseEntity<ModelException> configurationValuesInvalid(ConfigurationInvalidValuesException e) {
        
        // The Model Exception;
        ModelException configurationException = new ModelException(
            HttpStatus.BAD_REQUEST.value(),
            "One of the Configuration values is invalid",
            e.getMessage()
        );

        // Returning BadRequestException;
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(configurationException);
    }

    // Handler to ConfigurationUnauthorized Exception;
    @ExceptionHandler(ConfigurationUnauthorizedException.class)
    public ResponseEntity<ModelException> configurationUnhathorized(ConfigurationUnauthorizedException e) {

        // The Model Exception;
        ModelException configurationException = new ModelException(
            HttpStatus.UNAUTHORIZED.value(),
            "Configuration Unauthorized to Get",
            e.getMessage()
        );

        // Returning UnauthorizedException;
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(configurationException);
    }
}