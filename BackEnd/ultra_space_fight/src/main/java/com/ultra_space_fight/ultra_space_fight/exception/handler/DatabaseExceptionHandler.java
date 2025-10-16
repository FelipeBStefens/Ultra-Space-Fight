// Package;
package com.ultra_space_fight.ultra_space_fight.exception.handler;

// Imports;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ultra_space_fight.ultra_space_fight.exception.ModelException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.database.DatabaseConnectionException;

// Database Exception Handler class;
@RestControllerAdvice
public class DatabaseExceptionHandler {
    
    // Handler to DatabaseConnection Exception;
    @ExceptionHandler(DatabaseConnectionException.class)
    public ResponseEntity<ModelException> databaseException(DatabaseConnectionException e) {

        // The Model Exception;
        ModelException databasException = new ModelException(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "The Server could not put your requests on the Database",
            e.getMessage()
        );

        // Returning InternalServerError;
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(databasException);
    }
}