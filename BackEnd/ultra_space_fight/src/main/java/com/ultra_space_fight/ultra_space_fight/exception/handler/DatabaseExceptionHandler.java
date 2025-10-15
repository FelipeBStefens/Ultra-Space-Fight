package com.ultra_space_fight.ultra_space_fight.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ultra_space_fight.ultra_space_fight.exception.ModelException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.database.DatabaseConnectionException;

@RestControllerAdvice
public class DatabaseExceptionHandler {
    
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
}
