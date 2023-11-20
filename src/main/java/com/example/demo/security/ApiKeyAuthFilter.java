package com.example.demo.security;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class ApiKeyAuthFilter extends GenericFilterBean {

    private final String apiKey;

    public ApiKeyAuthFilter(String apiKey) {
        this.apiKey = apiKey;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String incomingApiKey = httpRequest.getHeader("SOME-API-KEY");

        if (apiKey.equals(incomingApiKey)) {
            chain.doFilter(request, response);
        } else {
            throw new ServletException("Invalid API Key");
        }
    }
}