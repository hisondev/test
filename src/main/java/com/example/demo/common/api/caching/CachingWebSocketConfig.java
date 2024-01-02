package com.example.demo.common.api.caching;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;

/** 
 * @author Hani son
 * @version 1.0.0
 */
@Configuration
@EnableWebSocket
public class CachingWebSocketConfig implements WebSocketConfigurer {
    private final CachingWebSocketSessionManager sessionManager = CachingWebSocketSessionManager.getInstance();

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new CachingWebSocketHandler(sessionManager), sessionManager.getEndPoint());
    }
}
