package com.example.demo.common.controller;

public class ApiHandlerFactory {

    private static ApiHandler customHandler;
    
    public static ApiHandler getHandler() {
        if (customHandler != null) {
            return customHandler;
        }
        return new ApiHandlerDefault();
    }

    public static void setCustomHandler(ApiHandler handler) {
        customHandler = handler;
    }
}
