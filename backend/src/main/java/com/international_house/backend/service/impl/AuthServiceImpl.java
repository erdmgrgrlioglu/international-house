package com.international_house.backend.service.impl;

import java.util.Optional;
import java.util.UUID;

import com.international_house.backend.exceptions.handled.EmployeeNotFoundException;
import com.international_house.backend.exceptions.handled.InvalidCredentialsException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.international_house.backend.core.RedisService;
import com.international_house.backend.core.security.jwt.JwtUtil;
import com.international_house.backend.dto.request.LoginRequestDto;
import com.international_house.backend.entity.Employee;
import com.international_house.backend.repository.EmployeeRepository;
import com.international_house.backend.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final JwtUtil jwtUtil;
    private final RedisService redisService;
    private final EmployeeRepository employeeRepository;
    private final AuthenticationManager authenticationManager;

    public String login(LoginRequestDto loginDto) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));

        Optional<Employee> user = employeeRepository.findByName(loginDto.getUsername());
        if (user.isPresent()) {
            Employee sanitizedEmployee = new Employee();
            sanitizedEmployee.setId(user.get().getId());
            sanitizedEmployee.setName(user.get().getName());
            sanitizedEmployee.setRole(user.get().getRole());
            String token = jwtUtil.generateToken(sanitizedEmployee);
            redisService.saveSession(user.get().getId().toString(), user.get());
            return token;
        }

        throw new InvalidCredentialsException();
    }

    public Employee getProfile(UUID employeeId) {
        return employeeRepository.findById(employeeId).orElseThrow(EmployeeNotFoundException::new);
    }

}
