package com.aibest.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE
    )

    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @JoinColumn (
            name = "company_group_id",
            referencedColumnName = "id"
    )
    private CompanyGroup companyGroup;
    private UserRole userRole;
}
