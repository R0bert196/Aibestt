package com.aibest.repositories;

import com.aibest.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query(value = "SELECT * FROM employee WHERE company_id=:comp_id AND upload_date = ( SELECT MAX(upload_date) FROM employee)", nativeQuery = true)
    List<Employee> getLatestEmployees(@Param("comp_id") long companyId);

}
