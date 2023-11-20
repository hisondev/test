package com.example.demo.biz.member.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
@NoArgsConstructor // 인자 없는 생성자를 자동으로 추가
public class Member {
    @Id
    @GeneratedValue
    private Long id;
    private String deptcode;
    private String membername;
    private String email;
    private LocalDateTime regdate;
    
    public Member(Long id, String deptcode, String email, String membername, LocalDateTime regdate) {
        this.id = id; // 이 부분은 null이 될 수 있습니다.
        this.deptcode = deptcode;
        this.membername = membername;
        this.email = email;
        this.regdate = regdate;
    }
    
    @Override
    public String toString() {
        return "This is Member Class" + "\n"
                + "id : " + id
                + "\tdeptcode : " + deptcode
                + "\tmembername : " + membername
                + "\temail : " + email
                + "\tregdate : " + regdate
                + "\n";
    }
}