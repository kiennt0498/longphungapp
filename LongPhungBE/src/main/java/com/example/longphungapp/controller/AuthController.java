package com.example.longphungapp.controller;

import com.example.longphungapp.component.SessionUtils;
import com.example.longphungapp.dto.AuthDto;
import com.example.longphungapp.repository.NhanVienRepository;
import com.example.longphungapp.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin
public class AuthController {
    private final AuthService authService;
    private final NhanVienRepository nhanVienRepository;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthDto dto, HttpServletRequest request) {
        System.out.println("🟢 Đã vào Login Controller");
        try {
            if (authService.authenticate(dto)) {
                HttpSession session = request.getSession();
                session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
                var nhanVien = nhanVienRepository.findByTaiKhoan_Sdt(dto.getUsername());

                if (nhanVien == null) {
                    return ResponseEntity.status(404).body("Không tìm thấy nhân viên");
                }

                var chucVu = nhanVien.getChucVu() != null ? nhanVien.getChucVu().getId() : null;
                var xuongId = nhanVien.getXuong() != null ? nhanVien.getXuong().getId() : null;
                var khuId = nhanVien.getKhu() != null ? nhanVien.getKhu().getId() : null;
                var boPhanId = nhanVien.getBoPhan() != null ? nhanVien.getBoPhan().getId() : null;

                System.out.println("chuc vu id: "+ chucVu);
                System.out.println("xuong id: "+ xuongId);
                System.out.println("khu id: "+ khuId);
                System.out.println("bo phan id: "+ boPhanId);


                Map<String, Object> response = new HashMap<>();
                response.put("username", dto.getUsername());
                response.put("name", nhanVien.getHoTen());
                response.put("maNV", nhanVien.getId());
                response.put("chucVu", chucVu);
                response.put("xuong", xuongId); // có thể null
                response.put("khu", khuId);
                response.put("boPhan", boPhanId);
                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, createSessionCookie(session))
                        .body(response);
            } else {
                // Trường hợp đăng nhập sai nhưng không throw exception
                return ResponseEntity.status(401).body("Sai thông tin đăng nhập");
            }
        } catch (AuthenticationException e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Sai thông tin đăng nhập");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Lỗi hệ thống: " + e.getMessage());
            return ResponseEntity.status(500).body("Lỗi hệ thống");
        }
    }

    private String createSessionCookie(HttpSession session) {
        return String.format(
                "JSESSIONID=%s; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=%d",
                session.getId(),
                session.getMaxInactiveInterval()
        );
    }


    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            String username = authService.getCurrentUser();
            return ResponseEntity.ok(username);
        }
        return ResponseEntity.status(401).body("Chưa đăng nhập");
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok()
                .header("Set-Cookie", "JSESSIONID=; Path=/; Max-Age=0; HttpOnly")
                .body("Đăng xuất thành công");
    }
}
