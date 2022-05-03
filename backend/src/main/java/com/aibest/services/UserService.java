package com.aibest.services;


import com.aibest.entities.*;
import com.aibest.models.RegistrationParams;
import com.aibest.repositories.CompanyGroupRepository;
import com.aibest.repositories.CompanyRepository;
import com.aibest.repositories.UserRepository;
import com.aibest.security.SecurityConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {

    final UserRepository userRepository;
    final CompanyRepository companyRepository;
    final CompanyGroupRepository groupRepository;


    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

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

        AppUser user = new AppUser();
        user.setFirstName(registrationParams.getFirstName());
        user.setLastName(registrationParams.getLastName());
        user.setEmail(registrationParams.getEmail());
        //todo encrypt password
        user.setPassword(bCryptPasswordEncoder.encode(registrationParams.getPassword()));
        //
        user.setCompanyGroup(group);
        user.setUserRole(UserRole.ADMIN);
        userRepository.save(user);

        return "implement a proper jwt token as a response if the user was properly added to the database";
    }


    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        AppUser user = userRepository.findByEmail(userName);

        return new User(user.getEmail(),user.getPassword(),new ArrayList<>());
    }

}
