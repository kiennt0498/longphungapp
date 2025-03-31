package com.example.longphungapp.entity;

import com.example.longphungapp.entity.asbFile.ThuocTinhSP;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "chat_lieu")
public class ChatLieu extends ThuocTinhSP {
}