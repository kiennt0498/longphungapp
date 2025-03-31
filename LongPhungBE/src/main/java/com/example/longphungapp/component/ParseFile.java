package com.example.longphungapp.component;

import com.example.longphungapp.dto.NhanVienDto;
import com.example.longphungapp.dto.TaiKhoanDto;
import com.example.longphungapp.fileEnum.BoPhan;
import com.example.longphungapp.fileEnum.ChucVu;
import com.example.longphungapp.fileEnum.TacVu;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
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

        for (Row row: sheet) {
            if(row.getRowNum() == 0) continue;

            NhanVienDto emp = new NhanVienDto();
            emp.setHoTen(row.getCell(1).getStringCellValue());
            int sdt = (int) row.getCell(2).getNumericCellValue();
            TaiKhoanDto tk = new TaiKhoanDto(String.valueOf(sdt),"");
            emp.setTaiKhoan(tk);
            emp.setDiaChi(row.getCell(3).getStringCellValue());
            emp.setBoPhan(BoPhan.valueOf(row.getCell(4).getStringCellValue()));
            emp.setChucVu(ChucVu.valueOf(row.getCell(5).getStringCellValue()));
            emp.setTacVu(TacVu.valueOf(row.getCell(6).getStringCellValue()));

            list.add(emp);
        }

        workbook.close();

        return list;
    }
}
