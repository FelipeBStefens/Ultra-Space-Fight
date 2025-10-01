package com.ultra_space_fight.ultra_space_fight.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ultra_space_fight.ultra_space_fight.exception.userExceptions.UserNotCreatedException;

@RestControllerAdvice
public class GolbalExceptionHandler {
    
    @ExceptionHandler(UserNotCreatedException.class)
    public ResponseEntity<GlobalException> handleTest(UserNotCreatedException e) {
        
        GlobalException globalException = new GlobalException(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "user not Created",
            e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(globalException);
    }
}