package com.international_house.backend.core.security;

import com.international_house.backend.dto.request.SignUpDto;
import com.international_house.backend.entity.Employee;
import com.international_house.backend.enums.Role;
import com.international_house.backend.exceptions.handled.EmployeeAlreadyExistException;
import com.international_house.backend.repository.EmployeeRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final PasswordEncoder passwordEncoder;
    private final EmployeeRepository employeeRepository;

    public CustomUserDetailsService(EmployeeRepository employeeRepository, PasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee user = employeeRepository.findByName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getName())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }

    public Employee registerUser(SignUpDto signUpDto) {
        String username = signUpDto.getUsername();
        String password = signUpDto.getPassword();

        if (employeeRepository.findByName(username).isPresent()) {
            throw new EmployeeAlreadyExistException();
        }

        Employee employee = new Employee();
        employee.setName(username);
        employee.setRole(Role.ADMIN);
        employee.setPassword(passwordEncoder.encode(password));
        return employeeRepository.save(employee);
    }
}

