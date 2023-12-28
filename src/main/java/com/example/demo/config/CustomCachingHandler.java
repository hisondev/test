package com.example.demo.config;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.example.demo.common.api.caching.CachingHandler;
import com.example.demo.common.api.caching.CachingHandlerFactory;

public class CustomCachingHandler implements CachingHandler{
    public static void register() {
        CachingHandlerFactory.setCustomHandler(new CustomCachingHandler());
    }

    @Override
    public void addSession(CopyOnWriteArrayList<WebSocketSession> sessions, WebSocketSession session) {
        System.out.println("######## Session added: " + session.getId());
        sessions.add(session);
    }
    
    @Override
    public void removeSession(CopyOnWriteArrayList<WebSocketSession> sessions, WebSocketSession session) {
        System.out.println("######## Session removed: " + session.getId());
        sessions.remove(session);
    }

    @Override
    public void notifyAllSessions(CopyOnWriteArrayList<WebSocketSession> sessions, String message) {
        System.out.println("######## Total sessions: " + sessions.size());
        for (WebSocketSession session : sessions) {
            try {
                if (session.isOpen()) {
                    System.out.println("######## message : " + message);
                    session.sendMessage(new TextMessage(message));
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public String getEndPoint() {
        return "caching-websocket-endpoint";
    }
}
