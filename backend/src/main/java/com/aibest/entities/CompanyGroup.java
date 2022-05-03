package com.aibest.entities;


import lombok.*;
import org.springframework.data.annotation.Reference;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyGroup {

    @Id
    @GeneratedValue (
            strategy = GenerationType.SEQUENCE
    )
    private long id;
    @Column(unique=true)
    private String name;

}
