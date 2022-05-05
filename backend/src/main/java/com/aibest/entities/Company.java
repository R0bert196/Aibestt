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
    private long id;
    @Column(unique=true)
    private String deni;
    @Column(unique=true)
    private int caen;
    private String codPostal;
    private String cui;

    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @JoinColumn(
            name = "company_group_id",
            referencedColumnName = "id"
    )
    private CompanyGroup companyGroup;
}
