package com.international_house.backend.controller;

import com.international_house.backend.controller.endpoint.EmployeeEndpoint;
import com.international_house.backend.dto.BaseResponseDto;
import com.international_house.backend.service.EmployeeService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.international_house.backend.entity.Employee;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = EmployeeEndpoint.API_TAG)
@RequestMapping(path = EmployeeEndpoint.BASE_URI)
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<BaseResponseDto> createEmployee(@Valid @RequestBody Employee employee) {
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .data(employeeService.createEmployee(employee))
                        .message("Employee added successfully!")
                        .build());
    }

    @GetMapping
    public ResponseEntity<BaseResponseDto> getEmployees() {
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .data(employeeService.getEmployees())
                        .message("Employees retrieved successfully!")
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponseDto> getEmployeeById(@RequestHeader("Authorization") String token,
            @PathVariable UUID id) {
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .data(employeeService.getEmployee(id))
                        .message("Employee retrieved successfully!")
                        .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponseDto> updateEmployee(@RequestHeader("Authorization") String token,
            @PathVariable UUID id, @RequestBody Employee update) {
        employeeService.updateEmployee(id, update);
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .message("Employee updated successfully!")
                        .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponseDto> deleteEmployee(@RequestHeader("Authorization") String token,
            @PathVariable UUID id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .message("Employee deleted successfully!")
                        .build());
    }
}
