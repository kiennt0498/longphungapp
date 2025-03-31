package com.example.longphungapp.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomerException extends ResponseEntityExceptionHandler {
    @ExceptionHandler(BadReqException.class)
    public final ResponseEntity handelBuses(BadReqException ex, WebRequest request){
        ExceptionResp er = new ExceptionResp(ex.getMessage());
        return new ResponseEntity<>(er.getMess(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(FileStorageException.class)
    public final ResponseEntity handelBuses(FileStorageException ex, WebRequest request){
        ExceptionResp er = new ExceptionResp(ex.getMessage());
        return new ResponseEntity<>(er.getMess(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
