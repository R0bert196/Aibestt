package com.aibest.services;

import com.aibest.entities.Company;
import com.aibest.models.FileUploadModel;
import com.aibest.repositories.CompanyRepository;
import com.aibest.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmployeeService {

    final
    EmployeeRepository employeeRepository;
    final CompanyRepository companyRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, CompanyRepository companyRepository) {
        this.employeeRepository = employeeRepository;
        this.companyRepository = companyRepository;
    }

    public boolean addReport(FileUploadModel fileUploadModel) {
        Company c = companyRepository.findById(fileUploadModel.getCompanyId()).get();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDate now = LocalDate.from(LocalDateTime.now());
        fileUploadModel.getEmployees().forEach(employee -> {
            employee.setCompany(c);
            employee.setReportDate((now));
            employeeRepository.save(employee);
        });
        // TODO add real validation
        return true;
    }
}
