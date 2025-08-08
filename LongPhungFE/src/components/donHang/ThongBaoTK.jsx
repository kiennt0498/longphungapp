import { Button, Card, Col, Divider, Form, Result, Row, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const ThongBaoTK = ({donMoi, finalData}) => {
  const {  Text } = Typography;
    const navigate = useNavigate()
  console.log(finalData);
  
    const donHang = () =>{
        navigate('/donhang')
    }
  return (
    <Row align="top">
      <Col span={11}>
      <Card>
        <p>
              <Text strong>Mã đơn hàng:</Text> {finalData?.tenSanPham || "Chưa xác định"}
            </p>
      </Card>
        
      </Col>

      <Divider style={{ height: "100%", minHeight: "30rem" }} type="vertical" />

      <Col flex="auto">
        <h2>Thông tin sản phẩm</h2>
        {finalData?.donCT?.map((sp, index) => (
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
  )
}

export default ThongBaoTK