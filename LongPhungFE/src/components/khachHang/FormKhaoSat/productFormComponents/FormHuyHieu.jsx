import React from "react";
import { Form, Input, Select, Row, Col, InputNumber } from "antd";
import TinhTienField from "./TinhTienField";

const { Option } = Select;

const FormHuyHieu = ({ index, setGia, sanpham }) => (
  <Row gutter={16}>
    <Col xs={24} md={12}>
      <Form.Item name="tenSanPham" label="Tên mẫu (tùy chọn)">
        <Input placeholder="VD:Huy hiệu Nguyễn Văn A" size="large" />
      </Form.Item>
    </Col>
    <Col xs={12} md={12}>
      <Form.Item name="kichThuoc" label="Kích thước">
        <InputNumber
          placeholder="VD: 50 x 60"
          size="large"
          style={{ width: "100%" }}
        />
      </Form.Item>
    </Col>

    {/* <Col xs={24}>
      <TinhTienField index={index} setGia={setGia} sanPham={sanpham}/>
    </Col> */}
  </Row>
);

export default FormHuyHieu;
