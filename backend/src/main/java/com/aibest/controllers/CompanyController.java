package com.aibest.controllers;


import com.aibest.entities.AppUser;
import com.aibest.entities.Company;
import com.aibest.entities.CompanyGroup;
import com.aibest.models.CompanyDetails;
import com.aibest.models.CompanyRegParams;
import com.aibest.services.CompanyService;
import com.aibest.services.RestGetService;
import com.aibest.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
public class CompanyController {

    @Autowired
    RestGetService restGetService;

    @Autowired
    CompanyService companyService;

    @Autowired
    private UserService userService;


    @GetMapping("/getCompany")
    public String getCompany(@RequestHeader(name="Authorization") String token) {
        return userService.getCompanyByToken(token.substring(7)).getName();
    }


    @GetMapping("/companySearch")
    public ResponseEntity<List<Company>> companySearch(@RequestHeader(name="Authorization") String token, @RequestParam(name="companyName") String searchedCompanyName){
        CompanyGroup companyByToken = userService.getCompanyByToken(token.substring(7));
        List<Company> companies2 =  companyService.getCompaniesForUser(companyByToken.getId(), searchedCompanyName + "%");
        return ResponseEntity.ok(companies2);
    }

    @PostMapping("/addCompany")
    public ResponseEntity<Boolean> addCompany(@RequestHeader(name="Authorization") String token,
                                              @RequestBody CompanyRegParams registrationParams) throws JsonProcessingException {
        System.out.println(registrationParams.getCui());
        String companyDetailsString = restGetService.getCompanyDetails("https://webservicesp.anaf.ro/bilant?an=2020&cui=" + registrationParams.getCui());

        CompanyDetails companyDetails = new ObjectMapper().readValue(companyDetailsString, CompanyDetails.class);

        if (companyDetails.getDeni().length() < 1) {
            throw new IllegalArgumentException();
        }

        CompanyGroup group = userService.getCompanyByToken(token.substring(7));
        companyService.addCompany(group, companyDetails, registrationParams.getCui());
        return ResponseEntity.ok(Boolean.TRUE);
    }
}
