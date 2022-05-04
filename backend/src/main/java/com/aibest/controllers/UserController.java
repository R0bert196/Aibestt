package com.aibest.controllers;

import com.aibest.entities.AppUser;
import com.aibest.entities.RefreshToken;
import com.aibest.exceptions.TokenRefreshException;
import com.aibest.models.TokenRefreshRequest;
import com.aibest.models.TokenRefreshResponse;
import com.aibest.models.JwtRequest;
import com.aibest.models.JwtResponse;
import com.aibest.models.RegistrationParams;
import com.aibest.security.JWTUtility;
import com.aibest.services.RefreshTokenService;
import com.aibest.services.UserService;
import io.jsonwebtoken.ExpiredJwtException;
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

import java.util.Base64;

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

    @Autowired
    RefreshTokenService refreshTokenService;



    @PostMapping("/register")
//    todo secure endpoint via https
    public JwtResponse registerUser(@RequestBody RegistrationParams registrationParameters){
        AppUser user = userService.registerUser(registrationParameters);

        if(user == null){
            throw new BadCredentialsException("check params");
        }

        final UserDetails userDetails
                = userService.loadUserByUsername(user.getEmail());
        final String token =
                jwtUtility.generateToken(userDetails);
        return new JwtResponse(token);
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

//        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getUsername());
        return new JwtResponse(token);
    }

    @PostMapping("/refresh")
    public String refreshtoken(@RequestBody String request) {

        String username = null;
        String sentToken = request.substring(36, request.length() - 3);

        //tries to see is the username exists, but the jwt is expired
        try {
            username = jwtUtility.getUsernameFromToken(sentToken);
        // if the jwt is expired, it creates a new one
        } catch (ExpiredJwtException e) {

            String[] chunks = sentToken.split("\\.");

            Base64.Decoder decoder = Base64.getUrlDecoder();

            String header = new String(decoder.decode(chunks[0]));
            String payload = new String(decoder.decode(chunks[1]));

            String[] split = payload.split(("\""));
            System.out.println(header);
            System.out.println(split[3]);
            username = split[3];
        }




        final UserDetails userDetails
                = userService.loadUserByUsername(username);


        final String token =
                jwtUtility.generateToken(userDetails);

        return token;

    }
}
