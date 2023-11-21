package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.example.demo.common.controller.ApiHandler;

@Configuration
public class CustomApiHandlerConfig {
    @Bean
    @Primary
    public ApiHandler CustomApiHandler() {
        return new CustomApiHandler();
    }
}
