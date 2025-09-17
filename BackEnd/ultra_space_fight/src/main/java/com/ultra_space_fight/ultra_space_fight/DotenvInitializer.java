// Package;
package com.ultra_space_fight.ultra_space_fight;

// Imports;
import java.util.HashMap;
import java.util.Map;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import io.github.cdimascio.dotenv.Dotenv;

// Dotenv Initializer Class;
public class DotenvInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    // Initialize env value Method;
    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        ConfigurableEnvironment environment = applicationContext.getEnvironment();
        Dotenv dotenv = Dotenv.load();

        Map<String, Object> dotenvProperties = new HashMap<>();
        dotenv.entries().forEach(entry -> dotenvProperties.put(entry.getKey(), entry.getValue()));

        environment.getPropertySources().addFirst(new MapPropertySource("dotenvProperties", dotenvProperties));
    }
}