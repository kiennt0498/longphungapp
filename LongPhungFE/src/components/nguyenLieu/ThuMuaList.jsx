import React, { use, useEffect, useRef, useState } from "react";
import { Badge, Tabs } from "antd";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import DonThuMua from "./DonThuMua";
import { API_SOCKET } from "../../services/constans";
import { toast } from "react-toastify";
import NguyenLieuService from "../../services/NguyenLieuService";

function ThuMuaList() {
  const stompClient = useRef(null);

  const [donThuMua, setDonThuMua] = useState([]);
  const [donDaThuMua, setDonDaThuMua] = useState([]);

  const [task, setTask] = useState(0);
  const [taskDone, setTaskDone] = useState(0);

  const service = new NguyenLieuService();

  useEffect(() => {
    const socket = new SockJS(API_SOCKET);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("STOMP Connected");
        stompClient.current.subscribe("/topic/donthumua", (message) => {
          const newBill = JSON.parse(message.body);
          setDonThuMua((prevBill) => {
            if (JSON.stringify(prevBill) !== JSON.stringify(newBill)) {
              setTask(newBill.length);
              return newBill;
            }
            return prevBill; // Không cập nhật nếu dữ liệu không đổi
          });
        });

        stompClient.current.subscribe("/topic/dondathumua", (message) => {
          const newBill = JSON.parse(message.body);
          setDonDaThuMua((prevBill) => {
            if (JSON.stringify(prevBill) !== JSON.stringify(newBill)) {
              setTaskDone(newBill.length);
              return newBill;
            }
            return prevBill; // Không cập nhật nếu dữ liệu không đổi
          });
        });
        sendData();
      },
    });
    stompClient.current.activate();

    return () => {
      stompClient.current.deactivate();
    };
  }, []);

  const sendData = () => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.publish({
        destination: "/app/getDonThuMua",
        body: JSON.stringify(false),
      });
      stompClient.current.publish({
        destination: "/app/getDonDaThuMua",
        body: JSON.stringify(true),
      });
    }
  };

  const handleHuyDon = async (id) => {
    try {
      const res = await service.huyDonThuMua(id);
      if (res.status === 200) { 
        toast.success("Hủy đơn thành công");
        sendData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const item = [
    {
      label: (
        <span>
          Đơn thu mua{" "}
          {task > 0 && (
            <Badge count={task} overflowCount={99} status="default" />
          )}
        </span>
      ),
      key: 1,
      children: <DonThuMua data={donThuMua} isThuMua={true} handleHuyDon={handleHuyDon} />,
    },
    {
      label: "Đơn đã thu mua",
      key: 2,
      children: <DonThuMua data={donDaThuMua} isThuMua={false} />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={item} type="card" />;
}

export default ThuMuaList;
