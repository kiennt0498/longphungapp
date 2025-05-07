// BaoGiaEditor.jsx
import React, { useState, useRef } from "react";
import {
  Button,
  Table,
  Input,
  Form,
  Typography,
  Row,
  Col,
  Divider,
  Card,
  Drawer,
  Space,
} from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Page2PDF from "./Page2PDF";

const { Title, Text } = Typography;

const ExportPDF = ({ open, onClose, products }) => {
  const contentRef = useRef();
  const page2Ref = useRef();
  const coc = 0;

  const nguyenLieu = [
    {
      tenNguyenLieu: "Mica trong 3mm",
      giaNguyenLieu: 50000,
      heSoThuMua: 1.1,
      heSoDienTich: 1.2,
      heSoBu: 1.05,
      heSoGiaDienTich: 1.15,
    },
    {
      tenNguyenLieu: "Nhựa ABS",
      giaNguyenLieu: 35000,
      heSoThuMua: 1,
      heSoDienTich: 1.1,
      heSoBu: 1,
      heSoGiaDienTich: 1.1,
    },
  ];

  const congDoan = [
    {
      tenCongDoan: "Cắt mica laser",
      tenPhuLieu: "Mũi cắt laser",
      giaPhuLieu: 10000,
      haoHutMayMoc: 0.05,
      haoHutNhanSu: 0.1,
      heSoTienCong: 1.2,
    },
    {
      tenCongDoan: "In UV",
      tenPhuLieu: "Mực in UV",
      giaPhuLieu: 8000,
      haoHutMayMoc: 0.03,
      haoHutNhanSu: 0.08,
      heSoTienCong: 1.1,
    },
  ];

  const columns = [
    { title: "STT", width: 50, render: (_, record, index) => index + 1 },
    { title: "Tên sản phẩm", dataIndex: "tenSP", editable: true },
    { title: "Ghi chú sản phẩm", dataIndex: "ghiChu", editable: true },
    { title: "Chiều dài (mm)", dataIndex: "chieuDai", editable: true },
    { title: "Chiều rộng (mm)", dataIndex: "chieuRong", editable: true },
    { title: "Số lượng", dataIndex: "soLuong", editable: true },
    { title: "Đơn giá", render: (_, record) => formatCurrency(record.donGia) },
    {
      title: "Thành tiền",
      render: (_, record) => formatCurrency(record.soLuong * record.donGia),
    },
  ];

  const total = products.reduce(
    (sum, row) => sum + row.soLuong * row.donGia,
    0
  );
  const toatalDonGia = products.reduce((sum, row) => sum + row.donGia, 0);
  const vat = total * 0.1;
  const finalTotal = total + vat - coc;

  const exportPDF = async () => {
    try {
      // Capture trang 1 (Báo giá)
      const canvas1 = await html2canvas(contentRef.current, { scale: 2 });
      const imgData1 = canvas1.toDataURL("image/png");
  
      // Capture trang 2 (Nguyên liệu & công đoạn)
      const canvas2 = await html2canvas(page2Ref.current, { scale: 2 });
      const imgData2 = canvas2.toDataURL("image/png");
  
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
  
      // Trang 1
      const pdfHeight1 = (canvas1.height * pdfWidth) / canvas1.width;
      pdf.addImage(imgData1, "PNG", 0, 0, pdfWidth, pdfHeight1);
      
  
      // Trang 2
      pdf.addPage();
      const pdfHeight2 = (canvas2.height * pdfWidth) / canvas2.width;
      pdf.addImage(imgData2, "PNG", 0, 0, pdfWidth, pdfHeight2);
  
      // Xuất file
      pdf.save("bang-bao-gia.pdf");
  
      // Đóng Drawer
      onClose();
    } catch (error) {
      console.error("Lỗi xuất PDF:", error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width="70%"
      extra={
        <Space>
          <Button type="primary" onClick={exportPDF}>
            Xuất file
          </Button>
          <Button onClick={onClose}>Thoát</Button>
        </Space>
      }
    >
      <div
        ref={contentRef}
        style={{ padding: 20, background: "white", color: "#000" }}
      >
        <Title level={4} style={{ textAlign: "center", color: "#0050b3" }}>
          CÔNG TY CỔ PHẦN LONG LÂN QUY PHỤNG
        </Title>
        <Text strong style={{ textAlign: "center", display: "block" }}>
          Địa chỉ: Số 28/3 Nguyễn Lương Bằng, Vĩnh Linh, Quảng Trị - MST:
          3200713719
        </Text>
        <Text
          style={{ textAlign: "center", display: "block", marginBottom: 20 }}
        >
          Website: sanxuatquatangdoanhnghiep.longlanquyphung.vn | Hotline:
          0983770666
        </Text>
        <Title level={4} style={{ textAlign: "center" }}>
          BẢNG BÁO GIÁ
        </Title>
        <Text>Kính gửi Quý khách hàng:</Text> <br />
        <Text strong>Công ty Long Lân Quy Phụng</Text> xin gửi quý khách bảng
        giá sản phẩm như sau:
        <Table
          columns={columns}
          dataSource={products}
          pagination={false}
          rowKey="id"
          bordered
          summary={() => (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={6} align="left">
                  Cộng tiền hàng
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  {formatCurrency(toatalDonGia)}
                </Table.Summary.Cell>
                <Table.Summary.Cell>{formatCurrency(total)}</Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          )}
        />
        <Divider />
        <Card style={{ padding: "2%" }}>
          <Row>
            <Col span={6}>
              <Text>Tạm tính</Text>
            </Col>
            <Col span={6} offset={12} style={{ textAlign: "right" }}>
              <Text>{formatCurrency(total)}</Text>
            </Col>
          </Row>
          <Row style={{ marginTop: "1%" }}>
            <Col span={6}>
              <Text>Thuế VAT(10%)</Text>
            </Col>
            <Col span={6} offset={12} style={{ textAlign: "right" }}>
              <Text>{formatCurrency(vat)}</Text>
            </Col>
          </Row>
          <Row style={{ marginTop: "1%" }}>
            <Col span={6}>
              <Text>Đặt cọc</Text>
            </Col>
            <Col span={6} offset={12} style={{ textAlign: "right" }}>
              <Text>{formatCurrency(coc)}</Text>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={6}>
              <Text strong style={{ fontSize: "20px" }}>
                Tổng
              </Text>
            </Col>
            <Col span={6} offset={12} style={{ textAlign: "right" }}>
              <Text strong style={{ fontSize: "20px" }}>
                {formatCurrency(finalTotal)}
              </Text>
            </Col>
          </Row>
        </Card>
        <Divider />
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Text italic>Ghi chú:</Text>
          <br />
          <Text italic>
            Giao hàng tận nơi miễn phí. Thiết kế miễn phí cho đến khi khách hàng
            duyệt thiết kế.
          </Text>
          <br />
          <Text italic>
            Không cần đặt cọc trước tiền hàng với đơn hàng dưới 10 triệu
          </Text>
          <br />
          <Text italic>
            Giao hàng tận nơi, được kiểm hàng trước khi thanh toán
          </Text>
          <br />
          <Text italic>Thời gian sản xuất: 10 ngày làm việc</Text>
          <br />
          <Text
            style={{
              color: "blue",
              fontWeight: "bold",
              display: "block",
              marginTop: 10,
            }}
          >
            Cảm ơn quý khách đã quan tâm đến sản phẩm và dịch vụ của Công Ty
            Long Lân Quy Phụng!
          </Text>
        </div>
        <Text
          style={{
            color: "blue",
            fontWeight: "bold",
            display: "block",
            marginTop: 10,
            textAlign: "center",
          }}
        >
          Nhân viên báo giá: Mộng Thúy - SDT: 0983770666
          <br />
          Trưởng phòng kinh doanh: Lê Thị Kiều Oanh - SDT: 0983770666
          <br />
          Giám đốc: Nguyễn Văn Long - SDT: 0983770666
        </Text>
      </div>
      <div style={{ pageBreakBefore: "always" }} ref={page2Ref}>
        <Page2PDF nguyenLieu={nguyenLieu} congDoan={congDoan} />
      </div>
    </Drawer>
  );
};

export default ExportPDF;
