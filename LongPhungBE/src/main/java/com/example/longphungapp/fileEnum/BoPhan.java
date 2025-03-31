package com.example.longphungapp.fileEnum;

public enum BoPhan {
    HANG_CHINH("Hành chính"),
    SAN_XUAT("Sản xuất"),
    KINH_DOANH("Kinh doanh");


    private final String description;

    BoPhan(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
