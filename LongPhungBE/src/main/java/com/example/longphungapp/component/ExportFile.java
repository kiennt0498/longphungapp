package com.example.longphungapp.component;

import com.example.longphungapp.dto.BaoCaoSP;
import com.example.longphungapp.entity.KhachHang;
import com.example.longphungapp.entity.NhanVien;
import com.example.longphungapp.repository.DonHangCTRepository;
import com.example.longphungapp.repository.KhachHangRepository;
import com.example.longphungapp.repository.NhanVienRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ExportFile {

    @Autowired
    NhanVienRepository dao;
    @Autowired
    KhachHangRepository khDao;
    private final DonHangCTRepository donHangCTRepository;

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
            row.createCell(4).setCellValue(nv.getBoPhan().getTen());
            row.createCell(5).setCellValue(nv.getKhu().getTen());
            row.createCell(6).setCellValue(nv.getXuong().getTenXuong());

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

    public byte[] exportBaoCaoSP() throws IOException {
        Workbook wb = new XSSFWorkbook();
        Sheet sheet = wb.createSheet("Báo Cáo Sản Phẩm");

        List<Object[]> result = donHangCTRepository.getBaoCaoSP();
        var list = result.stream().map(row->{
            BaoCaoSP bc = new BaoCaoSP();
            bc.setTenSP ((String) row[0]);
            bc.setSoLuong ((Long) row[1]);
            bc.setDoanhThu ((BigDecimal) row[2]);
            bc.setGiaGoc ((BigDecimal) row[3]);
            bc.setLoiNhuan ((BigDecimal) row[4]);
            return bc;
        }).toList();
        String[] tieuDe = {"Tên sản phẩm", "Số lượng bán","Doanh thu","Chi phí","Lợi nhuận"};
        int rowNum = 0;
        Row headerRow = sheet.createRow(rowNum++);
        for (int i = 0; i < tieuDe.length; i++) {
            headerRow.createCell(i).setCellValue(tieuDe[i]);
        }
        for(BaoCaoSP i : list){
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(i.getTenSP());
            row.createCell(1).setCellValue(i.getSoLuong());
            row.createCell(2).setCellValue(i.getDoanhThu().doubleValue());
            row.createCell(3).setCellValue(i.getGiaGoc().doubleValue());
            row.createCell(4).setCellValue(i.getLoiNhuan().doubleValue());
        }

        for (int i = 0; i < tieuDe.length; i++) {
            sheet.autoSizeColumn(i);
        }
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        wb.write(outputStream);
        wb.close();

        return outputStream.toByteArray();
    }
}
