// Package;
package com.ultra_space_fight.ultra_space_fight.exception;

// Declaring ModelExcetion class;
public class ModelException {
    
    // Attributes of ModelException class;
    private final int status;
    private final String error;
    private final String message;

    // Constructor;
    public ModelException(int status, String error, String message) {
        
        // Initializing the Attribute values;
        this.status = status;
        this.error = error;
        this.message = message;
    }

    // Getter of Status;
    public int getStatus() { 
        return status; 
    }

    // Getter of Error;
    public String getError() { 
        return error;
    }

    // Getter of Mensage;
    public String getMessage() { 
        return message; 
    }
}