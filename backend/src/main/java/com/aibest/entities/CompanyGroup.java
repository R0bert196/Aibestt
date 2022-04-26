package com.aibest.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Reference;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyGroup {

    @Id
    @GeneratedValue (
            strategy = GenerationType.SEQUENCE
    )
    private long id;

    private String name;

}
