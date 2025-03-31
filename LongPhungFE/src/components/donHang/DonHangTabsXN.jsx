import { Button, Card, Col, Empty, Popconfirm, Row, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import ModalChotDon from "./ModalChotDon";
import { IoMdTrash } from "react-icons/io";
import ModalHuyDon from "./ModalHuyDon";
import DonHangService from "../../services/DonHangService"
import { API_SOCKET } from "../../services/constans";

const DonHangTabsXN = ({ edit, format }) => {
  const service = new DonHangService()
  const stompClient = useRef(null);
  const socket = new SockJS(API_SOCKET);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openHuy, setOpenHuy] = useState(false);
  const [donHangs, setDonHangs] = useState([]);
  const [bill, setBill] = useState({});
  const [products, setProducts] = useState([])

  const showModalHuy = () => {
    setOpenHuy(true);
  };

  const closeModalHuy = () => {
    setOpenHuy(false);
  };

  const showModal = (data) => {
    getHoaDonCT(data.maDonHang)
    setBill(data)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getHoaDonCT = async (id)=>{
    try {
      const res = await service.getDonHangCT(id)
      if(res && res.data){
        setProducts(res.data)
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    const id = "NV00001";
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        // Subscribe để nhận danh sách việc
        stompClient.current.subscribe("/topic/donduyet/" + id, (message) => {
          setDonHangs(JSON.parse(message.body));
          console.log(message.body);
        });

        // Gửi yêu cầu lấy danh sách việc ngay khi kết nối thành công
        stompClient.current.publish({
          destination: "/app/getDonDuyet",
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

  console.log(donHangs);

  if (donHangs.length === 0) {
    return <Empty />;
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
                      title="Hủy đơn"
                      description="Bạn thực sự muốn hủy đơn nàynày?"
                      onConfirm={showModalHuy}
                      okText="Xác nhận"
                      cancelText="Không"
                    >
                      <Tooltip title="Hủy đơn hàng" color="red">
                        <Button
                          color="red"
                          variant="outlined"
                         
                        >
                          <IoMdTrash />
                        </Button>
                      </Tooltip>
                    </Popconfirm>
                  </Col>
                </Row>
              }
              style={{ padding: "3%", width: "100%" }}
            >
              <p>
                Khách hàng:{" "}
                {item.khachHang ? item.khachHang.tenKhachHang : "N/A"}
              </p>
              <p>
                Số điện thoại: {item.khachHang ? item.khachHang.sdt : "N/A"}
              </p>
              <p>Ngày chốt đơn: {item.ngayChotDon}</p>
              <p>Ngày giao hàng: {item.ngayGiaoHang}</p>
              <p>Giá: {format(item.gia)}</p>
              <p>Trạng thái: {item.trangThai}</p>

              <Row>
                <Button
                  onClick={() => showModal(item)}
                  style={{ width: "100%" }}
                  type="primary"
                >
                  Chốt đơn hàng
                </Button>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <ModalChotDon
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        data={bill}
        products={products}
      />
      <ModalHuyDon openHuy={openHuy} onCancel={closeModalHuy} />
    </div>
  );
};

export default DonHangTabsXN;
