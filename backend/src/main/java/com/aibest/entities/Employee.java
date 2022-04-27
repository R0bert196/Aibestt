package com.aibest.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE
    )
    private long id;

    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @JoinColumn (
            name = "company_id",
            referencedColumnName = "id"
    )
    private Company company;

    private String function;

    private int salary;

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalDate reportDate;
}
