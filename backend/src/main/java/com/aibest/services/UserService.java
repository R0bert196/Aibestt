package com.aibest.services;


import com.aibest.entities.*;
import com.aibest.models.CompanyDetails;
import com.aibest.models.RegistrationParams;
import com.aibest.models.UserAttributes;
import com.aibest.models.i;
import com.aibest.repositories.CompanyGroupRepository;
import com.aibest.repositories.CompanyRepository;
import com.aibest.repositories.UserRepository;
import com.aibest.security.JWTUtility;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.JavaMailSenderImpl;
//import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Objects;

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

//    @Autowired
//    private JavaMailSender mailSender;

    @Autowired
    EmailSenderService emailSenderService;




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

    public AppUser registerUser(RegistrationParams registrationParams, String siteURL) throws JsonProcessingException, MessagingException, UnsupportedEncodingException {
        //todo verifications
        
        if(isNotValid(registrationParams)){
            throw new UsernameNotFoundException("Unable to create account");
        }

        String companyDetailsString = restGetService.getCompanyDetails("https://webservicesp.anaf.ro/bilant?an=2020&cui=" + registrationParams.getCui());

        System.out.println(companyDetailsString);
        CompanyDetails companyDetails = new ObjectMapper().readValue(companyDetailsString, CompanyDetails.class);

        CompanyGroup group = CompanyGroup.builder().name(registrationParams.getGroup()).build();
        group = groupRepository.save(group);

        long totalIncome = 0;
        for (i i : companyDetails.getI()) {
            if (Objects.equals(i.getIndicator(), "I14")) {
                totalIncome = i.getVal_indicator();
            }
        }

        Company company = Company.builder()
                .cui(registrationParams.getCui())
                .caen(companyDetails.getCaen())
                .deni(companyDetails.getDeni())
                .totalIncome(totalIncome)
                .codPostal(registrationParams.getCodPostal())
                .companyGroup(group)
                .build();
        company = companyRepository.save(company);

        String randomCode = RandomString.make(64);

        AppUser user = AppUser
                .builder()

                .verificationCode(randomCode)
                .enabled(false)

                .firstName(registrationParams.getFirstName())
                .lastName(registrationParams.getLastName())
                .email(registrationParams.getEmail())
                .password(bCryptPasswordEncoder.encode(registrationParams.getPassword()))
                .userRole(UserRole.ADMIN)
                .companyGroup(group)
                .build();
        emailSenderService.sendVerificationEmail(user, siteURL);
        return userRepository.save(user);
    }

//    private void sendVerificationEmail(AppUser user, String siteURL) throws MessagingException, UnsupportedEncodingException {
//        String toAddress = user.getEmail();
//        String fromAddress = "Your email address";
//        String senderName = "Your company name";
//        String subject = "Please verify your registration";
//        String content = "Dear [[name]],<br>"
//                + "Please click the link below to verify your registration:<br>"
//                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
//                + "Thank you,<br>"
//                + "Your company name.";
//
////        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
////        SimpleMailMessage message = new SimpleMailMessage();
////
//////        MimeMessage message = mailSender.createMimeMessage();
//////        MimeMessageHelper helper = new MimeMessageHelper(message);
////
////        message.setFrom("sabiuta123@gmail.com");
////        message.setTo(toAddress);
////        message.setSubject(subject);
//
//
//        content = content.replace("[[name]]", user.getFirstName());
//        String verifyURL = siteURL + "/verify?code=" + user.getVerificationCode();
//
//        content = content.replace("[[URL]]", verifyURL);
//
////        helper.setText(content, true);
////        message.setText(content);
//
////        mailSender.send(message);
//        System.out.println("Mail sent!");
//    }

//    public boolean verify(String verificationCode) {
//        AppUser user = userRepository.findByVerificationCode(verificationCode);
//
//        if (user == null || user.isEnabled()) {
//            return false;
//        } else {
//            user.setVerificationCode(null);
//            user.setEnabled(true);
//            userRepository.save(user);
//
//            return true;
//        }
//
//    }

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

    public AppUser getUsernameByToken(String token) {
         String username =  jwtUtility.getUsernameFromToken(token);
         return userRepository.findByEmail(username);
    }


    public CompanyGroup getCompanyByToken(String token) {
        String username =  jwtUtility.getUsernameFromToken(token);
        return userRepository.findByEmail(username).getCompanyGroup();

    }

    public void changeUserPassword(AppUser user, String newPassword) {
        user.setPassword(bCryptPasswordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public void changeUserEmail(AppUser user, String email) {
        user.setEmail(email);
        userRepository.save(user);
    }

    public void updateUser(AppUser user, UserAttributes userAttributes) {
        if(userAttributes.getFirstName() != null){
            user.setFirstName(userAttributes.getFirstName());
        }
        if(userAttributes.getLastName() != null){
            user.setLastName(userAttributes.getLastName());
        }
        if(userAttributes.getAddress() != null){
            user.setAddress(userAttributes.getAddress());
        }
        if(userAttributes.getCity() != null){
            user.setCity(userAttributes.getCity());
        }
        if(userAttributes.getCounty() != null){
            user.setCounty(userAttributes.getCounty());
        }
        if(userAttributes.getPhoneNr() != null){
            user.setPhoneNr(userAttributes.getPhoneNr());
        }
        userRepository.save(user);
    }
}
