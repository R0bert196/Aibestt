package com.aibest.services;

import com.aibest.entities.AppUser;
import com.aibest.entities.Company;
import com.aibest.entities.CompanyGroup;
import com.aibest.models.CompanyRegParams;
import com.aibest.repositories.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    CompanyRepository companyRepository;

    public List<Company> getCompaniesForUser(AppUser user) {
        return companyRepository.findCompaniesByCompanyGroup(user.getCompanyGroup());
    }

    public void addCompany(CompanyGroup group, CompanyRegParams params) {
        Company c = Company
                .builder()
                .caen(params.getCaen())
                .deni(params.getDeni())
                .cui(params.getCui())
                .codPostal(params.getCodPostal())
                .companyGroup(group)
                .build();

        companyRepository.save(c);
    }

    public List<Company> getCompaniesForUser(long companyGroupIp, String searchedCompanyName) {
        return companyRepository.findCompaniesBySearchedNameAndUser(searchedCompanyName, companyGroupIp);
    }
}
