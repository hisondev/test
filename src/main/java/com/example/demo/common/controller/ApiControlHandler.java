package com.example.demo.common.controller;

import javax.servlet.http.HttpServletRequest;

import com.example.demo.common.data.DataModel;
import com.example.demo.common.data.DataWrapper;

public abstract class ApiControlHandler {
    protected abstract DataModel beforeHandleRequest(DataWrapper dw, HttpServletRequest req);

    protected abstract DataModel HandleAuthority(DataWrapper dw, HttpServletRequest req);

    protected abstract void handleLog(DataWrapper dw, HttpServletRequest req);

    protected abstract DataWrapper handleError(Exception e, DataWrapper dw, HttpServletRequest req) ;
}
