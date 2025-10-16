// Package;
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration;

// ConfigurationNotFound Exception;
public class ConfigurationNotFoundException extends RuntimeException {
    
    // Constructor;
    public ConfigurationNotFoundException() {
        
        // Mensage;
        super("Configuration not found on the Database");
    }
}