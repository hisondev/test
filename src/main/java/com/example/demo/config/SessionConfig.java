package com.example.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SessionConfig {

    @Value("${session.attribute.userIdKey}")
    private String userIdKey;

    @Value("${session.attribute.departmentKey}")
    private String departmentKey;

    @Value("${session.attribute.authoritiesKey}")
    private String authoritiesKey;

    public String getUserIdKey() {
        return userIdKey;
    }

    public String getDepartmentKey() {
        return departmentKey;
    }

    public String getAuthoritiesKey() {
        return authoritiesKey;
    }
}