package com.example.longphungapp.service;

import com.example.longphungapp.entity.TaiKhoan;
import com.example.longphungapp.repository.TaiKhoanRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final TaiKhoanRepository taiKhoanRepository;

    @Override
    public UserDetails loadUserByUsername(String sdt) throws UsernameNotFoundException {
        return taiKhoanRepository.findById(sdt)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản với số điện thoại: " + sdt));
    }
}
