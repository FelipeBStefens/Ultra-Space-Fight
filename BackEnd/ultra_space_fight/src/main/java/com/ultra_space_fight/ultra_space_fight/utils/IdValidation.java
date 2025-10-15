package com.ultra_space_fight.ultra_space_fight.utils;

public class IdValidation {
    
    public static void validate(long id, RuntimeException e) throws RuntimeException {

        if (id <= 0) {
            throw e;
        }
    }
}
