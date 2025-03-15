package com.international_house.backend.controller;

import com.international_house.backend.controller.endpoint.VisitorEndpoint;
import com.international_house.backend.dto.BaseResponseDto;
import com.international_house.backend.entity.Visitor;
import com.international_house.backend.service.VisitorService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = VisitorEndpoint.API_TAG)
@RequestMapping(path = VisitorEndpoint.BASE_URI)
public class VisitorController {

    private final VisitorService visitorService;

    @PostMapping
    public ResponseEntity<BaseResponseDto> createVisitor(@RequestBody Visitor visitor) {
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .data(visitorService.createVisitor(visitor))
                        .message("Visitor created successfully!")
                        .build());
    }

    @GetMapping
    public ResponseEntity<BaseResponseDto> getVisitors() {
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .data(visitorService.getVisitors())
                        .message("Visitors retrieved successfully!")
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponseDto> getVisitor(@PathVariable String id) {
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .data(visitorService.getVisitor(id))
                        .message("Visitor retrieved successfully!")
                        .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponseDto> updateVisitor(@RequestHeader("Authorization") String token,
            @PathVariable String id, @RequestBody Visitor update) {
        visitorService.updateVisitor(id, update);
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .message("Visitor updated successfully!")
                        .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponseDto> deleteVisitor(@RequestHeader("Authorization") String token,
            @PathVariable String id) {
        visitorService.deleteVisitor(id);
        return ResponseEntity
                .ok(BaseResponseDto
                        .builder()
                        .message("Visitor deleted successfully!")
                        .build());
    }
}
