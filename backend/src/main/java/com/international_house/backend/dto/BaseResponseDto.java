package com.international_house.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import org.springframework.lang.Nullable;

@Data
@Builder
public class BaseResponseDto {
    private boolean result;
    private String message;
    @Nullable
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object data;
}