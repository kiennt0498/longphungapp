import React from 'react';
import { Form, Input, DatePicker, Row, Col } from 'antd';

const { TextArea } = Input;

const KeychainDeliveryInfo = () => (
  <Row gutter={16}>
    <Col xs={24} md={12}>
      <Form.Item
        name="deliveryDate"
        label="Ngày cần nhận hàng"
        rules={[{ required: true, message: 'Vui lòng chọn ngày nhận hàng!' }]}
      >
        <DatePicker size="large" style={{ width: '100%' }} format="DD/MM/YYYY" />
      </Form.Item>
    </Col>
    <Col xs={24}>
      <Form.Item
        name="deliveryAddress"
        label="Địa chỉ giao hàng"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ giao hàng!' }]}
      >
        <TextArea rows={3} placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành..." />
      </Form.Item>
    </Col>
    <Col xs={24}>
      <Form.Item name="notes" label="Ghi chú khác (nếu có)">
        <TextArea rows={3} placeholder="Yêu cầu khác..." />
      </Form.Item>
    </Col>
  </Row>
);

export default KeychainDeliveryInfo;
