package com.aibest.controllers;

import com.aibest.entities.AppUser;
import com.aibest.entities.Company;
import com.aibest.entities.CompanyGroup;
import com.aibest.repositories.CompanyRepository;
import com.aibest.security.JWTUtility;
import com.aibest.services.CompanyService;
import com.aibest.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class ChartDataController {

    private final
    JWTUtility jwtUtility;
    private final
    CompanyService companyService;
    private final
    UserService userService;

    @Autowired
    public ChartDataController(JWTUtility jwtUtility, CompanyService companyService, UserService userService) {
        this.jwtUtility = jwtUtility;
        this.companyService = companyService;
        this.userService = userService;
    }

    @GetMapping("/companySearch")
    public ResponseEntity<List<Company>> companySearch(){

        CompanyGroup group = CompanyGroup.builder().id(61264).name("test").build();

        List<Company> companies = Arrays.asList(
                Company.builder().id(9999).deni("c1").companyGroup(group).build(),
                Company.builder().id(9992).deni("c2").companyGroup(group).build(),
                Company.builder().id(9993).deni("c3").companyGroup(group).build(),
                Company.builder().id(9994).deni("c4").companyGroup(group).build(),
                Company.builder().id(9959).deni("c5").companyGroup(group).build()
                );
        return ResponseEntity.ok(companies);
    }

    @GetMapping(value = "/empGraph")
    public List<Map<String, String>> sendEmpData(@RequestParam("companyId") long companyId) {
        List<Map<String, String>> data = new ArrayList<>();
        Map<String, String> val1 = new HashMap<>();

        val1.put("id", "1");
        val1.put("name", "jan");
        val1.put("dataset1", "12");
        val1.put("dataset2", "15");
        data.add(val1);

        Map<String, String> val2 = new HashMap<>();

        val2.put("id", "1");
        val2.put("name", "feb");
        val2.put("dataset1", "15");
        val2.put("dataset2", "12");
        data.add(val2);

        Map<String, String> val3 = new HashMap<>();

        val3.put("id", "1");
        val3.put("name", "mar");
        val3.put("dataset1", "17");
        val3.put("dataset2", "13");
        data.add(val3);

        Map<String, String> val4 = new HashMap<>();

        val4.put("id", "1");
        val4.put("name", "apr");
        val4.put("dataset1", "19");
        val4.put("dataset2", "21");
        data.add(val4);

        Map<String, String> val5 = new HashMap<>();

        val5.put("id", "1");
        val5.put("name", "may");
        val5.put("dataset1", "19");
        val5.put("dataset2", "21");
        data.add(val5);

        return data;
    }

    @GetMapping(value = "/positions")
    public List<Map<String, String>> sendPieData(@RequestParam("companyId") long companyId) {
        List<Map<String, String>> data = new ArrayList<>();
        Map<String, String> val1 = new HashMap<>();

        val1.put("id", "1");
        val1.put("name", "red");
        val1.put("employees", "12");
        data.add(val1);

        Map<String, String> val2 = new HashMap<>();

        val2.put("id", "1");
        val2.put("name", "blue");
        val2.put("employees", "15");
        data.add(val2);

        Map<String, String> val3 = new HashMap<>();

        val3.put("id", "1");
        val3.put("name", "yellow");
        val3.put("employees", "17");
        data.add(val3);

        Map<String, String> val4 = new HashMap<>();

        val4.put("id", "1");
        val4.put("name", "green");
        val4.put("employees", "19");
        data.add(val4);

        Map<String, String> val5 = new HashMap<>();

        val5.put("id", "1");
        val5.put("name", "purple");
        val5.put("employees", "19");
        data.add(val5);

        return data;
    }

    @GetMapping(value = "/getCompanies")
    public List<Company> getCompanies(@RequestHeader(name="Authorization") String token) {
        String email = jwtUtility.getUsernameFromToken(token.substring("Bearer ".length()));
        AppUser user = userService.getUserByEmail(email);
        return companyService.getCompaniesForUser(user);
    }
}
