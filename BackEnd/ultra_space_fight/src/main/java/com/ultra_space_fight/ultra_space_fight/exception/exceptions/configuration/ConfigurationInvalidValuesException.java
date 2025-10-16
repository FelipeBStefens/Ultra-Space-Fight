// Package;
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration;

// ConfigurationInvalidValues Exception;
public class ConfigurationInvalidValuesException extends RuntimeException {
    
    // Constructor;
    public ConfigurationInvalidValuesException(String value) {
        
        // Mensage;
        super("Invalid value on the Database: " + value);
    }
}