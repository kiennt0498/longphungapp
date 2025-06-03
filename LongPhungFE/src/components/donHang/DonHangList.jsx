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

const isEqual = (a, b) => {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(key => isEqual(a[key], b[key]));
};

const DonHangList = () => {
  const [listTK, setListTK] = useState([]);
  const [listCD, setListCD] = useState([]);
  const [listXN, setListXN] = useState([]);
  const [listHT, setListHT] = useState([]);
  const [listHuy, setListHuy] = useState([]);
  const [countTK, setCountTK] = useState(0);
  const [countCD, setCountCD] = useState(0);
  const [countXN, setCountXN] = useState(0);
  const [countHT, setCountHT] = useState(0);
  const [countHuy, setCountHuy] = useState(0);
  const [idHuy, setIdHuy] = useState("");
  const [form] = Form.useForm();
  const [openHuy, setOpenHuy] = useState(false);
  const maNV = localStorage.getItem("maNV");

  const stompClient = useRef(null);
  const service = useMemo(() => new DonHangService(), []);
  const imgService = useMemo(() => new ImageService(), []);

  const updateStateSafely = useCallback((setter, newData, countSetter) => {
    setter(prev => {
      if (isEqual(prev, newData)) return prev;
      countSetter(newData.length);
      return newData;
    });
  }, []);

  useEffect(() => {
    const socket = new SockJS(API_SOCKET);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.current.subscribe(`/topic/donhang`, (msg) => {
          updateStateSafely(setListTK, JSON.parse(msg.body), setCountTK);
        });
        stompClient.current.subscribe(`/topic/jobsduyet/${maNV}`, (msg) => {
          updateStateSafely(setListCD, JSON.parse(msg.body), setCountCD);
        });
        stompClient.current.subscribe(`/topic/donduyet/${maNV}`, (msg) => {
          updateStateSafely(setListXN, JSON.parse(msg.body), setCountXN);
        });
        stompClient.current.subscribe(`/topic/donhoanthanh/${maNV}`, (msg) => {
          updateStateSafely(setListHT, JSON.parse(msg.body), setCountHT);
        });
        stompClient.current.subscribe(`/topic/donhuy/${maNV}`, (msg) => {
          updateStateSafely(setListHuy, JSON.parse(msg.body), setCountHuy);
        });

        ['getDonHang','getJobsDuyet','getDonDuyet','getDonHT','getDonHuy'].forEach(dest => {
          stompClient.current.publish({ destination: `/app/${dest}`, body: maNV });
        });
      },
    });

    stompClient.current.activate();
    return () => stompClient.current?.deactivate();
  }, [maNV, updateStateSafely]);

  const handleEdit = useCallback((data) => console.log(data), []);
  const showModalHuy = useCallback((id) => { setIdHuy(id); setOpenHuy(true); }, []);
  const closeModalHuy = useCallback(() => setOpenHuy(false), []);

  const handleDuyetSP = useCallback((id) => {
    stompClient.current?.publish({ destination: "/app/duyet", body: JSON.stringify({ id, maNV }) });
    toast.success("Bạn đã duyệt đơn thành công!");
  }, [maNV]);

  const handleLamLai = useCallback((data) => {
    imgService.deleteImage(data.donHangCT.images.tenTep);
    stompClient.current?.publish({ destination: "/app/lamlai", body: JSON.stringify({ id: data.id, maNV }) });
  }, [imgService, maNV]);

  const handleHuyDon = useCallback(async () => {
    const lyDo = form.getFieldValue();
    const newData = { id: idHuy, lyDo: lyDo.lyDo };
    try {
      const res = await service.huyDonHang(newData);
      toast[res.status === 200 ? 'success' : 'error'](
        res.status === 200 ? 'Hủy đơn hàng thành công' : 'Hủy đơn hàng thất bại'
      );
    } catch (error) {
      toast.error("Hủy đơn hàng thất bại");
    }
    closeModalHuy();
  }, [form, idHuy, service, closeModalHuy]);

  const formatCurrency = useCallback((amount) => 
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount),
  []);

  // Memoize lists để tránh re-render không cần thiết
  const memoizedListTK = useMemo(() => listTK, [JSON.stringify(listTK)]);
  const memoizedListCD = useMemo(() => listCD, [JSON.stringify(listCD)]);
  const memoizedListXN = useMemo(() => listXN, [JSON.stringify(listXN)]);
  const memoizedListHT = useMemo(() => listHT, [JSON.stringify(listHT)]);
  const memoizedListHuy = useMemo(() => listHuy, [JSON.stringify(listHuy)]);

  // Tách riêng phần label để tránh re-render toàn bộ tabs
  const tabLabels = useMemo(() => ({
    tk: <span>Đơn chờ thiết kế {countTK > 0 && <Badge count={countTK} overflowCount={99} />}</span>,
    cd: <span>Đơn chờ duyệt {countCD > 0 && <Badge count={countCD} overflowCount={99} />}</span>,
    xn: <span>Đơn chờ thanh toán {countXN > 0 && <Badge count={countXN} overflowCount={99} />}</span>,
    ht: <span>Đơn hoàn thành {countHT > 0 && <Badge count={countHT} overflowCount={99} />}</span>,
    huy: <span>Đơn bị hủy {countHuy > 0 && <Badge count={countHuy} overflowCount={99} />}</span>,
  }), [countTK, countCD, countXN, countHT, countHuy]);

  const tabsItems = useMemo(() => [
    { key: "1", label: tabLabels.tk, children: <DonHangTabsTK listTK={memoizedListTK} format={formatCurrency} /> },
    { key: "2", label: tabLabels.cd, children: <DonHangTabsCD listCD={memoizedListCD} format={formatCurrency} handleLamLai={handleLamLai} handleDuyetSP={handleDuyetSP} /> },
    { key: "3", label: tabLabels.xn, children: <DonHangTabsXN listXN={memoizedListXN} format={formatCurrency} showModalHuy={showModalHuy} /> },
    { key: "4", label: tabLabels.ht, children: <DonHangtabsHT listHT={memoizedListHT} format={formatCurrency} showModalHuy={showModalHuy} /> },
    { key: "5", label: tabLabels.huy, children: <DonHangTabsHuy listHuy={memoizedListHuy} format={formatCurrency} /> }
  ], [tabLabels, memoizedListTK, memoizedListCD, memoizedListXN, memoizedListHT, memoizedListHuy, formatCurrency, handleLamLai, handleDuyetSP, showModalHuy]);

  return (
    <>
      <Tabs type="card" defaultActiveKey="1" items={tabsItems} />
      <ModalHuyDon openHuy={openHuy} onCancel={closeModalHuy} onComfirm={handleHuyDon} form={form} />
    </>
  );
};

export default React.memo(DonHangList);