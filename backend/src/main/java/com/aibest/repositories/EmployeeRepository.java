package com.aibest.repositories;

import com.aibest.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

//    @Query(nativeQuery = true)
//    public List<Employee> getLatestEmployees(long companyId);

}
