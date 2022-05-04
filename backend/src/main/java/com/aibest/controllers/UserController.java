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
import io.jsonwebtoken.impl.DefaultClaims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

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

        return new JwtResponse(token);
    }



    @GetMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(HttpServletRequest request) throws Exception {
        // From the HttpRequest get the claims
        DefaultClaims claims = (io.jsonwebtoken.impl.DefaultClaims) request.getAttribute("claims");

        Map<String, Object> expectedMap = getMapFromIoJsonwebtokenClaims(claims);
        String token = jwtUtility.doGenerateRefreshToken(expectedMap, expectedMap.get("sub").toString());
        return ResponseEntity.ok(new JwtResponse(token));
    }

    public Map<String, Object> getMapFromIoJsonwebtokenClaims(DefaultClaims claims) {
        return new HashMap<String, Object>(claims);
    }
}
