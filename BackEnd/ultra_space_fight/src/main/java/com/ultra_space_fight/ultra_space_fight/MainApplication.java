package com.ultra_space_fight.ultra_space_fight;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class MainApplication {

	public static void main(String[] args) {
		new SpringApplicationBuilder(MainApplication.class)
            .initializers(new DotenvInitializer())
            .run(args);
			
		// Testing output example;
		System.out.println("Ultra Space Fight application started successfully!!");
	}
}