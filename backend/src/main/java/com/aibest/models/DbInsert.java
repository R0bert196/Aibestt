package com.aibest.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DbInsert {

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
    private String contractTimeType;
    private String normType;
    private String norm;
    private int shiftDuration;
    private String shiftType;
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
