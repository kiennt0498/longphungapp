import React from "react";
import { Form, Input, Row, Col, InputNumber } from "antd";
import TinhTienField from "./TinhTienField";

const FormBinhGiuNhiet = ({index,setGia,sanPham}) => (
  <Row gutter={16}>
    <Col xs={24} md={12}>
      <Form.Item
        name="tenSanPham"
        label="Tên/Thông tin cần khắc"
        rules={[
          { required: true, message: "Vui lòng nhập thông tin cần khắc!" },
        ]}
      >
        <Input placeholder="VD: Nguyễn Văn A, 0909xxxxxx" size="large" />
      </Form.Item>
    </Col>
    <Col xs={24}>
      <TinhTienField index={index} setGia={setGia} sanPham={sanPham}/>
    </Col>
  </Row>
);

export default FormBinhGiuNhiet;
