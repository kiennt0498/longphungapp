import React from 'react';
import { Form, Input, Select, Row, Col, InputNumber } from 'antd';
import TinhTienField from './TinhTienField';

const { Option } = Select;

const materials = [
  { value: "mica", label: "Mica (Acrylic)" },
  { value: "metal", label: "Kim loại (Inox)" },
  { value: "plastic", label: "Nhựa" },
  { value: "wood", label: "Gỗ" },
  { value: "other", label: "Khác (ghi rõ trong ghi chú)" },
];

const FormTem = ({index,setGia, sanPham}) => (
  <Row gutter={16}>
    <Col xs={24} md={12}>
      <Form.Item
        name="bienSoTen"
        label="Tên/Thông tin cần khắc"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin cần khắc!' }]}
      >
        <Input placeholder="VD: Nguyễn Văn A, 0909xxxxxx" size="large" />
      </Form.Item>
    </Col>
    
    <Col xs={24}>
      <TinhTienField index={index} setGia={setGia} sanPham={sanPham}/>
    </Col>
  </Row>
);

export default FormTem;
