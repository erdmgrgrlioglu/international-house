package com.international_house.backend.controller;

import com.international_house.backend.controller.endpoint.AuthEndpoint;
import com.international_house.backend.core.security.jwt.JwtUtil;
import com.international_house.backend.dto.BaseResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.international_house.backend.core.security.CustomUserDetailsService;
import com.international_house.backend.dto.request.LoginRequestDto;
import com.international_house.backend.dto.request.SignUpDto;
import com.international_house.backend.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Tag(name = AuthEndpoint.API_TAG)
@RequestMapping(AuthEndpoint.BASE_URI)
public class AuthController {

    private final AuthService authService;
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtil jwtUtil;

    // TODO Remove It! It is the testing endpoint for DEVELOPMENT
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/signup")
    @Operation(summary = "Remove It! It is the testing endpoint for DEVELOPMENT")
    public ResponseEntity<BaseResponseDto> signup(@RequestBody @Valid SignUpDto signUpDto) {
        return ResponseEntity
                .ok(BaseResponseDto.builder()
                        .data(customUserDetailsService.registerUser(signUpDto))
                        .message("User created successfully")
                        .build());
    }

    @PostMapping("/login")
    public ResponseEntity<BaseResponseDto> login(@RequestBody @Valid LoginRequestDto loginDto) {
        return ResponseEntity
                .ok(BaseResponseDto.builder()
                        .data(authService.login(loginDto))
                        .message("User logged in successfully!")
                        .build());
    }

    @GetMapping("/profile")
    public ResponseEntity<BaseResponseDto> getProfile(@RequestHeader("Authorization") String token) {
        return ResponseEntity
                .ok(BaseResponseDto.builder()
                        .data(authService.getProfile(UUID.fromString(jwtUtil.extractUserId(token.substring(7)))))
                        .message("Profile retrieved successfully!")
                        .build());
    }
}
