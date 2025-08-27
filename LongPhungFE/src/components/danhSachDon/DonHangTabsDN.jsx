import { Button, Card, Col, List, Row, Tag, Typography } from "antd";
import { IoBriefcaseOutline } from "react-icons/io5";
import { CiClock2, CiInboxIn } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
import React, { use, useState } from "react";
import axios from "axios";
import { API_FILE } from "../../services/constans";
import { toast } from "react-toastify";
import { formatCurrency, formatDate } from "../../helpers/formatData";
import ModalDonCT from "../donHang/ModalDonCT";

const DonHangTabsDN = ({ listDN, handleHoanDon, handleLamLai, handleopenModal }) => {
  const { Text } = Typography;
  const khu = localStorage.getItem("khu");
  const showNhanBtn = Boolean(khu);
  console.log("List DN:", listDN);
  const [bill, setBill] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (data) => {
    setBill(data);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={listDN}
        renderItem={(i) => (
          <List.Item key={i.id}>
            <Card
              title={<span>{i.maDonHang}</span>}
              style={{
                padding: "2%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div>
                <Text>
                  Khách hàng: {i.khachHang?.tenKhachHang || "Khách lẻ"}{" "}
                </Text>
                <Row justify="space-between">
                  <Col>Hạn: {formatDate(i.ngayGiao)}</Col>
                  <Col>Giá: {formatCurrency(i.gia)}</Col>
                </Row>
              </div>
              <Row
                gutter={16}
                justify="space-between"
                style={{ marginTop: "auto" }}
              >
                <Col>
                  <Button type="primary" block onClick={() => showModal(i)}>
                    Chi tiết
                  </Button>
                </Col>
                <Col>
                  <Button type="primary" block onClick={() => handleHoanDon(i)}>
                    Hoàn đơn
                  </Button>
                </Col>
              </Row>
              
                <Row>
                  <Button
                    onClick={() => handleopenModal(i.maDonHang)}
                    type="primary"
                    style={{ width: "100%", marginTop: "3%" }}
                  >
                    Phân phối đơn hàng
                  </Button>
                </Row>
           
            </Card>
          </List.Item>
        )}
      />
      <ModalDonCT
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        data={bill}
      />
    </>
  );
};

export default DonHangTabsDN;
