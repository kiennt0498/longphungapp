import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const KeychainCustomerInfo = () => {
  const khachHang = useSelector((state) => state.KhachHang.khachHang);
  return(
  <Row gutter={16}>
    <Col xs={24} md={12}>
      <Form.Item
        initialValue={khachHang.name}
        name="tenKhachHang"
        label="Họ và tên"
        rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên của bạn" size="large" />
      </Form.Item>
    </Col>
    <Col xs={24} md={12}>
      <Form.Item
        initialValue={khachHang.phone}
        name="sdt"
        label="Số điện thoại"
        rules={[
          { required: true, message: 'Vui lòng nhập số điện thoại!' },
          { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
        ]}
      >
        <Input prefix={<PhoneOutlined />} placeholder="0123 456 789" size="large" />
      </Form.Item>
    </Col>
    <Col xs={24}>
      <Form.Item
        initialValue={khachHang.email}
        name="email"
        label="Email (tùy chọn)"
        rules={[{ type: 'email', message: 'Email không hợp lệ!' }]}
      >
        <Input prefix={<MailOutlined />} placeholder="your@email.com" size="large" />
      </Form.Item>
    </Col>
  </Row>
)};

export default KeychainCustomerInfo;
