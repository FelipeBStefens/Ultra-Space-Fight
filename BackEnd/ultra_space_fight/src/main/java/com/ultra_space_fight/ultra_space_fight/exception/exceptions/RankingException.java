package com.ultra_space_fight.ultra_space_fight.exception.exceptions;

public class RankingException extends RuntimeException{
    
    public RankingException() {
        super("The Ranking could not be retrieved.");
    }
}
