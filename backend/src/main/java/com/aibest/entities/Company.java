package com.aibest.entities;


import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {

    @Id
    @GeneratedValue (
            strategy = GenerationType.SEQUENCE
    )
    @Access(AccessType.PROPERTY)
    private long id;

    @Column(unique=true)
    private String deni;
    private int caen;
    @Column(unique=true)
    private int cui;
    private String codPostal;

    @ManyToOne(
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(
            name = "company_group_id",
            referencedColumnName = "id"
    )
    private CompanyGroup companyGroup;
}
