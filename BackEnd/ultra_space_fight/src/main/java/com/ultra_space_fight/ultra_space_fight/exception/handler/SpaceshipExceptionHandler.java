
package com.ultra_space_fight.ultra_space_fight.exception.handler;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ultra_space_fight.ultra_space_fight.exception.ModelException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.spaceships.SpaceshipInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.spaceships.SpaceshipNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.spaceships.SpaceshipUnauthorizedException;


@RestControllerAdvice
public class SpaceshipExceptionHandler {
   

    @ExceptionHandler(SpaceshipNotFoundException.class)
    public ResponseEntity<ModelException> spaceshipNotFoundException(SpaceshipNotFoundException e) {


        ModelException spaceshipException = new ModelException(
            HttpStatus.NOT_FOUND.value(),
            "The Spaceship could not be found",
            e.getMessage()
        );


        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(spaceshipException);
    }


    @ExceptionHandler(SpaceshipInvalidValuesException.class)
    public ResponseEntity<ModelException> spaceshipValuesInvalid(SpaceshipInvalidValuesException e) {
        

        ModelException spaceshipException = new ModelException(
            HttpStatus.BAD_REQUEST.value(),
            "One of the Spaceship values is invalid",
            e.getMessage()
        );


        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(spaceshipException);
    }


    @ExceptionHandler(SpaceshipUnauthorizedException.class)
    public ResponseEntity<ModelException> spaceshipUnhathorized(SpaceshipUnauthorizedException e) {


        ModelException spaceshipException = new ModelException(
            HttpStatus.UNAUTHORIZED.value(),
            "Spaceship Unauthorized to Get",
            e.getMessage()
        );


        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(spaceshipException);
    }
}