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

    private String caen;
//    @Column(unique=true)
    private String cui;
    private String codPostal;
    private long totalIncome;

    @ManyToOne(
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(
            name = "company_group_id",
            referencedColumnName = "id"
    )
    private CompanyGroup companyGroup;


}
