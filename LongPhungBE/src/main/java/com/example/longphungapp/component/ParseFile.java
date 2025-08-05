package com.example.longphungapp.component;

import com.example.longphungapp.dto.*;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@Component
public class ParseFile {

    public List<NhanVienDto> parseEmp(MultipartFile file) throws IOException {
        List<NhanVienDto> list = new ArrayList<>();
        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);

        for (Row row : sheet) {
            if (row.getRowNum() == 0) continue;

            NhanVienDto emp = new NhanVienDto();
            emp.setHoTen(row.getCell(1).getStringCellValue());

            String sdt = row.getCell(2).getStringCellValue();
            TaiKhoanDto tk = new TaiKhoanDto(sdt, sdt);
            emp.setTaiKhoan(tk);

            // 👉 Tách ID từ chuỗi dạng "3 - Sản xuất"

            int chucVuId = extractIdFromDropdown(row.getCell(4));
            int boPhanId = extractIdFromDropdown(row.getCell(5));

            System.out.println("id bo phan: " + boPhanId);

//            int xuongId = extractIdFromDropdown(row.getCell(6));
//            int khuId = extractIdFromDropdown(row.getCell(7));

            emp.setBoPhan(new BoPhanDto(boPhanId, ""));
            emp.setChucVu(new ChucVuDto(chucVuId, ""));
            emp.setXuong(new XuongDto(1, ""));
            emp.setKhu(new KhuDto(1, ""));

            list.add(emp);
        }

        workbook.close();
        return list;
    }

    // ✅ Hàm tách ID từ chuỗi dạng "3 - Sản xuất"
    private int extractIdFromDropdown(Cell cell) {

        System.out.println("type cell: "+cell.getCellType());

        if(cell != null && cell.getCellType() == CellType.NUMERIC){
            return (int) cell.getNumericCellValue();
        }

        if (cell == null || cell.getCellType() != CellType.STRING) {
            return 0;
        }

        String value = cell.getStringCellValue();
        try {
            String idStr = value.split(" - ")[0].trim();
            return Integer.parseInt(idStr);
        } catch (Exception e) {
            return 0; // hoặc throw nếu muốn bắt lỗi rõ ràng
        }
    }

    public List<KhachHangDto> parseCus(MultipartFile file) throws IOException {
        List<KhachHangDto> list = new ArrayList<>();
        Workbook wb = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = wb.getSheetAt(0);

        for(Row row : sheet){
            if(row.getRowNum() == 0) continue;

            KhachHangDto dto = new KhachHangDto();
            dto.setTenKhachHang(row.getCell(1).getStringCellValue());
            int dt = (int) row.getCell(2).getNumericCellValue();
            dto.setSdt(String.valueOf(dt));
            dto.setDiaChi(row.getCell(3).getStringCellValue());

            list.add(dto);
        }

        wb.close();

        return list;
    }
}
