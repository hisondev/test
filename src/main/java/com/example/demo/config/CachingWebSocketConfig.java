package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

import com.example.demo.common.api.caching.WebSocketConfig;

@Configuration
@EnableWebSocket
public class CachingWebSocketConfig extends WebSocketConfig{}
