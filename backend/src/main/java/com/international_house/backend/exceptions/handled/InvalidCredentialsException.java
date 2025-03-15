package com.international_house.backend.exceptions.handled;

import com.international_house.backend.exceptions.BaseException;
import org.springframework.http.HttpStatus;

public class InvalidCredentialsException extends BaseException {
    private static final int errorCode = 4;
    private static final HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;
    private static final String message = "Invalid credentials";

    public InvalidCredentialsException() {
        super(message, httpStatus, errorCode);
    }
}

