package com.example.demo.common.api.handler;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;

import com.example.demo.common.api.exception.ApiException;
import com.example.demo.common.api.exception.ServiceRuntimeException;
import com.example.demo.common.data.model.DataModel;
import com.example.demo.common.data.wrapper.DataWrapper;

public interface ApiHandler {
    DataModel beforeHandleRequest(DataWrapper dw, HttpServletRequest req);

    DataModel handleAuthority(DataWrapper dw, HttpServletRequest req);

    void handleLog(DataWrapper dw, HttpServletRequest req);

    ResponseEntity<DataWrapper> handleApiException(ApiException e, DataWrapper dw, HttpServletRequest req);

    ResponseEntity<DataWrapper> handleServiceRuntimeException(ServiceRuntimeException e, DataWrapper dw, HttpServletRequest req);

    ResponseEntity<DataWrapper> handleException(Exception e, DataWrapper dw, HttpServletRequest req);

    ResponseEntity<DataWrapper> handleThrowable(Throwable t, DataWrapper dw, HttpServletRequest req) ;

    void afterHandleRequest(DataWrapper requestDw, DataWrapper responesDw, HttpServletRequest req);
}
