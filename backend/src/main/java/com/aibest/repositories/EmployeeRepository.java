package com.aibest.repositories;

import com.aibest.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query(value = "SELECT * FROM employee WHERE company_id=:comp_id AND upload_date = ( SELECT MAX(upload_date) FROM employee)", nativeQuery = true)
    List<Employee> getLatestEmployees(@Param("comp_id") long companyId);

    @Query(value = "SELECT EXTRACT(YEAR FROM upload_date) AS year , EXTRACT(MONTH FROM upload_date) AS month, AVG(salary) as value FROM employee GROUP BY EXTRACT (MONTH FROM upload_date), EXTRACT(YEAR FROM upload_date) ORDER BY EXTRACT(YEAR FROM upload_date), EXTRACT (MONTH FROM upload_date);", nativeQuery = true)
    List<Map<String, String>> calculateGlobalEmployeeSalaries();

    @Query(value = "SELECT EXTRACT(YEAR FROM upload_date) AS year, EXTRACT(MONTH FROM upload_date) AS month, AVG(salary)as value FROM employee WHERE company_id=:comp_id GROUP BY EXTRACT (MONTH FROM upload_date), EXTRACT(YEAR FROM upload_date) ORDER BY EXTRACT(YEAR FROM upload_date), EXTRACT (MONTH FROM upload_date);", nativeQuery = true)
    List<Map<String, String>> calculateEmployeeSalaryForCompany(@Param("comp_id") long companyId);


    @Query(value = "SELECT COUNT(shift_duration) as employee_number, shift_duration as duration FROM employee WHERE company_id =:comp_id group by shift_duration;", nativeQuery = true)
    List<Map<String, String>> calculateEmployeesByShiftDuration(@Param("comp_id") long companyId);

//    @Query("SELECT AVG(e.salary) FROM Employee e where Company.id = :companyId")
    @Query(value = "select AVG(salary) FROM employee where company_id = :companyId" ,nativeQuery = true)
    int getAllAverageSalariesByCompany(@Param("companyId") long companyId);

    @Query("SELECT count(e) FROM Employee e where e.company.id = :companyId")
    int getCompanyEmployeesCount(@Param("companyId") long companyId);
}
