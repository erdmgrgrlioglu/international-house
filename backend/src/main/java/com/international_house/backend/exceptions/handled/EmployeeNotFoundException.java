package com.international_house.backend.exceptions.handled;

import com.international_house.backend.exceptions.BaseException;
import org.springframework.http.HttpStatus;


public class EmployeeNotFoundException extends BaseException {
    private static final int errorCode = 3;
    private static final HttpStatus httpStatus = HttpStatus.NOT_FOUND;
    private static final String message = "Employee not found";

    public EmployeeNotFoundException() {
        super(message, httpStatus, errorCode);
    }
}