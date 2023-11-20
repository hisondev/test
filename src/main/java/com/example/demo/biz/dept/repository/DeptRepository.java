package com.example.demo.biz.dept.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.biz.dept.domain.Dept;

public interface DeptRepository extends JpaRepository<Dept, String> {
}
