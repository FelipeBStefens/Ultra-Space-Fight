// Package;
package com.ultra_space_fight.ultra_space_fight.exception.handler;

// Imports;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ultra_space_fight.ultra_space_fight.exception.ModelException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.DataAchievementNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.DataAchievementUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.RankingException;

// DataAchievements Exception Handler class;
@RestControllerAdvice
public class DataAchievementExceptionHandler {
   
    // Handler to DataAchievementsNotFound Exception;
    @ExceptionHandler(DataAchievementNotFoundException.class)
    public ResponseEntity<ModelException> dataAchievementNotFoundException(DataAchievementNotFoundException e) {

        // The Model Exception;
        ModelException dataAchievementsException = new ModelException(
            HttpStatus.NOT_FOUND.value(),
            "The Data Achievement could not be found",
            e.getMessage()
        );

        // Returning NotFoundException;
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(dataAchievementsException);
    }

    // Handler to DataAchievementsUnauthorized Exception;
    @ExceptionHandler(DataAchievementUnauthorizedException.class)
    public ResponseEntity<ModelException> dataAchievementUnhathorized(DataAchievementUnauthorizedException e) {

        // The Model Exception;
        ModelException dataAchievementsException = new ModelException(
            HttpStatus.UNAUTHORIZED.value(),
            "Data Achievement Unauthorized to Get",
            e.getMessage()
        );

        // Returning UnauthorizedException;
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(dataAchievementsException);
    }

    // Handler to Ranking Exception;
    @ExceptionHandler(RankingException.class)
    public ResponseEntity<ModelException> rankingException(RankingException e) {

        // The Model Exception;
        ModelException dataAchievementsException = new ModelException(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "The Ranking could not be retrieved.",
            e.getMessage()
        );

        // Returning InternalServerError;
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(dataAchievementsException);
    }
}