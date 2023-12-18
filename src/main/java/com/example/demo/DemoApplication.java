package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.config.CustomApiHandler;
import com.example.demo.config.CustomDataConverter;

@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {
		CustomApiHandler.register();
		CustomDataConverter.register();
		SpringApplication.run(DemoApplication.class, args);
	}
}
