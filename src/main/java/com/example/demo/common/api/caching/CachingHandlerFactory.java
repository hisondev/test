package com.example.demo.common.api.caching;

/** 
 * @author Hani son
 * @version 1.0.0
 */
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
