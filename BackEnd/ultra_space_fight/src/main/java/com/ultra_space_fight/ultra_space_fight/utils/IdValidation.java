// Package;
package com.ultra_space_fight.ultra_space_fight.utils;

// Declaring the validation class of the Id;
public class IdValidation {
    
    // Method to validate the Id, throwing a defining Exception;
    public static void validate(long id, RuntimeException e) throws RuntimeException {

        // If the Id is equal or less than zero;
        if (id <= 0) {

            // Throwing the especific Exception;
            throw e;
        }
    }
}