package com.example.demo.common;

public class MemberDTO {
    private Long id;
    private String deptcode;
    private String membername;
    private String email;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getDeptcode() {
        return deptcode;
    }
    public void setDeptcode(String deptcode) {
        this.deptcode = deptcode;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getMembername() {
        return membername;
    }
    public void setMembername(String membername) {
        this.membername = membername;
    }
}