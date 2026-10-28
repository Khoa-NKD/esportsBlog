package com.example.esportsBLOG.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Topic prefix for outbound push events to clients (e.g. /topic/matches/live, /topic/predictions)
        config.enableSimpleBroker("/topic");
        // Application prefix for messages sent from client to server (e.g. /app/match/vote)
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Handshake endpoint for STOMP clients
        registry.addEndpoint("/ws-esports")
                .setAllowedOriginPatterns("*")
                .withSockJS();

        registry.addEndpoint("/ws-esports")
                .setAllowedOriginPatterns("*");
    }
}
