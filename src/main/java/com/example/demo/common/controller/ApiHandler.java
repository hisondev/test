package com.example.demo.common.controller;

import javax.servlet.http.HttpServletRequest;

import com.example.demo.common.data.model.DataModel;
import com.example.demo.common.data.wrapper.DataWrapper;

public interface ApiHandler {
    DataModel beforeHandleRequest(DataWrapper dw, HttpServletRequest req);

    DataModel handleAuthority(DataWrapper dw, HttpServletRequest req);

    void handleLog(DataWrapper dw, HttpServletRequest req);

    DataWrapper handleError(Exception e, DataWrapper dw, HttpServletRequest req) ;
}
