import { Button, Card, Col, List, message, Row, Tag, Typography } from "antd";
import { IoBriefcaseOutline } from "react-icons/io5";
import { CiClock2, CiInboxIn } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";
import { API_SOCKET } from "../../services/constans";

const HoanThanhCV = () => {
  const { Text } = Typography;
  const stompClient = useRef(null);
  const [prevItem, setPrevItem] = useState([]);
  const [item, setItem] = useState([]);

  useEffect(() => {
    const id = "NV00001";
    const socket = new SockJS(API_SOCKET);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("STOMP Connected");
        stompClient.current.subscribe("/topic/jobshoanthanhtk/" + id, (message) => {
          const newItem = JSON.parse(message.body);
          if (JSON.stringify(newItem) !== JSON.stringify(item)) {
            setPrevItem(item);
            setItem(newItem);
            toast.success("Bạn đã hoàn thành công việc!");
          }
        });

        stompClient.current.publish({
          destination: "/app/getJobsTKHoanThanh",
          body: id,
        });
      },
      onDisconnect: () => {
        console.warn("STOMP Disconnected");
      },
      onWebSocketError: (error) => {
        console.error("WebSocket Error:", error);
      },
    });

    stompClient.current.activate();

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, [item]);

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

  console.log(item);

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
              
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default HoanThanhCV;
