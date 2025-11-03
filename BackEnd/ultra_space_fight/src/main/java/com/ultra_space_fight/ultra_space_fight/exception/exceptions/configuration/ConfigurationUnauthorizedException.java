
package com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration;


public class ConfigurationUnauthorizedException extends RuntimeException{
    

    public ConfigurationUnauthorizedException(String value) {
        

        super("Configuration value unauthorized on the Server: " + value);
    }
}