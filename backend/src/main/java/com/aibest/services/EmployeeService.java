package com.aibest.services;

import com.aibest.entities.Employee;
import com.aibest.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;

    public void insertEmployees(List<Employee> dbInsertList) {
        for (int i = 0; i < dbInsertList.size(); i++) {
            dbInsertList.set(i, employeeRepository.save(dbInsertList.get(i)));
        }
    }

}
