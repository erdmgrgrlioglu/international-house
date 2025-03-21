package com.international_house.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginRequestDto
{
    @NotNull
    private String username;
    @NotNull
    private String password;
}
