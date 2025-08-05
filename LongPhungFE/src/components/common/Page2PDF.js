import React from "react";
import { Table, Typography, Divider } from "antd";
import { formatCurrency } from "../../helpers/formatData";
import { tinhGiaNguyenLieuItem } from "../../helpers/CongThucTinhGia";

const { Title } = Typography;

const Page2PDF = ({ nguyenLieu = [], congDoan = [] }) => {
  const congDoanWithId = congDoan.map((item, index) => ({
    ...item,
    _id: `${item.tenCongDoan}-${index}`,
  }));

  const nguyenLieuColumns = [
    { title: "Tên nguyên liệu", dataIndex: "ten" },
    {
      title: "Giá nguyên liệu",
      dataIndex: "giaNhap",
      render: (_, record) => {
        const gia = tinhGiaNguyenLieuItem(
          record,
          record.dai || 0,
          record.rong || 0
        );
        return formatCurrency(gia * record.loiNhuan);
      },
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      render: (_, record) => record.soLuong || 0,
    },
    {
      title: "Tổng",
      dataIndex: "tongNL",
      render: (_, record) => {
        const gia = tinhGiaNguyenLieuItem(
          record,
          record.dai || 0,
          record.rong || 0
        );
        return formatCurrency((record.soLuong || 0) * gia * record.loiNhuan);
      },
    },
  ];

  const congDoanColumns = [
    { title: "Tên công đoạn", dataIndex: "tenCongDoan" },
    // { title: "Tên phụ liệu", dataIndex: "tenPhuLieu" },
    {
      title: "Giá phụ liệu",
      dataIndex: "giaMuaNguyenLieu",
      render: (_, record) => {
        const gia =
          record.giaMuaNguyenLieu +
          record.heSoThuMua * (record.dai * record.rong);
        return formatCurrency(gia * record.loiNhuan);
      },
    },
    { title: "Hao hụt máy móc", dataIndex: "khauHaoMay" },
    { title: "Công nhân viên", dataIndex: "congNV" },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      render: (_, record) => record.soLuong || 0,
    },
    {
      title: "Tổng",
      dataIndex: "tongCD",
      render: (_, record) => {
        const gia =
          record.giaMuaNguyenLieu +
          record.heSoThuMua * (record.dai * record.rong);
        return formatCurrency(gia * record.loiNhuan * (record.soLuong || 0));
      },
    },
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
        rowKey="ten"
        bordered
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={3} align="left">
              Tổng giá nguyên liệu
            </Table.Summary.Cell>
            <Table.Summary.Cell>
              {formatCurrency(
                nguyenLieu.reduce((total, item) => {
                  const gia = tinhGiaNguyenLieuItem(
                    item,
                    item.dai || 0,
                    item.rong || 0
                  );
                  const soLuong = item.soLuong || 0;
                  const loiNhuan = item.loiNhuan || 1;
                  return total + soLuong * gia * loiNhuan;
                }, 0)
              )}
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />

      <Divider orientation="left">2. Giá công đoạn sản xuất</Divider>
      <Table
        columns={congDoanColumns}
        dataSource={congDoanWithId}
        pagination={false}
        rowKey={"_id"}
        bordered
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={5} align="left">
              Tổng giá công đoạn
            </Table.Summary.Cell>
            <Table.Summary.Cell>
              {formatCurrency(
                congDoanWithId.reduce((total, item) => {
                  const soLuong = item.soLuong || 0;
                  const giaMua = item.giaMuaNguyenLieu || 0;
                  const heSo = item.heSoThuMua || 0;
                  const dai = item.dai || 0;
                  const rong = item.rong || 0;
                  const loiNhuan = item.loiNhuan || 1;
                  const gia = giaMua + heSo * (dai * rong);
                  return total + soLuong * gia * loiNhuan;
                }, 0)
              )}
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </div>
  );
};

export default Page2PDF;
