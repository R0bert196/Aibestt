package com.aibest.services;

import com.aibest.entities.AppUser;
import com.aibest.entities.Company;
import com.aibest.entities.CompanyGroup;
import com.aibest.entities.Employee;
import com.aibest.models.CompanyDetails;
import com.aibest.repositories.CompanyRepository;
import com.aibest.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    EmployeeRepository employeeRepository;

    public List<Company> getCompaniesForUser(AppUser user) {
        return companyRepository.findCompaniesByCompanyGroup(user.getCompanyGroup());
    }

    public void addCompany(CompanyGroup group, CompanyDetails companyDetails, String cui) {
        Company c = Company
                .builder()
                .caen(companyDetails.getCaen())
                .deni(companyDetails.getDeni())
                .cui(cui)
//                .codPostal(params.getCodPostal())
                .companyGroup(group)
                .build();

        companyRepository.save(c);
    }

    public List<Company> getCompaniesForUser(long companyGroupIp, String searchedCompanyName) {
        return companyRepository.findCompaniesBySearchedNameAndUser(searchedCompanyName, companyGroupIp);
    }

    public Company getCompaniesById(long id) {
        return companyRepository.findById(id).get();
    }

    public List<Employee> getEmployeesForCompany(long companyId) {
        return employeeRepository.getLatestEmployees(companyId);
    }
}
