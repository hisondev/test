package com.example.demo.biz.member.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.biz.member.domain.Member;


public interface MemberRepository extends JpaRepository<Member, Long> {
    @Query("SELECT m.id, m.deptcode, m.email, m.membername, m.regdate FROM Member m")
    List<Object[]> findAllMember();
}