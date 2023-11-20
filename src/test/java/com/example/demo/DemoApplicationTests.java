package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {

	@Test
	void contextLoads() {
		startTest();

		System.out.println("test!!!");

		endTest();
	}

	void startTest() {
		System.out.println("##############################");
		System.out.println("start test!!!");
		System.out.println("##############################");
	}

	void endTest() {
		System.out.println("##############################");
		System.out.println("end test!!!");
		System.out.println("##############################");
	}
}
