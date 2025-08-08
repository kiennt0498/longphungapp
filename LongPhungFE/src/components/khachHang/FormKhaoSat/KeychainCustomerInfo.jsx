import React, { use, useEffect, useState } from 'react';
import { Form, Input, Row, Col, Table } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Column from 'antd/es/table/Column';
import { setKhachHang } from '../../../redux/slide/KhachHangSlice';

const KeychainCustomerInfo = ({form}) => {
  const khachHang = useSelector((state) => state.KhachHang.khachHang);
  const khachHangs = useSelector((state) => state.KhachHang.khachHangs);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setData(khachHangs);
  }, [khachHangs]);

  useEffect(() => {
    if (khachHang) {
      form.setFieldsValue({
        id: khachHang.id,
        tenKhachHang: khachHang.tenKhachHang,
        sdt: khachHang.sdt,
      });
    }
  }, [khachHang]);

  const filterData = (value) => {
    const filter = khachHangs.filter((item) =>
      item.sdt.includes(value) || item.tenKhachHang.includes(value)
    );
    setData(filter);
  };

  return (
    <Row gutter={16}>
      <Col xs={12} md={12}>
        <h2>Thông tin khách hàng</h2>
        <Form form={form} layout="vertical">
          <Form.Item
            name="id"
            label="Mã khách hàng"
          >
            <Input prefix={<UserOutlined />} size="large" disabled />
          </Form.Item>
          <Form.Item
            name="tenKhachHang"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" size="large" />
          </Form.Item>
          <Form.Item
            name="sdt"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="0123 456 789"
              size="large"
              onChange={(e) => filterData(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Col>

      <Col xs={24} md={12}>
        <h2>Danh sách khách hàng</h2>
        <Table
          dataSource={data}
          rowKey="id"
          onRow={(record) => ({
            onDoubleClick: () => {
              dispatch(setKhachHang(record));
            },
          })}
        >
          <Column title="Mã Khách hàng" dataIndex="id" key="id" />
          <Column title="Số điện thoại" dataIndex="sdt" key="sdt" />
          <Column title="Tên khách hàng" dataIndex="tenKhachHang" key="tenKhachHang" />
        </Table>
      </Col>
    </Row>
  );
};

export default KeychainCustomerInfo;
