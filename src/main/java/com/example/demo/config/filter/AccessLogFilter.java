package com.example.demo.config.filter;

import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
public class AccessLogFilter implements Filter {

    private static final Logger logger = LoggerFactory.getLogger(AccessLogFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        logger.info("######################################### doFilter #########################################");
        logger.info("Access log: {} {} {}", req.getMethod(), req.getRequestURI(), req.getRemoteAddr());
        logger.info("######################################### doFilter #########################################");
        chain.doFilter(request, response);
    }
}