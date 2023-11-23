package com.example.demo.common.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.example.demo.common.data.model.DataModel;
import com.example.demo.common.data.wrapper.DataWrapper;

public class ApiHandlerDefault implements ApiHandler{
    @Override
    public DataModel beforeHandleRequest(DataWrapper dw, HttpServletRequest req) {
        HashMap<String, Object> hm = new HashMap<String, Object>();
        hm.put("PASS", "Y");
        DataModel dm = new DataModel(hm);
        return dm;
    }

    @Override
    public DataModel handleAuthority(DataWrapper dw, HttpServletRequest req) {
        HashMap<String, Object> hm = new HashMap<String, Object>();
        hm.put("PASS", "Y");
        DataModel dm = new DataModel(hm);
        return dm;
    }

    @Override
    public void handleLog(DataWrapper dw, HttpServletRequest req) {}

    @Override
    public DataWrapper handleError(Exception e, DataWrapper dw, HttpServletRequest req) {
        e.printStackTrace();
        DataWrapper result = new DataWrapper();
        result.put("errorMessage", e.getMessage());
        return result;
    }
}
