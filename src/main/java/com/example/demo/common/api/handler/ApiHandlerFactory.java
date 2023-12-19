package com.example.demo.common.api.handler;

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
