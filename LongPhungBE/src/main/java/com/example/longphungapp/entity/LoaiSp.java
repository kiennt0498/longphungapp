package com.example.longphungapp.entity;

import com.example.longphungapp.entity.asbFile.ThuocTinhSP;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "loai_sp")
public class LoaiSp extends ThuocTinhSP {

}