import { Button, Divider, Form, Input, Result, Typography } from 'antd'
import React, { use, useEffect } from 'react'
import { data, useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../helpers/formatData'
import Title from 'antd/es/skeleton/Title'
const ThongBaoTK = ({dataXN}) => {

  const { Text , Title} = Typography;
    const navigate = useNavigate()
    const donHang = () =>{
        navigate('/donhang')
    }
  return (
    <>
      <Title level={3}>Đơn hàng đã được tạo</Title>
   <Form layout="vertical">
    <Form.Item label="Mã đơn hàng">
      <Input value={dataXN?.don?.maDonHang} readOnly/>
      </Form.Item>
      <Form.Item label="Tổng tiền">
      <Input value={formatCurrency(dataXN?.don?.gia)} readOnly/>
      </Form.Item>
      <Divider />
      {dataXN?.donCT?.map(i=>{
        return (
          <div key={i.id}>
            <Form.Item label="Tên sản phẩm" >
              <Input value={i.sanPham.tenSP} readOnly />
            </Form.Item>
            <Form.Item label="Số lượng" >
              <Input value={i.soLuong} readOnly />
            </Form.Item>
            <Form.Item label="Chiều dài">
              <Input value={i.chieuDai} readOnly />
            </Form.Item>
            <Form.Item label="Chiều rộng">
              <Input value={i.chieuRong} readOnly />
            </Form.Item>
            <Form.Item label="Đơn giá">
              <Input value={formatCurrency(i.donGia)} readOnly />
            </Form.Item>
            <Divider />
          </div>
        )
      })}
   </Form>
    </>
  )
}

export default ThongBaoTK