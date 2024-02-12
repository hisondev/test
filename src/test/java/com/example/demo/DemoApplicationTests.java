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

		System.out.println("dayOfWeekType : " + Utils.getDayOfWeek("20240205"));
		
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
