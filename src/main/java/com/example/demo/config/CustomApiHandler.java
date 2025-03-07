package com.example.demo.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.common.api.handler.ApiHandlerDefault;
import com.example.demo.common.api.handler.ApiHandlerFactory;
import com.example.demo.common.data.model.DataModel;
import com.example.demo.common.data.wrapper.DataWrapper;

public class CustomApiHandler extends ApiHandlerDefault {
    public static void register() {
        ApiHandlerFactory.setCustomHandler(new CustomApiHandler());
    }
    @Autowired
    private static LogHandler logHandler = new LogHandler();

    @Override
    public DataModel beforeHandleRequest(DataWrapper dw, HttpServletRequest req) {
        String httpMethod = req.getMethod();
        // if ("PUT".equals(httpMethod) || "PATCH".equals(httpMethod) || "DELETE".equals(httpMethod)) {
        //     throw new SecurityException("PUT, PATCH, and DELETE requests are not allowed for security reasons.");
        // }
        return null;
    }

    @Override
    public void handleLog(DataWrapper dw, HttpServletRequest req) {
        logHandler.handleLogging(dw, req);
    }
}
