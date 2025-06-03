package com.example.longphungapp.component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class SessionUtils {
    @Autowired
    private HttpServletRequest request;

    public String getMaNhanVien() {
        return (String) request.getSession().getAttribute("maNhanVien");
    }

    public void setMaNhanVien(String maNV) {
        request.getSession().setAttribute("maNhanVien", maNV);
    }
}
