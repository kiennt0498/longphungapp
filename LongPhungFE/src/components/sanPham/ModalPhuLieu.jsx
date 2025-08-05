import { Col, Form, Input, Modal, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";

const ModalPhuLieu = ({
  open,
  handleOk,
  handleCancel,
  addSp,
  products,
  data,
}) => {
  const [listSP, setListSP] = useState([data]);

  // Trạng thái bộ lọc
  const [searchText, setSearchText] = useState("");

  // Lọc danh sách sản phẩm dựa trên bộ lọc
  useEffect(() => {
    if (data && Array.isArray(data)) {
      let filteredSP = data.filter(
        (item) => !products.some((p) => p.id === item.id)
      );
  
      if (searchText) {
        filteredSP = filteredSP.filter((item) =>
          item.ten?.toLowerCase().includes(searchText.toLowerCase())
        );
      }
  
      setListSP(filteredSP);
    }
  }, [data, products, searchText]);

  const filteSP = (data) => {
    addSp(data);
  };

  const columnsSP = [
    { title: "id", dataIndex: "id", key: "id" },
    { title: "Sản phẩm", dataIndex: "ten", key: "ten" },
    { title: "Giá", dataIndex: "giaNhap", key: "giaNhap" },
  ];
  return (
    <Modal
      width="80%"
      title="Chọn nguyên liệu"
      open={open}
      onOk={() => handleOk()}
      onCancel={() => handleCancel()}
    >
      <Row gutter={16} style={{ marginBottom: "16px" }}>
        <Col>
          <Input
            style={{ width: "30vh" }}
            placeholder="Nhập tên nguyên liệu"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
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

export default ModalPhuLieu;
