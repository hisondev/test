package com.example.demo.common;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.common.api.controller.ApiLink;

@RestController
@RequestMapping("/api")
public class ApiController extends ApiLink{
}
