package com.example.longphungapp.controller;

import com.example.longphungapp.dto.QuyTrinhDto;
import com.example.longphungapp.service.QuyTrinhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/quytrinh")
@CrossOrigin
public class QuyTrinhController {
    @Autowired
    private QuyTrinhService service;
    


    @GetMapping
    public ResponseEntity getList(){
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping("save")
    public ResponseEntity save(@RequestBody QuyTrinhDto dto){
        return ResponseEntity.status(201).body(service.saveOrUpdateQuyTrinh(dto));
    }
    @PutMapping("update")
    public ResponseEntity update(@RequestBody QuyTrinhDto dto){
        return ResponseEntity.ok(service.saveOrUpdateQuyTrinh(dto));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.ok().build();
    }


}
