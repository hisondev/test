package com.example.demo.common.controller;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiHandlerConfig {

    @Bean
    @ConditionalOnMissingBean(ApiHandler.class)
    public ApiHandler apiHandler() {
        return new ApiHandlerDefault();
    }
}
