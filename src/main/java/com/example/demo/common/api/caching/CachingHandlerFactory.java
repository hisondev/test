package com.example.demo.common.api.caching;

public class CachingHandlerFactory {

    private static CachingHandler cachingHandler;
    
    public static CachingHandler getHandler() {
        if (cachingHandler != null) {
            return cachingHandler;
        }
        return new CachingHandlerDefault();
    }

    public static void setCustomHandler(CachingHandler handler) {
        cachingHandler = handler;
    }
}
