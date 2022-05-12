package com.aibest.controllers;

import com.aibest.entities.AppUser;
import com.aibest.models.CompanyDetails;
import com.aibest.models.JwtRequest;
import com.aibest.models.JwtResponse;
import com.aibest.models.RegistrationParams;
import com.aibest.security.JWTUtility;
import com.aibest.services.EmailSenderService;
import com.aibest.services.RestGetService;
import com.aibest.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.impl.DefaultClaims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    final
    UserService userService;

    @Autowired
    private JWTUtility jwtUtility;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    RestGetService restGetService;

    @Autowired
    EmailSenderService emailSenderService;


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
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
        System.out.println(token.substring(7));
        return userService.getUsernameByToken(token.substring(7));
    }

}