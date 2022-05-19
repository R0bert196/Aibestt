package com.aibest.controllers;

import com.aibest.entities.AppUser;
import com.aibest.entities.Company;
import com.aibest.security.JWTUtility;
import com.aibest.services.CompanyService;
import com.aibest.services.EmployeeService;
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
    private final EmployeeService employeeService;

    @Autowired
    public ChartDataController(JWTUtility jwtUtility, CompanyService companyService, UserService userService, EmployeeService employeeService) {
        this.jwtUtility = jwtUtility;
        this.companyService = companyService;
        this.userService = userService;
        this.employeeService = employeeService;
    }


    @GetMapping(value = "/average-salaries")
    public ResponseEntity<?> sendAverageSalaries(@RequestParam("companyId") long companyId) {
//        List<Map<String, String>> data = new ArrayList<>();

        return ResponseEntity.ok(employeeService.getEmployeesAverageSalaries(companyId));
    }


    @GetMapping(value = "/positions")
    public List<Map<String, String>> sendPieData(@RequestParam("companyId") long companyId) {
        List<Map<String, String>> data = new ArrayList<>();
        Map<String, String> val1 = new HashMap<>();

        val1.put("id", "1");
        val1.put("month", "1");
        val1.put("value", "12");
        data.add(val1);

        Map<String, String> val2 = new HashMap<>();

        val2.put("id", "1");
        val2.put("month", "2");
        val2.put("value", "15");
        data.add(val2);

        Map<String, String> val3 = new HashMap<>();

        val3.put("id", "1");
        val3.put("month", "3");
        val3.put("value", "16");
        data.add(val3);

        Map<String, String> val4 = new HashMap<>();

        val4.put("id", "1");
        val4.put("month", "4");
        val4.put("value", "5");
        data.add(val4);

        Map<String, String> val5 = new HashMap<>();

        val5.put("id", "1");
        val5.put("month", "7");
        val5.put("value", "18");
        data.add(val5);

        return data;
    }

    @GetMapping(value = "/getCompanies")
    public List<Company> getCompanies(@RequestHeader(name="Authorization") String token) {
        String email = jwtUtility.getUsernameFromToken(token.substring("Bearer ".length()));
        AppUser user = userService.getUserByEmail(email);
        return companyService.getCompaniesForUser(user);
    }

    @GetMapping(value = "/getAverageSalaries")
    public long getAverageSalariesForCompany(@RequestParam("companyId") long companyId) {
        return employeeService.getCompanyAverageSalaries(companyId);
    }

    @GetMapping(value = "/getEmployeesCount")
    public long getEmployeesCount(@RequestParam("companyId") long companyId) {
        return employeeService.getCompanyEmployeesCount(companyId);
    }

    @GetMapping("/getEmployeesByShiftCount")
    public List<Map<String, String>> getEmployeeByShiftDuration(@RequestParam("companyId") long companyId){
        return employeeService.getEmployeeCountByShiftDuration(companyId);
    }

    @GetMapping("/getEmployeesByGender")
    public List<Map<String, String>> getEmployeesByGender(@RequestParam("companyId") long companyId){
        return employeeService.getEmployeesByGender(companyId);
    }


    @GetMapping("/getTurnoverEmployee")
    public long getCompanyTurnoverEmployee(@RequestParam("companyId") long companyId){
        return employeeService.getCompanyTurnoverEmployee(companyId);
    }



}
