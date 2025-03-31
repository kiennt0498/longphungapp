package com.example.longphungapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tai_khoan")
public class TaiKhoan {
    @Id
    @Column(name = "sdt", nullable = false)
    private String sdt;

    @Column(name = "mat_khau", length = 50)
    private String matKhau;

}