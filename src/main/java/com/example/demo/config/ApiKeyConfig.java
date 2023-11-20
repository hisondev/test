package com.example.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApiKeyConfig {

    @Value("${api.key}")
    private String apiKey;

    // Getter
    public String getApiKey() {
        return apiKey;
    }
}
