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
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    @JoinColumn (
            name = "company_group_id",
            referencedColumnName = "id"
    )
    @JsonIgnore
    private CompanyGroup companyGroup;
    private UserRole userRole;
}
