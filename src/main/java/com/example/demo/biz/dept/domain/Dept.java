package com.example.demo.biz.dept.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "dept")
public class Dept {
    
    @Id
    @Column(name = "deptcode")
    private String deptCode;
    
    @Column(name = "deptname")
    private String deptName;
}