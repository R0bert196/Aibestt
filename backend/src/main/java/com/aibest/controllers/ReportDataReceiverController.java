package com.aibest.controllers;

import com.aibest.models.FileUploadModel;
import com.aibest.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReportDataReceiverController {

    private final
    EmployeeService employeeService;

    @Autowired
    public ReportDataReceiverController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }


    @PostMapping("/api/add-employees")
    public ResponseEntity<?> insertData(@RequestBody FileUploadModel fileUploadModel) {
        System.out.println(fileUploadModel.getCompanyId());
        System.out.println(fileUploadModel.getEmployees().get(1));
        if (!employeeService.addReport(fileUploadModel)) {
            return new ResponseEntity<>("Something went wrong!", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("File Uploaded Successfully");
    }
}
