package com.ultra_space_fight.ultra_space_fight.exception;

public class ModelException {
    
    private final int status;
    private final String error;
    private final String message;

    public ModelException(int status, String error, String message) {
        this.status = status;
        this.error = error;
        this.message = message;
    }

    public int getStatus() { return status; }
    public String getError() { return error; }
    public String getMessage() { return message; }
}
