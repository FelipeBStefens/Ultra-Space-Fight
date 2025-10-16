// Package;
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration;

// ConfigurationUnauthorized Exception;
public class ConfigurationUnauthorizedException extends RuntimeException{
    
    // Constructor;
    public ConfigurationUnauthorizedException(String value) {
        
        // Mensage;
        super("Configuration value unauthorized on the Server: " + value);
    }
}