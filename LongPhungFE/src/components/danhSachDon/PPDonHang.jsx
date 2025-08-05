import { Badge, Form, Tabs } from "antd";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import DonHangTabs from "./DonHangTabs";
import DonHangTabsDN from "./DonHangTabsDN";
import SockJS from "sockjs-client";
import { API_SOCKET } from "../../services/constans";
import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";
import DonHangService from "../../services/DonHangService";

import { useNavigate } from "react-router-dom";
import DonHangHTabs from "./DonHangHTtabs";
import DonHangHuyTabs from "./DonHangHuyTabs";
import ModalHuyDon from "../donHang/ModalHuyDon";
import DonHangTabsPP from "./DonHangTabsPP";

const PPDonHang = () => {
  const [list, setList] = useState([]);
  const [listDN, setListDN] = useState([]);
  const [listHT, setListHT] = useState([]);
  const [listHuy, setListHuy] = useState([]);
  const [listPP, setListPP] = useState([]);

  const [countTK, setCountTK] = useState(0);
  const [countCD, setCountCD] = useState(0);
  const [countHT, setCountHT] = useState(0);
  const [countHuy, setCountHuy] = useState(0);
  const [countPP, setCountPP] = useState(0);

  const [idHuy, setIdHuy] = useState("");
  const [form] = Form.useForm();
  const [openHuy, setOpenHuy] = useState(false);
  const navigate = useNavigate();
  const maNV = localStorage.getItem("maNV");
  const xuong = localStorage.getItem("xuong") || "";
  const khu = localStorage.getItem("khu") || "";
  const isKhu = Boolean(khu);

  const stompClient = useRef(null);
  const service = useMemo(() => new DonHangService(), []);
  

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
      
      const idKhu = `${xuong}-${khu}`;

      const subs = isKhu
        ? [
            [`/topic/donxuongnhan/${xuong}`, setList, setCountTK],
            [`/topic/donkhunhan/${idKhu}`, setListDN, setCountCD],
            [`/topic/donxuonght/${xuong}`, setListHT, setCountHT],
            [`/topic/donhuy/${idKhu}`, setListHuy, setCountHuy],
          ]
        : [
            ["/topic/donnhan", setList, setCountTK],
            [`/topic/donxuongnhan/${xuong}`, setListDN, setCountCD],
            [`/topic/dondapp/${xuong}`, setListPP, setCountPP],
            [`/topic/donxuonght/${xuong}`, setListHT, setCountHT],
            [`/topic/donhuy/${xuong}`, setListHuy, setCountHuy],
          ];

      const endpoints = isKhu
        ? ["getDonXuongNhan", "getDonKhuNhan", "getDonXuongHT", "getDonHuy"]
        : ["getDonNhan", "getDonXuongNhan","getDonDaPP" ,"getDonXuongHT", "getDonHuy"];

      subs.forEach(([topic, setListFn, setCountFn]) => {
        stompClient.current.subscribe(topic, (msg) =>
          updateList(msg, setListFn, setCountFn)
        );
      });

      endpoints.forEach((dest) => {
        stompClient.current.publish({ destination: `/app/${dest}`, body: maNV });
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
    }
  });

  stompClient.current.activate();

  return () => {
    stompClient.current?.deactivate();
  };
}, [maNV, xuong, khu, updateList]);

  console.log("List PP:", listPP);
  

  const showModalHuy = useCallback((id) => { setIdHuy(id); setOpenHuy(true); }, []);
  const closeModalHuy = useCallback(() => setOpenHuy(false), []);

  const handleNhanDon = useCallback((data) => {
    
    const id = data.id;
    stompClient.current?.publish({
      destination: "/app/NhanDon",
      body: JSON.stringify({ id, maNV })
    });
    toast.success("Nhận đơn thành công!");
  }, [maNV]);

  const handleHoanDon = useCallback((data) => {
    console.log("handleLamLai data:", data);
    
    if(isKhu){
      stompClient.current?.publish({
      destination: "/app/hoanDonKhu",
      body: JSON.stringify({ id: data.id, maNV })
    });
    }else{
      stompClient.current?.publish({
      destination: "/app/hoanDonXuong",
      body: JSON.stringify({ id: data.id, maNV })
    });
    }
  }, [maNV]);


  const handleHuyDon = useCallback(async () => {
    const lyDo = form.getFieldValue();
    try {
      const res = await service.huyDonHang({ id: idHuy, lyDo: lyDo.lyDo });
      toast[res.status === 200 ? "success" : "error"](
        res.status === 200 ? "Hủy đơn hàng thành công" : "Hủy đơn hàng thất bại"
      );
    } catch {
      toast.error("Hủy đơn hàng thất bại");
    }
    closeModalHuy();
  }, [form, idHuy, service, closeModalHuy]);

  const formatCurrency = useCallback((amount) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount), []);

  const tabLabels = useMemo(() => ({
  tk: <span>Đơn hàng {countTK > 0 && <Badge count={countTK} overflowCount={99} />}</span>,
  cd: <span>Đơn đã nhận {countCD > 0 && <Badge count={countCD} overflowCount={99} />}</span>,
  ...(isKhu ? {} : {
    pp: <span>Đơn đã phân phối {countCD > 0 && <Badge count={countPP} overflowCount={99} />}</span>,
  }),
  ht: <span>Đơn hoàn thành {countHT > 0 && <Badge count={countHT} overflowCount={99} />}</span>,
  huy: <span>Đơn bị hủy {countHuy > 0 && <Badge count={countHuy} overflowCount={99} />}</span>,
  }), [isKhu, countTK, countCD, countHT, countHuy]);

  const tabsItems = useMemo(() => {
  const items = [
    { key: "1", label: tabLabels.tk, children: <DonHangTabs list={list} format={formatCurrency} handleNhanDon={handleNhanDon}/> },
    { key: "2", label: tabLabels.cd, children: <DonHangTabsDN listDN={listDN} format={formatCurrency} handleHoanDon={handleHoanDon}  /> },
    { key: "3", label: tabLabels.pp, children: <DonHangTabsPP listDPP={listPP} format={formatCurrency} handleHoanDon={handleHoanDon}/> },
    { key: "4", label: tabLabels.ht, children: <DonHangHTabs listHT={listHT} format={formatCurrency} showModalHuy={showModalHuy} /> },
    { key: "5", label: tabLabels.huy, children: <DonHangHuyTabs listHuy={listHuy} format={formatCurrency} /> }
  ];

  return isKhu ? items.filter(item => item.key !== "3") : items;
}, [isKhu, tabLabels, list, listDN, listHT, listHuy, formatCurrency, handleHoanDon, handleNhanDon, showModalHuy]);
  
  return (
    <>
      <Tabs type="card" defaultActiveKey="1" items={tabsItems} />
      <ModalHuyDon openHuy={openHuy} onCancel={closeModalHuy} onComfirm={handleHuyDon} form={form} />
    </>
  );
};

export default React.memo(PPDonHang);
