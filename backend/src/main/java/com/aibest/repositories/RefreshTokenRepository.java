package com.aibest.repositories;

import com.aibest.entities.AppUser;
import com.aibest.entities.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findById(Long id);
    Optional<RefreshToken> findByToken(String token);


    int deleteByUser(AppUser appUser);
}
