package com.aibest.services;


import com.aibest.entities.*;
import com.aibest.models.RegistrationParams;
import com.aibest.repositories.CompanyGroupRepository;
import com.aibest.repositories.CompanyRepository;
import com.aibest.repositories.UserRepository;
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

    public AppUser registerUser(RegistrationParams registrationParams){
        //todo verifications
        
        if(isNotValid(registrationParams)){
            throw new UsernameNotFoundException("Unable to create account");
        }
        
        CompanyGroup group = CompanyGroup.builder().name(registrationParams.getGroup()).build();
        group = groupRepository.save(group);

        Company company = Company.builder()
                .caen(registrationParams.getCaen())
                .deni(registrationParams.getDeni())
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
//            companyRepository.findByCaen(registrationParams.getCaen()) != null ||
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
}
