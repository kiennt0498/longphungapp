import { Empty, Row } from "antd";
import React, { useState } from "react";
import ModalDonCT from "./ModalDonCT";

import DonHangService from "../../services/DonHangService";
import OrderCard from "../common/OrderCard";

const service = new DonHangService();

const DonHangTabsHuy = ({ listHuy, format }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHuy, setIsHuy] = useState("");
  const [bill, setBill] = useState({});

  const showModal = async (data) => {
    const res = await service.getDonHuy(data.id);
    if (res.status === 200) setIsHuy(res.data);
    setBill(data);
    setIsModalOpen(true);
  };

  const handleCancel = () => setIsModalOpen(false);

  if (!listHuy.length) return <Empty />;

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[5, 5]}>
        {listHuy.map((item) => (
          <OrderCard key={item.maDonHang} item={item} format={format} onView={showModal} />
        ))}
      </Row>
      <ModalDonCT
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        data={bill}
        isHuy={isHuy}
      />
    </div>
  );
};

export default DonHangTabsHuy;
