package com.gestionDocs.gestionDocs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:application.properties")
public class GestionDocsApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestionDocsApplication.class, args);
	}

}
