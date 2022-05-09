package com.aibest.repositories;

import com.aibest.entities.Company;
import com.aibest.entities.CompanyGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Company findByCaen(int caen);
    Company findByDeni(String deni);
    List<Company> findCompaniesByCompanyGroup(CompanyGroup group);

    @Query(value = "select * " +
            " from company " +
            " inner join app_user au on company.company_group_id = au.company_group_id " +
            " inner join company_group cg on cg.id = au.company_group_id  " +
            " where cg.id = :companyGroupId " +
            " and company.deni iLIKE :searchedCompany%", nativeQuery = true)
    List<Company> findCompaniesBySearchedNameAndUser(@Param("searchedCompany") String searchedCompany, @Param("companyGroupId") long companyGroupId);
}
