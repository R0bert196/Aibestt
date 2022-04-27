package com.aibest.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationParams {

        private String firstName;
        private String lastName;
        private String email;
        private String password;
        private String deni;
        private int caen;
        private String codPostal;
        private String groupName;
}
