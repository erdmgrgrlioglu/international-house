package com.international_house.backend.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BaseException extends RuntimeException {
    int errorCode;
    HttpStatus httpStatus;

    public BaseException(String message, HttpStatus httpStatus, int errorCode) {
        super(message);
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
    }

}
