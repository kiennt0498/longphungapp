import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Popconfirm,
  Row,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";

import { IoEyeSharp } from "react-icons/io5";

import ModalDonCT from "./ModalDonCT";
import DonHangService from "../../services/DonHangService";

const DonHangTabsHuy = ({ listHuy, format }) => {
  const service = new DonHangService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHuy, setIsHuy] = useState("")
  const [bill, setBill] = useState({});

  const showModal = async (data) => {
    const res = await service.getDonHuy(data.id)
    if(res.status === 200){
      setIsHuy(res.data)
    }
    console.log(res);
    
    setBill(data);
    setIsModalOpen(true);
    
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (listHuy.length === 0) {
    return <Empty />;
  }
  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[5, 5]}>
        {listHuy.map((item) => (
          <Col span={6} key={item.maDonHang}>
            <Card
              title={item.maDonHang}
              extra={
                <Row>
                  <Col span={11}>
                    <Tooltip title="Xem chi tiết" color="green">
                      <Button
                        color="green"
                        variant="outlined"
                        onClick={() => showModal(item)}
                      >
                        <IoEyeSharp />
                      </Button>
                    </Tooltip>
                  </Col>
                </Row>
              }
              style={{ paddingLeft: "7%", width: "100%" }}
            >
              <p>Khách hàng: {item.khachHang.tenKhachHang}</p>
              <p>Số điện thoại: {item.khachHang.sdt}</p>
              <p>Ngày chốt đơn: {item.ngayChotDon}</p>
              <p>Ngày giao hàng: {item.ngayGiaoHang}</p>
              <p>Giá: {format(item.gia)}</p>
              <p>Trạng thái: {item.trangThai}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <ModalDonCT
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        data={bill}
        isHuy = {isHuy}
      />
    </div>
  );
};

export default DonHangTabsHuy;
