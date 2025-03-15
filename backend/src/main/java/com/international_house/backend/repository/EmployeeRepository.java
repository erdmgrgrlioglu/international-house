package com.international_house.backend.repository;

import java.util.Optional;
import java.util.UUID;
import com.international_house.backend.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.international_house.backend.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    @Modifying
    @Transactional
    @Query("UPDATE Employee e SET e = ?2 WHERE e.id = ?1")
    int updateEmployeeById(UUID id, Employee update);

    @Query("SELECT e FROM Employee e WHERE e.role = ?1")
    Optional<Employee> getAdmin(Role role);

    @Query("SELECT e FROM Employee e WHERE e.name = ?1")
    Optional<Employee> findByName(String name);
}
