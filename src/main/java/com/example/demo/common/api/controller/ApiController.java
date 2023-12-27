package com.example.demo.common.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.biz.member.service.MemberService;
import com.example.demo.common.api.exception.ApiException;
import com.example.demo.common.api.handler.ApiHandler;
import com.example.demo.common.api.handler.ApiHandlerFactory;
import com.example.demo.common.data.model.DataModel;
import com.example.demo.common.data.wrapper.DataWrapper;

import java.lang.invoke.MethodHandle;

import javax.servlet.http.HttpServletRequest;

/**
 * <h1>ApiController</h1>
 * The ApiController class is designed to facilitate client-server communication without the need for separate controller
 * and DTO classes. This class serves as a central point for handling all types of HTTP requests, providing a convenient 
 * way to define the business logic for each API endpoint.
 * 
 * @author Hani son
 * @version 1.0.2
 */
@RestController
@RequestMapping("/api")
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
            return handler.handleException(e, dw, req);
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
            throw new ApiException("There is no cmd");
        }
        String _cmd = (String) dw.getString("cmd");

        result = callService(_cmd, dw);
        return result;
    }

    private DataWrapper callService(String cmd, DataWrapper dw) throws Throwable{
        String[] cmdParts = cmd.split("\\.");
        if (cmdParts.length != 2) {
            throw new ApiException("Invalid cmd format");
        }
        String serviceName = cmdParts[0];
        String methodName = cmdParts[1];
        Object service = applicationContext.getBean(decapitalizeFirstLetter(serviceName));
        if (service == null) {
            throw new ApiException("Service not found: " + serviceName);
        }
        if (!(service instanceof MemberService)) {
            throw new ApiException("Service is not an instance of MemberService");
        }
        MemberService typedService = (MemberService) service;
        MethodHandle targetMethodHandle = MethodHandleUtil.getMethodHandle(
            typedService.getClass(), methodName, DataWrapper.class, DataWrapper.class);
        return (DataWrapper) targetMethodHandle.invokeExact(typedService, dw);
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
