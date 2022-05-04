package com.aibest.services;

import com.aibest.entities.AppUser;
import com.aibest.entities.Company;
import com.aibest.repositories.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyService {

    @Autowired
    CompanyRepository companyRepository;


    public List<Company> getCompaniesForUser(AppUser user) {
        return companyRepository.findCompaniesByCompanyGroup(user.getCompanyGroup());
    }
}
