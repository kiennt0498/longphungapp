import { Badge, Form, Tabs } from "antd";

import React, { useEffect, useRef, useState } from "react";
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

  const service = new DonHangService();
  const imgService = new ImageService();

  const stompClient = useRef(null);

  const handleEdit = (data) => {
    console.log(data);
  };
  const showModalHuy = (id) => {
    setIdHuy(id);
    setOpenHuy(true);
  };

  const closeModalHuy = () => {
    setOpenHuy(false);
  };

  useEffect(() => {
    const id = "NV00001";
    const socket = new SockJS(API_SOCKET);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        const updateStateSafely = (setter, newData, countSetter) => {
          setter((prevData) => {
            if (JSON.stringify(prevData) !== JSON.stringify(newData)) {
              countSetter(newData.length);
              return newData;
            }
            return prevData;
          });
        };

        stompClient.current.subscribe("/topic/donhang/" + id, (message) => {
          const data = JSON.parse(message.body);
          updateStateSafely(setListTK, data, setCountTK);
        });

        stompClient.current.subscribe("/topic/jobsduyet/" + id, (message) => {
          const data = JSON.parse(message.body);
          updateStateSafely(setListCD, data, setCountCD);
        });

        stompClient.current.subscribe("/topic/donduyet/" + id, (message) => {
          const data = JSON.parse(message.body);
          updateStateSafely(setListXN, data, setCountXN);
        });

        stompClient.current.subscribe(
          "/topic/donhoanthanh/" + id,
          (message) => {
            const data = JSON.parse(message.body);
            updateStateSafely(setListHT, data, setCountHT);
          }
        );

        stompClient.current.subscribe("/topic/donhuy/" + id, (message) => {
          const data = JSON.parse(message.body);
          updateStateSafely(setListHuy, data, setCountHuy);
        });

        if (stompClient.current.connected) {
          stompClient.current.publish({
            destination: "/app/getDonHang",
            body: id,
          });
          stompClient.current.publish({
            destination: "/app/getJobsDuyet",
            body: id,
          });
          stompClient.current.publish({
            destination: "/app/getDonDuyet",
            body: id,
          });
          stompClient.current.publish({
            destination: "/app/getDonHT",
            body: id,
          });
          stompClient.current.publish({
            destination: "/app/getDonHuy",
            body: id,
          });
        }
      },
    });

    stompClient.current.activate();

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, []);

  const handleDuyetSP = (id) => {
    if (stompClient.current) {
      stompClient.current.publish({
        destination: "/app/duyet",
        body: JSON.stringify(id),
      });
      toast.success("Bạn đã duyệt đơn thành công!");
    }
  };

  const handleLamLai = (data) => {
    imgService.deleteImage(data.donHangCT.images.tenTep);
    if (stompClient.current) {
      stompClient.current.publish({
        destination: "/app/lamlai",
        body: JSON.stringify(data.id),
      });
    }
  };

  const handleHuyDon = async () => {
    const lyDo = await form.getFieldValue();
    const newData = {
      id: idHuy,
      lyDo: lyDo.lyDo,
    };

    try {
      const res = await service.huyDonHang(newData);
      if (res.status === 200) {
        toast.success("Hủy đơn hàng thành công");
      }
    } catch (error) {
      console.log(error);
      toast.error("Hủy đơn hàng thất bại");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const items = [
    {
      key: "1",
      label: (
        <span>
          Đơn chờ thiết kế{" "}
          {countTK > 0 && (
            <Badge count={countTK} overflowCount={99} status="default" />
          )}
        </span>
      ),
      children: (
        <DonHangTabsTK
          listTK={listTK}
          format={formatCurrency}
          edit={handleEdit}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span>
          Đơn chờ duyệt{" "}
          {countCD > 0 && (
            <Badge count={countCD} overflowCount={99} status="processing" />
          )}
        </span>
      ),
      children: (
        <DonHangTabsCD
          listCD={listCD}
          format={formatCurrency}
          edit={handleEdit}
          handleLamLai={handleLamLai}
          handleDuyetSP={handleDuyetSP}
        />
      ),
    },
    {
      key: "3",
      label: (
        <span>
          Đơn chờ xử lý{" "}
          {countXN > 0 && (
            <Badge count={countXN} overflowCount={99} status="warning" />
          )}
        </span>
      ),
      children: (
        <DonHangTabsXN
          listXN={listXN}
          format={formatCurrency}
          edit={handleEdit}
          showModalHuy={showModalHuy}
        />
      ),
    },
    {
      key: "4",
      label: (
        <span>
          Đơn hoàn thành{" "}
          {countHT > 0 && (
            <Badge count={countHT} overflowCount={99} status="success" />
          )}
        </span>
      ),
      children: (
        <DonHangtabsHT
          listHT={listHT}
          format={formatCurrency}
          edit={handleEdit}
          showModalHuy={showModalHuy}
        />
      ),
    },
    {
      key: "5",
      label: (
        <span>
          Đơn bị hủy{" "}
          {countHuy > 0 && (
            <Badge count={countHuy} overflowCount={99} status="error" />
          )}
        </span>
      ),
      children: (
        <DonHangTabsHuy
          listHuy={listHuy}
          format={formatCurrency}
          edit={handleEdit}
        />
      ),
    },
  ];

  return (
    <>
      <Tabs type="card" defaultActiveKey="1" items={items} />
      <ModalHuyDon
        openHuy={openHuy}
        onCancel={closeModalHuy}
        onComfirm={handleHuyDon}
        form={form}
      />
    </>
  );
};

export default DonHangList;
