package com.aibest.models;

import com.aibest.entities.Employee;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadModel {

    private long companyId;
    private List<Employee> employees;

}
