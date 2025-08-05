import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const ThongBaoTK = ({donMoi}) => {
    const navigate = useNavigate()

    const donHang = () =>{
        navigate('/donhang')
    }
  return (
    <Result
    status="success"
    title="Lên đơn hàng thành công"
    subTitle="Có thể tạo đơn mới hoặc vào phần đơn hàng duyệt đơn"
    extra={[
      <Button type="primary" onClick={donMoi}>
        Tạo đơn mới
      </Button>,
      <Button onClick={donHang}>Đến đơn hàng</Button>,
    ]}
  />
  )
}

export default ThongBaoTK