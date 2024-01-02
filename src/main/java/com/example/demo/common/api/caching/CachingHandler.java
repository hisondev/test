package com.example.demo.common.api.caching;

import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.web.socket.WebSocketSession;

/** 
 * @author Hani son
 * @version 1.0.0
 */
public interface CachingHandler {
    public void addSession(CopyOnWriteArrayList<WebSocketSession> sessions, WebSocketSession session);
    
    public void removeSession(CopyOnWriteArrayList<WebSocketSession> sessions, WebSocketSession session);

    public void notifyAllSessions(CopyOnWriteArrayList<WebSocketSession> sessions, String message);

    public String getEndPoint();
}
