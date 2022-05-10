package com.aibest.services;

import com.aibest.entities.Employee;
import com.aibest.repositories.EmployeesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeesService {

    @Autowired
    EmployeesRepository employeesRepository;

    public void insertEmployees(List<Employee> dbInsertList) {
        employeesRepository.saveAll(dbInsertList);
    }

}
