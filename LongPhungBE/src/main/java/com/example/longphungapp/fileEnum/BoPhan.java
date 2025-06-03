package com.example.longphungapp.fileEnum;

public enum BoPhan {
    VAN_PHONG("Văn phòng"),
    SAN_XUAT("Sản xuất");


    private final String description;

    BoPhan(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
