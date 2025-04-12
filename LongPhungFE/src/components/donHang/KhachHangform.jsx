import { Button, Col, Divider, Form, Input, Row, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import Column from "antd/es/table/Column";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const KhachHangform = ({ khachHangs, form }) => {
  const [data, setData] = useState([]);
  const khachHang = useSelector((state) => state.KhachHang.khachHang);

  console.log(khachHang);

  const filterData = (value) => {
    const filter = khachHangs.filter((item) => {
      return item.sdt.includes(value) || item.tenKhachHang.includes(value);
    });
    setData(filter);
  };

  const handleReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (khachHang) {
      form.setFieldsValue({
        id: khachHang.id,
        sdt: khachHang.sdt,
        tenKhachHang: khachHang.tenKhachHang,
        diaChi: khachHang.diaChi,
      });
    }
  }, []);

  useEffect(() => {
    setData(khachHangs);
  }, [khachHangs]);

  return (
    <Row>
      <Col span={11}>
        <Form.Item>
          <Button type="primary" onClick={handleReset}>
            Làm mới
          </Button>
        </Form.Item>

        <Form.Item label="Số thứ tự" name="id">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="sdt"
          onChange={(e) => filterData(e.target.value)}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
            },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item
          label="Tên khách hàng"
          name="tenKhachHang"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên khách hànghàng",
            },
          ]}
        >
          <Input placeholder="Nhập khách hàng" />
        </Form.Item>
        <Form.Item label="Địa chỉ nhận hàng" name="diaChi">
          <TextArea rows={9} placeholder="Nhập địa chỉ nhận hàng" />
        </Form.Item>

        <Form.Item label="Nhân viên liên đơn" name="nhanVien">
          <Input disabled />
        </Form.Item>
      </Col>
      <Divider style={{ height: "100%", minHeight: "30rem" }} type="vertical" />
      <Col span={12}>
        <h2>Danh sách khách hàng</h2>
        <Table
          dataSource={data}
          rowKey="id"
          onRow={(record) => ({
            onDoubleClick: () => {
              form.setFieldsValue({
                id: record.id,
                sdt: record.sdt,
                tenKhachHang: record.tenKhachHang,
              });
            },
          })}
        >
          <Column title="Stt" dataIndex="id" key="id" />
          <Column title="Số điện thoại" dataIndex="sdt" key="sdt" />
          <Column
            title="Tên khách hàng"
            dataIndex="tenKhachHang"
            key="tenKhachHang"
          />
        </Table>
      </Col>
    </Row>
  );
};

export default KhachHangform;
