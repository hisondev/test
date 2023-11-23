package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.example.demo.common.data.converter.DataConverter;

@Configuration
public class CustomDataConverterConfig {
    @Bean
    @Primary
    public DataConverter CustomDataConverter() {
        return new CustomDataConverter();
    }
}
