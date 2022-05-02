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

    private String deni;
    private int caen;
    private String codPostal;

    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @JoinColumn(
            name = "company_group_id",
            referencedColumnName = "id"
    )
    private CompanyGroup companyGroup;
}
