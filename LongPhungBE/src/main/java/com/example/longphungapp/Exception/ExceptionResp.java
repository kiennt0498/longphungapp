package com.example.longphungapp.Exception;

import lombok.Data;

@Data
public class ExceptionResp {
    String mess;

    public ExceptionResp(String mess) {
        this.mess = mess;
    }
}
