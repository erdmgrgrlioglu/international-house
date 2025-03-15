package com.international_house.backend.exceptions;


import com.international_house.backend.dto.BaseErrorResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionFilter {
    private static final int INTERNAL_SERVER_ERROR_CODE = 0;
    private static final int VALIDATION_ERROR_CODE = 1;
    private static final String VALIDATION_ERROR = "Validation error";


    @ExceptionHandler(BaseException.class)
    public ResponseEntity<BaseErrorResponseDto> handleBusinessException(BaseException e, WebRequest request) {
        BaseErrorResponseDto error = BaseErrorResponseDto.builder().status(e.getHttpStatus().value()).path(request.getDescription(false)).message(e.getMessage()).errorCode(e.getErrorCode()).timestamp(LocalDateTime.now()).build();
        return new ResponseEntity<>(error, e.getHttpStatus());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex, WebRequest request) {
        Map<String, String> validationErrors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            validationErrors.put(fieldName, errorMessage);
        });
        BaseErrorResponseDto error = BaseErrorResponseDto.builder().status(HttpStatus.BAD_REQUEST.value()).path(request.getDescription(false)).message(VALIDATION_ERROR).errorCode(VALIDATION_ERROR_CODE).data(validationErrors).timestamp(LocalDateTime.now()).build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<BaseErrorResponseDto> handleAccessDeniedException(Exception e, WebRequest request) {
        BaseErrorResponseDto error = BaseErrorResponseDto.builder().status(HttpStatus.FORBIDDEN.value()).path(request.getDescription(false)).message(e.getMessage()).errorCode(VALIDATION_ERROR_CODE).timestamp(LocalDateTime.now()).build();
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<BaseErrorResponseDto> handleException(Exception e, WebRequest request) {
        BaseErrorResponseDto error = BaseErrorResponseDto.builder().status(HttpStatus.INTERNAL_SERVER_ERROR.value()).path(request.getDescription(false)).message(e.getMessage()).errorCode(INTERNAL_SERVER_ERROR_CODE).timestamp(LocalDateTime.now()).build();
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
