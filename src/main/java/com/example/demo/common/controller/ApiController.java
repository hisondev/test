package com.example.demo.common.controller;

import com.example.demo.common.data.DataModel;
import com.example.demo.common.data.DataWrapper;
import com.example.demo.config.LogHandler;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

public class ApiController extends ApiControllerBase {
    @Autowired
    private LogHandler logHandler;

    @Override
    protected DataModel beforeHandleRequest(DataWrapper dw, HttpServletRequest req) {
        System.out.println("### This is a MainController 1 ###");
        HashMap<String, Object> hm = new HashMap<String, Object>();
        hm.put("PASS", "Y");
        
        // String authorities = (String) session.getAttribute(sessionConfig.getAuthoritiesKey());
        // hm.put("authorities", authorities);

        DataModel dm = new DataModel(hm);
        return dm;
    }

    @Override
    protected DataModel HandleAuthority(DataWrapper dw, HttpServletRequest req) {
        System.out.println("### This is a MainController 2 ###");
        HashMap<String, Object> hm = new HashMap<String, Object>();
        hm.put("PASS", "Y");
        DataModel dm = new DataModel(hm);
        return dm;
    }

    @Override
    protected void handleLog(DataWrapper dw, HttpServletRequest req) {
        logHandler.handleLogging(dw, req);
    }

    @Override
    protected DataWrapper handleError(Exception e) {
        System.out.println("### This is a MainController 3 ###");

        e.printStackTrace();

        DataWrapper result = new DataWrapper();
        result.put("errorMessage", e.getMessage());
        result.put("errorCause", e.getCause().toString());
        result.put("errorType", e.getClass().getName());
        return result;
    }
}