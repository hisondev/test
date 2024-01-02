package com.example.demo.common.api.handler;

/** 
 * @author Hani son
 * @version 1.0.0
 */
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
