// Package;
package com.ultra_space_fight.ultra_space_fight;

// Imports;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

import com.ultra_space_fight.ultra_space_fight.configuration.DotenvInitializer;

// Main Application Class;
@SpringBootApplication
public class MainApplication {
	
	// Main Method;
	public static void main(String[] args) {

		// Starting the Spring Boot with env values;
		new SpringApplicationBuilder(MainApplication.class)
            .initializers(new DotenvInitializer())
            .run(args);
	}
}