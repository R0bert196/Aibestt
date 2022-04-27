package com.aibest.controllers;


import com.aibest.entities.Company;
import com.aibest.entities.CompanyGroup;
import com.aibest.entities.Users;
import com.aibest.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserController {

    final
    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<Users> registerUser(@RequestBody Map<String, String> registrationParameters){
        return ResponseEntity.ok(userService.registerUser(registrationParameters));
    }
}
