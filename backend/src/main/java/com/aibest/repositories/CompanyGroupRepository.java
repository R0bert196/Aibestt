package com.aibest.repositories;

import com.aibest.entities.CompanyGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyGroupRepository extends JpaRepository<CompanyGroup, Long> {
    CompanyGroup findByName(String groupName);
}
