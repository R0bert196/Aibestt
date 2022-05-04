package com.aibest.entities;
import lombok.*;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "refreshtoken")
public class
RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;
    @Column(nullable = false, unique = true)
    private String token;
    @Column(nullable = false)
    private Instant expiryDate;
    //getters and setters



}
