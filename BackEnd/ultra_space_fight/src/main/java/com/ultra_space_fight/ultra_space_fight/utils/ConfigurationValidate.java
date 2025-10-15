package com.ultra_space_fight.ultra_space_fight.utils;

import java.math.BigDecimal;

import com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration.ConfigurationInvalidValuesException;
import com.ultra_space_fight.ultra_space_fight.exception.exceptions.configuration.ConfigurationNotFoundException;
import com.ultra_space_fight.ultra_space_fight.models.userProfile.Configuration;

public class ConfigurationValidate {
    
    public static void verifyConfiguration(Configuration configuration) throws ConfigurationNotFoundException {

        if (configuration == null) {
            throw new ConfigurationNotFoundException();
        }
    }

    public static void validateLanguage(String language) throws ConfigurationInvalidValuesException {

        if (!(language.equals("Portuguese") || language.equals("English"))) {
            throw new ConfigurationInvalidValuesException("Language");
        }
    }

    public static void validateSound(BigDecimal value) throws ConfigurationInvalidValuesException {

        if (value.doubleValue() < 0 || value.doubleValue() > 1) {
            throw new ConfigurationInvalidValuesException("Sound");
        }
    }
}
