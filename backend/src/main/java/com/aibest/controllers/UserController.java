package com.aibest.controllers;

import com.aibest.entities.AppUser;
import com.aibest.models.*;
import com.aibest.security.JWTUtility;
import com.aibest.services.EmailSenderService;
import com.aibest.services.RestGetService;
import com.aibest.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.impl.DefaultClaims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    private final UserService userService;

    private final JWTUtility jwtUtility;

    private final AuthenticationManager authenticationManager;

    private final RestGetService restGetService;

    private final EmailSenderService emailSenderService;

    private final BCryptPasswordEncoder encoder;


    @Autowired
    public UserController(UserService userService, JWTUtility jwtUtility, AuthenticationManager authenticationManager, RestGetService restGetService, EmailSenderService emailSenderService, BCryptPasswordEncoder encoder) {
        this.userService = userService;
        this.jwtUtility = jwtUtility;
        this.authenticationManager = authenticationManager;
        this.restGetService = restGetService;
        this.emailSenderService = emailSenderService;
        this.encoder = encoder;
    }


    @PostMapping("/register")
    public JwtResponse registerUser(@RequestBody RegistrationParams registrationParameters, HttpServletRequest request) throws JsonProcessingException, MessagingException, UnsupportedEncodingException {

        String companyDetailsString = restGetService.getCompanyDetails("https://webservicesp.anaf.ro/bilant?an=2020&cui=" + registrationParameters.getCui());

        CompanyDetails companyDetails = new ObjectMapper().readValue(companyDetailsString, CompanyDetails.class);

        if (companyDetails.getDeni().length() < 1) {
            throw new IllegalArgumentException();
        }

        AppUser user = userService.registerUser(registrationParameters, getSiteURL(request));
        if (user == null) {
            throw new BadCredentialsException("check params");
        }

        final UserDetails userDetails
                = userService.loadUserByUsername(user.getEmail());
        final String token =
                jwtUtility.generateToken(userDetails);
        return new JwtResponse(token);
    }

    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code) {
        if (emailSenderService.verify(code)) {
            return "Verification successful";
        } else {
            return "Verification failed";
        }
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    @PostMapping("/login")
    public JwtResponse authenticate(@RequestBody JwtRequest jwtRequest) throws Exception {
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
        return new HashMap<>(claims);
    }

    @GetMapping("/getUsername")
    public String getUsername(@RequestHeader(name = "Authorization") String token) {
        return userService.getUsernameByToken(token.substring(7)).getFirstName();
    }

    @GetMapping("/getFullName")
    public String getFullName(@RequestHeader(name = "Authorization") String token) {
        AppUser user =  userService.getUsernameByToken(token.substring(7));
        return user.getFirstName() + " " + user.getLastName();
    }

    @PostMapping("/updateAccountCredentials")
    public ResponseEntity<String> updateAccountCredentials(@RequestHeader(name = "Authorization") String token,
                                        @RequestBody UserParams userParams){
        AppUser user = userService.getUsernameByToken(token.substring(7));
       if(encoder.matches(userParams.getOldPassword(), user.getPassword())){
           if(userParams.getNewPassword() != null){
               userService.changeUserPassword(user, userParams.getNewPassword());
           }
           if(userParams.getEmail() != null){
               userService.changeUserEmail(user, userParams.getEmail());
           }
       }
       else{
           return new ResponseEntity<String>("Request failed.", HttpStatus.BAD_REQUEST);
       }
        return ResponseEntity.ok("User modified successfully");
    }

    @PostMapping("/updateUser")
    public ResponseEntity<String> updateUser(@RequestHeader(name = "Authorization") String token,
                                             @RequestBody UserAttributes userAttributes) {
        AppUser user = userService.getUsernameByToken(token.substring(7));
        if(user != null){
            userService.updateUser(user, userAttributes);
        }
        else{
            return new ResponseEntity<String>("Request failed.", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("User modified successfully");
    }
}