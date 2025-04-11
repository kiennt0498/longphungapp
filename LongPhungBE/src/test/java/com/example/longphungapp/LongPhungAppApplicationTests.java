package com.example.longphungapp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class LongPhungAppApplicationTests {

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    void contextLoads() {
        assertNotNull(applicationContext);
    }

    @Test
    void testSanPhamControllerIsLoaded() {
        assertTrue(applicationContext.containsBean("sanPhamController"));
    }

    @Test
    void testSanPhamServiceIsSingleton() {
        assertTrue(applicationContext.isSingleton("sanPhamService"));
    }
}

