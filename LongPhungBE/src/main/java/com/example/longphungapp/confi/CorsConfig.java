//package com.example.longphungapp.confi;
//
//import java.util.Arrays;
//import java.util.List;
//
//import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class CorsConfig {
//    @Value("${cors.allowed-origins}")
//    private String allowedOrigins;
//
//    @Value("${cors.max-age:3600}")
//    private long maxAge;
//
//    @Value("${cors.exposed-headers:Set-Cookie,Authorization,X-CSRF-TOKEN}")
//    private String exposedHeaders;
//
//    @PostConstruct
//    public void printCorsOrigins() {
//        System.out.println("✅ Allowed Origins: " + allowedOrigins);
//    }
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//
//
//        List<String> exposedHeaderList = Arrays.asList(exposedHeaders.split(","));
//
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                // Cấu hình chung cho API
//                registry.addMapping("/api/**")
//                        .allowedOrigins(allowedOrigins)
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
//                        .allowedHeaders("*")
//                        .exposedHeaders(exposedHeaderList.toArray(new String[0]))
//                        .allowCredentials(true)
//                        .maxAge(maxAge);
//
//                // Cấu hình riêng cho WebSocket
//                registry.addMapping("/ws/**")
//                        .allowedOrigins(allowedOrigins)
//                        .allowedMethods("*")
//                        .allowedHeaders("*")
//                        .allowCredentials(true)
//                        .maxAge(0); // No cache cho WebSocket
//            }
//        };
//    }
//}
