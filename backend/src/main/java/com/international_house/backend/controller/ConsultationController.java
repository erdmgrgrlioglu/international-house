package com.international_house.backend.controller;

import com.international_house.backend.controller.endpoint.ConsultationEndpoint;
import com.international_house.backend.dto.BaseResponseDto;
import com.international_house.backend.entity.Consultation;
import com.international_house.backend.service.ConsultationService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = ConsultationEndpoint.API_TAG)
@RequestMapping(path = ConsultationEndpoint.BASE_URI)
public class ConsultationController {

    private final ConsultationService consultationService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<BaseResponseDto> createConsultation(@RequestHeader("Authorization") String token,
            @RequestBody Consultation consultation) {
        return ResponseEntity
                .ok(BaseResponseDto.builder()
                        .message("Consultation created successfully!")
                        .data(consultationService.createConsultation(consultation))
                        .build());
    }

    @GetMapping
    public ResponseEntity<BaseResponseDto> getConsultations(@RequestHeader("Authorization") String token) {
        return ResponseEntity
                .ok(BaseResponseDto.builder()
                        .data(consultationService.getConsultations())
                        .message("Consultations retrieved successfully!")
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponseDto> getConsultationById(@RequestHeader("Authorization") String token,
            @PathVariable Integer id) {
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .data(consultationService.getConsultation(id))
                        .message("Consultations retrieved successfully!")
                        .build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponseDto> updateConsultation(@RequestHeader("Authorization") String token,
            @PathVariable Integer id,
            @RequestBody Consultation consultation) {
        consultationService.updateConsultation(id, consultation);
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .message("Consultation updated successfully!")
                        .build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponseDto> deleteConsultation(@RequestHeader("Authorization") String token,
            @PathVariable Integer id) {
        consultationService.deleteConsultation(id);
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .message("Consultation deleted successfully!:")
                        .build());
    }
}
