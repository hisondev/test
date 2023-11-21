package com.example.demo.common.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.example.demo.common.data.DataModel;
import com.example.demo.common.data.DataWrapper;

public class ApiControlHandlerDefault extends ApiControlHandler{
    @Override
    protected DataModel beforeHandleRequest(DataWrapper dw, HttpServletRequest req) {
        HashMap<String, Object> hm = new HashMap<String, Object>();
        hm.put("PASS", "Y");
        DataModel dm = new DataModel(hm);
        return dm;
    }

    @Override
    protected DataModel HandleAuthority(DataWrapper dw, HttpServletRequest req) {
        HashMap<String, Object> hm = new HashMap<String, Object>();
        hm.put("PASS", "Y");
        DataModel dm = new DataModel(hm);
        return dm;
    }

    @Override
    protected void handleLog(DataWrapper dw, HttpServletRequest req) {}

    @Override
    protected DataWrapper handleError(Exception e, DataWrapper dw, HttpServletRequest req) {
        e.printStackTrace();
        DataWrapper result = new DataWrapper();
        result.put("errorMessage", e.getMessage());
        return result;
    }
}
