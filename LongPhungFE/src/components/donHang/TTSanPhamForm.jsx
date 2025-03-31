import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  InputNumber,
  Row,
  Col,
  message,
  Form,
  Divider,
  Checkbox,
} from "antd";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import Column from "antd/es/table/Column";
import { DeleteOutlined } from "@ant-design/icons";

const TTSanPhamForm = () => {
  const [data, setData] = useState([]);
  const [checkBox, setCheckBox] = useState(true);


  const onChange = () => {
    setCheckBox(!checkBox);
  };

  // Hàm xóa hàng
  const deleteRow = (key) => {
    setData(data.filter((row) => row.key !== key));
  };

  const columnsSP = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Chất liệu",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Màu nền",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Kiểu màu nền",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "giá",
      dataIndex: "age",
      key: "age",
    },
    
  ];

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ghi chú",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Chiều dài",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Chiều rộng",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Số lượng",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Đơn giá",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button type="link" danger onClick={() => deleteRow(record.key)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return (
    <>
      
        <Row style={{ marginBottom: "3%" }} gutter={[16,1]}>
          <Col span={10}>
            <Input placeholder="Tìm kiếm sản phẩm"></Input>
          </Col>
          <Col span={4}>
            <Button type="primary">Tạo sản phẩm</Button>
          </Col>
        </Row>
        <Row >
        <Col span={24}><Table columns={columnsSP} dataSource={data} /></Col>
        </Row>
      
      <Divider />
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </>
  );
};

export default TTSanPhamForm;
