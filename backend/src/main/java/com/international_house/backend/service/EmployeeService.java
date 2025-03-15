package com.international_house.backend.service;

import com.international_house.backend.entity.Employee;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

public interface EmployeeService {
    Employee createEmployee(Employee employee);

    Employee getEmployee(UUID id);

    List<Employee> getEmployees();

    @Transactional
    void updateEmployee(UUID id, Employee update);

    void deleteEmployee(UUID id);
}
