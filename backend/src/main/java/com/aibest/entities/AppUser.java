package com.aibest.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppUser {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE
    )
    @Access(AccessType.PROPERTY)
    private long id;
    private String firstName;
    private String lastName;

    @Column(unique=true)
    private String email;
    private String password;

    @ManyToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn (
            name = "company_group_id",
            referencedColumnName = "id"
    )
    @JsonIgnore
    private CompanyGroup companyGroup;
    private UserRole userRole;

    @Column(name = "verification_code", length = 64)
    private String verificationCode;

    private Boolean enabled =  false;
}
