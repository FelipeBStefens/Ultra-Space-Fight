
package com.ultra_space_fight.ultra_space_fight.exception.handler;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ultra_space_fight.ultra_space_fight.exception.ModelException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.DataAchievementNotFoundException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.DataAchievementUnauthorizedException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.dataAchievements.RankingException;


@RestControllerAdvice
public class DataAchievementExceptionHandler {
   

    @ExceptionHandler(DataAchievementNotFoundException.class)
    public ResponseEntity<ModelException> dataAchievementNotFoundException(DataAchievementNotFoundException e) {


        ModelException dataAchievementsException = new ModelException(
            HttpStatus.NOT_FOUND.value(),
            "The Data Achievement could not be found",
            e.getMessage()
        );


        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(dataAchievementsException);
    }


    @ExceptionHandler(DataAchievementUnauthorizedException.class)
    public ResponseEntity<ModelException> dataAchievementUnhathorized(DataAchievementUnauthorizedException e) {


        ModelException dataAchievementsException = new ModelException(
            HttpStatus.UNAUTHORIZED.value(),
            "Data Achievement Unauthorized to Get",
            e.getMessage()
        );


        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(dataAchievementsException);
    }


    @ExceptionHandler(RankingException.class)
    public ResponseEntity<ModelException> rankingException(RankingException e) {


        ModelException dataAchievementsException = new ModelException(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "The Ranking could not be retrieved.",
            e.getMessage()
        );


        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(dataAchievementsException);
    }
}