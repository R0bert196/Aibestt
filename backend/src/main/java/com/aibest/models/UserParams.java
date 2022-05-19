package com.aibest.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Access;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserParams {
    private String email;
    private String oldPassword;
    private String newPassword;
}
