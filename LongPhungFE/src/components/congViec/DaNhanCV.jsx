import { Button, Card, Col, List, message, Row, Tag, Typography } from "antd";
import { IoBriefcaseOutline } from "react-icons/io5";
import { CiClock2, CiInboxIn } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
import React, { use, useEffect, useRef, useState } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";
import { API_FILE, API_SOCKET } from "../../services/constans";
import ModalExcel from "../common/ModalExcel";

const DaNhanCV = () => {
  const { Text } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [check,setCheck] = useState(false)
  const stompClient = useRef(null);
  const socket = new SockJS(API_SOCKET);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };



  useEffect(() => {
    const id = "NV00001";
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        // Subscribe để nhận danh sách việc
        stompClient.current.subscribe("/topic/jobsNhan/" + id, (message) => {
          setItem(JSON.parse(message.body));
        });

        // Gửi yêu cầu lấy danh sách việc ngay khi kết nối thành công
        stompClient.current.publish({
          destination: "/app/getJobsNhan",
          body: "NV00001",
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

  const handleNhanViec = (id) => {
   if(!check) {
    showModal()
    setCheck(true)
   } else {
    if (stompClient.current) {
      stompClient.current.publish({
        destination: "/app/noptk",
        body: JSON.stringify(id),
      });
      toast.success("Bạn đã nộp việc thành công!");
    }
    setCheck(false)
   }
  };

  const [item, setItem] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "green";
      case "pending":
        return "orange";
      case "accepted":
        return "blue";
      case "completed":
        return "purple";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "available":
        return <IoBriefcaseOutline size={16} />;
      case "pending":
        return <CiClock2 size={16} />;
      case "accepted":
        return <CiInboxIn size={16} />;
      case "completed":
        return <FiCheckCircle size={16} />;
      default:
        return null;
    }
  };
 

  return (
    <>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={item}
        renderItem={(i) => (
          <List.Item key={i.id}>
            <Card
              title={<span>{i.donHangCT.donHang.maDonHang}</span>}
              style={{
                padding: "2%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
              extra={
                i.donHangCT?.images ? (
                  <a 
                    href={`${API_FILE}/image/${i.donHangCT.images.tenTep}?download=true`}
                    download={i.donHangCT.images.tenTep} 
                    style={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
                  >
                    Tải mẫu
                  </a>
                ) : null
              }
            >
              <div>
                <Text>Tên sản phẩm: {i.donHangCT.sanPham.tenSP} </Text>
                <Row>
                  <Text>Số lượng: {i.donHangCT.soLuong} </Text>
                </Row>
                <Row>
                  <Col span={12}>Hạn: {i.ngaGiao}</Col>
                  <Col span={6} offset={6}>
                    KPI: {i.kpi}
                  </Col>
                </Row>
              </div>
              <div style={{ marginTop: "auto" }}>
                <Button
                  type="primary"
                  block
                  onClick={() => handleNhanViec(i.id)}
                >
                  Giao nộp việc
                </Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
      <ModalExcel open={isModalOpen} onCloseM={handleCancel} API={API_FILE+"/upload/image"}/>
    </>
  );
};

export default DaNhanCV;
