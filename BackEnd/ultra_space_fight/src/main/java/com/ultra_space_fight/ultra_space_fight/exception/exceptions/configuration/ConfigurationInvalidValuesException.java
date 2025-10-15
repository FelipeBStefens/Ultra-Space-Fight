package com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration;

public class ConfigurationInvalidValuesException extends RuntimeException {
    
    public ConfigurationInvalidValuesException(String value) {
        super("Invalid value on the Database: " + value);
    }
}