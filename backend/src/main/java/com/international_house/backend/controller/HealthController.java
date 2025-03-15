package com.international_house.backend.controller;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.boot.actuate.health.Status;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.boot.actuate.health.HealthEndpoint;
import org.springframework.web.bind.annotation.RestController;
import com.international_house.backend.controller.endpoint.HealthCheckEndpoint;

@RestController
@RequiredArgsConstructor
@Tag(name = HealthCheckEndpoint.API_TAG)
@RequestMapping(HealthCheckEndpoint.BASE_URI)
public class HealthController {

    private final HealthEndpoint healthEndpoint;

    @GetMapping
    @Operation(summary = HealthCheckEndpoint.HEALTH_CHECK_API_OPERATION)
    public HealthResponse healthCheck() {
        Status status = healthEndpoint.health().getStatus();
        long currentTime = System.currentTimeMillis();
        return new HealthResponse(status == Status.UP ? "OK" : status.getCode(), currentTime);
    }

    @Data
    @AllArgsConstructor
    public static class HealthResponse {
        private String status;
        private long time;
    }
}
