package com.example.longphungapp.confi;


import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Value("${cors.allowed-origins}")
    private String allowedOrigins;
   

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        String[] originArray = allowedOrigins.split(",");
        registry.addEndpoint("/api/ws")
                .setAllowedOrigins(originArray)
                .withSockJS();

    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/app");

    }

}
