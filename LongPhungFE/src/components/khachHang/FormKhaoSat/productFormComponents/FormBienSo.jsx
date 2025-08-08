import React from 'react';
import { Form, Input, Select, Row, Col, InputNumber } from 'antd';
import TinhTienField from './TinhTienField';

const { Option } = Select;

const FormBienSo = ({index,setGia,sanPham}) => (
  <Row gutter={16}>
    <Col xs={24} md={12}>
      <Form.Item
        name="tenSanPham"
        label="Tên mẫu"
       
      >
        <Input placeholder="VD:Biển Nguyễn Văn A" size="large" />
      </Form.Item>
    </Col>
    {/* <Col xs={24}>
      <TinhTienField index={index} setGia={setGia} sanPham={sanPham}/>
    </Col> */}
    
  </Row>
);

export default FormBienSo;
