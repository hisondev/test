package com.example.demo.common.api.controller;

import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.common.api.exception.ApiException;
import com.example.demo.common.api.exception.ServiceRuntimeException;
import com.example.demo.common.api.handler.ApiHandler;
import com.example.demo.common.api.handler.ApiHandlerFactory;
import com.example.demo.common.data.model.DataModel;
import com.example.demo.common.data.wrapper.DataWrapper;

import java.lang.invoke.MethodHandle;

import javax.servlet.http.HttpServletRequest;

/**
 * 
 * ApiController is a controller class that handles HTTP POST, PUT, PATCH, and DELETE methods.
 * This controller facilitates the development process by allowing business logic to be called using the 'cmd' parameter, eliminating the need for creating separate controllers.
 * 
 * <p>Key Features:</p>
 * <ul>
 * <li>Customizable ApiController behavior through ApiHandler.</li>
 * <li>Convenient exception handling using ApiException and ServiceRuntimeException.</li>
 * <li>Developer customization of WebSocket connections and caching functionalities through CachingWebSocketHandler and CachingHandler.</li>
 * </ul>
 * <p>Usage Example:</p>
 * <pre>
 *    ApiController controller = new ApiController();
 *    ResponseEntity<DataWrapper> response = controller.handlePost(dataWrapper, request);
 * </pre>
 * 
 * @author Hani son
 * @version 1.0.0
 */

@RestController
@RequestMapping("/hison-api-link")
public final class ApiController {
    @Autowired
    private ApplicationContext applicationContext;

    private final ApiHandler handler;

    public ApiController() {
        this.handler = ApiHandlerFactory.getHandler();
    }

    @PostMapping
    public ResponseEntity<DataWrapper> handlePost(@RequestBody DataWrapper dw, HttpServletRequest req) {
        return respones(dw, req);
    }

    @PutMapping
    public ResponseEntity<DataWrapper> handlePut(@RequestBody DataWrapper dw, HttpServletRequest req) {
        return respones(dw, req);
    }

    @PatchMapping
    public ResponseEntity<DataWrapper> handlePatch(@RequestBody DataWrapper dw, HttpServletRequest req) {
        return respones(dw, req);
    }

    @DeleteMapping
    public ResponseEntity<DataWrapper> handleDelete(@RequestBody DataWrapper dw, HttpServletRequest req) {
        return respones(dw, req);
    }

    private ResponseEntity<DataWrapper> respones(@RequestBody DataWrapper dw, HttpServletRequest req) {
        try {
            DataWrapper dataWrapper = new DataWrapper();
            dw.putDataModel("resultBeforeHandleRequest", handler.beforeHandleRequest(dw, req));
            dataWrapper = handleRequest(dw, req);
            handler.afterHandleRequest(dw, dataWrapper, req);
            return ResponseEntity.ok().body(dataWrapper);

        } catch (ApiException e) {
            return handler.handleApiException(e, dw, req);
        } catch (ServiceRuntimeException e) {
            return handler.handleServiceRuntimeException(e, dw, req);
        } catch (Exception e) {
            return handler.handleException(e, dw, req);
        } catch (Throwable t) {
            return handler.handleThrowable(t, dw, req);
        }
    }

    private DataWrapper handleRequest(DataWrapper dw, HttpServletRequest req) throws Throwable{
        DataWrapper result = new DataWrapper();
        DataModel resultCheckAuthority = handler.handleAuthority(dw, req);
        dw.putDataModel("resultCheckAuthority", resultCheckAuthority);
        handler.handleLog(dw, req);
        if(!dw.containsKey("cmd")) {
            throw new ApiException("There is no cmd", "APIERROR0001");
        }
        String _cmd = (String) dw.getString("cmd");

        result = callService(_cmd, dw);
        return result;
    }
    
    private DataWrapper callService(String cmd, DataWrapper dw) throws Throwable {
        String[] cmdParts = cmd.split("\\.");
        if (cmdParts.length != 2) {
            throw new ApiException("Invalid cmd format", "APIERROR0002");
        }
        String serviceName = cmdParts[0];
        String methodName = cmdParts[1];
        Object service = null;

        try {
            service = applicationContext.getBean(decapitalizeFirstLetter(serviceName));
        } catch (NoSuchBeanDefinitionException e) {
            throw new ApiException("no bean named: " + serviceName, "APIERROR0003");
        }

        if (service == null) {
            throw new ApiException("Service not found: " + serviceName, "APIERROR0004");
        }
        
        try {
            MethodHandle targetMethodHandle = MethodHandleUtil.getFlexibleMethodHandle(
                service.getClass(), methodName, service);
            if (targetMethodHandle.type().parameterCount() == 1) {
                if (targetMethodHandle.type().returnType() == void.class) {
                    targetMethodHandle.invokeExact(dw);
                    return null;
                } else {
                    return (DataWrapper) targetMethodHandle.invokeExact(dw);
                }
            } else if (targetMethodHandle.type().parameterCount() == 0) {
                if (targetMethodHandle.type().returnType() == void.class) {
                    targetMethodHandle.invokeExact();
                    return null;
                } else {
                    return (DataWrapper) targetMethodHandle.invokeExact();
                }
            } else {
                throw new ApiException("Method not found: " + methodName, "APIERROR0006");
            }
        }catch (NoSuchMethodException e) {
            throw new ApiException("no such method: " + methodName, "APIERROR0007");
        } catch (IllegalAccessException e) {
            throw new ApiException("This is illegal access: " + cmd, "APIERROR0008");
        }
    }

    private static String decapitalizeFirstLetter(String str) {
        if (str == null || str.isEmpty()) {
            return str;
        }
        char[] chars = str.toCharArray();
        chars[0] = Character.toLowerCase(chars[0]);
        return new String(chars);
    }
}
