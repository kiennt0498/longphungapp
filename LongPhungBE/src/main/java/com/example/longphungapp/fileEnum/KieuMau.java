package com.example.longphungapp.fileEnum;

public enum KieuMau {
    FULL("Full"),
    FULL_NGANG("Full Ngang"),
    LECH("Lệch"),
    TRON("Trơn"),
    TRON_CO_VIEN( "Trơn có viền");


    private final String description;

    KieuMau(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
