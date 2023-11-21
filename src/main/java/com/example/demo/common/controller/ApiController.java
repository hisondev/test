package com.example.demo.common.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.*;

import com.example.demo.common.data.DataModel;
import com.example.demo.common.data.DataWrapper;

import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

/*
MainControllerBase 클래스의 설계를 고려할 때, 다음과 같은 몇 가지 개선점을 고려해볼 수 있습니다:

에러 처리의 강화: handleError 메소드는 예외를 처리하고 관련 정보를 반환하지만, 예외 유형에 따라 다른 처리 방식을 적용할 수 있도록 개선할 수 있습니다. 예를 들어, 다양한 예외 유형에 대해 특정 HTTP 상태 코드를 반환하거나, 사용자에게 더 유용한 오류 메시지를 제공할 수 있습니다.

보안 강화: HandleAuthority 메소드는 인증 및 권한 검증을 수행하지만, 실제 보안 메커니즘에 대한 구체적인 구현이 포함되어 있지 않습니다. Spring Security와 같은 보안 프레임워크를 통합하여 보안을 강화할 수 있습니다.

로깅 기능 향상: handleLog 메소드는 로깅을 담당하지만, 현재 로깅 수준이나 포맷에 대한 설정이 명시적으로 포함되어 있지 않습니다. 로깅 프레임워크(예: Logback, SLF4J)와 통합하고, 로그 수준 및 형식을 구성 파일을 통해 관리할 수 있도록 개선할 수 있습니다.

리플렉션 사용의 최적화: callService 메소드에서 리플렉션을 사용하는 부분은 유연성을 제공하지만, 성능상의 비용이 발생할 수 있습니다. 캐싱 메커니즘을 도입하여 메소드 조회의 성능을 향상시킬 수 있습니다.

입력 유효성 검증: 현재 입력 데이터에 대한 유효성 검증 로직이 명확하지 않습니다. 요청 데이터에 대한 유효성 검증을 강화하여, 잘못된 입력을 조기에 걸러내는 것이 중요합니다.

API 문서화 및 버전 관리: Swagger나 OpenAPI와 같은 도구를 사용하여 API 문서화를 자동화할 수 있습니다. 또한, API 버전 관리 전략을 수립하여 호환성 및 유지 관리를 개선할 수 있습니다.

단위 테스트 및 통합 테스트: 현재 코드에는 테스트 코드가 포함되어 있지 않습니다. JUnit, Mockito 등을 사용하여 컨트롤러의 동작을 검증하는 단위 테스트 및 통합 테스트를 추가하는 것이 좋습니다.

코드 주석 및 문서화: 코드 내에 자세한 주석을 추가하고, 메소드 및 클래스의 목적을 명확히 하는 것이 좋습니다. 이는 유지 관리를 용이하게 하고, 다른 개발자가 코드를 이해하는 데 도움이 됩니다.

이러한 개선 사항들은 MainControllerBase의 유연성, 보안, 성능 및 유지 관리성을 높이는 데 도움이 될 것입니다.

 */

@RestController
@RequestMapping("/api")
public class ApiController {
    @Autowired
    private ApplicationContext applicationContext;

    private static ApiControlHandler handler = loadHandler();
    private static ApiControlHandler loadHandler() {
        Properties properties = new Properties();
        try (InputStream input = DataModel.class.getClassLoader().getResourceAsStream("application.properties")) {
            properties.load(input);
            String handlerClassName = properties.getProperty("apiController.customHandler.class", "com.example.demo.common.controller.ApiControlHandlerDefault");
            return (ApiControlHandler) Class.forName(handlerClassName).getDeclaredConstructor().newInstance();
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiControlHandlerDefault(); // 기본 컨버터 반환
        }
    }

    @GetMapping
    public DataWrapper handleGet(@RequestBody DataWrapper dw, HttpServletRequest req) {
        DataWrapper result = handleRequest(dw, req);
        return result;
    }

    @PostMapping
    public DataWrapper handlePost(@RequestBody DataWrapper dw, HttpServletRequest req) {
        DataWrapper result = handleRequest(dw, req);
        return result;
    }

    @PutMapping
    public DataWrapper handlePut(@RequestBody DataWrapper dw, HttpServletRequest req) {
        DataWrapper result = handleRequest(dw, req);
        return result;
    }

    @PatchMapping
    public DataWrapper handlePatch(@RequestBody DataWrapper dw, HttpServletRequest req) {
        DataWrapper result = handleRequest(dw, req);
        return result;
    }

    @DeleteMapping
    public DataWrapper handleDelete(@RequestBody DataWrapper dw, HttpServletRequest req) {
        DataWrapper result = handleRequest(dw, req);
        return result;
    }

    private DataWrapper handleRequest(DataWrapper dw, HttpServletRequest req) {
        System.out.println("################# handleRequest #################");
        System.out.println("### dw :" + dw.toString());
        System.out.println("### req :" + req);
        DataWrapper rtn = new DataWrapper();
        // 1. beforeHandleRequest
        DataModel resultBeforeHandleRequest = beforeHandleRequest(dw, req);
        if(resultBeforeHandleRequest != null
            && resultBeforeHandleRequest.hasColumn("PASS")
            && !("Y".equals(resultBeforeHandleRequest.getValue(0, "PASS")))) {
            rtn.putDataModel("result", resultBeforeHandleRequest);
            return rtn;
        }
        dw.putDataModel("resultBeforeHandleRequest", resultBeforeHandleRequest);
        //beforeHandleRequest의 정보를 dataModel로 하단 로직에 전송?

        // 2. 인증 및 권한 체크 로직
        DataModel resultCheckAuthority = HandleAuthority(dw, req);
        if(resultCheckAuthority != null
            && resultCheckAuthority.hasColumn("PASS")
            && !("Y".equals(resultCheckAuthority.getValue(0, "PASS")))) {
            rtn.putDataModel("result", resultCheckAuthority);
            return rtn;
        }
        dw.putDataModel("resultCheckAuthority", resultCheckAuthority);

        // 3. log
        handleLog(dw, req);

        // 4. "cmd"로 넘어온 Service 이름 추출
        String _cmd = (String) dw.getString("cmd");
        
        try {
            // 5. _cmd에 저장된 서비스 메소드 호출
            rtn = callService(_cmd, dw);
            // 6. 결과를 응답으로 반환
            return rtn;

        } catch (Exception e) {
            return handleError(e, dw, req);
        }
    }

    protected DataModel beforeHandleRequest(DataWrapper dw, HttpServletRequest req) {
        return handler.beforeHandleRequest(dw, req);
    }

    protected DataModel HandleAuthority(DataWrapper dw, HttpServletRequest req) {
        return handler.HandleAuthority(dw, req);
    }

    protected void handleLog(DataWrapper dw, HttpServletRequest req) {
        handler.handleLog(dw, req);
    }

    protected DataWrapper handleError(Exception e, DataWrapper dw, HttpServletRequest req) {
        return handler.handleError(e, dw, req);
    }

    private DataWrapper callService(String cmd, DataWrapper dw) throws Exception {
        // String cmd = dw.getString("cmd");
        cmd = dw.getString("cmd");
        if (cmd == null) {
            throw new Exception("cmd is null. cmd was not passed.");
        }

        String[] cmdParts = cmd.split("\\.");
        if (cmdParts.length != 2) {
            throw new Exception("Invalid cmd format");
        }

        String serviceName = cmdParts[0];
        String methodName = cmdParts[1];

        Object service = applicationContext.getBean(decapitalizeFirstLetter(serviceName));
        if (service == null) {
            throw new Exception("Service not found: " + serviceName);
        }

        Method targetMethod = null;
        for (Method method : service.getClass().getMethods()) {
            if (method.getName().equals(methodName)) {
                targetMethod = method;
                break;
            }
        }

        if (targetMethod == null) {
            throw new Exception("Method not found: " + methodName);
        }

        try {
            Object result = targetMethod.invoke(service, dw);

            if (result instanceof DataWrapper) {
                return (DataWrapper) result;
            } else {
                DataWrapper responseWrapper = new DataWrapper();
                responseWrapper.put("result", result);
                return responseWrapper;
            }
        } catch (InvocationTargetException e) {
            //e.getCause().printStackTrace();
            throw new Exception("There was an error in the service method. method: " + methodName);
        }
    }

    //첫글자를 소문자로
    private static String decapitalizeFirstLetter(String str) {
        if (str == null || str.isEmpty()) {
            return str;
        }
        char[] chars = str.toCharArray();
        chars[0] = Character.toLowerCase(chars[0]);
        return new String(chars);
    }
}

