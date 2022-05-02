package com.aibest.controllers;

import com.aibest.models.LoginParams;
import com.aibest.models.RegistrationParams;
import com.aibest.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class UserController {

    final
    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }



    @PostMapping("/register")
//    todo secure endpoint via https
    public ResponseEntity<String> registerUser(@RequestBody RegistrationParams registrationParameters){
        return ResponseEntity.ok(userService.registerUser(registrationParameters));
    }


    @PostMapping("/login")
//    todo secure endpoint via https
    public ResponseEntity<String> login(@RequestBody LoginParams loginParams){
        return ResponseEntity.ok("jwt token goes in here");
    }
}
