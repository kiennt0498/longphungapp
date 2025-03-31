package com.example.longphungapp.confi;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Value("${cors.allowed-origins}")
    private String allowedOrigins;
    public WebMvcConfigurer corsConfigurer() {
    

        return new WebMvcConfigurer() {

            List<String> originList = Arrays.asList(allowedOrigins.split(","));

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(originList.toArray(new String[0])) // Cho phép frontend React
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Cho phép PUT
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
