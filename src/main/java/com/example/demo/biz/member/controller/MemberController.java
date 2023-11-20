package com.example.demo.biz.member.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.biz.member.domain.Member;
import com.example.demo.biz.member.service.MemberService;

@RestController
@RequestMapping("/api/members")
public class MemberController {
    
    @Autowired
    private MemberService memberService;
    
    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }
    
    // @PostMapping
    // public Member createMember(@RequestBody MemberDTO memberDTO) {
    //     return memberService.createMember(memberDTO);
    // }

    // @PostMapping("/plural")
    // public List<Member> createMembers(@RequestBody Map<String, Object> test) {
    //     System.out.println(test.toString());

    //     return null;
    // }
}