import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import DonHangService from '../../services/DonHangService';

const ModalDonCT = ({ isModalOpen, handleCancel, data }) => {
  const service = new DonHangService();
  const [products, setProducts] = useState([]);
  const { Text } = Typography;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const calculateSubtotal = () => {
    if (Array.isArray(products)) {
      return products.reduce(
        (sum, product) => sum + product.sanPham.gia * product.soLuong,
        0
      );
    }
    return 0;
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1;
  const discount = subtotal * (5 / 100);
  const total = subtotal + tax - discount;

  const getData = async () => {
    try {
      const res = await service.getDonHangCT(data.maDonHang);
      if (res && res.data) {
        setProducts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data && data.maDonHang) {
      getData();
    }
  }, [data]);

  return (
    <>
      <Modal title="Đơn hàng chi tiết" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Row>
          <Col span={11}>
            <Text>Tên khách hàng: {data && data.khachHang ? data.khachHang.tenKhachHang : "N/A"}</Text>
          </Col>
          <Col span={11} offset={2}>
            <Text>Số điện thoại: {data && data.khachHang ? data.khachHang.sdt : "N/A"}</Text>
          </Col>
        </Row>

        <Row>
          <Col span={11}>
            <Text>Địa chỉ: {data && data.khachHang ? data.khachHang.diaChi : "N/A"}</Text>
          </Col>
          <Col span={11} offset={2}>
            <Text>Trạng thái: {data ? data.trangThai : "N/A"}</Text>
          </Col>
        </Row>

        <Divider />

        <div className="space-y-2">
          <Text strong className="text-lg">
            Chi tiết đơn hàng
          </Text>

          {products.map((product) => (
            <div key={product.key} className="flex justify-between">
              <Row>
                <Col span={12}>
                  <Text>
                    {product.sanPham.tenSP} x {product.soLuong}
                  </Text>
                </Col>
                <Col span={6} offset={6} style={{ textAlign: "right" }}>
                  <Text>
                    {formatCurrency(product.sanPham.gia * product.soLuong)}
                  </Text>
                </Col>
              </Row>
            </div>
          ))}

          <Divider />

          <div className="flex justify-between">
            <Row>
              <Col span={6}>
                <Text>Tạm tính:</Text>
              </Col>
              <Col span={6} offset={12} style={{ textAlign: "right" }}>
                <Text>{formatCurrency(subtotal)}</Text>
              </Col>
            </Row>
          </div>

          <div className="flex justify-between">
            <Row>
              <Col span={6}>
                <Text>Thuế VAT(10%):</Text>
              </Col>
              <Col span={6} offset={12} style={{ textAlign: "right" }}>
                <Text>{formatCurrency(tax)}</Text>
              </Col>
            </Row>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <Row>
                <Col span={6}>
                  <Text>Chiết khấu:</Text>
                </Col>
                <Col span={6} offset={12} style={{ textAlign: "right" }}>
                  <Text>- {formatCurrency(discount)}</Text>
                </Col>
              </Row>
            </div>
          )}

          <Divider />

          <div className="flex justify-between pt-2 border-t">
            <Row>
              <Col span={6}>
                <Text strong style={{ fontSize: "20px" }}>
                  Tổng:
                </Text>
              </Col>
              <Col span={6} offset={12} style={{ textAlign: "right" }}>
                <Text strong style={{ fontSize: "20px" }}>
                  {formatCurrency(total)}
                </Text>
              </Col>
            </Row>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalDonCT;