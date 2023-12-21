package com.example.demo.common.api.caching;

import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;
import org.springframework.web.socket.CloseStatus;

public class CachingWebSocketHandler extends AbstractWebSocketHandler {

    private final CachingWebSocketSessionManager sessionManager;

    public CachingWebSocketHandler(CachingWebSocketSessionManager sessionManager) {
        this.sessionManager = sessionManager;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessionManager.addSession(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessionManager.removeSession(session);
    }
}
