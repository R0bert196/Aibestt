package com.aibest.repositories;

import com.aibest.entities.Company;
import com.aibest.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query(value = "SELECT count(*) FROM employee WHERE company_id=:comp_id AND upload_date = ( SELECT MAX(upload_date) FROM employee WHERE company_id=:comp_id)", nativeQuery = true)
    List<Employee> getLatestEmployees(@Param("comp_id") long companyId);

    @Query(value = "SELECT EXTRACT(YEAR FROM upload_date) AS year , EXTRACT(MONTH FROM upload_date) AS month, AVG(salary) as value FROM employee GROUP BY EXTRACT (MONTH FROM upload_date), EXTRACT(YEAR FROM upload_date) ORDER BY EXTRACT(YEAR FROM upload_date), EXTRACT (MONTH FROM upload_date);", nativeQuery = true)
    List<Map<String, String>> calculateGlobalEmployeeSalaries();

    @Query(value = "SELECT EXTRACT(YEAR FROM upload_date) AS year, EXTRACT(MONTH FROM upload_date) AS month, AVG(salary)as value FROM employee WHERE company_id=:comp_id GROUP BY EXTRACT (MONTH FROM upload_date), EXTRACT(YEAR FROM upload_date) ORDER BY EXTRACT(YEAR FROM upload_date), EXTRACT (MONTH FROM upload_date);", nativeQuery = true)
    List<Map<String, String>> calculateEmployeeSalaryForCompany(@Param("comp_id") long companyId);


    @Query(value = "SELECT COUNT(shift_duration) as value, shift_duration as name FROM employee WHERE company_id =:comp_id group by shift_duration;", nativeQuery = true)
    List<Map<String, String>> calculateEmployeesByShiftDuration(@Param("comp_id") long companyId);

    //    @Query("SELECT AVG(e.salary) FROM Employee e where Company.id = :companyId")
    @Query(value = "select AVG(salary) FROM employee where company_id = :companyId", nativeQuery = true)
    long getAllAverageSalariesByCompany(@Param("companyId") long companyId);

    @Query(value = "SELECT count(*) FROM employee WHERE company_id=:companyId AND upload_date = ( SELECT MAX(upload_date) FROM employee WHERE company_id=:companyId)", nativeQuery = true)
    long getCompanyEmployeesCount(@Param("companyId") long companyId);

    @Query(value = "select total_income / count(e) as turnoverEmployee From company INNER JOIN employee e on company.id = e.company_id WHERE e.company_id = :companyId group by total_income", nativeQuery = true)
    long getCompanyTurnoverEmployee(long companyId);


    @Query(value = "SELECT norm as name, COUNT(norm) as value FROM employee WHERE company_id = :companyId GROUP BY norm;", nativeQuery = true)
    List<Map<String, String>> getEmployeeNormForCompany(long companyId);



    @Query(value = "SELECT COUNT(e.sex) as value, e.sex as name FROM employee e WHERE company_id =:comp_id GROUP BY sex;", nativeQuery = true)
    List<Map<String, String>> getEmployeesByGender(@Param("comp_id") long companyId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM employee WHERE company_id = :comp_id AND EXTRACT(MONTH FROM upload_date) = :month AND EXTRACT(YEAR FROM upload_date) = :year ;", nativeQuery = true)
    void deleteOldReportData(@Param("comp_id") long company, @Param("month") int month, @Param("year") int year);
}
