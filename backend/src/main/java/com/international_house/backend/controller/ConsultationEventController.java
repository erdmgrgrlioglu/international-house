package com.international_house.backend.controller;

import com.international_house.backend.controller.endpoint.ConsultationEventEndpoint;
import com.international_house.backend.dto.BaseResponseDto;
import com.international_house.backend.entity.ConsultationEvent;
import com.international_house.backend.service.ConsultationEventService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Tag(name = ConsultationEventEndpoint.API_TAG)
@RequestMapping(path = ConsultationEventEndpoint.BASE_URI)
public class ConsultationEventController {

    private final ConsultationEventService ConsultationEventService;

    // Method to create a new ConsultationEvent
    @PostMapping
    public ResponseEntity<BaseResponseDto> createConsultationEvent(
            @RequestHeader("Authorization") String token, @RequestBody ConsultationEvent ConsultationEvent) {
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .message("Consultation event created successfully!")
                        .data(ConsultationEventService.createConsultationEvent(ConsultationEvent))
                        .build());
    }

    // Method to retrieve all ConsultationEvents
    @GetMapping
    public ResponseEntity<BaseResponseDto> getConsultationEvents() {
        return ResponseEntity
                .ok(BaseResponseDto.builder()
                        .message("Consultation events retrieved successfully!")
                        .data(ConsultationEventService.getConsultationEvents())
                        .build());
    }

    // Method to retrieve a ConsultationEvent by its ID
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponseDto> getConsultationEventById(@RequestHeader("Authorization") String token,
            @PathVariable UUID id) {
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .message("Consultation event retrieved successfully!")
                        .data(ConsultationEventService.getConsultationEvent(id))
                        .build());
    }

    // Method to update an existing ConsultationEvent
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponseDto> updateConsultationEvent(@RequestHeader("Authorization") String token,
            @PathVariable UUID id,
            @RequestBody ConsultationEvent update) {
        ConsultationEventService.updateConsultationEvent(id, update);
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .message("Consultation event updated successfully!")
                        .build());
    }

    // Method to delete a ConsultationEvent by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponseDto> deleteConsultationEvent(@RequestHeader("Authorization") String token,
            @PathVariable UUID id) {
        ConsultationEventService.deleteConsultationEvent(id);
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .message("Consultation event deleted successfully!")
                        .build());
    }
}
