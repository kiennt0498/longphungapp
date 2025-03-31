package com.example.longphungapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.example.longphungapp.repository")
public class LongPhungAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(LongPhungAppApplication.class, args);
    }

}
