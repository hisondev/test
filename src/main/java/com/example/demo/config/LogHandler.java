package com.example.demo.config;

import com.example.demo.common.data.wrapper.DataWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import javax.servlet.http.HttpServletRequest;

@Component
public class LogHandler {

    private static final Logger logger = LoggerFactory.getLogger(LogHandler.class);
    
    public void logging(String log) {
        logger.info(log);
    }

    public void handleLogging(DataWrapper dw, HttpServletRequest req) {
        logger.info("########### handleLogging ###########");
        logger.info("Request info: IP - {}, Method - {}", req.getRemoteAddr(), req.getMethod());
        logger.info("DataWrapper received: {}", dw.toString());
        logger.info("########### handleLogging ###########");
    }
}