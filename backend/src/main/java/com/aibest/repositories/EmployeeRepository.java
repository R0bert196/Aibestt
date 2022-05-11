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

    @Query(value = "SELECT EXTRACT(YEAR FROM upload_date) AS year , EXTRACT(MONTH FROM upload_date) AS month, AVG(salary) FROM employee GROUP BY EXTRACT (MONTH FROM upload_date), EXTRACT(YEAR FROM upload_date) ORDER BY EXTRACT(YEAR FROM upload_date), EXTRACT (MONTH FROM upload_date);", nativeQuery = true)
    List<?> calculateGlobalEmployeeSalaries();

    @Query(value = "SELECT EXTRACT(YEAR FROM upload_date) AS year, EXTRACT(MONTH FROM upload_date) AS month, AVG(salary) FROM employee WHERE company_id=:comp_id GROUP BY EXTRACT (MONTH FROM upload_date), EXTRACT(YEAR FROM upload_date) ORDER BY EXTRACT(YEAR FROM upload_date), EXTRACT (MONTH FROM upload_date);", nativeQuery = true)
    List<?> calculateEmployeeSalaryForCompany(@Param("comp_id") long companyId);
}
