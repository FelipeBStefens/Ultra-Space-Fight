
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration;


public class ConfigurationNotFoundException extends RuntimeException {
    

    public ConfigurationNotFoundException() {
        

        super("Configuration not found on the Database");
    }
}