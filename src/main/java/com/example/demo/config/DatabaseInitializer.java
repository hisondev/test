package com.example.demo.config;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.biz.dept.domain.Dept;
import com.example.demo.biz.dept.repository.DeptRepository;
import com.example.demo.biz.member.domain.Member;
import com.example.demo.biz.member.repository.MemberRepository;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private DeptRepository deptRepository;

    @Override
    public void run(String... args) {
        memberRepository.save(new Member(null, "A", "john@email.com", "john", LocalDateTime.of(2023,3,19,0,0,0)));
        memberRepository.save(new Member(null, "B", "jane@email.com", "jane", LocalDateTime.of(2023,3,19,0,0,0)));

        deptRepository.save(new Dept("A", "회계"));
        deptRepository.save(new Dept("B", "인사"));
    }
}
