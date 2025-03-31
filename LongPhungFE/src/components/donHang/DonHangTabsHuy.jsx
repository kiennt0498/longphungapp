import { Button, Card, Col, Divider, Empty, Popconfirm, Row, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import SearchForm from '../common/SearchForm'
import { IoEyeSharp } from 'react-icons/io5'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import ModalDonCT from './ModalDonCT'
import { API_SOCKET } from '../../services/constans'

const DonHangTabsHuy = ({edit,format}) =>{
   const socket = SockJS(API_SOCKET);
   const stompClient = React.useRef(null);
   const [donHangs, setDonHangs] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [bill, setBill] = useState({});
   
   const showModal = (data) => {
    setBill(data)
    setIsModalOpen(true);
   }
   const handleCancel = () => {
    setIsModalOpen(false);
   }

  useEffect(() => {
        const id = "NV00001";
        stompClient.current = new Client({
          webSocketFactory: () => socket,
          onConnect: () => {
            // Subscribe để nhận danh sách việc
            stompClient.current.subscribe("/topic/donhuy/" + id, (message) => {
              setDonHangs(JSON.parse(message.body));
            });
    
            // Gửi yêu cầu lấy danh sách việc ngay khi kết nối thành công
            stompClient.current.publish({
              destination: "/app/getDonHuy",
              body: id,
            });
          },
        });
    
        stompClient.current.activate();
    
        return () => {
          if (stompClient.current) {
            stompClient.current.deactivate();
          }
        };
      }, []);
  if(donHangs.length === 0){
      return(
          <Empty/>
      )
    }
  return (
    <div style={{ padding: 20 }}>
    <Row gutter={[5, 5]}>
      {donHangs.map((item) => (
        <Col span={6} key={item.maDonHang}>
          <Card
            title={item.maDonHang}
            extra={
              <Row>
                <Col span={11}>
                  <Tooltip title="Xem chi tiết" color="green">
                    <Button color="green" variant="outlined" onClick={() => showModal(item)}>
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

export default DonHangTabsHuy