package com.example.demo.biz.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.biz.member.domain.Member;
import com.example.demo.biz.member.service.MemberService;
import com.example.demo.common.data.model.DataModel;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MemberController {
    
    @Autowired
    private MemberService memberService;
    
    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }
    
    @PostMapping
    public DataModel createMember(@RequestBody DataModel dm) {
        System.out.println(dm);
        Member member = dm.getConvertedEntities(Member.class).get(0);
        DataModel rtDm = new DataModel(member);
        return rtDm;
    }

    // @PostMapping("/plural")
    // public List<Member> createMembers(@RequestBody Map<String, Object> test) {
    //     System.out.println(test.toString());

    //     return null;
    // }
}
