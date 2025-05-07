package com.example.longphungapp.component;

import com.example.longphungapp.service.VatTuService;
import org.springframework.stereotype.Component;

@Component
public class GiaThuMuaScheduler {
    private final VatTuService VatTuService;

    public GiaThuMuaScheduler(VatTuService vatTuService) {
        VatTuService = vatTuService;
    }

    @org.springframework.scheduling.annotation.Scheduled(cron = "1 1 12 * * *")
    public void autoChotGia(){
        VatTuService.AutoChotGia();
    }

}
