package com.aibest.controllers;


import com.aibest.models.RegistrationParams;
import com.aibest.entities.Users;
import com.aibest.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    final
    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
//    todo secure endpoint via https
    public ResponseEntity<Users> registerUser(@RequestBody RegistrationParams registrationParameters){
        return ResponseEntity.ok(userService.registerUser(registrationParameters));
    }
}
