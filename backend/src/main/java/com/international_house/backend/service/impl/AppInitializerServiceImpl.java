package com.international_house.backend.service.impl;

import com.international_house.backend.entity.Employee;
import com.international_house.backend.enums.Role;
import com.international_house.backend.repository.EmployeeRepository;
import com.international_house.backend.service.AppInitializerService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AppInitializerServiceImpl implements AppInitializerService {

    private final PasswordEncoder passwordEncoder;
    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;
    private final EmployeeRepository employeeRepository;

    @PostConstruct
    public void initializeAdmin() {
        init();
    }

    @Override
    public void init() {
        Optional<Employee> adminEmployee = employeeRepository.getAdmin(Role.ADMIN);

        if (adminEmployee.isEmpty()) {
            Employee admin = new Employee();
            admin.setName(adminUsername);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole(Role.ADMIN);
            employeeRepository.save(admin);
            log.info("Application Admin record created successfully: Username: {}, Password: {}", adminUsername,
                    adminPassword);
        } else {
            log.info("Application Admin record already exists!");
        }
    }
}
