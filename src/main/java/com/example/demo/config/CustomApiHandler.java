package com.example.demo.config;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.common.controller.ApiHandlerDefault;
import com.example.demo.common.data.model.DataModel;
import com.example.demo.common.data.wrapper.DataWrapper;

public class CustomApiHandler extends ApiHandlerDefault{
    @Autowired
    private static LogHandler logHandler = new LogHandler();

    @Override
    public DataModel beforeHandleRequest(DataWrapper dw, HttpServletRequest req) {
        System.out.println("### This is a CustomApiControlHandler beforeHandleRequest ###");
        HashMap<String, Object> hm = new HashMap<String, Object>();
        hm.put("PASS", "Y");
        
        // String authorities = (String) session.getAttribute(sessionConfig.getAuthoritiesKey());
        // hm.put("authorities", authorities);

        DataModel dm = new DataModel(hm);
        return dm;
    }

    @Override
    public DataModel handleAuthority(DataWrapper dw, HttpServletRequest req) {
        System.out.println("### This is a CustomApiControlHandler handleAuthority ###");
        HashMap<String, Object> hm = new HashMap<String, Object>();
        hm.put("PASS", "Y");
        DataModel dm = new DataModel(hm);
        return dm;
    }

    @Override
    public void handleLog(DataWrapper dw, HttpServletRequest req) {
        System.out.println("### This is a CustomApiControlHandler handleLog ###");
        logHandler.handleLogging(dw, req);
    }

    @Override
    public DataWrapper handleError(Exception e, DataWrapper dw, HttpServletRequest req) {
        System.out.println("### This is a CustomApiControlHandler handleError ###");
        e.printStackTrace();

        DataWrapper result = new DataWrapper();
        result.put("errorMessage", e.getMessage());
        result.put("errorCause", e.getCause().toString());
        result.put("errorType", e.getClass().getName());
        return result;
    }
}
