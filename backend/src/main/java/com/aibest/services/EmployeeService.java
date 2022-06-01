package com.aibest.services;

import com.aibest.entities.Company;
import com.aibest.entities.Employee;
import com.aibest.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;

    public void insertEmployees(List<Employee> dbInsertList) {


        for (int i = 0; i < dbInsertList.size(); i++) {
            dbInsertList.set(i, employeeRepository.save(dbInsertList.get(i)));
        }
    }

    public List<?>  getGlobalEmployeeSalaries() {
        return employeeRepository.calculateGlobalEmployeeSalaries();
    }

    public List<?> getCompanyEmployeeSalaries(long companyId) {
        return employeeRepository.calculateEmployeeSalaryForCompany(companyId);
    }

    public List<Map<String, String>> getEmployeeCountByShiftDuration(long companyId){
        return employeeRepository.calculateEmployeesByShiftDuration(companyId);
    }

    public List<Map<String, String>> getEmployeesAverageSalaries(long companyId) {
        List<Map<String, String>> objects = employeeRepository.calculateEmployeeSalaryForCompany(companyId);
        System.out.println(objects);
        return objects;
    }

    public long getCompanyAverageSalaries(long companyId) {
        return employeeRepository.getAllAverageSalariesByCompany(companyId);
    }

    public long getCompanyEmployeesCount(long companyId) {
        return employeeRepository.getCompanyEmployeesCount(companyId);
    }

    public long getCompanyTurnoverEmployee(long companyId) {
        return employeeRepository.getCompanyTurnoverEmployee(companyId);
    }


    public List<Map<String, String>> getEmployeeNormsForCompany(long companyId) {
        return employeeRepository.getEmployeeNormForCompany(companyId);
    }

    public List<Map<String, String>> getEmployeesByGender(long companyId) {
        return employeeRepository.getEmployeesByGender(companyId);
    }

    public void deleteOldEmployeeDate(long company, LocalDate date) {
        employeeRepository.deleteOldReportData(company, date.getMonthValue(), date.getYear());
    }
}
