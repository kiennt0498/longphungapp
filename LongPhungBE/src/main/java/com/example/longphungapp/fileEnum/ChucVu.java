package com.example.longphungapp.fileEnum;

public enum ChucVu {
    NHAN_VIEN("Nhân viên"),
    QUAN_LY("Quản lý");

    private final String description;

    ChucVu(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
