package com.aibest.repositories;

import com.aibest.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {

    AppUser findByEmail(String email);

    @Query("SELECT u FROM AppUser u WHERE u.verificationCode = ?1")
    AppUser findByVerificationCode(String code);

}
