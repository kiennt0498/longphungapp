import { Col, Form, Input, Modal, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SanPhamService from "../../services/SanPhamService";

const ModalDonHang = ({ open, handleOk, handleCancel, addSp, products }) => {
  const sanPhams = useSelector((state) => state.SanPham.sanPhams);
  const [listSP, setListSP] = useState([]);
  const [loai, setLoai] = useState([]);
  const [chatLieu, setChatLieu] = useState([]);

  // Trạng thái bộ lọc
  const [searchText, setSearchText] = useState("");
  const [selectedLoai, setSelectedLoai] = useState(null);
  const [selectedChatLieu, setSelectedChatLieu] = useState(null);

  const service = new SanPhamService();

  // Lấy danh sách loại sản phẩm và chất liệu
  const getData = async () => {
    const res = await service.getTruong();
    if (res.data) {
      setLoai(res.data.theLoaiSP);
      setChatLieu(res.data.chatLieuSP);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Lọc danh sách sản phẩm dựa trên bộ lọc
  useEffect(() => {
    let filteredSP = sanPhams.filter(
      (item) => !products.some((p) => p.id === item.id) // Loại bỏ sản phẩm đã chọn
    );

    if (searchText) {
      filteredSP = filteredSP.filter((item) =>
        item.tenSP.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedLoai) {
      filteredSP = filteredSP.filter(
        (item) => item.loaiSp?.id === selectedLoai
      );
    }

    if (selectedChatLieu) {
      filteredSP = filteredSP.filter(
        (item) => item.chatLieu?.id === selectedChatLieu
      );
    }

    setListSP(filteredSP);
  }, [products, sanPhams, searchText, selectedLoai, selectedChatLieu]);

  const filteSP = (data) => {
    addSp(data);
  };

  const columnsSP = [
    { title: "id", dataIndex: "id", key: "id" },
    { title: "Sản phẩm", dataIndex: "tenSP", key: "tenSP" },
    {
      title: "Loại",
      dataIndex: "loaiSp",
      key: "loaiSp",
      render: (data) => (data ? `${data.ten}` : "N/A"),
    },
    {
      title: "Chất liệu",
      dataIndex: "chatLieu",
      key: "chatLieu",
      render: (data) => (data ? `${data.ten}` : "N/A"),
    },
    { title: "Màu nền", dataIndex: "mauSP", key: "mauSP" },
    { title: "Kiểu màu nền", dataIndex: "kieuMau", key: "kieuMau" },
    { title: "Giá", dataIndex: "gia", key: "gia" },
  ];

  return (
    <Modal
      width="80%"
      title="Chọn sản phẩm"
      open={open}
      onOk={() => handleOk()}
      onCancel={() => handleCancel()}
    >
      <Row gutter={16} style={{ marginBottom: "16px" }}>
        <Col>
          <Input
            style={{ width: "30vh" }}
            placeholder="Nhập tên sản phẩm"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Item label="Loại sản phẩm">
            <Select
              style={{ width: "20vh" }}
              value={selectedLoai}
              onChange={(value) => setSelectedLoai(value)}
              allowClear
            >
              {loai.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.ten}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Chất liệu">
            <Select
              style={{ width: "20vh" }}
              value={selectedChatLieu}
              onChange={(value) => setSelectedChatLieu(value)}
              allowClear
            >
              {chatLieu.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.ten}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Table
        columns={columnsSP}
        dataSource={listSP}
        rowKey="id"
        onRow={(record) => ({
          onDoubleClick: () => filteSP(record),
        })}
      />
    </Modal>
  );
};

export default ModalDonHang;
