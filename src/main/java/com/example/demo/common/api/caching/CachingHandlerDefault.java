package com.example.demo.common.api.caching;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class CachingHandlerDefault implements CachingHandler{
    @Override
    public void addSession(CopyOnWriteArrayList<WebSocketSession> sessions, WebSocketSession session) {
        sessions.add(session);
    }
    
    @Override
    public void removeSession(CopyOnWriteArrayList<WebSocketSession> sessions, WebSocketSession session) {
        sessions.remove(session);
    }

    @Override
    public void notifyAllSessions(CopyOnWriteArrayList<WebSocketSession> sessions, String message) {
        for (WebSocketSession session : sessions) {
            try {
                if (session.isOpen()) {
                    session.sendMessage(new TextMessage(message));
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public String getEndPoint() {
        return "hison-caching-websocket-endpoint";
    }
}
