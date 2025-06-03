package com.example.longphungapp.confi;


import java.util.Arrays;
import java.util.List;

import com.example.longphungapp.component.CustomHandshakeHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Value("${cors.allowed-origins}")
    private String allowedOrigins;

    @Value("${websocket.heartbeat.interval:10000}")
    private long heartbeatInterval;

    @Bean(name = "customMessageBrokerTaskScheduler")
    public TaskScheduler customMessageBrokerTaskScheduler() {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(1);
        scheduler.setThreadNamePrefix("wss-heartbeat-");
        return scheduler;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        String[] originArray = allowedOrigins.split(",");
        registry.addEndpoint("/api/ws")
                .setAllowedOrigins(originArray)
                .setHandshakeHandler(new CustomHandshakeHandler())
                .withSockJS()
                .setSuppressCors(true);
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic", "/queue")
                .setHeartbeatValue(new long[]{heartbeatInterval, heartbeatInterval})
                .setTaskScheduler(customMessageBrokerTaskScheduler());

        registry.setApplicationDestinationPrefixes("/app")
                .setUserDestinationPrefix("/user");
    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.setMessageSizeLimit(128 * 1024);
        registration.setSendTimeLimit(15 * 1000);
        registration.setSendBufferSizeLimit(512 * 1024);
    }


}
