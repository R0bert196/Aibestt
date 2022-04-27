package com.aibest.services;


import com.aibest.entities.Company;
import com.aibest.entities.CompanyGroup;
import com.aibest.entities.UserRole;
import com.aibest.entities.Users;
import com.aibest.repositories.CompanyGroupRepository;
import com.aibest.repositories.CompanyRepository;
import com.aibest.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

    final UserRepository userRepository;
    final CompanyRepository companyRepository;
    final CompanyGroupRepository groupRepository;


    @Autowired
    public UserService(UserRepository userRepository,
                       CompanyRepository companyRepository,
                       CompanyGroupRepository groupRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.groupRepository = groupRepository;
    }

    public Users registerUser(Map<String, String> registrationParameters){
        //todo verifications

        //
        CompanyGroup group = new CompanyGroup();
        group.setName(registrationParameters.get("groupName"));
        group = groupRepository.save(group);

        Company company = new Company();
        company.setCaen(Integer.parseInt(registrationParameters.get("caen")));
        company.setDeni(registrationParameters.get("deni"));
        company.setCodPostal(registrationParameters.get("codPostal"));
        company.setCompanyGroup(group);
        company = companyRepository.save(company);

        Users user = new Users();
        user.setFirstName(registrationParameters.get("firstName"));
        user.setLastName(registrationParameters.get("lastName"));
        user.setEmail(registrationParameters.get("email"));
        //todo encrypt password
        user.setPassword(registrationParameters.get("password"));
        //
        user.setCompanyGroup(group);
        user.setUserRole(UserRole.ADMIN);

        return userRepository.save(user);
    }

}
