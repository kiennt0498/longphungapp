import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const KhachHangform = ({ donHang, form, donCT }) => {
  const [data, setData] = useState([]);
  
  const maNV = localStorage.getItem("maNV");
  const { Title, Text } = Typography;

  console.log(donHang);
  

  if (donHang?.khachHang) {
  form.setFieldsValue({
    id: donHang.khachHang.id || "",
    sdt: donHang.khachHang.sdt || "",
    tenKhachHang: donHang.khachHang.tenKhachHang || "",
    diaChi: donHang.khachHang.diaChi || "",
  });
}

  return (
    <Row align="top">
      <Col span={11}>
        <Form.Item label="Mã khách hàng" name="id">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="sdt"
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
              message: "Vui lòng nhập tên khách hàng",
            },
          ]}
        >
          <Input placeholder="Nhập khách hàng" />
        </Form.Item>
        <Form.Item label="Địa chỉ nhận hàng" name="diaChi">
          <TextArea rows={9} placeholder="Nhập địa chỉ nhận hàng" />
        </Form.Item>
      </Col>

      <Divider style={{ height: "100%", minHeight: "30rem" }} type="vertical" />

      <Col flex="auto">
        <h2>Thông tin sản phẩm</h2>
        {donCT.map((sp, index) => (
          <Card
            size="small"
            title={`Sản phẩm #${index + 1}`}
            type="inner"
            key={index}
            style={{ marginBottom: "16px" }}
          >
            <p>
              <Text strong>Tên sản phẩm:</Text> {sp.tenSanPham || "Chưa xác định"}
            </p>
            <p>
              <Text strong>Loại sản phẩm:</Text> {sp.loaiSp?.ten || "Chưa xác định"}
            </p>
            <p>
              <Text strong>Kích thước:</Text> {sp.kichThuoc || "Chưa xác định"}
            </p>
            <p>
              <Text strong>Hình dạng:</Text> {sp.hinhDang?.ten || "Chưa xác định"}
            </p>
            <p>
              <Text strong>Mô tả thiết kế:</Text> {sp.noiDungThietKe || ""}
            </p>
            {sp.yeuCauDacBiet && (
              <p>
                <Text strong>Yêu cầu đặc biệt:</Text> {sp.yeuCauDacBiet}
              </p>
            )}
          </Card>
        ))}
      </Col>
    </Row>
  );
};

export default KhachHangform;
