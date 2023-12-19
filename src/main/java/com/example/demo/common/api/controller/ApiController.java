package com.example.demo.common.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
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
 * <p>ApiController relies on the ApiHandler interface for customizing request handling. Users can create their own 
 * implementations of ApiHandler to define custom pre-processing, post-processing, authorization checks, logging, and 
 * error handling strategies. This is achieved by extending the default handler (ApiHandlerDefault) and registering 
 * the custom handler using the ApiHandlerFactory. Custom handlers can be registered at application startup, allowing for 
 * tailored request handling strategies that fit specific application requirements.</p>
 * 
 * <p>Usage example:</p>
 * <pre>
 * {@code
 *  public class CustomApiHandler extends ApiHandlerDefault {
 *      public static void register() {
 *          ApiHandlerFactory.setCustomHandler(new CustomApiHandler());
 *      }
 *      // Custom implementation
 *  }
 *
 *  public class Application {
 *      public static void main(String[] args) {
 *          CustomApiHandler.register(); // Registering the custom handler
 *      }
 *  }
 * }
 * </pre>
 * 
 * <p>ApiController requires the 'io.github.hison.data-model' artifact for data modeling and handling. It also depends 
 * on Spring's context framework (spring-context), beans definition framework (spring-beans), and the Servlet API 
 * (javax.servlet-api) for handling HTTP requests and responses.</p>
 * 
 * <p>Dependencies:</p>
 * <ul>
 *   <li>'io.github.hison.data-model': for data modeling and manipulation.</li>
 *   <li>'org.springframework:spring-context': for application context management.</li>
 *   <li>'org.springframework:spring-beans': for beans management and dependency injection.</li>
 *   <li>'javax.servlet:javax.servlet-api': for handling HTTP requests and responses.</li>
 * </ul>
 * 
 * <p>This class automatically handles different HTTP methods (GET, POST, PUT, PATCH, DELETE) and delegates the 
 * request processing to the appropriate service method based on the 'cmd' parameter in the request. This approach
 * abstracts the boilerplate code associated with typical request handling and offers a streamlined, configurable
 * method for handling various API requests.</p>
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
    public DataWrapper handlePost(@RequestBody DataWrapper dw, HttpServletRequest req) {
        return respones(dw, req);
    }

    @PutMapping
    public DataWrapper handlePut(@RequestBody DataWrapper dw, HttpServletRequest req) {
        return respones(dw, req);
    }

    @PatchMapping
    public DataWrapper handlePatch(@RequestBody DataWrapper dw, HttpServletRequest req) {
        return respones(dw, req);
    }

    @DeleteMapping
    public DataWrapper handleDelete(@RequestBody DataWrapper dw, HttpServletRequest req) {
        return respones(dw, req);
    }

    private DataWrapper respones(@RequestBody DataWrapper dw, HttpServletRequest req) {
        DataWrapper result = new DataWrapper();
        DataModel resultBeforeHandleRequest = handler.beforeHandleRequest(dw, req);
        if(resultBeforeHandleRequest != null
            && resultBeforeHandleRequest.hasColumn("PASS")
            && !("Y".equals(resultBeforeHandleRequest.getValue(0, "PASS")))) {
            result.putDataModel("result", resultBeforeHandleRequest);
            return result;
        }
        dw.putDataModel("resultBeforeHandleRequest", resultBeforeHandleRequest);
        result = handleRequest(dw, req);
        handler.afterHandleRequest(dw, result, req);
        return result;
    }

    private DataWrapper handleRequest(DataWrapper dw, HttpServletRequest req) {
        try {
            DataWrapper result = new DataWrapper();
            DataModel resultCheckAuthority = handler.handleAuthority(dw, req);
            if(resultCheckAuthority != null
                && resultCheckAuthority.hasColumn("PASS")
                && !("Y".equals(resultCheckAuthority.getValue(0, "PASS")))) {
                result.putDataModel("result", resultCheckAuthority);
                return result;
            }
            dw.putDataModel("resultCheckAuthority", resultCheckAuthority);
            handler.handleLog(dw, req);
            if(!dw.containsKey("cmd")) {
                throw new ApiException("There is no cmd");
            }
            String _cmd = (String) dw.getString("cmd");

            result = callService(_cmd, dw);
            return result;
        } catch (ApiException e) {
            return handler.handleException(e, dw, req);
        } catch (Exception e) {
            return handler.handleException(e, dw, req);
        } catch (Throwable t) {
            return handler.handleThrowable(t, dw, req);
        }
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
