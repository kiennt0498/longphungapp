package com.example.longphungapp.fileEnum;

public enum TacVu {
    SALE("Sale"),
    MAKETING("Maketing"),
    TRO_LY("Trợ lý"),
    KE_TOAN("kế toán"),
    IN("in");

    private final String description;

    TacVu(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
