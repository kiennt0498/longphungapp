import React from "react";
import { Form, Input, Row, Col, InputNumber } from "antd";
import TinhTienField from "./TinhTienField";

const FormBinhGiuNhiet = ({index,setGia,sanPham}) => (
  <Row gutter={16}>
    <Col xs={24} md={12}>
      <Form.Item
        name="tenSanPham"
        label="Tên mẫu"
        
      >
        <Input placeholder="VD: Bình giữ nhiệt sao long" size="large" />
      </Form.Item>
    </Col>
    <Col xs={12} md={12}>
            <Form.Item name="kichThuoc" label="Kích thước" >
              <InputNumber placeholder="VD: 500ml" size="large" style={{ width: "100%" }}/>
            </Form.Item>
          </Col>
    {/* <Col xs={24}>
      <TinhTienField index={index} setGia={setGia} sanPham={sanPham}/>
    </Col> */}
  </Row>
);

export default FormBinhGiuNhiet;
