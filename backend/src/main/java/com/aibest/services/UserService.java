package com.aibest.services;


import com.aibest.entities.*;
import com.aibest.models.RegistrationParams;
import com.aibest.repositories.CompanyGroupRepository;
import com.aibest.repositories.CompanyRepository;
import com.aibest.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public String registerUser(RegistrationParams registrationParams){
        //todo verifications
        //redo with builder pattern
        CompanyGroup group = new CompanyGroup();
        group.setName(registrationParams.getGroupName());
        group = groupRepository.save(group);

        Company company = new Company();
        company.setCaen(registrationParams.getCaen());
        company.setDeni(registrationParams.getDeni());
        company.setCodPostal(registrationParams.getCodPostal());
        company.setCompanyGroup(group);
        company = companyRepository.save(company);

        Users user = new Users();
        user.setFirstName(registrationParams.getFirstName());
        user.setLastName(registrationParams.getLastName());
        user.setEmail(registrationParams.getEmail());
        //todo encrypt password
        user.setPassword(registrationParams.getPassword());
        //
        user.setCompanyGroup(group);
        user.setUserRole(UserRole.ADMIN);

        return "implement a proper jwt token as a response if the user was properly added to the database";
    }

}
