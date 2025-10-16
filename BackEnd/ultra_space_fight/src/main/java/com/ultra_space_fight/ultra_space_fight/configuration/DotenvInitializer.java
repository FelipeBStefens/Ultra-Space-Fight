// Package;
package com.ultra_space_fight.ultra_space_fight.configuration;

// Imports;
import java.util.HashMap;
import java.util.Map;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import io.github.cdimascio.dotenv.Dotenv;

// DotenvInitializer loads variables from a .env file into Spring's Environment;
public class DotenvInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    // Initialize the values on the Application Context;
    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        
        // Get Spring's Environment;
        ConfigurableEnvironment environment = applicationContext.getEnvironment();
        
        // Load variables from .env file;
        Dotenv dotenv = Dotenv.load();

        // Store .env variables in a Map;
        Map<String, Object> dotenvProperties = new HashMap<>();
        dotenv.entries().forEach(entry -> dotenvProperties.put(entry.getKey(), entry.getValue()));

        // Add the Map as the first PropertySource so .env variables can override others;
        environment.getPropertySources().addFirst(new MapPropertySource("dotenvProperties", dotenvProperties));
    }
}