package com.example.demo.common.api.caching;

import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class CachingWebSocketHandler extends TextWebSocketHandler {

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        // 클라이언트로부터 메시지를 받을 때의 처리
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        // 웹소켓 연결이 맺어졌을 때의 처리
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        // 웹소켓 연결이 끊어졌을 때의 처리
    }
}
