package com.aibest.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CompanyDetails {

    private String deni;
    private String caen;
    private List<i> i;

}
