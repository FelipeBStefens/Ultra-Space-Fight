// Package;
package com.ultra_space_fight.ultra_space_fight.exception.handler;

// Imports;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ultra_space_fight.ultra_space_fight.exception.ModelException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.spaceships.SpaceshipInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.spaceships.SpaceshipNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.spaceships.SpaceshipUnauthorizedException;

// Spaceship Exception Handler class;
@RestControllerAdvice
public class SpaceshipExceptionHandler {
   
    // Handler to SpaceshipNotFound Exception;
    @ExceptionHandler(SpaceshipNotFoundException.class)
    public ResponseEntity<ModelException> spaceshipNotFoundException(SpaceshipNotFoundException e) {

        // The Model Exception;
        ModelException spaceshipException = new ModelException(
            HttpStatus.NOT_FOUND.value(),
            "The Spaceship could not be found",
            e.getMessage()
        );

        // Returning NotFoundException;
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(spaceshipException);
    }

    // Handler to SpaceshipInvalidValues Exception;
    @ExceptionHandler(SpaceshipInvalidValuesException.class)
    public ResponseEntity<ModelException> spaceshipValuesInvalid(SpaceshipInvalidValuesException e) {
        
        // The Model Exception;
        ModelException spaceshipException = new ModelException(
            HttpStatus.BAD_REQUEST.value(),
            "One of the Spaceship values is invalid",
            e.getMessage()
        );

        // Returning BadRequestException;
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(spaceshipException);
    }

    // Handler to SpaceshipUnauthorized Exception;
    @ExceptionHandler(SpaceshipUnauthorizedException.class)
    public ResponseEntity<ModelException> spaceshipUnhathorized(SpaceshipUnauthorizedException e) {

        // The Model Exception;
        ModelException spaceshipException = new ModelException(
            HttpStatus.UNAUTHORIZED.value(),
            "Spaceship Unauthorized to Get",
            e.getMessage()
        );

        // Returning UnauthorizedException;
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(spaceshipException);
    }
}