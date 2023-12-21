package com.example.demo.common.api.caching;

import org.springframework.web.socket.WebSocketSession;
import java.util.concurrent.CopyOnWriteArrayList;

public class CachingWebSocketSessionManager {

    //하나의 Web Socket Session 활용하기 위해 싱글톤 패턴 사용
    private static CachingWebSocketSessionManager instance;
    private final CopyOnWriteArrayList<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    //handler주입
    private final CachingHandler handler;
    private CachingWebSocketSessionManager() {
        this.handler = CachingHandlerFactory.getHandler();
    }

    public static synchronized CachingWebSocketSessionManager getInstance() {
        if (instance == null) {
            instance = new CachingWebSocketSessionManager();
        }
        return instance;
    }

    public void addSession(WebSocketSession session) {
        handler.addSession(sessions, session);
    }
    
    public void removeSession(WebSocketSession session) {
        handler.removeSession(sessions, session);
    }

    public void notifyAllSessions(String message) {
        handler.notifyAllSessions(sessions, message);
    }

    public String getEndPoint() {
        return handler.getEndPoint();
    }
}
