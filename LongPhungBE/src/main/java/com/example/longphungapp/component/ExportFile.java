package com.example.longphungapp.component;

import com.example.longphungapp.entity.KhachHang;
import com.example.longphungapp.entity.NhanVien;
import com.example.longphungapp.repository.KhachHangRepository;
import com.example.longphungapp.repository.NhanVienRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Component
public class ExportFile {

    @Autowired
    NhanVienRepository dao;
    @Autowired
    KhachHangRepository khDao;

    public byte[] ExportEmp() throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Nhân viên");

        List<NhanVien> data = dao.findAll();
        String[] tieuDe = {"Mã NV", "Họ Tên", "Số Điện Thoại", "Địa Chỉ", "Bộ phận", "Chức vụ", "Tác vụ"};

        int rowNum = 0;

        // Thêm tiêu đề
        Row headerRow = sheet.createRow(rowNum++);
        for (int i = 0; i < tieuDe.length; i++) {
            headerRow.createCell(i).setCellValue(tieuDe[i]);
        }

        // Thêm dữ liệu nhân viên
        for (NhanVien nv : data) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(nv.getId());
            row.createCell(1).setCellValue(nv.getHoTen());
            row.createCell(2).setCellValue(nv.getTaiKhoan().getSdt());
            row.createCell(3).setCellValue(nv.getDiaChi());
            row.createCell(4).setCellValue(nv.getBoPhan().name());
            row.createCell(5).setCellValue(nv.getChucVu().name());
            row.createCell(6).setCellValue(nv.getTacVu().name());
        }

        // Ghi dữ liệu vào output stream
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        return outputStream.toByteArray();
    }

    public byte[] exportCus() throws IOException {
        Workbook wb = new XSSFWorkbook();
        Sheet sheet = wb.createSheet("Khách Hàng");

        List<KhachHang> list = khDao.findAll();
        String[] tieuDe = {"id", "Họ và tên", "Số điện thoại","Địa chỉ"};
        int rowNum = 0;
        Row headerRow = sheet.createRow(rowNum++);
        for (int i = 0; i < tieuDe.length; i++) {
            headerRow.createCell(i).setCellValue(tieuDe[i]);
        }
        for(KhachHang kh : list){
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(kh.getId());
            row.createCell(1).setCellValue(kh.getTenKhachHang());
            row.createCell(2).setCellValue(kh.getSdt());
            row.createCell(3).setCellValue(kh.getDiaChi());
        }
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        wb.write(outputStream);
        wb.close();

        return outputStream.toByteArray();
    }
}
