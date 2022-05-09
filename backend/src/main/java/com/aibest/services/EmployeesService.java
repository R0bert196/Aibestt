package com.aibest.services;

import com.aibest.entities.Employees;
import com.aibest.models.DbInsert;
import com.aibest.repositories.EmployeesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeesService {

    @Autowired
    EmployeesRepository employeesRepository;

    public void insertEmployees(List<Employees> dbInsertList) {
        employeesRepository.saveAll(dbInsertList);
    }

}
