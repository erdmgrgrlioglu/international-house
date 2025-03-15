package com.international_house.backend.exceptions.handled;

import com.international_house.backend.exceptions.BaseException;
import org.springframework.http.HttpStatus;

public class EmployeeAlreadyExistException extends BaseException {
    private static final int errorCode = 2;
    private static final HttpStatus httpStatus = HttpStatus.NOT_FOUND;
    private static final String message = "Employee already exists";

    public EmployeeAlreadyExistException() {
        super(message, httpStatus, errorCode);
    }
}
