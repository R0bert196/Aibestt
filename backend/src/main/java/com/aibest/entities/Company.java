package com.aibest.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
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
