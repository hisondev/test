package com.example.demo;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;

import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

// import com.example.demo.biz.member.repository.MemberRepository;
import com.example.demo.common.utils.Utils;

@SpringBootTest
class DemoApplicationTests {

    // @Autowired
    // private MemberRepository memberRepository;
	@Test
	void contextLoads() {
		startTest();

		System.out.println("addDate : " + Utils.addDate("20240131",16));
		System.out.println("addDate : " + Utils.addDate("20240131 160024","16"));
		System.out.println("addDate : " + Utils.addDate("2024-01-31 16:48:31",16, "h"));
		System.out.println("addDate : " + Utils.addDate("202401",2));
		
		endTest();
	}

	public void startTest() {
		System.out.println("#######################################################################");
		System.out.println("Test Start!!!!!!!!!!!");
		System.out.println("#######################################################################");
	}

	public void endTest() {
		System.out.println("#######################################################################");
		System.out.println("Test End!!!!!!!!!!!");
		System.out.println("#######################################################################");
	}
}
