
import React from "react";
import { Table, Typography, Divider } from "antd";

const { Title } = Typography;

const Page2PDF = ({ nguyenLieu = [], congDoan = [] }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const nguyenLieuColumns = [
    { title: "Tên nguyên liệu", dataIndex: "tenNguyenLieu" },
    { title: "Đơn giá", dataIndex: "giaNguyenLieu", render: formatCurrency },
    { title: "Hệ số thu mua", dataIndex: "heSoThuMua" },
    { title: "Hệ số bù", dataIndex: "heSoBu" },
  ];

  const congDoanColumns = [
    { title: "Tên công đoạn", dataIndex: "tenCongDoan" },
    { title: "Tên phụ liệu", dataIndex: "tenPhuLieu" },
    { title: "Giá phụ liệu", dataIndex: "giaPhuLieu", render: formatCurrency },
    { title: "Hao hụt máy móc", dataIndex: "haoHutMayMoc" },
    { title: "Hao hụt nhân sự", dataIndex: "haoHutNhanSu" },
    { title: "Hệ số tiền công", dataIndex: "heSoTienCong" },
  ];

  return (
    <div style={{ padding: 20, backgroundColor: "white" }}>
      <Title level={4} style={{ textAlign: "center", color: "#0050b3" }}>
        CHI TIẾT GIÁ SẢN XUẤT SẢN PHẨM
      </Title>

      <Divider orientation="left">1. Giá nguyên liệu sản xuất</Divider>
      <Table
        columns={nguyenLieuColumns}
        dataSource={nguyenLieu}
        pagination={false}
        rowKey="tenNguyenLieu"
        bordered
      />

      <Divider orientation="left">2. Giá công đoạn sản xuất</Divider>
      <Table
        columns={congDoanColumns}
        dataSource={congDoan}
        pagination={false}
        rowKey="tenCongDoan"
        bordered
      />
    </div>
  );
};

export default Page2PDF;
