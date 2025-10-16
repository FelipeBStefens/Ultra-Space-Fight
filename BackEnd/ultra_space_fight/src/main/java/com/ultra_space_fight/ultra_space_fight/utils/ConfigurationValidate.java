// Package;
package com.ultra_space_fight.ultra_space_fight.utils;

// Imports;
import java.math.BigDecimal;

import com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration.ConfigurationInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration.ConfigurationNotFoundException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.Configuration;

// Declaring the validations class of the Configuration;
public class ConfigurationValidate {

    // Method to validate the Language;
    public static void validateLanguage(String language) throws ConfigurationInvalidValuesException {

        // If the Language not equals of Portuguese or English;
        if (!(language.equals("Portuguese") || language.equals("English"))) {
            
            // Throw new Exception;
            throw new ConfigurationInvalidValuesException("Language");
        }
    }

    // Method to validate the Sound
    public static void validateSound(BigDecimal value) throws ConfigurationInvalidValuesException {

        // If the value is less than 0 or more then 1
        if (value.doubleValue() < 0 || value.doubleValue() > 1) {
            
            // Throw new Exception;
            throw new ConfigurationInvalidValuesException("Sound");
        }
    }

    // Method to verify if exists Configuration;
    public static void verifyConfiguration(Configuration configuration) throws ConfigurationNotFoundException {

        // If the Configuration is null;
        if (configuration == null) {
            
            // Throw new Exception;
            throw new ConfigurationNotFoundException();
        }
    }
}
