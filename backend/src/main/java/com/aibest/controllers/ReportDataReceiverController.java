package com.aibest.controllers;

import com.aibest.models.FileUploadModel;
import com.aibest.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ReportDataReceiverController {

    private final EmployeeService employeeService;

    @Autowired
    public ReportDataReceiverController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }


    @PostMapping("/api/add-employees")
    public ResponseEntity<?> insertData(@RequestParam("file") MultipartFile file) {

        if(!file.isEmpty()){
            System.out.println(file.getOriginalFilename());
        }



        return new ResponseEntity<>("The File " + file.getOriginalFilename() + " was uploaded Successfully", HttpStatus.OK);
    }
}
