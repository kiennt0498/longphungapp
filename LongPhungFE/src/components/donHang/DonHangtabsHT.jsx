import { Button, Card, Col, Divider, Empty, Form, Popconfirm, Row, Tooltip } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import SearchForm from '../common/SearchForm'
import { IoEyeSharp, IoTrashBin } from 'react-icons/io5'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import ModalHuyDon from './ModalHuyDon'
import DonHangService from '../../services/DonHangService'
import { toast } from 'react-toastify'
import { API_SOCKET } from '../../services/constans'


const DonHangtabsHT = ({listHT,format,showModalHuy}) =>{
    
  if(listHT.length === 0){
    return(
        <Empty/>
    )
  }
  return (
    <div style={{ padding: 20 }}>
    <Row gutter={[5, 5]}>
      {listHT.map((item) => (
        <Col span={6} key={item.maDonHang}>
          <Card
            title={item.maDonHang}
            extra={
              <Row>
                <Col span={11}>
                <Popconfirm
                  title="Hủy đơn hàng"
                  description="Bạn có chắc chắn muốn hủy đơn hàng này?"
                  onConfirm={() => showModalHuy(item.id)}
                
                  okText="Có"
                  cancelText="Không"
                >
                  <Tooltip title="Hủy đơn" color="red">
                    <Button color="red" variant="outlined" >
                      <IoTrashBin />
                    </Button>
                  </Tooltip>
                  </Popconfirm>
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
  </div>
  )
}

export default DonHangtabsHT