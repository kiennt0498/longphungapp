import { Button, Card, Col, Divider, Empty, Modal, Popconfirm, Row, Tooltip } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import SearchForm from '../common/SearchForm'
import { IoEyeSharp } from 'react-icons/io5'
import ModalDonCT from './ModalDonCT'

const DonHangTabsTK = ({listTK,format}) =>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bill, setBill] = useState({})


  const showModal = (data) => {
    setBill(data)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };   
  
  if(listTK.length === 0){
      return(
          <Empty/>
      )
    }
  return (
    <div style={{ padding: 20 }}>
    <Row gutter={[5, 5]}>
      {listTK.map((item) => (
        <Col span={6} key={item.maDonHang}>
          <Card
            title={item.maDonHang}
            extra={
              <Row>
                <Col span={11}>
                  <Tooltip title="Xem chi tiết" color="green">
                    <Button color="green" variant="outlined" onClick={()=>showModal(item)}>
                      <IoEyeSharp />
                    </Button>
                  </Tooltip>
                </Col>
              </Row>
            }
            style={{ paddingLeft: "7%", width: "100%" }}
          >
            <p>Khách hàng: {item.khachHang.tenKhachHang}</p>
            <p>Số điện thoại: {item.khachHang.sdt}</p>
            <p>Ngày chốt đơn: {item.ngayChotDon}</p>
            <p>Ngày giao hàng: {item.ngayGiaoHang}</p>
            <p>Giá: {format(item.gia)}</p>
            <p>Trạng thái: {item.trangThai}</p>
          </Card>
        </Col>
      ))}
      
    </Row>

    <ModalDonCT isModalOpen={isModalOpen} handleCancel={handleCancel} data={bill}/>
    
  </div>
  )
}

export default DonHangTabsTK