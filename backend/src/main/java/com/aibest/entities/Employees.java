package com.aibest.entities;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employees {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE
    )
    private long id;

    private String company;
    private int year;
    private int month;
    private int anonymised_employee_id;
    private int employee_id;
    private LocalDate birthDate;
    private int sex;
    private int cor;
    private int corVersion = 9;
    private LocalDate consignmentDate;
    private String contractNumber;
    private String previousContractNumber;
    private LocalDate contractDate;
    private LocalDate contractStartDate;
    private LocalDate contractEndDate;
    // contractTimeType = nedeterminata / determinata
    private String contractTimeType;
    // normType = norma intreaga / partiala
    private String normType;
    // norm =  NormaIntreaga840,  NormaIntreaga630
    private String norm;
    //shiftDuration = 8, 7, 6 ore de lucru
    private int shiftDuration;
    //shiftType = orePeZi / orePeNoapte;
    private String shiftType;
    //allocationType = oreDeZi / oreDeNoapte
    private String allocationType;
    private String contractType;
    private int salary;
    private LocalDate endDate;
    private String legalTerminationGrounds;
    private LocalDate suspensionStartDate;
    private LocalDate suspensionEndDate;
    private String legalSuspensionGrounds;
    private LocalDate suspensionStopDate;
    private String currentCondition;
}
