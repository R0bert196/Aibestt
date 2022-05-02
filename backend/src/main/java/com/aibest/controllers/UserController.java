package com.aibest.controllers;

import com.aibest.models.JwtRequest;
import com.aibest.models.JwtResponse;
import com.aibest.models.RegistrationParams;
import com.aibest.security.JWTUtility;
import com.aibest.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
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
    private JWTUtility jwtUtility;

    @Autowired
    private AuthenticationManager authenticationManager;


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
    public JwtResponse authenticate(@RequestBody JwtRequest jwtRequest) throws Exception{
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            jwtRequest.getUsername(),
                            jwtRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        final UserDetails userDetails
                = userService.loadUserByUsername(jwtRequest.getUsername());

        final String token =
                jwtUtility.generateToken(userDetails);

        return  new JwtResponse(token);
    }
}
