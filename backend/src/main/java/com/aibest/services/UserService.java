package com.aibest.services;


import com.aibest.entities.*;
import com.aibest.models.CompanyDetails;
import com.aibest.models.RegistrationParams;
import com.aibest.repositories.CompanyGroupRepository;
import com.aibest.repositories.CompanyRepository;
import com.aibest.repositories.UserRepository;
import com.aibest.security.JWTUtility;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    final JWTUtility jwtUtility;


    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    RestGetService restGetService;

    @Autowired
    public UserService(UserRepository userRepository,
                       CompanyRepository companyRepository,
                       CompanyGroupRepository groupRepository,
                       JWTUtility jwtUtility) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.groupRepository = groupRepository;
        this.jwtUtility = jwtUtility;
    }

    public AppUser registerUser(RegistrationParams registrationParams) throws JsonProcessingException {
        //todo verifications
        
        if(isNotValid(registrationParams)){
            throw new UsernameNotFoundException("Unable to create account");
        }

        String companyDetailsString = restGetService.getCompanyDetails("https://webservicesp.anaf.ro/bilant?an=2020&cui=" + registrationParams.getCui());


        CompanyDetails companyDetails = new ObjectMapper().readValue(companyDetailsString, CompanyDetails.class);

        CompanyGroup group = CompanyGroup.builder().name(registrationParams.getGroup()).build();
        group = groupRepository.save(group);

        Company company = Company.builder()
                .cui(registrationParams.getCui())
                .caen(companyDetails.getCaen())
                .deni(companyDetails.getDeni())
                .codPostal(registrationParams.getCodPostal())
                .companyGroup(group)
                .build();
        company = companyRepository.save(company);

        AppUser user = AppUser
                .builder()
                .firstName(registrationParams.getFirstName())
                .lastName(registrationParams.getLastName())
                .email(registrationParams.getEmail())
                .password(bCryptPasswordEncoder.encode(registrationParams.getPassword()))
                .userRole(UserRole.ADMIN)
                .companyGroup(group)
                .build();
        return userRepository.save(user);
    }

    private boolean isNotValid(RegistrationParams registrationParams) {
        if(userRepository.findByEmail(registrationParams.getEmail()) != null ||
//            companyRepository.findByCui(registrationParams.getCui()) != null ||
//            companyRepository.findByDeni(registrationParams.getDeni()) != null ||
            groupRepository.findByName(registrationParams.getGroup()) != null
        ){
            return true;
        }

        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        AppUser user = userRepository.findByEmail(userName);
        return new User(user.getEmail(),user.getPassword(),new ArrayList<>());
    }


    public AppUser getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public String getUsernameByToken(String token) {
         String username =  jwtUtility.getUsernameFromToken(token);
         return userRepository.findByEmail(username).getFirstName();
    }

    public CompanyGroup getCompanyByToken(String token) {
        String username =  jwtUtility.getUsernameFromToken(token);
        return userRepository.findByEmail(username).getCompanyGroup();

    }
}
