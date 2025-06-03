import { Button, Col, Divider, Form, Input, Modal, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import DonHangService from '../../services/DonHangService'
import { toast } from 'react-toastify'



const ModalChotDon = ({handleCancel,isModalOpen,data,products}) => {
    const service = new DonHangService()
    const {  Text } = Typography;

   console.log(data)
   console.log(products)
   


    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    };
  
    const calculateSubtotal = () => {
      return products.reduce(
        (sum, product) => sum + product.donGia * product.soLuong,
        0
      );
    };


    const handleChotDon = async (id) => {
      const res = await service.chotBill(id)
      if(res.status === 200){
        toast.success("Chốt đơn thành công")
        handleCancel()
    }else{
      toast.error("Chốt đơn thất bại")
    }
  }
    

  
  
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.08;
    
    const total = subtotal + tax;

  return (
    <>
    <Modal width={900} title="Đơn hàng" open={isModalOpen} onCancel={handleCancel} footer={null}>
    <Text strong>Thông tin khách hàng</Text>
      <Row gutter={16}>
        <Col span={11}>
          <Text>Tên khách hàng: {data && data.khachHang ? data.khachHang.tenKhachHang : ''}</Text>
        </Col>
        <Col span={11} offset={2}>
          <Text>Số điện thoại: {data && data.khachHang ? data.khachHang.sdt : ''}</Text>
        </Col>
      </Row>

      <Text>Địa chỉ nhận hàng: </Text>


      <Divider />

      <div className="space-y-2">
        <Text strong className="text-lg">
          Chi tiết đơn hàng
        </Text>

        {products
          .filter((p) => p.soLuong > 0)
          .map((product) => (
            <div key={product.id} className="flex justify-between">
              <Row>
                <Col span={6}>
                  <Text>
                    {product.sanPham.tenSP} x {product.soLuong}
                  </Text>
                </Col>
                <Col span={6} offset={12} style={{ textAlign: "right" }}>
                  <Text>
                    {formatCurrency(product.donGia * product.soLuong)}
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


        <Divider/>

        <div className="flex justify-between pt-2 border-t">
          <Row>
            <Col span={6}>
              <Text strong style={{fontSize: "20px"}}>Tổng:</Text>
            </Col>
            <Col span={6} offset={12} style={{ textAlign: "right" }}>
              <Text strong  style={{fontSize: "20px"}}>{formatCurrency(total)}</Text>
            </Col>
          </Row>
        </div>
      </div>
      <Divider/>
      <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
        <Row gutter={[16]}>
            <Col><Button type="primary" onClick={() => handleChotDon(data.maDonHang)}>Xác nhận thanh toán</Button></Col>
        </Row>
      </Form.Item>

      </Modal>
      </>

  )
}

export default ModalChotDon