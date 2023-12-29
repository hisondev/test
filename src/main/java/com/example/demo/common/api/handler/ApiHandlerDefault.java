package com.example.demo.common.api.handler;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.demo.common.api.exception.ApiException;
import com.example.demo.common.api.exception.ServiceRuntimeException;
import com.example.demo.common.data.model.DataModel;
import com.example.demo.common.data.wrapper.DataWrapper;

/**
 * <h1>ApiHandlerDefault</h1>
 * The ApiHandlerDefault class provides default implementations for the ApiHandler interface. It serves as a base 
 * class that can be extended by users who wish to customize the behavior of various stages of API request handling.
 * 
 * <p>Each method in this class can be overridden to provide specific functionalities as per the requirements of the 
 * API. The default implementations provided here are basic and intended to be a starting point for further customization.</p>
 * @see ApiHandler
 * 
 * @author Hani son
 * @version 1.0.2
 */
public class ApiHandlerDefault implements ApiHandler{

    /**
     * Provides default pre-processing logic before handling an API request.
     * 
     * @param dw The DataWrapper containing the request data.
     * @param req The HttpServletRequest object.
     * @return A DataModel object, typically used to pass data to further processing stages.
     */
    @Override
    public DataModel beforeHandleRequest(DataWrapper dw, HttpServletRequest req) {return null;}

    /**
     * Default implementation for handling authorization.
     * This method can be overridden to include custom authorization logic.
     * 
     * @param dw The DataWrapper containing the request data.
     * @param req The HttpServletRequest object.
     * @return A DataModel object indicating the authorization status.
     */
    @Override
    public DataModel handleAuthority(DataWrapper dw, HttpServletRequest req) {return null;}

    /**
     * Default implementation for handling logging.
     * This method can be overridden to provide detailed logging for API requests.
     * 
     * @param dw The DataWrapper containing the request data.
     * @param req The HttpServletRequest object.
     */
    @Override
    public void handleLog(DataWrapper dw, HttpServletRequest req) {}

    @Override
    public ResponseEntity<DataWrapper> handleApiException(ApiException e, DataWrapper dw, HttpServletRequest req) {
        DataWrapper dataWrapper = new DataWrapper();
        dataWrapper.putString("status", "error");
        dataWrapper.putString("code", e.getCode());
        dataWrapper.putString("message", "An undefined error occurred. Contact your system administrator.");
        
        e.printStackTrace();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(dataWrapper);
    }

    @Override
    public ResponseEntity<DataWrapper> handleServiceRuntimeException(ServiceRuntimeException e, DataWrapper dw, HttpServletRequest req) {
        DataWrapper dataWrapper = new DataWrapper();
        dataWrapper.putString("status", "error");
        dataWrapper.putString("code", e.getCode());
        dataWrapper.putString("message", e.getMessage());
        
        e.printStackTrace();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(dataWrapper);
    }

    /**
     * Handles exceptions thrown during API request processing.
     * This method provides a default error response for exceptions.
     * 
     * @param e The exception that occurred.
     * @param dw The DataWrapper containing the request data.
     * @param req The HttpServletRequest object.
     * @return A DataWrapper containing the error response.
     */
    @Override
    public ResponseEntity<DataWrapper> handleException(Exception e, DataWrapper dw, HttpServletRequest req) {
        DataWrapper dataWrapper = new DataWrapper();
        dataWrapper.putString("status", "error");
        dataWrapper.putString("code", e.getClass().toString());
        dataWrapper.putString("message", "An undefined error occurred. Contact your system administrator.");
        
        e.printStackTrace();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(dataWrapper);
    }

    /**
     * Handles errors and issues that are not covered by standard exceptions.
     * This method provides a default error response for such scenarios.
     * 
     * @param t The Throwable object representing the error.
     * @param dw The DataWrapper containing the request data.
     * @param req The HttpServletRequest object.
     * @return A DataWrapper containing the error response.
     */
    @Override
    public ResponseEntity<DataWrapper> handleThrowable(Throwable t, DataWrapper dw, HttpServletRequest req) {
        DataWrapper dataWrapper = new DataWrapper();
        dataWrapper.putString("status", "error");
        dataWrapper.putString("code", t.getClass().toString());
        dataWrapper.putString("message", "An undefined error occurred. Contact your system administrator.");
        
        t.printStackTrace();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(dataWrapper);
    }

    /**
     * Provides a hook for post-processing logic after the API request has been handled.
     * This method can be used for tasks like cleaning up resources or additional logging.
     * 
     * @param requestDw The DataWrapper containing the original request data.
     * @param responseDw The DataWrapper containing the response data.
     * @param req The HttpServletRequest object.
     */
    @Override
    public void afterHandleRequest(DataWrapper requestDw, DataWrapper responesDw, HttpServletRequest req) {};
}
