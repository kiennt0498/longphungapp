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


const DonHangtabsHT = ({edit,format}) =>{
  const [donHangs, setDonHangs] = useState([]);
  const socket = SockJS(API_SOCKET);
  const service = new DonHangService();
  const stompClient = useRef(null);
  const [open,setOpen] = useState(false);
  const [idHuy,setIdHuy]= useState("");
  const [form] = Form.useForm()
  

  useEffect(() => {
      const id = "NV00001";
      stompClient.current = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
          // Subscribe để nhận danh sách việc
          stompClient.current.subscribe("/topic/donhoanthanh/" + id, (message) => {
            setDonHangs(JSON.parse(message.body));
          });
  
          // Gửi yêu cầu lấy danh sách việc ngay khi kết nối thành công
          stompClient.current.publish({
            destination: "/app/getDonHT",
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

    const showMoadl = (id) =>{
      setOpen(true);
      setIdHuy(id);
    }

    const handleHuyDon = async () => {
      const lyDo = await form.getFieldValue();
      const newData = {
        id: idHuy,
        lyDo: lyDo.lyDo
      }


      
      try {
        const res = await service.huyDonHang(newData);
        if(res.status === 200){
        toast.success("Hủy đơn hàng thành công")
        }
      } catch (error) {
        console.log(error);
        toast.error("Hủy đơn hàng thất bại")
      }

    }


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
                <Popconfirm
                  title="Hủy đơn hàng"
                  description="Bạn có chắc chắn muốn hủy đơn hàng này?"
                  onConfirm={() => showMoadl(item.id)}
                
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
    <ModalHuyDon openHuy= {open} onComfirm={handleHuyDon} form={form} onCancel={() => setOpen(false)}/>
  </div>
  )
}

export default DonHangtabsHT