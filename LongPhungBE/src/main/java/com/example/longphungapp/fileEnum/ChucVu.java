package com.example.longphungapp.fileEnum;

public enum ChucVu {
    NHAN_VIEN("Nhân viên"),
    TRUONG_PHONG("Trưởng phòng"),
    QUAN_LY("Quản lý"),
    ADMIN("admin");

    private final String description;

    ChucVu(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
