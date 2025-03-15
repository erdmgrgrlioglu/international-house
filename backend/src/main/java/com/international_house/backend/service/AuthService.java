package com.international_house.backend.service;

import com.international_house.backend.dto.request.LoginRequestDto;
import com.international_house.backend.entity.Employee;

import java.util.UUID;

public interface AuthService {
    String login(LoginRequestDto loginDto);

    Employee getProfile(UUID employeeId);
}
