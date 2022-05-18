package com.aibest.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class i {

    private String indicator;
    private Long val_indicator;
    private String val_den_indicator;

}
