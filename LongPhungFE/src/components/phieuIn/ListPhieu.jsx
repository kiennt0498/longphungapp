import { Badge, Tabs } from "antd";
import React, {
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PhieuCanIn from "./PhieuCanIn";
import PhieuDaIn from "./PhieuDaIn";
import { API_SOCKET } from "../../services/constans";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useNavigate } from "react-router-dom";

export default function ListPhieu() {
  const [listPhieu, setListPhieu] = useState([]);
  const [countPhieu, setCountPhieu] = useState(0);
  const [phieuHT, setPhieuHT] = useState([]);
  const maNV = localStorage.getItem("maNV");
  const [countPhieuHT, setCountPhieuHT] = useState(0);
  const stompClient = useRef(null);
  const navigate = useNavigate();

  const updateList = useCallback((msg, setList, setCount) => {
    try {
      const newData = JSON.parse(msg.body);
      setList(newData);
      setCount(newData.length);
    } catch (err) {
      console.error("Lỗi cập nhật dữ liệu:", err);
    }
  }, []);

  useEffect(() => {
    const socket = new SockJS(API_SOCKET);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        const subs = [
          [`/topic/phieu-in/${maNV}`, setListPhieu, setCountPhieu],
          [`/topic/phieu-in-ht/${maNV}`, setPhieuHT, setCountPhieuHT],
        ];

        subs.forEach(([topic, setList, setCount]) => {
          stompClient.current.subscribe(topic, (msg) =>
            updateList(msg, setList, setCount)
          );
        });

        ["getListPhieu", "getListPhieuHT"].forEach((dest) => {
          stompClient.current.publish({
            destination: `/app/${dest}`,
            body: maNV,
          });
        });
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
        if (error?.message?.includes("403")) {
          navigate("/login");
        }
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
        navigate("/login");
      },
    });

    stompClient.current.activate();
    return () => stompClient.current?.deactivate();
  }, [maNV, updateList]);

  const tabLabels = useMemo(
    () => ({
      ds: (
        <span>
          Phiếu cần in{" "}
          {listPhieu.length > 0 && (
            <Badge count={listPhieu.length} overflowCount={99} />
          )}
        </span>
      ),
      ht: (
        <span>
          Phiếu đã in{" "}
          {phieuHT.length > 0 && (
            <Badge count={phieuHT.length} overflowCount={99} />
          )}
        </span>
      ),
    }),
    [listPhieu.length, phieuHT.length]
  );

  const tabsItems = useMemo(
    () => [
      {
        key: "1",
        label: tabLabels.ds,
        children: (
          <PhieuCanIn
            listPhieu={listPhieu}
            setListPhieu={setListPhieu}
            setCountPhieu={setCountPhieu}
          />
        ),
      },
      {
        key: "2",
        label: tabLabels.ht,
        children: (
          <PhieuDaIn
            phieuHT={phieuHT}
            setPhieuHT={setPhieuHT}
            setCountPhieuHT={setCountPhieuHT}
          />
        ),
      },
    ],
    [listPhieu, phieuHT]
  );

  return <Tabs type="card" defaultActiveKey="1" items={tabsItems} />;
}
