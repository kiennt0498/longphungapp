import { Badge, Form, Tabs } from "antd";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import DonHangTabsTK from "./DonHangTabsTK";
import DonHangTabsCD from "./DonHangTabsCD";
import DonHangtabsHT from "./DonHangtabsHT";
import DonHangTabsHuy from "./DonHangTabsHuy";
import DonHangTabsXN from "./DonHangTabsXN";
import SockJS from "sockjs-client";
import { API_SOCKET } from "../../services/constans";
import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";
import DonHangService from "../../services/DonHangService";
import ModalHuyDon from "./ModalHuyDon";
import ImageService from "../../services/ImageService";
import { useNavigate } from "react-router-dom";
import DonGuiPhieu from "./DonGuiPhieu";

const DonHangList = () => {
  const [listTK, setListTK] = useState([]);
  const [listCD, setListCD] = useState([]);
  const [listXN, setListXN] = useState([]);
  const [listHT, setListHT] = useState([]);
  const [listHuy, setListHuy] = useState([]);
  const [listGuiPhieu, setListGuiPhieu] = useState([]);

  const [countTK, setCountTK] = useState(0);
  const [countCD, setCountCD] = useState(0);
  const [countXN, setCountXN] = useState(0);
  const [countHT, setCountHT] = useState(0);
  const [countHuy, setCountHuy] = useState(0);
  const [countPhieu, setCountPhieu] = useState(0);

  const [idHuy, setIdHuy] = useState("");
  const [form] = Form.useForm();
  const [openHuy, setOpenHuy] = useState(false);
  const navigate = useNavigate();
  const maNV = localStorage.getItem("maNV");

  const stompClient = useRef(null);
  const service = useMemo(() => new DonHangService(), []);
  const imgService = useMemo(() => new ImageService(), []);

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
          ["/topic/donhang", setListTK, setCountTK],
          [`/topic/donchoduyet/${maNV}`, setListCD, setCountCD],
          [`/topic/donhangchot/${maNV}`, setListXN, setCountXN],
          [`/topic/donhoanthanh/${maNV}`, setListHT, setCountHT],
          [`/topic/donhuy/${maNV}`, setListHuy, setCountHuy],
        ];

        subs.forEach(([topic, setList, setCount]) => {
          stompClient.current.subscribe(topic, (msg) =>
            updateList(msg, setList, setCount)
          );
        });

        ["getDonHang", "getDonChoDuyet", "getDonChot", "getDonHT", "getDonHuy"].forEach(dest => {
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
    return () => stompClient.current?.deactivate();
  }, [maNV, updateList]);

  console.log("List TK:", listTK);
  console.log("List CD:", listCD);
  console.log("List XN:", listXN);
  console.log("List HT:", listHT);
  console.log("List Huy:", listHuy);
  console.log("List Gui Phieu:", listGuiPhieu);
  

  const showModalHuy = useCallback((id) => { setIdHuy(id); setOpenHuy(true); }, []);
  const closeModalHuy = useCallback(() => setOpenHuy(false), []);

  const handleDuyetSP = useCallback((id) => {
    console.log(id);
    
    stompClient.current?.publish({
      destination: "/app/duyet",
      body: JSON.stringify({ id, maNV })
    });
    toast.success("Bạn đã duyệt đơn thành công!");
  }, [maNV]);

  const handleLamLai = useCallback((data) => {
    console.log("handleLamLai data:", data);
    
    stompClient.current?.publish({
      destination: "/app/lamlai",
      body: JSON.stringify({ id: data.id, maNV })
    });
  }, [imgService, maNV]);

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
    tk: <span>Đơn chờ thiết kế {countTK > 0 && <Badge count={countTK} overflowCount={99} />}</span>,
    cd: <span>Đơn chờ duyệt {countCD > 0 && <Badge count={countCD} overflowCount={99} />}</span>,
    xn: <span>Đơn chờ chốt {countXN > 0 && <Badge count={countXN} overflowCount={99} />}</span>,
    ht: <span>Đơn hoàn thành {countHT > 0 && <Badge count={countHT} overflowCount={99} />}</span>,
    huy: <span>Đơn bị hủy {countHuy > 0 && <Badge count={countHuy} overflowCount={99} />}</span>,
    phieu: <span>Gửi phiếu in {countPhieu > 0 && <Badge count={countPhieu} overflowCount={99} />}</span>,
  }), [countTK, countCD, countXN, countHT, countHuy, countPhieu]);

  const tabsItems = useMemo(() => [
    { key: "1", label: tabLabels.tk, children: <DonHangTabsTK listTK={listTK} format={formatCurrency} /> },
    { key: "2", label: tabLabels.cd, children: <DonHangTabsCD listCD={listCD} format={formatCurrency} handleLamLai={handleLamLai} handleDuyetSP={handleDuyetSP} /> },
    { key: "3", label: tabLabels.xn, children: <DonHangTabsXN listXN={listXN} format={formatCurrency} showModalHuy={showModalHuy} /> },
    { key: "4", label: tabLabels.ht, children: <DonHangtabsHT listHT={listHT} format={formatCurrency} showModalHuy={showModalHuy} /> },
    { key: "5", label: tabLabels.phieu, children: <DonGuiPhieu listHuy={listGuiPhieu} format={formatCurrency} /> },
    { key: "6", label: tabLabels.huy, children: <DonHangTabsHuy listHuy={listHuy} format={formatCurrency} /> },
    
  ], [tabLabels, listTK, listCD, listXN, listHT, listHuy, listGuiPhieu, formatCurrency, handleLamLai, handleDuyetSP, showModalHuy]);

  return (
    <>
      <Tabs type="card" defaultActiveKey="1" items={tabsItems} />
      <ModalHuyDon openHuy={openHuy} onCancel={closeModalHuy} onComfirm={handleHuyDon} form={form} />
    </>
  );
};

export default React.memo(DonHangList);
