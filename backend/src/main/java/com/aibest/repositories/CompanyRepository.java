package com.aibest.repositories;

import com.aibest.entities.Company;
import com.aibest.entities.CompanyGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Company findByCaen(int caen);
    Company findByDeni(String deni);
    List<Company> findCompaniesByCompanyGroup(CompanyGroup group);
}
