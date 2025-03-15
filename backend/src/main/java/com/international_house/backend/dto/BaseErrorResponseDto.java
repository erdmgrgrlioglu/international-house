package com.international_house.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;

@Data
@Builder
public class BaseErrorResponseDto {

    private boolean result = false;
    private String message;
    private int status;
    private String path;
    private int errorCode;
    private LocalDateTime timestamp;
    @Nullable
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object data;
}
